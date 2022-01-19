window.addEventListener("load", init, false);
import SCENE from "../public/modules/CreateScene.js";
// import light from "../public/modules/CreateLight.js";
import generateFloor from "../public/modules/Floor.js";
import {SkyBox} from "../public/modules/SkyBox.js";
// import generateFloor from "../test/Floor.js";
import  {KeyDisplay}  from "../public/modules/controls/KeyDisplay.js";
import  {CharacterControls}  from "../public/modules/players/CharacterControls.js";
import  {Tree}  from "../public/modules/map/tree.js";
import  {Sun}  from "../public/modules/map/sun.js";
// import {GLTFLoader} from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";

function init() {
  let alphaLight = 1,alphaFog = 200,k=100,timereset=100*k;// 10000
  let mixers = [],then=0;
  const { scene, camera, renderer } = SCENE(alphaFog,timereset); // scene
  const sun = new Sun(scene);
  sun.init(alphaLight,timereset);
  // light(scene,alphaLight,timereset);                                // light
  // CONTROLS
  const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 65;
  // orbitControls.target.y = 70; //25
  orbitControls.maxDistance = 250;
  orbitControls.enablePan = true;
  orbitControls.maxPolarAngle = Math.PI - 1.65;
  orbitControls.update();
  // let controls = new THREE.PointerLockControls(camera, document.body);
  // document.body.addEventListener( 'mousedown', function () {
  //   controls.lock();
  // }, true );

  generateFloor(scene);
  let skybox = new SkyBox(scene);
  skybox.init(Colors.White);
  setTimeout(function () {
    skybox.init(Colors.DimGray);
    runSkyBox();
  },4800*k);
  let day=0;
function runSkyBox(){
  setInterval(function () {
    if (day==0){
      skybox.init(Colors.White);
      day=1;
    } else {
      skybox.init(Colors.DimGray);
      day=0;
    }
  },9600*k)
}
let trees = new Tree(scene);
for (let i=1; i<=100;i++) 
  trees.init();

  Animals();
  players();
      // MODEL WITH ANIMATIONS
  let characterControls;
  const keysPressed = {};
function players(){  new THREE.GLTFLoader().load("../PublicModel//players/sol.glb", function (gltf) {
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
  }
  function Animals() {
    // var gltfLoader = new THREE.GLTFLoader();
    // var url = "../PublicModel/GLBs/animals/Bee.glb";
    // gltfLoader.load(url, (gltf) => {
    //   const model = gltf.scene;
    //   model.position.set(20, 0, -0);
    //   model.scale.setScalar(0.5);
    //   scene.add(model);
    //   model.traverse(function (object) {
    //     if (object.isMesh) object.castShadow = true;
    //   });
    //   const mixerBee = new THREE.AnimationMixer(model);
    //   const clips = gltf.animations;
    //   const clip = THREE.AnimationClip.findByName(
    //     clips,
    //     "_bee_take_off_and_land"
    //   );
    //   const action = mixerBee.clipAction(clip);
    //   action.play();
    //   mixers.push(mixerBee);
    //   console.log(mixers);
    // });
  }

  const clock = new THREE.Clock();
  (function animate(now) {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
      characterControls.update(mixerUpdateDelta, keysPressed);
    }
    orbitControls.target.y = 30;
    orbitControls.update();

    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    for (const mixer of mixers) {
      mixer.update(deltaTime);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    document.body.appendChild(renderer.domElement);
  })();
  
}


