var fs = require('fs-extra');
var rollup = require('rollup');
var commonjs = require('rollup-plugin-commonjs');    // require
var resolve = require('rollup-plugin-node-resolve'); // require from node_modules
var terser = require('rollup-plugin-terser').terser; // minify
var prettier = require('rollup-plugin-prettier');

// clean previous build
fs.removeSync('/dist/browser/three-js-mesh-position-materials.js')
fs.removeSync('/dist/browser/three-js-mesh-position-materials.min.js')

async function build(inputOptions, outputOptions) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

/*******************************************
 *  Debug build
 ******************************************/

build({
    input: 'src/exports.js',
    plugins:  [ commonjs(), resolve() ],
    external: [ 'three-full', 'three-js-rgba-packing' ],
}, {
    format: 'umd',
    name: 'THREEMeshPositionMaterials',
    file: './dist/browser/three-js-mesh-position-materials.js',
    globals: {
        'three-full' : 'THREE',
        'three-js-rgba-packing': 'THREERGBAPacking'
    }
});


/*******************************************
 *  Minified build
 ******************************************/

build({
    input: 'src/exports.js',
    plugins:  [
        commonjs(),
        resolve(),
        terser(),
        prettier({
          parser: 'babel',
          tabWidth: 0,
          singleQuote: false,
          bracketSpacing:false
        })
    ],
    external: [ 'three-full', 'three-js-rgba-packing' ],
}, {
    format: 'umd',
    name: 'THREEMeshPositionMaterials',
    file: './dist/browser/three-js-mesh-position-materials.min.js',
    globals: {
        'three-full' : 'THREE',
        'three-js-rgba-packing': 'THREERGBAPacking'
    }
});

