var fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, container;

function SCENE(alpha, timereset) {
  //  console.log("SCENE");
  // SCENE
  // const scene = new THREE.Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  const scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(Colors.Silver, 1, alpha);
  scene.background = new THREE.Color(0xa8def0);

  let countL = 22,
    countN = -1,
    colorFog;
  setInterval(function () {
    if (countL != -1) {
      countL++;
      colorFog = Colors.Silver;
      if (countL == 44) {
        // alpha=Math.floor(Math.random() * 1150) + 200;
        // scene.fog = new THREE.Fog(colorFog, 1, alpha);
        countL = -1;
        countN = 0;
      }
    } else if (countN != -1) {
      countN++;
      colorFog = Colors.Black;
      if (countN == 44) {
        // alpha=Math.floor(Math.random() * 1150) + 200;
        // scene.fog = new THREE.Fog(colorFog, 1, alpha);
        countN = -1;
        countL = 0;
      }
    }
    // console.log(alpha);
  }, timereset);

  // CAMERA
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 20000;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0; //0
  camera.position.z = 100; //200
  camera.position.y = 70; //0
  // camera.lookAt(0,100,0)

  //...............................The X axis is red. The Y axis is green. The Z axis is blue.
  // const axesHelper = new THREE.AxesHelper(2000);
  // scene.add(axesHelper);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH / 1, HEIGHT / 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  // RESIZE HANDLER
  function handleWindowResize() {
    // cập nhật lại kích thước của renderer và camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    // keyDisplayQueue.updatePosition();
  }
  window.addEventListener("resize", handleWindowResize, false);
  return { scene, camera, renderer };
}

export default SCENE;
