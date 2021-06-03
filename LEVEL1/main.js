import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {maze} from './maze.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

var crate,crate2,meshFloor,meshfloorTexture, meshfloorNormalMap, meshfloorBumpMap,
    crateTexture,crateNormalMap,crateBumpMap;

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3();

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();
  }

  _LoadModels() {
    const loader = new FBXLoader();
    loader.setPath('./resources/zombie/');
    loader.load('mremireh_o_desbiens.fbx', (fbx) => {
<<<<<<< HEAD
      fbx.position.set(80,0,550);
=======
      fbx.position.set(600, 0, -100);
>>>>>>> 6494ba02a735e4bc8b846889831d70c713925904
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = true;
      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('./resources/zombie/');
      loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
    });


    



  }

  get Position() {
    return this._position;
  }

  get Rotation() {
    if (!this._target) {
      return new THREE.Quaternion();
    }
    return this._target.quaternion;
  }

  Update(timeInSeconds) {
    if (!this._stateMachine._currentState) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(3.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds*1.5;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds*1.5;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    this._position.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};


class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};


class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('dance');
    }
  }
};


class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-15, 20, -30);
    idealOffset.applyQuaternion(this._params.target.Rotation);
    idealOffset.add(this._params.target.Position);
    return idealOffset;
  }

  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 10, 50);
    idealLookat.applyQuaternion(this._params.target.Rotation);
    idealLookat.add(this._params.target.Position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();

    // const t = 0.05;
    // const t = 4.0 * timeElapsed;
    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);
  }
}


class ThirdPersonCameraDemo {
  constructor() {
    this._Initialize();
  }

  

  _Initialize() {

    var USE_WIREFRAME = false;

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

   let light = new THREE.PointLight(0xffffff, 1, 1500);
	light.position.set(100,500,0);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	// light.shadow.mapSize.width = 4096;
    // light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 5000.0;
    // light.shadow.camera.left = 5000;
    light.shadow.camera.right = -5000;
    // light.shadow.camera.top = 50;
    // light.shadow.camera.bottom = -50;
    
    light.shadowMapWidth = 3000; // default is 512
    light.shadowMapHeight = 3000; // default is 512
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.2);
    this._scene.add(light);

    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(25, 10, 25);
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
    texture.encoding = THREE.sRGBEncoding;
    this._scene.background = texture;

    // _LoadModels();

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0x808080,
          }));
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);
<<<<<<< HEAD

    const loaders = new GLTFLoader();
    loaders.load('./resources/Level1maze.glb', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        if ( c.isMesh ) {

          c.material.color.set( 0xFF0000);
      
        }
      });
      gltf.scene.scale.set(90,150,90);
      gltf.scene.position.set(-500,0,-500);
      this._scene.add(gltf.scene);
    });

     // MAZE DESIGN
          // ONE AS IN LIKE 1
          

         /* var BoxGeo =[1000, 200, 10,10, 200, 400,10, 200, 500,10, 200, 400,10, 200, 500,1000, 200, 10,10, 200, 200,10, 200, 300,200, 200, 10,10, 200, 400,300, 200, 10,10, 200, 200,10, 200, 200,300, 200, 10,150, 200, 10,10, 200, 300,250, 200, 10,10, 200, 100,150, 200, 10,600, 200, 10,10, 200, 200,10, 200, 100,150, 200, 10,10, 200, 400,150, 200, 10];
          var BoxPos = [0, 100, 500,-500, 100, 300,-500, 100, -250,500, 100, 300,500, 100, -250,0, 100, -500,20, 100, -400,-100, 100, 350,0, 100, 350,200, 100, 300,50, 100, 100,20, 100, 100,-250, 100, 300,-250, 100, 200,430, 100, 100,350, 100, 150,-380, 100, 100,-260, 100, 50,-330, 100, 0,200, 100, -100,180, 100, -100,-100, 100, -50,-330, 100, -100,-260, 100, -300,-180, 100, -300];
            var i;
          for(i = 0;i < BoxGeo.length; i = i + 3 ){

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
          this._scene.add(dONE);*/








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

         // console.log(BasicCharacterController.position);

         
      
      
      
      
=======
    
    var myscene = this._scene;
    maze(myscene);

    var textureLoader = new THREE.TextureLoader();
	meshfloorTexture = textureLoader.load("grass/grass01.jpg");
	meshfloorBumpMap = textureLoader.load("grass/grass01_h.jpg");
	meshfloorNormalMap = textureLoader.load("grass/grass01_n.jpg");
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(2000,2000, 10,10),
		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			wireframe:USE_WIREFRAME,
			map:meshfloorTexture,
			bumpMap:meshfloorBumpMap,
			normalMap:meshfloorNormalMap
		})
		// See threejs.org/examples/ for other material types
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	this._scene.add(meshFloor);

	crateTexture = textureLoader.load("crate0/crate0_diffuse.png");
	crateBumpMap = textureLoader.load("crate0/crate0_bump.png");
	crateNormalMap = textureLoader.load("crate0/crate0_normal.png");
	
	// Create mesh with these textures
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(10,10,10),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	this._scene.add(crate);
	crate.position.set(600, 20, 50);
	crate.receiveShadow = true;
	crate.castShadow = true;

	crate2 = new THREE.Mesh(
		new THREE.BoxGeometry(10,10,10),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	this._scene.add(crate2);
	crate2.position.set(-600, 20, 50);
	crate2.receiveShadow = true;
	crate2.castShadow = true;
>>>>>>> 6494ba02a735e4bc8b846889831d70c713925904

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
    this._LoadModels();
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);

    this._thirdPersonCamera = new ThirdPersonCamera({
      camera: this._camera,
      target: this._controls,
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
    crate.rotation.x += 0.01;
	crate.rotation.y += 0.02;

	crate2.rotation.x += 0.01;
	crate2.rotation.y += 0.02;
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }

    this._thirdPersonCamera.Update(timeElapsedS);
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new ThirdPersonCameraDemo();
});


function _LerpOverFrames(frames, t) {
  const s = new THREE.Vector3(0, 0, 0);
  const e = new THREE.Vector3(100, 0, 0);
  const c = s.clone();

  for (let i = 0; i < frames; i++) {
    c.lerp(e, t);
  }
  return c;
}

function _TestLerp(t1, t2) {
  const v1 = _LerpOverFrames(100, t1);
  const v2 = _LerpOverFrames(50, t2);
  console.log(v1.x + ' | ' + v2.x);
}

_TestLerp(0.01, 0.01);
_TestLerp(1.0 / 100.0, 1.0 / 50.0);
_TestLerp(1.0 - Math.pow(0.3, 1.0 / 100.0), 
          1.0 - Math.pow(0.3, 1.0 / 50.0));