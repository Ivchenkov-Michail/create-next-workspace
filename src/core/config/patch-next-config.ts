import path from "path";
import fs from "fs-extra"

export async function patchNextConfig(
    projectPath: string,
    patch: string
) {
    const configPath = path.join(
        projectPath,
        'next.config.ts'
    );

    const content = await fs.readFile(
        configPath,
        'utf-8'
    );

    if (content.includes('@svgr/webpack')) {
        return;
    }

    const updated = content.replace(
        /const\s+nextConfig.*=\s+{/,
        (match) => `${match}\n${patch}`
    );

    await fs.writeFile(configPath, updated);
}