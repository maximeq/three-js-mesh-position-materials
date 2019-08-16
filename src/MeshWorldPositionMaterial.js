var THREE = require("three-full");

/**
 * @author Maxime Quiblier / http://github.com/maximeq
 *
 */
function MeshWorldPositionMaterial( parameters ) {
    parameters = parameters || {};

    parameters.uniforms = THREE.UniformsUtils.merge([
      THREE.ShaderLib.displacementmap
    ]);
    parameters.vertexShader = [

        "#include <common>",
        "#include <displacementmap_pars_vertex>",
        "#include <fog_pars_vertex>",
        "#include <morphtarget_pars_vertex>",
        "#include <skinning_pars_vertex>",
        "#include <shadowmap_pars_vertex>",
        "#include <logdepthbuf_pars_vertex>",
        "#include <clipping_planes_pars_vertex>",

        "varying vec3 vWorldPosition;",

        "void main() {",

            "#include <skinbase_vertex>",

            "#include <begin_vertex>",
            "#include <morphtarget_vertex>",
            "#include <skinning_vertex>",
            "#include <displacementmap_vertex>",
            "#include <project_vertex>",
            "#include <logdepthbuf_vertex>",
            "#include <clipping_planes_vertex>",

            "vec4 vWorldPosition = modelMatrix * vec4( transformed, 1.0 );",

        "}"
    ].join("\n");

    parameters.fragmentShader = [
        "varying vec3 vWorldPosition;",
        "void main() {",
            "gl_FragColor = vWorldPosition;",
        "}",
    ].join("\n");

	this.displacementMap = null;
	this.displacementScale = 1;
	this.displacementBias = 0;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.fog = false;
	this.lights = false;

	this.skinning = false;
	this.morphTargets = false;

	THREE.ShaderMaterial.call( this, parameters);

};

MeshWorldPositionMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );
MeshWorldPositionMaterial.prototype.constructor = MeshWorldPositionMaterial;

THREE.MeshWorldPositionMaterial = MeshWorldPositionMaterial;

module.exports = MeshWorldPositionMaterial;
