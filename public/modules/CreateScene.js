var fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  HEIGHT,
  WIDTH,
  container;

function SCENE() {
  //  console.log("SCENE");
  // SCENE
  // const scene = new THREE.Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Colors.white, 1, 1900);
  scene.background = new THREE.Color(0xa8def0);

  // CAMERA
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 1;
  farPlane = 3000;
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
  const axesHelper = new THREE.AxesHelper(2000);
  scene.add(axesHelper);

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
  return {scene, camera, renderer};
}

export default SCENE;
