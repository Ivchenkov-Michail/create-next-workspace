import path from 'node:path';

import fs from 'fs-extra';

import { FeatureModule } from '../../types/feature';

import { copyTemplate } from '../../core/templates/copy-template';

export const scssFeature: FeatureModule = {
    name: 'scss',

    async apply({ projectPath, packageJsonBuilder }) {
        packageJsonBuilder.addDevDependency('sass');

        await fs.ensureDir(
            path.join(projectPath, 'src/styles')
        );

        await copyTemplate(
            'scss/example.module.scss',
            path.join(
                projectPath,
                'src/styles/example.module.scss'
            )
        );
    },
};