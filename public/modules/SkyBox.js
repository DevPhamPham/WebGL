
function SkyBox(scene) {
    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Right.bmp');
    let texture_bk = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Left.bmp');
    let texture_up = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Top.bmp');
    let texture_dn = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Bottom.bmp');
    let texture_rt = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Front.bmp');
    let texture_lf = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Back.bmp');
      
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
       
    for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
       
    let skyboxGeo = new THREE.BoxGeometry( 2000, 2000, 2000);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );
  }
  export default SkyBox