# API Collection Generators

Framework-specific route scanners and Postman collection generation. Read this when implementing a collection generator for a specific framework.

## Table of contents

1. [Postman Collection v2.1 schema](#postman-collection-v21-schema)
2. [Express scanner](#express-scanner)
3. [Next.js App Router scanner](#nextjs-app-router-scanner)
4. [Fastify scanner](#fastify-scanner)
5. [Collection generator](#collection-generator)
6. [Environment template](#environment-template)

---

## Postman Collection v2.1 schema

```json
{
  "info": {
    "name": "API Collection",
    "description": "Auto-generated from codebase",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [],
  "variable": [],
  "auth": {}
}
```

---

## Express scanner

Uses AST parsing to find `app.get()`, `router.post()`, etc:

```typescript
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

interface RouteInfo {
  method: string;
  path: string;
  name: string;
  params?: Array<{ name: string; type: "path" | "query"; example?: string }>;
  body?: Record<string, unknown>;
}

function scanExpressRoutes(filePath: string): RouteInfo[] {
  const routes: RouteInfo[] = [];
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parse(code, { sourceType: "module", plugins: ["typescript"] });

  traverse(ast, {
    CallExpression(nodePath) {
      const callee = nodePath.node.callee;
      if (callee.type === "MemberExpression") {
        const method = callee.property.name;
        if (["get", "post", "put", "patch", "delete"].includes(method)) {
          const args = nodePath.node.arguments;
          if (args[0]?.type === "StringLiteral") {
            routes.push({
              method: method.toUpperCase(),
              path: args[0].value,
              name: `${method.toUpperCase()} ${args[0].value}`,
              params: extractPathParams(args[0].value),
            });
          }
        }
      }
    },
  });

  return routes;
}

function extractPathParams(routePath: string) {
  const params = [];
  const regex = /:(\w+)/g;
  let match;
  while ((match = regex.exec(routePath)) !== null) {
    params.push({ name: match[1], type: "path" as const, example: `{{${match[1]}}}` });
  }
  return params;
}
```

---

## Next.js App Router scanner

File-based route discovery from `app/api/**/route.ts`:

```typescript
import { glob } from "glob";

async function scanNextJsRoutes(appDir: string): Promise<RouteInfo[]> {
  const routes: RouteInfo[] = [];
  const routeFiles = await glob(`${appDir}/**/route.{ts,js}`);

  for (const file of routeFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const relativePath = path.relative(appDir, path.dirname(file));
    const apiPath = "/" + relativePath.replace(/\\/g, "/");

    for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
      if (
        content.includes(`export async function ${method}`) ||
        content.includes(`export function ${method}`) ||
        content.includes(`export const ${method}`)
      ) {
        routes.push({
          method,
          path: apiPath
            .replace(/\[\.\.\.(\w+)\]/g, ":$1*")  // [...slug] → :slug*
            .replace(/\[(\w+)\]/g, ":$1"),          // [id] → :id
          name: `${method} ${apiPath}`,
        });
      }
    }
  }

  return routes;
}
```

---

## Fastify scanner

Matches `fastify.get('/path', { schema }, handler)`:

```typescript
function scanFastifyRoutes(filePath: string): RouteInfo[] {
  const routes: RouteInfo[] = [];
  const code = fs.readFileSync(filePath, "utf-8");

  const routeRegex =
    /fastify\.(get|post|put|patch|delete)\s*\(\s*['"`]([^'"`]+)['"`]/g;

  let match;
  while ((match = routeRegex.exec(code)) !== null) {
    const [, method, routePath] = match;
    routes.push({
      method: method.toUpperCase(),
      path: routePath,
      name: `${method.toUpperCase()} ${routePath}`,
    });
  }

  return routes;
}
```

---

## Collection generator

Converts scanned routes into Postman Collection v2.1:

```typescript
function generateCollection(
  routes: RouteInfo[],
  options: { name: string; baseUrl: string; auth?: "bearer" | "basic" | "apikey" }
) {
  const collection = {
    info: {
      name: options.name,
      description: "Auto-generated API collection",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: [] as any[],
    variable: [
      { key: "baseUrl", value: options.baseUrl, type: "string" },
      { key: "authToken", value: "", type: "string" },
    ],
    ...(options.auth === "bearer" && {
      auth: { type: "bearer", bearer: [{ key: "token", value: "{{authToken}}", type: "string" }] },
    }),
  };

  // Group routes by first path segment (resource)
  const groups: Record<string, RouteInfo[]> = {};
  for (const route of routes) {
    const resource = route.path.split("/").filter(Boolean)[1] || route.path.split("/").filter(Boolean)[0] || "root";
    (groups[resource] ??= []).push(route);
  }

  for (const [resource, resourceRoutes] of Object.entries(groups)) {
    collection.item.push({
      name: resource,
      item: resourceRoutes.map((route) => ({
        name: route.name,
        request: {
          method: route.method,
          header: [{ key: "Content-Type", value: "application/json", type: "text" }],
          url: {
            raw: `{{baseUrl}}${route.path}`,
            host: ["{{baseUrl}}"],
            path: route.path.split("/").filter(Boolean),
            variable: route.params?.filter((p) => p.type === "path").map((p) => ({
              key: p.name, value: p.example || "", description: p.name,
            })),
          },
          ...(["POST", "PUT", "PATCH"].includes(route.method) && route.body && {
            body: { mode: "raw", raw: JSON.stringify(route.body, null, 2), options: { raw: { language: "json" } } },
          }),
        },
      })),
    });
  }

  return collection;
}
```

---

## Environment template

Generate alongside the collection:

```json
{
  "name": "Development",
  "values": [
    { "key": "baseUrl", "value": "http://localhost:3000/api", "enabled": true },
    { "key": "authToken", "value": "", "enabled": true, "type": "secret" },
    { "key": "userId", "value": "1", "enabled": true }
  ]
}
```

Create one per environment (dev, staging, production) with appropriate base URLs and placeholder secrets.