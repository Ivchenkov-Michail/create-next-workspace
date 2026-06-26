import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        'lib/parse-dependency-spec':
            'src/core/package-json/parse-dependency-spec.ts',
    },
    format: ['cjs'],
    splitting: false,
    sourcemap: true,
    clean: true,
    shims: true,
    loader: {
        '.txt': 'copy',
    },
    banner: {
        js: '#!/usr/bin/env node',
    },
});