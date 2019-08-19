# Calculating depth in with OpenGL

## A quick recap on coordinate systems

The general approach in OpenGL for rendering a 3D space is to use a succession of 
coordinate systems as presented right here:

![Coordinate systems](./img/coordinate_systems.png?raw=true)

We have the following coordinate systems, or spaces:
- local space: the raw vertex positions of an object, generally directly passed as direct input to the object's 
  vertex shader.
- world space: the translations, rotations and scaling of the objects in the 3D world.
- view space: the rotation and translation of the world space to the camera point of view.
- clip space: the projection of the objects to the 3D render space. 
- screen space: the 2D space projected to the screen

Most of these transformations are usually handled by a vertex shader similar to the following code:
```glsl
void main() {
    vec4 worldSpacePosition = modelMatrix      * vec4(localSpacePosition, 1.0);
    vec4 viewSpacePosition  = viewMatrix       * worldSpacePosition;
    vec4 clipSpacePosition  = projectionMatrix * viewSpacePosition; 
    
    // The rest of the OpenGL pipeline will handle the viewport transformation from there
    gl_Position = clipSpacePosition; 
}
```

What will be interesting to us right here is the clip space. 
In the clip space, the 3D coordinates have values between **-1.0** to **1.0** for each component. 

However, it is important to note that in OpenGL, at the end of the vertex shader, what you pass is a 4D clip space 
position vector, ```gl_Position```. 
This is due to us having a 4D local position vector as an input to the timeline. The 4th component, named 'w' is 
used for integrating perspective to the position, allowing the program to apply transformations to that position 
and still keep a perspective space transformation on the vector.

You can go back to a 3D space by dividing the x, y and z components by the perspective value:
```glsl
vec3 clipSpacePosition_3D = clipSpacePosition_4D.xyz / clipSpacePosition_4D.w;
```
This is called **perspective division**

Generally, the perspective component should only be modified by the projection matrix.

## Depth

Depth is a measurement of a fragment for how far from the near projection plane it is in the clip space. 
The farther the distance, the higher the value. 
By convention, this value ranges from 0.0 (at the near plane) to 1.0 (at the far plane).

In OpenGL, its value is determined by normalizing the z component of the 3D clip space position of the fragment:
```glsl
float depth = clipSpacePosition_3D.z / 2.0 + 0.5;
```

In the fragment shader, this value is accessible with ```gl_FragPos```:
```glsl
float rawDepth = gl_FragPos.z;
```

This value can also be recovered by saving the z and w components in the vertex shader and passing them down to the 
fragment shader:
```glsl
// Vertex shader

out vec2 depthData;

void main() {
    gl_Position = projection * view * model * vec4(position, 1.0);
    depthData = gl_Position.zw;
}


// Fragement shader

in vec2 depthData;

void main() {
    float unnormalizedDepth = depthData.x / depthData.y;
    float depth = unnormalizedDepth / 2.0 + 0.5; 
    ...
}
```

**You should never pass the result of the perspective division directly to the fragment shader.**
This is due to the fact that the value will be linearly interpolated, and as such gives a wrong value.
You need to first linearly interpolate the z and w components and only then divide them to have a correct linear 
interpolation.


## Relationship between ```viewSpacePosition.z``` and depth

One thing that you might want to do once you have the depth value of a fragment is having the corresponding z 
component of its position in the view space.

If you're using orthographic projection, it's pretty easy. Orthographic projection uses linear projection, and can 
linearly be reversed:
```glsl
float viewZToOrthographicDepth(float viewZ, float near, float far) {
	return (viewZ + near) / (near - far);
}
float orthographicDepthToViewZ(float depth, float near, float far) {
	return depth * (near - far) - near;
}
```

As for perspective projection, we have an inverse projection:
```glsl
float viewZToPerspectiveDepth(float viewZ, float near, float far) {
    return ( far * (near + viewZ) ) / ( viewZ * (far - near) );
}
```
So to reverse that projection you need to do the following
```glsl
float perspectiveDepthToViewZ(float depth, float near, float far) {
    return (near * far) / ( depth * (far - near) - far );
}
```


## Credits

[LearnOpenGL.com - Coordinate systems](https://learnopengl.com/Getting-started/Coordinate-Systems)
[LearnOpenGL.com - Depth testing](https://learnopengl.com/Advanced-OpenGL/Depth-testing)
[Three js packing shader chunk](https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/packing.glsl.js)

And some experimenting