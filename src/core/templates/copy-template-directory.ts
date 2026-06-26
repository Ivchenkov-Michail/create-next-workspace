import path from 'node:path';

import fs from 'fs-extra';

import { getTemplatesRoot }
    from './get-templates-root';

export async function copyTemplateDirectory(
    templatePath: string,
    destinationPath: string
) {
    const sourcePath = path.join(
        getTemplatesRoot(),
        templatePath
    );

    await fs.copy(
        sourcePath,
        destinationPath
    );
}