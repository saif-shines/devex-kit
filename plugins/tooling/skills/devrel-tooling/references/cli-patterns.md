# CLI Implementation Patterns

Detailed patterns for building CLI tools per language. Read this when you're implementing commands, parsing arguments, or adding interactive features.

## Table of contents

1. [Node.js (commander)](#nodejs-commander)
2. [Python (click / typer)](#python-click--typer)
3. [Go (cobra)](#go-cobra)
4. [Design patterns](#design-patterns)
5. [UX patterns](#ux-patterns)

---

## Node.js (commander)

```javascript
#!/usr/bin/env node
const { program } = require('commander');

program
  .name('mytool')
  .description('Developer tooling CLI')
  .version('1.0.0');

program
  .command('deploy <environment>')
  .description('Deploy to target environment')
  .option('-f, --force', 'skip confirmation prompts')
  .option('-d, --dry-run', 'preview changes')
  .option('-c, --config <file>', 'config file path', './mytool.config.yml')
  .action((environment, opts) => {
    if (!opts.force && environment === 'production') {
      // Prompt for confirmation
    }
    console.log(`Deploying to ${environment}...`);
  });

program.parse();
```

**Interactive prompts** with inquirer:

```javascript
const inquirer = require('inquirer');

const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'environment',
    message: 'Select environment:',
    choices: ['development', 'staging', 'production'],
  },
  {
    type: 'confirm',
    name: 'proceed',
    message: 'Deploy to production?',
    default: false,
    when: (ans) => ans.environment === 'production',
  },
]);
```

**Progress indicators** with ora:

```javascript
const ora = require('ora');
const spinner = ora('Installing dependencies...').start();

try {
  await install();
  spinner.succeed('Dependencies installed');
} catch (err) {
  spinner.fail('Installation failed');
}
```

---

## Python (click / typer)

### click

```python
import click

@click.group()
@click.version_option()
def cli():
    """Developer tooling CLI."""
    pass

@cli.command()
@click.argument('environment')
@click.option('--force', is_flag=True, help='Skip confirmation')
@click.option('--dry-run', is_flag=True, help='Preview changes')
@click.option('--config', default='./config.yml', help='Config path')
def deploy(environment, force, dry_run, config):
    """Deploy to target environment."""
    if not force and environment == 'production':
        click.confirm('Deploy to production?', abort=True)
    click.echo(f'Deploying to {environment}...')

if __name__ == '__main__':
    cli()
```

### typer (type-hint driven)

```python
import typer
from typing import Optional

app = typer.Typer(help="Developer tooling CLI")

@app.command()
def deploy(
    environment: str = typer.Argument(..., help="Target environment"),
    force: bool = typer.Option(False, "--force", "-f", help="Skip confirmation"),
    dry_run: bool = typer.Option(False, "--dry-run", "-d", help="Preview changes"),
    config: str = typer.Option("./config.yml", "--config", "-c", help="Config path"),
):
    """Deploy to target environment."""
    if not force and environment == "production":
        typer.confirm("Deploy to production?", abort=True)
    typer.echo(f"Deploying to {environment}...")
```

**Rich** for styled output:

```python
from rich.console import Console
from rich.progress import track

console = Console()
console.print("[green]✓[/green] Build successful")

for item in track(items, description="Processing..."):
    process(item)
```

---

## Go (cobra)

```go
package cmd

import (
    "fmt"
    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
    Use:   "mytool",
    Short: "Developer tooling CLI",
}

var deployCmd = &cobra.Command{
    Use:   "deploy [environment]",
    Short: "Deploy to target environment",
    Args:  cobra.ExactArgs(1),
    RunE: func(cmd *cobra.Command, args []string) error {
        env := args[0]
        force, _ := cmd.Flags().GetBool("force")

        if !force && env == "production" {
            fmt.Print("Deploy to production? (y/N): ")
            // Read confirmation
        }

        fmt.Printf("Deploying to %s...\n", env)
        return nil
    },
}

func init() {
    deployCmd.Flags().BoolP("force", "f", false, "Skip confirmation")
    deployCmd.Flags().BoolP("dry-run", "d", false, "Preview changes")
    deployCmd.Flags().StringP("config", "c", "./config.yml", "Config path")
    rootCmd.AddCommand(deployCmd)
}
```

**Shell completions** (built into cobra):

```go
// Generates completions automatically
rootCmd.GenBashCompletionFile("completions/mytool.bash")
rootCmd.GenZshCompletionFile("completions/_mytool")
rootCmd.GenFishCompletionFile("completions/mytool.fish")
```

---

## Design patterns

### Configuration layers

```javascript
const config = {
  ...systemDefaults,                 // 6. Hard-coded defaults
  ...loadSystemConfig(),             // 5. /etc/mytool/config.yml
  ...loadUserConfig(),               // 4. ~/.config/mytool/config.yml
  ...loadProjectConfig(),            // 3. ./mytool.config.js
  ...loadEnvVars(),                  // 2. Environment variables
  ...parseCliFlags(),                // 1. Flags (highest priority)
};
```

### Exit codes

```javascript
const EXIT = {
  SUCCESS: 0,
  GENERAL_ERROR: 1,
  MISUSE: 2,              // Invalid arguments
  PERMISSION_DENIED: 77,
  NOT_FOUND: 127,
  SIGINT: 130,            // Ctrl+C
};
```

### Plugin architecture

```
mycli/
├── core/
├── plugins/
│   ├── aws/
│   └── github/
└── plugin-loader.js
```

Discovery order:
1. `~/.mycli/plugins/`
2. `node_modules/mycli-plugin-*`
3. `MYCLI_PLUGIN_PATH` env var

---

## UX patterns

### Color semantics

| Color | Meaning | Symbol |
|-------|---------|--------|
| Red | Error, failure | ✗ |
| Yellow | Warning, deprecation | ⚠ |
| Green | Success, completion | ✓ |
| Blue | Information | ℹ |
| Cyan | Code, commands | — |
| Gray | Metadata, timestamps | — |

Always pair color with a symbol — colors alone fail accessibility and piped output.

### Error message template

```
✗ Error: [Specific problem]

Context:
  • [What was being attempted]
  • [What went wrong]

Solutions:
  • [Actionable step 1]
  • [Actionable step 2]
```

### Help text structure

```
USAGE
  mytool <command> [options]

COMMANDS
  init         Initialize a new project
  deploy       Deploy to environment
  config       Manage configuration

OPTIONS
  -h, --help     Show help
  -v, --version  Show version

Run 'mytool <command> --help' for more information on a command.

EXAMPLES
  mytool init my-app
  mytool deploy production --dry-run
```

### Verbose / debug modes

- **Normal**: concise success/failure only
- **Verbose** (`--verbose`): step-by-step progress with timestamps
- **Debug** (`DEBUG=*` or `--debug`): full request/response internals, config dumps