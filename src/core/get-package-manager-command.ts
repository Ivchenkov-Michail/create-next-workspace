import os from 'node:os';

export function getNpmCommand() {
    return os.platform() === 'win32'
        ? 'npm.cmd'
        : 'npm';
}

export function getNpxCommand() {
    return os.platform() === 'win32'
        ? 'npx.cmd'
        : 'npx';
}