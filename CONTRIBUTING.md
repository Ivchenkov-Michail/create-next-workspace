# Contributing

Development and publishing guide for **create-next-workspace**.

For installation and CLI usage, see [README.npm.md](./README.npm.md).

## Setup

```bash
git clone https://github.com/Ivchenkov-Michail/create-next-workspace.git
cd create-next-workspace
npm install
```

## Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `npm run build` | Compile CLI to `dist/` and copy templates |
| `npm start`     | Run CLI locally (`node dist/index.js`)    |
| `npm run dev`   | Watch mode for TypeScript sources         |
| `npm test`      | Build and run smoke tests                 |

## Local testing

```bash
npm run build
npm link
cd ..
npx create-next-workspace --name my-app
```

Generated folders (`my-app/`, `test-app/`, etc.) are gitignored — do not commit them.

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

## Publishing to npm

npm displays **README.md** on the registry. Before publishing, sync user docs:

```bash
cp README.npm.md README.md
npm publish
git restore README.md
```

Or rely on the `prepublishOnly` script (see `package.json`), which copies `README.npm.md` → `README.md` automatically.

Steps:

1. `npm login`
2. Check name availability: `npm view create-next-workspace`
3. Dry-run: `npm run build && npm pack --dry-run`
4. Publish: `npm publish`

## Publishing to GitHub

```bash
git remote add origin https://github.com/Ivchenkov-Michail/create-next-workspace.git
git branch -M main
git push -u origin main
```

Recommended `package.json` fields:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/Ivchenkov-Michail/create-next-workspace.git"
  },
  "bugs": {
    "url": "https://github.com/Ivchenkov-Michail/create-next-workspace/issues"
  },
  "homepage": "https://github.com/Ivchenkov-Michail/create-next-workspace#readme"
}
```

## License

ISC
