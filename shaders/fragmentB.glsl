varying vec3 vPosition;
varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vColor;

uniform float uProgress;

void main() {
    vec3 rgb = vec3(vUV.x, vUV.y, uProgress);
    
    vColor = uColor[0];
    for(int i = 0; i < 10; i++){

        float noiseFlow = uNoiseFlow + float(i)*uNoiseFlowRatio; // move speed
        float noiseSpeed = uNoiseSpeed + float(i)*uNoiseSpeedRatio; // flesh speed

        float noiseSeed = uNoiseSeed + float(i)*uNoiseSeedRatio;
        vec2 noiseFreq = vec2(uNoiseFreq.x, uNoiseFreq.y)*0.5; 

        float noiseFloor = uNoiseFloor;
        float noiseCeil = uNoiseCeil + float(i)*uNoiseCeilRatio;

        float noise = smoothstep(noiseFloor, noiseCeil, snoise(vec3(
        noiseCoord.x*noiseFreq.x + uTime*noiseFlow,
        noiseCoord.y*noiseFreq.y,
        uTime*noiseSpeed + noiseSeed
        )));

        vColor = mix(vColor, uColor[i], noise);
    }

    gl_FragColor = vec4(vColor, 1.);

}

