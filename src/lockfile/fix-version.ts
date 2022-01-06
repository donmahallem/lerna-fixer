import { Command } from "commander";
import { createVerboseOption } from "../verbose-option";
import { fixVersionCommand } from "./fix-version-action";


export function fixVersion(): Command {
    const cmd: Command = new Command('fixversion');
    cmd.argument('[path]', 'Path to the lerna root. Defaults to cwd', process.cwd())
        .usage('[path to lerna root folder]')
        .description('Fixes version entries in lockfile v2')
        .addOption(createVerboseOption())
        .action(fixVersionCommand);
    return cmd;
}
