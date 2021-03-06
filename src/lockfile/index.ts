/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { Command } from 'commander';
import { fixVersion } from './fix-version';

/**
 *
 */
export function lockfileCommand(): Command {
    const cmd: Command = new Command('lockfile');
    cmd.addCommand(fixVersion()).usage('<command>');
    return cmd;
}
