import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { test } from 'node:test';

import fs from 'fs-extra';

const execFileAsync = promisify(execFile);

test('generates a Next.js workspace', async (t) => {
    const projectName = `test-app-${Date.now()}`;
    const parentDir = path.join(
        os.tmpdir(),
        'create-next-workspace-tests'
    );
    const projectPath = path.join(
        parentDir,
        projectName
    );

    t.after(async () => {
        if (await fs.pathExists(projectPath)) {
            await fs.remove(projectPath);
        }
    });

    await fs.ensureDir(parentDir);

    const cliPath = path.resolve('dist/index.js');

    await execFileAsync(
        process.execPath,
        [
            cliPath,
            '--name',
            projectName,
            '--pm',
            'npm',
            '--no-tailwind',
            '--no-scss',
            '--no-svgr',
            '--husky',
        ],
        { cwd: parentDir }
    );

    const packageJson = await fs.readJson(
        path.join(projectPath, 'package.json')
    );

    assert.equal(packageJson.name, projectName);
    assert.ok(
        await fs.pathExists(
            path.join(projectPath, 'public/next.svg')
        )
    );
    assert.ok(
        await fs.pathExists(
            path.join(projectPath, 'public/vercel.svg')
        )
    );
    assert.ok(
        await fs.pathExists(
            path.join(projectPath, '.husky/pre-commit')
        )
    );
    assert.equal(
        packageJson.devDependencies?.husky,
        '^9'
    );
}, { timeout: 600_000 });
