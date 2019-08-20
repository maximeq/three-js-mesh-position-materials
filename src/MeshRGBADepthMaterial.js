var THREE = require("three-full");

/**
 * @author Maxime Quiblier / http://github.com/maximeq
 * Material packing depth as rgba values.
 * It is basically just MeshDepthMaterial with depthPacking at THREE.RGBADepthPacking
 */
function MeshRGBADepthMaterial( parameters ) {
    parameters = parameters || {};
    parameters.depthPacking = THREE.RGBADepthPacking;

	THREE.MeshDepthMaterial.call( this, parameters);

};

MeshRGBADepthMaterial.prototype = Object.create( THREE.MeshDepthMaterial.prototype );
MeshRGBADepthMaterial.prototype.constructor = MeshRGBADepthMaterial;

THREE.MeshRGBADepthMaterial = MeshRGBADepthMaterial;

module.exports = MeshRGBADepthMaterial;
