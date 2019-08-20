(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three-js-rgba-packing'), require('three-full')) :
    typeof define === 'function' && define.amd ? define(['three-js-rgba-packing', 'three-full'], factory) :
    (global.THREEMeshPositionMaterial = factory(global.THREERGBAPacking,global.THREE));
}(this, (function (threeJsRgbaPacking,threeFull) { 'use strict';

    threeJsRgbaPacking = threeJsRgbaPacking && threeJsRgbaPacking.hasOwnProperty('default') ? threeJsRgbaPacking['default'] : threeJsRgbaPacking;
    threeFull = threeFull && threeFull.hasOwnProperty('default') ? threeFull['default'] : threeFull;

    /**
     * @author Maxime Quiblier / http://github.com/maximeq
     *
     */
    function MeshWorldPositionMaterial( parameters ) {
        parameters = parameters || {};

        parameters.uniforms = threeFull.UniformsUtils.merge([
          threeFull.ShaderLib.displacementmap
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

    	threeFull.ShaderMaterial.call( this, parameters);

    }
    MeshWorldPositionMaterial.prototype = Object.create( threeFull.ShaderMaterial.prototype );
    MeshWorldPositionMaterial.prototype.constructor = MeshWorldPositionMaterial;

    threeFull.MeshWorldPositionMaterial = MeshWorldPositionMaterial;

    var MeshWorldPositionMaterial_1 = MeshWorldPositionMaterial;

    /**
     * @author Maxime Quiblier / http://github.com/maximeq
     *
     * @param {boolean} useFloatTexture If true, we consider floatTexture extension is activated and available.
     *                                  The resulting coordinates will be stored in RGB components.
     *                                  If false (default), the coordinate to store must be defined by parameters.coordinate
     *                                  and will be packed in RGBA.
     * @param {string} coordinate x, y or z to choose which coordinate will be packed in RGBA. Values will be mapped from -1:1 to 0:0.5 since
     *                            RGBAPacking package does only provide methods to store in [0,1[ To recover the view coordinate, you need to do
     *                            x = 4*RGBAPacking.decodeUnitFloat32(rgba) - 1;
     */
    function MeshViewPositionMaterial( parameters ) {
        parameters = parameters || {};

        parameters.uniforms = threeFull.UniformsUtils.merge([
          threeFull.ShaderLib.displacementmap
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

            "varying vec3 vViewPosition;",

            "void main() {",

                "#include <skinbase_vertex>",

                "#include <begin_vertex>",
                "#include <morphtarget_vertex>",
                "#include <skinning_vertex>",
                "#include <displacementmap_vertex>",
                "#include <project_vertex>",
                "#include <logdepthbuf_vertex>",
                "#include <clipping_planes_vertex>",

                "vViewPosition = gl_Position",

            "}"
        ].join("\n");

        parameters.fragmentShader = [
            "varying vec3 vViewPosition;",
            parameters.useFloatTexture ?
                "" : threeJsRgbaPacking.glslEncodeUnitFloat32 ,
            "void main() {",
                parameters.useFloatTexture ?
                    "gl_FragColor = vViewPosition;" : "gl_FragColor = encodeUnitFloat32((vViewPosition." + parameters.coordinate + " + 1.0) / 4.0);",
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

    	threeFull.ShaderMaterial.call( this, parameters);

    }
    MeshViewPositionMaterial.prototype = Object.create( threeFull.ShaderMaterial.prototype );
    MeshViewPositionMaterial.prototype.constructor = MeshViewPositionMaterial;

    threeFull.MeshViewPositionMaterial = MeshViewPositionMaterial;

    var MeshViewPositionMaterial_1 = MeshViewPositionMaterial;

    /**
     * @author Maxime Quiblier / http://github.com/maximeq
     * Material packing depth as rgba values.
     * It is basically just MeshDepthMaterial with depthPacking at THREE.RGBADepthPacking
     */
    function MeshRGBADepthMaterial( parameters ) {
        parameters = parameters || {};
        parameters.depthPacking = threeFull.RGBADepthPacking;

    	threeFull.MeshDepthMaterial.call( this, parameters);

    }
    MeshRGBADepthMaterial.prototype = Object.create( threeFull.MeshDepthMaterial.prototype );
    MeshRGBADepthMaterial.prototype.constructor = MeshRGBADepthMaterial;

    threeFull.MeshRGBADepthMaterial = MeshRGBADepthMaterial;

    var MeshRGBADepthMaterial_1 = MeshRGBADepthMaterial;

    threeFull.MeshPositionMaterials = {
        MeshWorldPositionMaterial: MeshWorldPositionMaterial_1,
        MeshViewPositionMaterial: MeshViewPositionMaterial_1,
        MeshRGBADepthMaterial: MeshRGBADepthMaterial_1
    };

    var exports$1 = MeshViewPositionMaterial_1;

    return exports$1;

})));
