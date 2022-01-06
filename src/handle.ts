/*
 * Package @donmahallem/lerna-fixer
 * Source https://donmahallem.github.io/lerna-fixer/
 */

import { Command } from 'commander';
import { lockfileCommand } from './lockfile';

/**
 *
 */
export function createCli(): Command {
    const cmd: Command = new Command('lerna-fixer');
    cmd.addCommand(lockfileCommand());
    return cmd;
}
