#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;


vec3 ambientLight(vec3 color, float intensity) {
	return color * intensity;
}

vec3 directionLight(vec3 direction, vec3 color, float intensity) {
	// surface vector
   vec3 vNormal = vec3(0, 1, 0);
   vec3 normal = normalize(vNormal);

   // light direction vector
   vec3 dir = normalize(direction);


   // angle and diffuse vector
   float angle = dot(normal, dir);
   float diff = max(angle, 0.0);

   return color * intensity * diff;
}


void main(void) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 base = vec3(0.65);

		float x = cos(time) * 0.3;
		float y = sin(time) * 0.3;


   vec3 direction = vec3(-0.2, y, 0);
   vec3 lightColor = vec3(0.8, 0.65, 0.5);
   vec3 light = directionLight(direction, lightColor, 1.);

		vec3 ambientColor = vec3(1);
   vec3 ambient = ambientLight(ambientColor, 0.2);



   vec3 res = (ambient + light) * base;






   gl_FragColor = vec4(res, 1);

}
