import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

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
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(1000, 200, 10),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    leftWall.position.set(0, 100, 500);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    this._scene.add(leftWall);

     // TWO AS IN LIKE 2
     const Wall2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 400),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    Wall2.position.set(-500, 100, 300);
    Wall2.castShadow = true;
    Wall2.receiveShadow = true;
    this._scene.add(Wall2);

     // THREE AS IN LIKE 3
     const Wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 500),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    Wall3.position.set(-500, 100, -250);
    Wall3.castShadow = true;
    Wall3.receiveShadow = true;
    this._scene.add(Wall3);

    // FOUR AS IN LIKE 4
    const Wall4 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 400),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    Wall4.position.set(500, 100, 300);
    Wall4.castShadow = true;
    Wall4.receiveShadow = true;
    this._scene.add(Wall4);

     // FIVE AS IN LIKE 5
     const Wall5 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 500),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    Wall5.position.set(500, 100, -250);
    Wall5.castShadow = true;
    Wall5.receiveShadow = true;
    this._scene.add(Wall5);

    // SIX AS IN LIKE 6
    const Wall6 = new THREE.Mesh(
      new THREE.BoxGeometry(1000, 200, 10),
      new THREE.MeshStandardMaterial({
          color: 0xFF0000,
      }));
    Wall6.position.set(0, 100, -500);
    Wall6.castShadow = true;
    Wall6.receiveShadow = true;
    this._scene.add(Wall6);

    // HORIZONTAL LINE

    const Wall62 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 200),
      new THREE.MeshStandardMaterial({
          color: 0x800000,
      }));
    Wall62.position.set(20, 100, -400);
    Wall62.castShadow = true;
    Wall62.receiveShadow = true;
    this._scene.add(Wall62);


    // SEVEN AS IN LIKE SUBSECTIONS OF SEVEN 7
      //HORIZONTAL LINE
    const Wall71 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 300),
      new THREE.MeshStandardMaterial({
          color: 0x800000,
      }));
    Wall71.position.set(-100, 100, 350);
    Wall71.castShadow = true;
    Wall71.receiveShadow = true;
    this._scene.add(Wall71);

    // VERTICAL LINE
   
    const Wall72 = new THREE.Mesh(
      new THREE.BoxGeometry(200, 200, 10),
      new THREE.MeshStandardMaterial({
          color: 0x800000,
      }));
    Wall72.position.set(0, 100, 350);
    Wall72.castShadow = true;
    Wall72.receiveShadow = true;
    this._scene.add(Wall72);

    // EIGHT AS IN LIKE SUBSECTIONS OF EIGHT 8
        // HORIZONTAL LINE

    const Wall81 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 200, 400),
      new THREE.MeshStandardMaterial({
          color: 0x800000,
      }));
    Wall81.position.set(200, 100, 300);
    Wall81.castShadow = true;
    Wall81.receiveShadow = true;
    this._scene.add(Wall81);

      // VERTICAL LINE
   
    const Wall82 = new THREE.Mesh(
      new THREE.BoxGeometry(300, 200, 10),
      new THREE.MeshStandardMaterial({
          color: 0x800000,
      }));
    Wall82.position.set(50, 100, 100);
    Wall82.castShadow = true;
    Wall82.receiveShadow = true;
    this._scene.add(Wall82);


       // HORIZONTAL LINE

       const Wall83 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall83.position.set(20, 100, 100);
      Wall83.castShadow = true;
      Wall83.receiveShadow = true;
      this._scene.add(Wall83);
    


    // NINE AS IN LIKE SUBSECTIONS OF NINE 9
      //HORIZONTAL LINE
      const Wall91 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall91.position.set(-250, 100, 300);
      Wall91.castShadow = true;
      Wall91.receiveShadow = true;
      this._scene.add(Wall91);

      //VERTICAL LINE
      const Wall92 = new THREE.Mesh(
        new THREE.BoxGeometry(300, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall92.position.set(-250, 100, 200);
      Wall92.castShadow = true;
      Wall92.receiveShadow = true;
      this._scene.add(Wall92);



// TEN AS IN LIKE SUBSECTIONS OF TEN 10
      
       //VERTICAL LINE
       const Wall101 = new THREE.Mesh(
        new THREE.BoxGeometry(150, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall101.position.set(430, 100, 100);
      Wall101.castShadow = true;
      Wall101.receiveShadow = true;
      this._scene.add(Wall101)


      // HORIZONTAL LINE

      const Wall102 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 300),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall102.position.set(350, 100, 150);
      Wall102.castShadow = true;
      Wall102.receiveShadow = true;
      this._scene.add(Wall102);
      


// ELEVEN AS IN LIKE SUBSECTIONS OF ELEVEN 11
      
       //VERTICAL LINE
       const Wall111 = new THREE.Mesh(
        new THREE.BoxGeometry(250, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall111.position.set(-380, 100, 100);
      Wall111.castShadow = true;
      Wall111.receiveShadow = true;
      this._scene.add(Wall111);

<<<<<<< HEAD
/*
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
*/
=======
       // HORIZONTAL LINE

       const Wall112 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 100),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall112.position.set(-260, 100, 50);
      Wall112.castShadow = true;
      Wall112.receiveShadow = true;
      this._scene.add(Wall112);

      //VERTICAL LINE
      const Wall113 = new THREE.Mesh(
        new THREE.BoxGeometry(150, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x800000,
        }));
      Wall113.position.set(-330, 100, 0);
      Wall113.castShadow = true;
      Wall113.receiveShadow = true;
      this._scene.add(Wall113);


      // TWELVE AS IN LIKE SUBSECTIONS OF TWELVE 12
      
       //VERTICAL LINE
       const Wall121 = new THREE.Mesh(
        new THREE.BoxGeometry(600, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall121.position.set(200, 100, -100);
      Wall121.castShadow = true;
      Wall121.receiveShadow = true;
      this._scene.add(Wall121);

       // HORIZONTAL LINE

       const Wall122 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall122.position.set(180, 100, -100);
      Wall122.castShadow = true;
      Wall122.receiveShadow = true;
      this._scene.add(Wall122);

      // HORIZONTAL LINE
>>>>>>> 6494ba02a735e4bc8b846889831d70c713925904

      const Wall123 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 100),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall123.position.set(-100, 100, -50);
      Wall123.castShadow = true;
      Wall123.receiveShadow = true;
      this._scene.add(Wall123);


      // THIRTEEN AS IN LIKE SUBSECTIONS OF THIRTEEN 13
      
       //VERTICAL LINE
       const Wall131 = new THREE.Mesh(
        new THREE.BoxGeometry(150, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall131.position.set(-330, 100, -100);
      Wall131.castShadow = true;
      Wall131.receiveShadow = true;
      this._scene.add(Wall131);

       // HORIZONTAL LINE

       const Wall132 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 200, 400),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall132.position.set(-260, 100, -300);
      Wall132.castShadow = true;
      Wall132.receiveShadow = true;
      this._scene.add(Wall132);

      //VERTICAL LINE
      const Wall133 = new THREE.Mesh(
        new THREE.BoxGeometry(150, 200, 10),
        new THREE.MeshStandardMaterial({
            color: 0x006400,
        }));
      Wall133.position.set(-180, 100, -300);
      Wall133.castShadow = true;
      Wall133.receiveShadow = true;
      this._scene.add(Wall133);





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
