varying vec3 vPosition;
varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vColor;

uniform float uProgress;

void main() {
    vec3 rgb = vec3(vUV.x, vUV.y, uProgress);
    gl_FragColor = vec4(vColor, 1.);

}

