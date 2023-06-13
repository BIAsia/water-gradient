import * as THREE from 'three';
import { Pane } from 'tweakpane';
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// let OrbitControls = require("three/examples/jsm/controls/OrbitControls").OrbitControls

export default class Sketch {
    constructor() {
        this.container = document.getElementById('container');
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xefefef, 1)
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );

        // this.isometricFill();
        this.camera.position.z = 2;

        this.scene = new THREE.Scene();
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.time = 0;
        this.mouse = 0;

        this.addMesh();
        this.settings();
        // this.mouseEvent();
        this.resize();
        // this.addPost();
        this.render();
        this.setupResize();

    }
    isometricFill() {
        var frustumSize = 1;
        var aspect = this.width / this.height;
        this.camera = new THREE.OrthographicCamera(
            frustumSize / -2,
            frustumSize / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000
        );
    }

    settings() {
        this.pane = new Pane();
        // this.PARAMS = {
        //     progress: 0,
        // };
        // this.pane.addInput(
        //     this.PARAMS, 'progress',
        //     { min: 0, max: 1 }
        // ).on('change', (ev) => {
        //     this.material.uniforms.uProgress.value = ev.value;
        // })

        this.PARAMS_COLOR = {
            colorA: "#0888B8",
            colorB: "#0870A8",
            colorC: "#f09878",
        };
        const colorFolder = this.pane.addFolder({
            title: 'Color',
            expanded: true,
        });
        colorFolder.addInput(this.PARAMS_COLOR, 'colorA')
        colorFolder.addInput(this.PARAMS_COLOR, 'colorB')
        colorFolder.addInput(this.PARAMS_COLOR, 'colorC')

        this.PARAMS = {
            lightness: 0.1,
        }
        colorFolder.addInput(this.PARAMS, 'lightness', {min: -1, max: 1, step: 0.01})

    }

    mouseEvent() {
        document.addEventListener('mousemove', (e) => {
            // mousemove
        })
    }

    addPost() {

    }

    addMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(10, 10, 192, 192);

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,

            uniforms: {
                uMouse: { value: 0 },
                uResolution: { value: new THREE.Vector2() },
                uProgress: { value: 0 },
                uImg: { value: this.texture },
                uTime: { value: 0 },
                uSpeed: { value: 0.01 },
                uNoiseDensity: { value: 1.2 },
                uNoiseStrength: { value: 1.4 },
                diffuse: { value: 0.5 },
                emissive: { value: 0 },
                roughness: { value: 0 },
                metalness: { value: 0 },
                opacity: { value: 1 },
                // uC1r: { value: rgbColors.uC1r },
                // uC1g: { value: rgbColors.uC1g },
                // uC1b: { value: rgbColors.uC1b },
                // uC2r: { value: rgbColors.uC2r },
                // uC2g: { value: rgbColors.uC2g },
                // uC2b: { value: rgbColors.uC2b },
                // uC3r: { value: rgbColors.uC3r },
                // uC3g: { value: rgbColors.uC3g },
                // uC3b: { value: rgbColors.uC3b },
                uColor: {value: [ "#0888B8", "#0870A8", "#f09878"].map((color) => new THREE.Color(color))},
                uLightness: {value: 0.12},

                // uSize: {value: 6.0},
                // uScale: {value: 0}
            },
            // side: THREE.DoubleSide,
            // transparent: true,
            // wireframe: true,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);

        this.material.uniforms.uResolution.value.x = this.width;
        this.material.uniforms.uResolution.value.y = this.height;
    }

    render() {
        this.time++;
        // console.log(rgbColors)
        // this.scene.rotation.x = this.time / 2000;
        // this.scene.rotation.y = this.time / 1000;
        this.material.uniforms.uTime.value = this.time;
        this.palette = Object.values(this.PARAMS_COLOR).map((color) => new THREE.Color(color))
        this.material.uniforms.uColor.value = this.palette;
        this.material.uniforms.uLightness.value = this.PARAMS.lightness;

        this.control.update();
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch();