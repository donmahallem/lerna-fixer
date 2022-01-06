/*
 * Package @donmahallem/lerna-fixer
 * Source https://donmahallem.github.io/lerna-fixer/
 */

import { createCli } from './handle';

void createCli().parseAsync(process.argv);
