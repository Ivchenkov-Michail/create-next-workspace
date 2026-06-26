export class PackageJsonBuilder {
    private scripts =
        new Map<string, string>();

    private devDependencies =
        new Set<string>();

    addScript(
        name: string,
        command: string
    ) {
        this.scripts.set(name, command);
    }

    addDevDependency(
        dependency: string
    ) {
        this.devDependencies.add(
            dependency
        );
    }

    getData() {
        return {
            scripts:
                Object.fromEntries(
                    this.scripts
                ),

            devDependencies: [
                ...this.devDependencies,
            ],
        };
    }
}