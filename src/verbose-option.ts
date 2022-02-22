/*
 * Package @donmahallem/lerna-fixer
 * Source https://github.com/donmahallem/lerna-fixer/
 */

import { InvalidArgumentError, Option } from 'commander';

/**
 * Creates default verbose option
 * Parses option 'verbose' als false by default
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
                    throw new InvalidArgumentError(`Invalid value '${val}' for option 'verbose'`);
            }
        });
}
