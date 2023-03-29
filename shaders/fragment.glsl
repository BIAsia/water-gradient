varying vec3 vPosition;
varying vec2 vUV;
varying vec3 vNormal;

uniform float uProgress;

void main() {
    vec3 rgb = vec3(0., 1., uProgress);
    gl_FragColor = vec4(rgb, 1.);

}

