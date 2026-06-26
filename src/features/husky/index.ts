import path from 'node:path';

import { FeatureModule } from '../../types/feature';

import { logger } from '../../core/logger';

import { copyTemplate } from '../../core/templates/copy-template';

export const huskyFeature: FeatureModule = {
    name: 'husky',

    async apply({ projectPath, packageJsonBuilder }) {
        logger.info('Configuring Husky...');

        packageJsonBuilder.addDevDependency('husky@9');
        packageJsonBuilder.addDevDependency('lint-staged@15');

        packageJsonBuilder.addScript(
            'prepare',
            'husky'
        );

        await copyTemplate(
            'husky/.lintstagedrc.mjs',
            path.join(
                projectPath,
                '.lintstagedrc.mjs'
            )
        );

        logger.success('Husky configured');
    },

    async postInstall({ projectPath }) {
        await copyTemplate(
            'husky/pre-commit',
            path.join(
                projectPath,
                '.husky/pre-commit'
            )
        );
    },
};
