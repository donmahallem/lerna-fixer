import defaultRollup from '@donmahallem/rollup-config';
import shebang from '@donmahallem/rollup-plugin-shebang';
import pkg from './package.json';

const d = defaultRollup(pkg, {
    output: {
        cjs: false,
    },
    tsconfig: './tsconfig.app.json'
});

d.input = {
    'cli': './src/cli.ts',
    'index': './src/index.ts'
}
d.output[0].file = undefined;
d.output[0].dir = './dist'
d.output[0].entryFileNames = '[name].mjs'
d.output[0].chunkFileNames = '[name]-[hash].mjs'
d.plugins.push(shebang())
export default d;
