// import of our plugins
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: './src/export.js',
    output: {
        file: './dist/browser/three-js-mesh-position-material.js',
        format: 'cjs'
    },
    external: ['three-full', 'three-js-rgba-packing'],
    plugins: [
        commonjs(), // require
        resolve(), // modules from node_modules
    ]
};
