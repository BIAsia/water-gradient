
varying vec3 vPos;
uniform vec3 uColor[3];
uniform float uLightness;
uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;


void main() {

//-------- basic gradient ------------
//   vec3 color1 = vec3(uC1r, uC1g, uC1b);
//   vec3 color2 = vec3(uC2r, uC2g, uC2b);
//   vec3 color3 = vec3(uC3r, uC3g, uC3b);
//   vec3 color1 = vec3(0.03, 0.53, 0.72);
//   vec3 color2 = vec3(0.03, 0.1, 0.8);
//   vec3 color3 = vec3(0.94, 0.59, 0.47);

    // color1 = uColor[0];
    // color2 = uColor[1];
    // color3 = uColor[2];


    float clearcoat = 1.0;
    float clearcoatRoughness = 0.5;

    // vec4 diffuseColor = vec4(
    //     mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),
    //     1);
    
    vec4 diffuseColor = vec4(
        mix(mix(uColor[0], uColor[1], smoothstep(-3.0, 3.0, vPos.x)), uColor[2], vPos.z),
        1);

    gl_FragColor = vec4(diffuseColor.rgb+uLightness, 1.);
  // gl_FragColor가 fragment shader를 통해 나타나는 최종값으로, diffuseColor에서
  // 정의한 그라디언트 색상 위에 반사나 빛을 계산한 값을 최종값으로 정의.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); 위처럼 최종값을 그라디언트 값 자체를 넣으면 환경
  // 영향없는 그라디언트만 표현됨.
}