window.addEventListener("load", init, false);
// import { KeyDisplay } from './utils';
// import { CharacterControls } from './characterControls';
// import * as THREE from 'three'
// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
// import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";

const W = "w";
const A = "a";
const S = "s";
const D = "d";
const SHIFT = "shift";
const C = "c";
// const SPACE = "SpaceBar";
const DIRECTIONS = [W, A, S, D];

class KeyDisplay {
  map = new Map();

  constructor() {
    const w = document.createElement("div");
    const a = document.createElement("div");
    const s = document.createElement("div");
    const d = document.createElement("div");
    const shift = document.createElement("div");
    const c = document.createElement("div");
    // const SpaceBar = document.createElement("div");

    this.map.set(W, w);
    this.map.set(A, a);
    this.map.set(S, s);
    this.map.set(D, d);
    this.map.set(SHIFT, shift);
    this.map.set(C, c);
    // this.map.set(SPACE, SpaceBar);

    this.map.forEach((v, k) => {
      v.style.color = "blue";
      v.style.fontSize = "50px";
      v.style.fontWeight = "800";
      v.style.position = "absolute";
      v.textContent = k;
    });

    this.updatePosition();

    this.map.forEach((v, _) => {
      document.body.append(v);
    });
  }

  updatePosition() {
    this.map.get(W).style.top = `${window.innerHeight - 150}px`;
    this.map.get(A).style.top = `${window.innerHeight - 100}px`;
    this.map.get(S).style.top = `${window.innerHeight - 100}px`;
    this.map.get(D).style.top = `${window.innerHeight - 100}px`;
    this.map.get(SHIFT).style.top = `${window.innerHeight - 100}px`;
    this.map.get(C).style.top = `${window.innerHeight - 100}px`;
    // this.map.get(SPACE).style.top = `${window.innerHeight - 100}px`;

    this.map.get(W).style.left = `${300}px`;
    this.map.get(A).style.left = `${200}px`;
    this.map.get(S).style.left = `${300}px`;
    this.map.get(D).style.left = `${400}px`;
    this.map.get(SHIFT).style.left = `${50}px`;
    this.map.get(C).style.left = `${450}px`;
    // this.map.get(SPACE).style.left = `${500}px`;
  }

  down(key) {
    if (this.map.get(key.toLowerCase())) {
      this.map.get(key.toLowerCase()).style.color = "red";
    }
  }

  up(key) {
    if (this.map.get(key.toLowerCase())) {
      this.map.get(key.toLowerCase()).style.color = "blue";
    }
  }
}

class CharacterControls {
  model = new THREE.Group();
  mixer = new THREE.AnimationMixer();
  animationsMap = new Map(); // Walk, Run, Idle
  orbitControl;
  camera;

  // state
  toggleRun = true;
  currentAction;

  // temporary data
  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuarternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();

  // constants
  fadeDuration = 0.2;
  runVelocity = 5;
  walkVelocity = 2;

  constructor(
    model,
    mixer,
    animationsMap,
    orbitControl,
    camera,
    currentAction
  ) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;
    this.animationsMap.forEach((value, key) => {
      if (key == currentAction) {
        // console.log(value)
        value.play();
      }
    });
    this.orbitControl = orbitControl;
    this.camera = camera;
    this.updateCameraTarget(0, 0);
  }

  switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  update(delta, keysPressed) {
    const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);

    var play = "";
    if (directionPressed && this.toggleRun) {
      play = "[Hành Động Cất Chứa].002";
    } else if (directionPressed) {
      play = "[Hành Động Cất Chứa].001";
    } else {
      play = "[Hành Động Cất Chứa]";
    }

    if (this.currentAction != play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);

      current.fadeOut(this.fadeDuration);
      toPlay.reset().fadeIn(this.fadeDuration).play();

      this.currentAction = play;
    }

    this.mixer.update(delta);

    if (this.currentAction == "[Hành Động Cất Chứa].002" || this.currentAction == "[Hành Động Cất Chứa].001") {
      // calculate towards camera direction
      var angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z
      );
      // diagonal movement angle offset
      var directionOffset = this.directionOffset(keysPressed);

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection +directionOffset -Math.PI
      );
      this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

      // calculate direction
      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // run/walk velocity
      const velocity =
        this.currentAction == "[Hành Động Cất Chứa].002" ? this.runVelocity : this.walkVelocity;

      // move model & camera
      const moveX = this.walkDirection.x * velocity * delta * 13;
      const moveZ = this.walkDirection.z * velocity * delta * 13;
      this.model.position.x += moveX;
      this.model.position.z += moveZ;
      this.updateCameraTarget(moveX, moveZ);
    }
  }

  updateCameraTarget(moveX, moveZ) {
    // move camera
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    // update camera target
    this.cameraTarget.x = this.model.position.x;
    this.cameraTarget.y = this.model.position.y + 1;
    this.cameraTarget.z = this.model.position.z;
    this.orbitControl.target = this.cameraTarget;
  }

  directionOffset(keysPressed) {
    var directionOffset = 0; // w

    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4; // w+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keysPressed[A]) {
      directionOffset = Math.PI / 2; // a
    } else if (keysPressed[D]) {
      directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
  }
}

