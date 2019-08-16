# Mesh Position Material for THREE.JS

Materials for a standard mesh to save rendered positions in a float texture, or pack view positions in RGBA.

TODO :
  - Write an exemple rendering world positions in a texture RenderTarget 
  - Also render View Positions in 3 RenderTargets
  - Write a special shader to read world positions from float texture, read View positions from RGBA packed textures, unproject to get world position and compare the values pixel per pixel (green pixel if the value is approximately the same). 
