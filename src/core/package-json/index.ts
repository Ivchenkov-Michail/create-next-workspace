import path from 'node:path';

import fs from 'fs-extra';

export async function readPackageJson(projectPath: string) {
    const packageJsonPath = path.join(
        projectPath,
        'package.json'
    );

    return fs.readJson(packageJsonPath);
}

export async function writePackageJson(
    projectPath: string,
    data: unknown
) {
    const packageJsonPath = path.join(
        projectPath,
        'package.json'
    );

    await fs.writeJson(packageJsonPath, data, {
        spaces: 2,
    });
}