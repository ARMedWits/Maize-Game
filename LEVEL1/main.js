import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';


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
      fbx.position.set(600, 25, -100);
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
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
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
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

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    this._scene.add(light);

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

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0x808080,
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
      

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
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