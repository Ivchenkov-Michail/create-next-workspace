import { Command } from 'commander';

import * as p from '@clack/prompts';

import { initPrompts } from './cli/prompts/init';
import { runCreate } from './cli/run-create';
import { ProjectConfig } from './types/project';
import { PackageManager } from './types/package-manager';

const PACKAGE_VERSION = '1.0.0';

export interface CliOptions {
    name?: string;
    pm?: PackageManager;
    tailwind?: boolean;
    scss?: boolean;
    husky?: boolean;
    svgr?: boolean;
}

export async function resolveConfig(
    options: CliOptions
): Promise<ProjectConfig> {
    return initPrompts({
        projectName: options.name,
        packageManager: options.pm,
        tailwind: options.tailwind,
        scss: options.scss,
        husky: options.husky,
        svgr: options.svgr,
    });
}

async function main(options: CliOptions) {
    console.clear();
    p.intro('create-next-workspace');

    const config = await resolveConfig(options);

    await runCreate(config);

    p.outro('Workspace ready');
}

const program = new Command();

program
    .name('create-next-workspace')
    .description(
        'CLI for bootstrapping Next.js workspaces'
    )
    .version(PACKAGE_VERSION)
    .option('--name <name>', 'Project name')
    .option(
        '--pm <manager>',
        'Package manager (npm, pnpm, yarn, bun)'
    )
    .option('--tailwind', 'Enable Tailwind CSS')
    .option('--no-tailwind', 'Disable Tailwind CSS')
    .option('--scss', 'Enable SCSS modules')
    .option('--no-scss', 'Disable SCSS modules')
    .option('--husky', 'Enable Husky + lint-staged')
    .option('--no-husky', 'Disable Husky + lint-staged')
    .option('--svgr', 'Enable SVGR')
    .option('--no-svgr', 'Disable SVGR')
    .action(async (options) => {
        try {
            await main({
                name: options.name,
                pm: options.pm,
                tailwind: options.tailwind,
                scss: options.scss,
                husky: options.husky,
                svgr: options.svgr,
            });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });

if (require.main === module) {
    program.parse();
}
