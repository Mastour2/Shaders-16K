#version 300 es

layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aScale;

void main() {
    float scale = 1.0;
    float size = 5.0;

    gl_Position = vec4(aPosition * scale, 0, 1.0);
    gl_PointSize = size;
}