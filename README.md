# three-js-mesh-position-material
Materials for a standard mesh to save rendered positions in a float texture.

TODO :
  - Write a ShaderMaterial using THREE.ShaderChunk to support all THREE features in vertex shader and export positions in fragment shader.
  - Write an exemple rendering positions in a texture RenderTarget.
     - Then use the rendered texture to pack view space X, Y and Z positions as RGBA values (ie 3 textures RenderTargets)
     - Read those RBGA textures in a shader and compare the values with the position RenderTarget. This should give a black texture : read it on CPU and check its blackness.
     - Read those RGBA on the CPU, unproject them and compare to raytraced values from the camera.
