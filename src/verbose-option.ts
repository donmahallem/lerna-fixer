/*
 * Package @donmahallem/lerna-fixer
 * Source https://donmahallem.github.io/lerna-fixer/
 */

import { InvalidOptionArgumentError, Option } from 'commander';

/**
 *
 */
export function createVerboseOption(): Option {
    return new Option('-v, --verbose', 'If the output should be verbose')
        .default(false, 'verbose output is disabled')
        .argParser<boolean>((val: string, prev: boolean): boolean => {
            console.log('asdf', val, prev);
            switch (val?.toLocaleLowerCase()) {
                case '1':
                case 'true':
                case 'y':
                case 'yes':
                case '':
                case undefined:
                    return true;
                case 'false':
                case 'n':
                case 'no':
                case '0':
                    return false;
                default:
                    throw new InvalidOptionArgumentError(`Invalid `);
            }
        });
}
