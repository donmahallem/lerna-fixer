#!/usr/bin/env node

/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { createCli } from './dist/handle';

void createCli().parseAsync(process.argv);
