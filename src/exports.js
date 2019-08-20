
var THREE = require("three-full");
const MeshWorldPositionMaterial = require("./MeshWorldPositionMaterial");
const MeshViewPositionMaterial = require("./MeshViewPositionMaterial");
const MeshRGBADepthMaterial = require("./MeshRGBADepthMaterial");

THREE.MeshPositionMaterials = {
    MeshWorldPositionMaterial: MeshWorldPositionMaterial,
    MeshViewPositionMaterial: MeshViewPositionMaterial,
    MeshRGBADepthMaterial: MeshRGBADepthMaterial
};

module.exports = MeshViewPositionMaterial;