function init() {
  scene();

  // CONTROLS
  const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 40;
  orbitControls.target.y = 25;
  orbitControls.maxDistance = 48;
  orbitControls.enablePan = true;
  orbitControls.maxPolarAngle = Math.PI - 1.3;
  orbitControls.update();
  // LIGHTS
  light();

  let mixers = [];
  // FLOOR
  generateFloor();
  // Animals();
  // people(); đr a

const test = (money) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if (money != 0) {
        resolve(Animals())
        console.log('1')
      } else {
        reject() 
        console.log('0')
      }
    }, 1000)
  })
}

let promiseSuccess = test(1)
  .then(yes => {
    console.log(yes);
    people();
  })
  .catch(no => {Animals()})
  // Animals()

  var Ntree = 25;
  for (var i = 0; i < Ntree; i++) {
    trees();
  }
  city();

  // MODEL WITH ANIMATIONS
  var characterControls;
  new THREE.GLTFLoader().load("./GLBs/player/FBX/sol.glb", function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
    });
    model.scale.setScalar(13);
    scene.add(model);
    // const gltfAnimations:THREE.AnimationClip[]  = gltf.animations;
    const gltfAnimations = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    let animationsMap = new Map();
    gltfAnimations
      .filter((a) => a.name != "TPose")
      .forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
      });
    characterControls = new CharacterControls(
      model,
      mixer,
      animationsMap,
      orbitControls,
      camera,
      "[Hành Động Cất Chứa]"
    );

    // const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    // console.log(clips);
  });

  // CONTROL KEYS
  const keysPressed = {};
  const keyDisplayQueue = new KeyDisplay();
  document.addEventListener(
    "keydown",
    (event) => {
      keyDisplayQueue.down(event.key);
      if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle();
      } else {
        keysPressed[event.key.toLowerCase()] = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    (event) => {
      keyDisplayQueue.up(event.key);
      keysPressed[event.key.toLowerCase()] = false;
    },
    false
  );

  const clock = new THREE.Clock();
  // ANIMATE
  let then = 0;
  function animate(now) {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
      characterControls.update(mixerUpdateDelta, keysPressed);
    }
    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    for (const mixer of mixers) {
      mixer.update(deltaTime);
    }

    orbitControls.target.y = 20;
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  document.body.appendChild(renderer.domElement);
  animate();


  // RESIZE HANDLER
  function handleWindowResize() {
    // cập nhật lại kích thước của renderer và camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    keyDisplayQueue.updatePosition();
  }
  window.addEventListener("resize", handleWindowResize, false);

  function generateFloor() {
    var planeSize = 1500;

    var loader = new THREE.TextureLoader();
    var texture = loader.load("./GLBs/road/textures/Grass02_baseColor.jpeg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    var repeats = planeSize / 50;
    texture.repeat.set(repeats, repeats);

    var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    var planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.y = -0.28;
    scene.add(mesh);

    //                                          road
    var planeSize = 1500;

    var loader = new THREE.TextureLoader();
    var texture = loader.load("./GLBs/road/textures/RoadLines_baseColor.jpeg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(1, 10);
    var planeGeo = new THREE.PlaneGeometry(planeSize/10, planeSize);
    var planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.FrontSide,
    });
    var mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    // mesh.position.y = 0.4;
    scene.add(mesh);
  }

  function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    // dirLight.shadow.normalBias = 0.05
    dirLight.position.set(150, 350, 350);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 400;
    dirLight.shadow.camera.bottom = -400;
    dirLight.shadow.camera.left = -400;
    dirLight.shadow.camera.right = 400;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 1000;
    dirLight.shadow.mapSize.width = 2000;
    dirLight.shadow.mapSize.height = 2000;
    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
  }

  function Animals() {
    var gltfLoader = new THREE.GLTFLoader();
    var url = "./GLBs/animals/bee.glb";
    gltfLoader.load(url, (gltf) => {
      const model = gltf.scene;
      model.position.set(20, 0, -0);
      model.scale.setScalar(0.5);
      scene.add(model);
      model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });

      const mixerBee = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      const clip = THREE.AnimationClip.findByName(
        clips,
        "_bee_take_off_and_land"
      );
      console.log("khoa");
      const action = mixerBee.clipAction(clip);
      action.play();
      mixers.push(mixerBee);
    });
  }

  function trees() {
    {
      var gltfLoader = new THREE.GLTFLoader();
      var url = "./GLBs/plants/tree.glb";
      gltfLoader.load(url, (gltf) => {
        planes = gltf.scene;
        scene.add(planes);
        const a =Math.random()*670+80,
              b = Math.random()*-670-80;
        var x = Math.floor(Math.random()*2+1)==1 ? a:b,
          z = Math.random() * 1000 - 500;
          // console.log(x)
        planes.position.set(x, 0, z);

        planes.scale.set(20, 20, 20);
      });
    }
  }

  function city() {
    //                    add .GLTFLoader         city.glb
    // {
    //    var gltfLoader = new THREE.GLTFLoader();
    //    var url = "./GLBs/architecture/Castle.glb";
    //    gltfLoader.load(url, (gltf) => {
    //     var root = gltf.scene;
    //     scene.add(root);
    //     root.position.set(0, 0, -50);
    //     root.scale.set(7500, 7500, 7500);
    //    });
    // }

    {
      var gltfLoader = new THREE.GLTFLoader();
      var url = "./GLBs/architecture/bench.gltf";
      gltfLoader.load(url, (gltf) => {
        var root = gltf.scene;
        scene.add(root);
        root.position.set(0, 0, -50);
        root.scale.set(6, 6, 6);
      });
    }
    {
      var gltfLoader = new THREE.GLTFLoader();
      var url = "./GLBs/road/streetLight.glb";
      gltfLoader.load(url, (gltf) => {
        var root = gltf.scene;
        scene.add(root);
        root.position.set(75, 50,0);
        root.rotation.y = 0.2;
        root.scale.set(200, 200, 200);
      });
    }
    // {
    //   var gltfLoader = new THREE.GLTFLoader();
    //   var url = "./GLBs/road/streetLight.glb";
    //   gltfLoader.load(url, (gltf) => {
    //     var root = gltf.scene;
    //     scene.add(root);
    //     root.position.set(-75, 50,0);
    //     root.rotation.y =Math.PI*2 - 0.85;
    //     root.scale.set(200, 200, 200);
    //   });
    // }

  }

  function people() {
    var gltfLoader = new THREE.GLTFLoader();
    var url = "./GLBs/player/FBX/sol.glb";
    gltfLoader.load(url, (gltf) => {
      const model = gltf.scene;
      model.position.set(20, 0, -50);
      model.scale.setScalar(13);
      scene.add(model);
      model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });
      var mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      console.log(clips);
      var action = mixer.clipAction(clips[3]);
      console.log(mixers);
      document.body.onkeydown = function(e) {
        if (e.which === 67){
          mixer = new THREE.AnimationMixer(model);
          action = mixer.clipAction(clips[2]);
          action.play();
          // mixers.shift();
          mixers.pop()
          mixers.push(mixer);
          console.log(mixers);
        }
      }
      action.play();
      mixers.push(mixer);
    });
  }
}
