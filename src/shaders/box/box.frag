#version 300 es
precision highp float;

vec3 backgroundColor = vec3(0);
vec2 coord = vec2(0);
vec3 rectColor = vec3(1.);


uniform vec2 u_resolution;
uniform float u_time;
out vec4 outColor;

struct Rect {
    float anchor;
    vec2 position;
    vec2 edge;
    vec3 color;
};

vec2 setup_resolution() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    st.x *= u_resolution.x / u_resolution.y;
    return st;
}

Rect newRect(float x, float y, float w, float h, vec3 color) {
    Rect r;
    r.position= vec2(x, y);
    r.anchor = 0.5;
    r.edge = vec2(w, h);
    r.color = color;
    return r;
}

void drawRect(float x, float y, float w, float h, vec3 color) {
    Rect rect = newRect(x, y, w, h, color);

    float offsetScaleResolution = u_resolution.x / u_resolution.y;

    // edges
    float lt = rect.position.x - rect.edge.x * rect.anchor;
    float rt = rect.position.x + rect.edge.x * rect.anchor;

    float lb = rect.position.y - rect.edge.y * rect.anchor;
    float rb = rect.position.y + rect.edge.y * rect.anchor;


    if(coord.x > lt && coord.x < rt && coord.y > lb &&  coord.y  < rb) {
        backgroundColor += rect.color;
    } 
}


void main() {
   coord = setup_resolution();

   float x = .74 + 0.3 * cos(u_time * 2.5);
   float y = 0.5 + 0.3 * sin(u_time * 2.5);

   drawRect(x, y, .2, .2, rectColor);
   
   
   outColor = vec4(backgroundColor, 1);
}