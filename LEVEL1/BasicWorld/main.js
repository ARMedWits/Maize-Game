import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 5000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(850, 500, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    this._scene.background = texture;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

          // MAZE DESIGN
          // ONE AS IN LIKE 1


          var BoxGeo =[1000, 200, 10,10, 200, 400,10, 200, 500,10, 200, 400,10, 200, 500,1000, 200, 10,10, 200, 200,10, 200, 300,200, 200, 10,10, 200, 400,300, 200, 10,10, 200, 200,10, 200, 200,300, 200, 10,150, 200, 10,10, 200, 300,250, 200, 10,10, 200, 100,150, 200, 10,600, 200, 10,10, 200, 200,10, 200, 100,150, 200, 10,10, 200, 400,150, 200, 10];
          var BoxPos = [0, 100, 500,-500, 100, 300,-500, 100, -250,500, 100, 300,500, 100, -250,0, 100, -500,20, 100, -400,-100, 100, 350,0, 100, 350,200, 100, 300,50, 100, 100,20, 100, 100,-250, 100, 300,-250, 100, 200,430, 100, 100,350, 100, 150,-380, 100, 100,-260, 100, 50,-330, 100, 0,200, 100, -100,180, 100, -100,-100, 100, -50,-330, 100, -100,-260, 100, -300,-180, 100, -300];
            var i;
          for(i = 0;i <= BoxGeo.length; i = i + 3 ){

            const Wall = new THREE.Mesh(
              new THREE.BoxGeometry(BoxGeo[i], BoxGeo[i+1], BoxGeo[i+2]),
              new THREE.MeshStandardMaterial({
                  color: 0xFF0000,
              }));
            Wall.position.set(BoxPos[i],BoxPos[i+1],BoxPos[i+2]);
            Wall.castShadow = true;
            Wall.receiveShadow = true;
            this._scene.add(Wall);

          }

          const dONE = new THREE.Mesh(
            new THREE.BoxGeometry(10,50,100),
            new THREE.MeshStandardMaterial({
                color: 0x008000,
            }));
          dONE.position.set(-500,25,50);
          dONE.castShadow = true;
          dONE.receiveShadow = true;
          this._scene.add(dONE);


          var geometry =  new THREE.BoxGeometry(10,50,100);
          var cubeMaterials=[
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./resources/imag.jpg'), side: THREE.DoubleSide}),

          ];
          var materials = new THREE.MeshFaceMaterial(cubeMaterials);
          var cubes = new THREE.Mesh(geometry,materials);
          cubes.position.set(-500,25,50);
          this._scene.add(cubes);







    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});
