import * as THREE from 'three';
import {Pane} from 'tweakpane';
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// let OrbitControls = require("three/examples/jsm/controls/OrbitControls").OrbitControls

let paletteLight = [ "#e9ecef", "#dee2e6", "#f8f9fa","#ced4da", "#adb5bd"]
let paletteDark = ['#343a40', '#495057', '#212529','#6c757d', '#1a1a1a',]

paletteLight = paletteLight.map((color) => new THREE.Color(color))
paletteDark = paletteDark.map((color) => new THREE.Color(color))

let palette = paletteLight

// let palette = [0xf8f9fa, 0xe9ecef, 0xdee2e6, 0xced4da, 0xadb5bd]

export default class Sketch{
    constructor(){
        this.container = document.getElementById('container');
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize( this.width, this.height );
        this.renderer.setClearColor(0x111111,1)
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera(
            70, 
            window.innerWidth / window.innerHeight, 
            0.001, 
            1000
        );

        // this.isometricFill();
        this.camera.position.y = -0.0002;
        this.camera.position.z = 0.1;

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
    isometricFill(){
        var frustumSize = 1;
        var aspect = this.width/this.height;
        this.camera = new THREE.OrthographicCamera(
            frustumSize / -2,
            frustumSize / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000 
        );
    }

    settings(){
        this.pane = new Pane();
        this.PARAMS = {
            progress: 0,
            dark: false,
        };
        // this.pane.addInput(
        //     this.PARAMS, 'progress',
        //     {min: 0, max: 1}
        // ).on('change', (ev)=>{
        //     this.material.uniforms.uProgress.value = ev.value;
        // })
        this.pane.addInput(
            this.PARAMS, 'dark',
        ).on('change', (ev)=>{
            console.log('change to Dark')
            if (this.PARAMS.dark) this.material.uniforms.uColor.value = paletteDark;
            else this.material.uniforms.uColor.value = paletteLight;
        })
    }

    mouseEvent(){
        document.addEventListener('mousemove', (e)=>{
            // mousemove
        })
    }

    addPost(){

    }

    addMesh(){
        this.geometry = new THREE.PlaneGeometry(2,2, 1000, 1000);

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            
            uniforms: {
                uMouse: {value: 0},
                uResolution: {value: new THREE.Vector2()},
                uProgress: {value: 0},
                uImg: {value: this.texture},
                uTime: {value: 0},
                uColor: {value: palette}
                // uSize: {value: 6.0},
                // uScale: {value: 0}
            },
            // side: THREE.DoubleSide,
            // transparent: true,
            // wireframe: true,
        })
        
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    setupResize(){
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);

        this.material.uniforms.uResolution.value.x = this.width;
        this.material.uniforms.uResolution.value.y = this.height;
    }

    render(){
        this.time++;
        
        // this.scene.rotation.x = this.time / 2000;
	    // this.scene.rotation.y = this.time / 1000;
        this.material.uniforms.uTime.value = this.time*0.001;
        this.control.update();
        this.renderer.render( this.scene, this.camera );
        
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch();