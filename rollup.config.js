import defaultRollup from '@donmahallem/rollup-config';
import pkg from './package.json';
import magicstring from 'magic-string';

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
d.plugins.push({
    name: 'addShebang',
    renderChunk(code, { fileName }, { dir, file, sourcemap }) {
        const shebang = '#!/usr/bin/env node\n\n';
        if (!fileName.endsWith('cli.mjs')) {
            return;
        }
        const parsed = new magicstring(code);
        parsed.prepend(shebang);
        return {
            code: parsed.toString(),
            map: parsed.generateMap(),
        };
    }
})
export default d;
