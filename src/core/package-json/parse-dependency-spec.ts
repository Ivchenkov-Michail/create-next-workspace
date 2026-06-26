export function parseDependencySpec(
    spec: string
): { name: string; version: string } {
    const atIndex = spec.lastIndexOf('@');

    if (atIndex <= 0) {
        return { name: spec, version: 'latest' };
    }

    const name = spec.slice(0, atIndex);
    const version = spec.slice(atIndex + 1);

    return {
        name,
        version: version ? `^${version}` : 'latest',
    };
}
