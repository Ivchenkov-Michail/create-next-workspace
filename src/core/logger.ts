import pc from 'picocolors';

export const logger = {
    info(message: string) {
        console.log(pc.cyan(message));
    },

    success(message: string) {
        console.log(pc.green(message));
    },

    error(message: string) {
        console.log(pc.red(message));
    },
};