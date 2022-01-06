/*
 * Package @donmahallem/lerna-fixer
 * Source https://donmahallem.github.io/lerna-fixer/
 */

import { createCli } from "./handle";

createCli()
    .parseAsync(process.argv);
