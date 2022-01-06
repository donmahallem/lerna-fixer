/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { createCli } from './handle';

void createCli().parseAsync(process.argv);
