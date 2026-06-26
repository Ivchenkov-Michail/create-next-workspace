# create-next-workspace

CLI for scaffolding [Next.js](https://nextjs.org) projects with optional Tailwind CSS, SCSS, Husky, and SVGR.

Supports **npm**, **pnpm**, **yarn**, and **bun**.

## Installation

No global install required. Run directly with `npx`:

```bash
npx create-next-workspace
```

Or use the npm create shorthand:

```bash
npm create next-workspace
```

**Requirements:** Node.js 18.18+ (20+ recommended) and your preferred package manager.

## Quick start

Interactive mode — answer prompts for project name, package manager, and features:

```bash
npx create-next-workspace
```

Then open the generated folder and start the dev server:

```bash
cd my-app
npm run dev
```

Replace `npm` with `pnpm`, `yarn`, or `bun` if you chose a different package manager.

## Usage

### Interactive

```bash
npx create-next-workspace
```

You will be asked for:

- Project name
- Package manager (`npm`, `pnpm`, `yarn`, `bun`)
- Tailwind CSS
- SCSS modules
- Husky + lint-staged
- SVGR

### With flags

Pass only the options you need. Unspecified options stay interactive:

```bash
npx create-next-workspace --name my-app
```

```bash
npx create-next-workspace --name my-app --pm bun
```

Fully non-interactive (useful for scripts and CI):

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
| `--scss` / `--no-scss` | Enable or disable SCSS modules |
| `--husky` / `--no-husky` | Enable or disable Husky + lint-staged |
| `--svgr` / `--no-svgr` | Enable or disable SVGR for SVG imports |
| `-V, --version` | Show CLI version |
| `-h, --help` | Show help |

## Generated project

Every workspace includes:

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **ESLint** with `eslint-config-next`
- Initialized **Git** repository

### Optional features

| Feature | What is added |
|---------|---------------|
| **Tailwind CSS** | PostCSS config, Tailwind v4, `@import "tailwindcss"` in `globals.css` |
| **SCSS** | `sass`, example module at `src/styles/example.module.scss` |
| **Husky** | Pre-commit hook with `lint-staged` and ESLint |
| **SVGR** | Import SVGs as React components via `@svgr/webpack` |

## License

ISC
