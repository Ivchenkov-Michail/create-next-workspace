import path from 'node:path';

import fs from 'fs-extra';

import { copyTemplateDirectory }
    from './templates/copy-template-directory';
import { renameSpecialFiles } from './templates/rename-special-files';

export function normalizeProjectName(
    name: string
): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_./@+~]/g, '');
}

async function applyProjectName(
    projectPath: string,
    projectName: string
) {
    const packageJsonPath = path.join(
        projectPath,
        'package.json'
    );

    const packageJson = await fs.readJson(
        packageJsonPath
    );

    packageJson.name = normalizeProjectName(
        projectName
    );

    await fs.writeJson(
        packageJsonPath,
        packageJson,
        { spaces: 2 }
    );
}

export async function scaffoldBaseProject(
    projectPath: string,
    projectName: string
) {
    await fs.ensureDir(projectPath);

    await copyTemplateDirectory(
        'base',
        projectPath
    );

    await renameSpecialFiles(projectPath);

    await applyProjectName(
        projectPath,
        projectName
    );
}
