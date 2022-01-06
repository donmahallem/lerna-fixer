/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { Command } from 'commander';
import { lockfileCommand } from './lockfile';

/**
 * Does create the root cli
 */
export function createCli(): Command {
    const cmd: Command = new Command('lerna-fixer');
    cmd.addCommand(lockfileCommand());
    return cmd;
}
