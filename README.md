# create-next-workspace

CLI for bootstrapping opinionated [Next.js](https://nextjs.org) workspaces with optional Tailwind CSS, SCSS, Husky, and SVGR.

An alternative to `create-next-app` with a modular feature system and support for **npm**, **pnpm**, **yarn**, and **bun**.

## Quick start

```bash
npx create-next-workspace
```

Or with npm create shorthand:

```bash
npm create next-workspace
```

You will be prompted for:

- Project name
- Package manager
- Tailwind CSS
- SCSS modules
- Husky + lint-staged
- SVGR

## Usage

### Interactive mode

```bash
npx create-next-workspace
```

### Partially non-interactive

Pass only the options you need. Everything else stays interactive:

```bash
npx create-next-workspace --name my-app
```

```bash
npx create-next-workspace --name my-app --pm bun --no-svgr
```

### Fully non-interactive (CI / scripts)

```bash
npx create-next-workspace \
  --name my-app \
  --pm npm \
  --tailwind \
  --scss \
  --husky \
  --no-svgr
```

## CLI options

| Option | Description |
|--------|-------------|
| `--name <name>` | Project directory name |
| `--pm <manager>` | Package manager: `npm`, `pnpm`, `yarn`, `bun` |
| `--tailwind` / `--no-tailwind` | Enable or disable Tailwind CSS v4 |
| `--scss` / `--no-scss` | Enable or disable SCSS modules (`sass`) |
| `--husky` / `--no-husky` | Enable or disable Husky + lint-staged |
| `--svgr` / `--no-svgr` | Enable or disable SVGR for SVG imports |
| `-V, --version` | Show CLI version |
| `-h, --help` | Show help |

## What gets generated

Each project includes:

- **Next.js 16** with App Router and TypeScript
- **React 19**
- **ESLint** with `eslint-config-next`
- **Git** repository initialized
- Optional features applied on top of the base template

### Optional features

| Feature | What it adds |
|---------|--------------|
| **Tailwind CSS** | `postcss.config.mjs`, `@tailwindcss/postcss`, `@import "tailwindcss"` in `globals.css` |
| **SCSS** | `sass` dependency, `src/styles/example.module.scss` |
| **Husky** | `husky`, `lint-staged`, `.lintstagedrc.mjs`, pre-commit hook with ESLint |
| **SVGR** | `@svgr/webpack`, `svgr.d.ts`, Turbopack rules in `next.config.ts`, `src/assets/` |

## Requirements

- **Node.js** 18.18 or later (20+ recommended)
- A package manager of your choice (`npm`, `pnpm`, `yarn`, or `bun`)

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/create-next-workspace.git
cd create-next-workspace
npm install
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile CLI to `dist/` and copy templates |
| `npm start` | Run CLI locally (`node dist/index.js`) |
| `npm run dev` | Watch mode for TypeScript sources |
| `npm test` | Build and run smoke tests |

### Local testing

```bash
npm run build
npm link
cd ..
npx create-next-workspace --name my-app
```

Generated projects (`my-app/`, `test-app/`, etc.) are ignored by git — do not commit them.

## Project structure

```
create-next-workspace/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── cli/                  # Prompts and run pipeline
│   ├── core/                 # Scaffold, templates, package.json helpers
│   ├── features/             # Pluggable features (tailwind, scss, husky, svgr)
│   └── types/
├── dist/                     # Built CLI (published to npm)
│   └── templates/            # Copied project templates
└── tests/                    # Unit and smoke tests
```

## Publishing

### npm

1. Log in: `npm login`
2. Check the package name is available: `npm view create-next-workspace`
3. Build and dry-run: `npm run build && npm pack --dry-run`
4. Publish: `npm publish`

The `prepublishOnly` script runs `npm run build` automatically before publish.

### GitHub

1. Create a new repository on GitHub
2. Push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/create-next-workspace.git
git branch -M main
git push -u origin main
```

3. Update `package.json` with repository metadata (optional but recommended):

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/create-next-workspace.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/create-next-workspace/issues"
  },
  "homepage": "https://github.com/your-username/create-next-workspace#readme"
}
```

Replace `your-username` with your GitHub username before publishing.

## License

ISC
