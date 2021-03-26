import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    output: {
        name: 'VueRealLazy',
        format: 'umd',
        file: 'dist/vue-real-lazy.min.js'
    },
    plugins: [
        vue(),
        resolve(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        terser(),
    ]
}