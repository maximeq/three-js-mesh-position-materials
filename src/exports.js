
var THREE = require("three-full");
const MeshWorldPositionMaterial = require("./MeshWorldPositionMaterial");
const MeshViewPositionMaterial = require("./MeshViewPositionMaterial");

THREE.MeshPositionMaterials = {
    MeshWorldPositionMaterial: MeshWorldPositionMaterial,
    MeshViewPositionMaterial: MeshViewPositionMaterial
};

module.exports = MeshViewPositionMaterial;
