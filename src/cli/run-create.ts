import path from 'node:path';

import fs from 'fs-extra';

import * as p from '@clack/prompts';

import { applyPackageJson }
    from '../core/package-json/apply-package-json';
import { PackageJsonBuilder }
    from '../core/package-json/package-json-builder';
import { scaffoldBaseProject }
    from '../core/scaffold-base-project';
import { resolveFeatures }
    from '../core/resolve-features';
import { installProjectDependencies }
    from '../core/install-project-dependencies';
import { initGit } from '../core/git/init-git';
import { ProjectConfig } from '../types/project';

export async function runCreate(
    config: ProjectConfig
): Promise<void> {
    const projectPath = path.resolve(
        config.projectName
    );

    let createdProjectPath: string | null = null;

    const isInteractive = process.stdout.isTTY;
    const spinner = isInteractive
        ? p.spinner()
        : null;

    const startStep = (message: string) => {
        spinner?.start(message);
    };

    const stopStep = (message: string) => {
        spinner?.stop(message);
    };

    try {
        startStep(
            'Scaffolding Next.js application...'
        );

        await scaffoldBaseProject(
            projectPath,
            config.projectName
        );

        createdProjectPath = projectPath;

        stopStep('Application scaffolded');

        startStep('Initializing git repository...');

        await initGit(projectPath);

        stopStep('Git initialized');

        const features = resolveFeatures(config);

        const packageJsonBuilder =
            new PackageJsonBuilder();

        startStep('Applying features...');

        for (const feature of features) {
            await feature.apply({
                config,
                projectPath,
                packageJsonBuilder,
            });
        }

        await applyPackageJson(
            projectPath,
            packageJsonBuilder
        );

        stopStep('Features applied');

        startStep('Installing dependencies...');

        await installProjectDependencies(
            projectPath,
            config.packageManager
        );

        stopStep('Dependencies installed');

        startStep('Finalizing setup...');

        for (const feature of features) {
            if (feature.postInstall) {
                await feature.postInstall({
                    config,
                    projectPath,
                    packageJsonBuilder,
                });
            }
        }

        stopStep('Setup complete');
    } catch (error) {
        stopStep('Something went wrong');

        if (createdProjectPath) {
            await fs.remove(createdProjectPath);

            if (isInteractive) {
                p.log.warn(
                    `Removed incomplete project at ${createdProjectPath}`
                );
            }
        }

        throw error;
    }
}
