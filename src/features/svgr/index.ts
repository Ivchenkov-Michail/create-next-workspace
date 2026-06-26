import path from 'node:path';

import fs from 'fs-extra';

import { FeatureModule } from '../../types/feature';

import { copyTemplate } from '../../core/templates/copy-template';

import { addTsConfigInclude } from '../../core/tsconfig/add-include';

import { patchNextConfig } from '../../core/config/patch-next-config';

import { logger } from '../../core/logger';

const SVGR_TURBOPACK_PATCH = `  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              exportType: 'default',
              dimensions: false,
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },`;

export const svgrFeature: FeatureModule = {
    name: 'svgr',

    async apply({ projectPath, packageJsonBuilder }) {
        logger.info('Configuring SVGR...');

        packageJsonBuilder.addDevDependency(
            '@svgr/webpack'
        );

        await copyTemplate(
            'svgr/svgr.d.ts',
            path.join(projectPath, 'svgr.d.ts')
        );

        await addTsConfigInclude(
            projectPath,
            'svgr.d.ts'
        );

        await patchNextConfig(
            projectPath,
            SVGR_TURBOPACK_PATCH
        );

        await fs.ensureDir(
            path.join(projectPath, 'src/assets')
        );

        logger.success('SVGR configured');
    },
};
