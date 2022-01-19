// function generateFloor(scene) {
//     var planeSize = 1500;

//     var loader = new THREE.TextureLoader();
//     var texture = loader.load("../asset/image/textture/GreenGrass.jpeg");
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.magFilter = THREE.NearestFilter;
//     var repeats = planeSize / 50;
//     texture.repeat.set(repeats, repeats);

//     var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
//     var planeMat = new THREE.MeshPhongMaterial({
//       map: texture,
//       side: THREE.FrontSide,
//     });
//     var mesh = new THREE.Mesh(planeGeo, planeMat);
//     mesh.rotation.x = Math.PI * -0.5;
//     mesh.position.y = -0.28;
//     scene.add(mesh);

//     //                                          road
//     var planeSize = 1500;

//     var loader = new THREE.TextureLoader();
//     var texture = loader.load("../asset/image/textture/RoadLine.jpeg");
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.magFilter = THREE.NearestFilter;
//     texture.repeat.set(1, 10);
//     var planeGeo = new THREE.PlaneGeometry(planeSize/10, planeSize);
//     var planeMat = new THREE.MeshPhongMaterial({
//       map: texture,
//       side: THREE.FrontSide,
//     });
//     var mesh = new THREE.Mesh(planeGeo, planeMat);
//     mesh.rotation.x = Math.PI * -0.5;
//     // mesh.position.y = 0.4;
//     scene.add(mesh);
//   }


// function generateFloor(scene,camera) {

//   const loader = new THREE.TextureLoader();
//   const soilBaseColor = loader.load("../asset/image/textture/soil/Rock_Moss_001_basecolor.jpg");
//   const soilNormalMap = loader.load("../asset/image/textture/soil/Rock_Moss_001_normal.jpg");
//   const soilHeightMap = loader.load("../asset/image/textture/soil/Rock_Moss_001_height.png");
//   const soilRoughness = loader.load("../asset/image/textture/soil/Rock_Moss_001_roughness.jpg");
//   const soilAmbientOcclusion = loader.load("../asset/image/textture/soil/Rock_Moss_001_ambientOcclusion.jpg");

//   const WIDTH = 300
//   const HEIGHT = 300

//   const geometry = new THREE.PlaneBufferGeometry(WIDTH,HEIGHT,300,300)
//   const plane = new THREE.Mesh(geometry,
//     new THREE.MeshStandardMaterial({
//       map: soilBaseColor,
//       normalMap: soilNormalMap,
//       displacementMap: soilHeightMap, displacementScale: 2,
//       roughnessMap: soilRoughness, roughness: 0,
//       aoMap: soilAmbientOcclusion,
//       // side: THREE.DoubleSide,
//     })
//   )
//   plane.receiveShadow = true
//   plane.castShadow = true
//   plane.rotation.x = -Math.PI/2
//   plane.position.z = -30
//   scene.add(plane);

//   const raycaster = new THREE.Raycaster(); // create once
//   const clickMouse = new THREE.Vector2();  // create once
//   const vector3 = new THREE.Vector3();   // create once
//   const MAX_CLICK_DISTANCE = 10

//   window.onmousedown = (event) => {
//     // console.log(geometry)
//       // THREE RAYCASTER
//       clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
//       raycaster.setFromCamera(clickMouse, camera);
//       const found = raycaster.intersectObjects(scene.children);

//       if (found.length > 0 && (found[0].object).geometry) {
//           const mesh = found[0].object
//           const geometry = mesh.geometry
//           const point = found[0].point
        
//           for (let i = 0; i  < geometry.attributes.position.count; i++) {
//               vector3.setX(geometry.attributes.position.getX(i))
//               vector3.setY(geometry.attributes.position.getY(i))
//               vector3.setZ(geometry.attributes.position.getZ(i))
//               const toWorld = mesh.localToWorld(vector3)

//               const distance = point.distanceTo(toWorld)
//               if (distance < MAX_CLICK_DISTANCE) {
//                   geometry.attributes.position.setZ(i, geometry.attributes.position.getZ(i) + (MAX_CLICK_DISTANCE - distance) / 2)
//               }
//           }
//           geometry.computeVertexNormals()
//           geometry.attributes.position.needsUpdate = true
//       }
//   }
// }

function generateFloor(scene) {
  var planeSize = 15000;

  var loader = new THREE.TextureLoader();
  var texture = loader.load("../asset/image/textture/GreenGrass.jpeg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  var repeats = planeSize / 100;
  texture.repeat.set(repeats, repeats);

  var planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize,300,300);
  var planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.FrontSide,
  });
  var mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.rotation.x = Math.PI * -0.5;
  mesh.position.y = -0.28;
  scene.add(mesh);

  //                                          road
// road();
function road(){  var loader = new THREE.TextureLoader();
  var texture = loader.load("../asset/image/textture/RoadLine.jpeg");
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
  scene.add(mesh);}
}
export default generateFloor