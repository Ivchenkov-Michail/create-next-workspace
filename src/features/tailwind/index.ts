import path from 'node:path';

import fs from 'fs-extra';

import { FeatureModule } from '../../types/feature';

import { copyTemplate } from '../../core/templates/copy-template';

import { replaceFileContent }
    from '../../core/files/replace-file-content';

export const tailwindFeature: FeatureModule = {
    name: 'tailwind',

    async apply({ projectPath, packageJsonBuilder }) {
        packageJsonBuilder.addDevDependency('tailwindcss');
        packageJsonBuilder.addDevDependency(
            '@tailwindcss/postcss'
        );

        await copyTemplate(
            'tailwind/postcss.config.mjs',
            path.join(projectPath, 'postcss.config.mjs')
        );

        const globalsPath = path.join(
            projectPath,
            'src/app/globals.css'
        );

        const globals = await fs.readFile(
            globalsPath,
            'utf-8'
        );

        if (!globals.includes('@import "tailwindcss"')) {
            await replaceFileContent(
                globalsPath,
                `@import "tailwindcss";\n\n${globals}`
            );
        }
    },
};
