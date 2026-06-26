import { execa } from 'execa';

export async function initGit(
    projectPath: string
) {
    await execa(
        'git',
        ['init'],
        {
            cwd: projectPath,
            stdio: 'ignore',
        }
    );
}