// function SkyBox(scene) {
//     let materialArray = [];
//     let texture_ft = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Right.bmp');
//     let texture_bk = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Left.bmp');
//     let texture_up = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Top.bmp');
//     let texture_dn = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Bottom.bmp');
//     let texture_rt = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Front.bmp');
//     let texture_lf = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Back.bmp');

//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft,color:Colors.White,opacity:1,visible:1 }));//DimGray
//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk,color:Colors.White,opacity:1,visible:1 }));//DimGray
//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up,color:Colors.White,opacity:1,visible:1 }));//DimGray
//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn,color:Colors.White,opacity:1,visible:1 }));//DimGray
//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt,color:Colors.White,opacity:1,visible:1 }));//DimGray
//     materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf,color:Colors.White,opacity:1,visible:1 }));//DimGray

//     for (let i = 0; i < 6; i++)
//       materialArray[i].side = THREE.BackSide;
//     console.log(materialArray);
//     let skyboxGeo = new THREE.BoxGeometry( 15000, 15000, 15000); //15k
//     let skybox = new THREE.Mesh( skyboxGeo, materialArray );
//     console.log(skybox);
//     scene.add( skybox );
//   }
//   export default SkyBox

export class SkyBox {
  constructor(scene,changeColors) {
    this.scene = scene;
  }
  init(changecolor) {
        this.materialArray = [];
        let texture_ft = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Right.bmp');
        let texture_bk = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Left.bmp');
        let texture_up = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Top.bmp');
        let texture_dn = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Bottom.bmp');
        let texture_rt = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Front.bmp');
        let texture_lf = new THREE.TextureLoader().load( '../asset/image/SkyBox/Daylight_Box_Back.bmp');

        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft,color:changecolor,opacity:1,visible:1 }));//DimGray
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk,color:changecolor,opacity:1,visible:1 }));//DimGray
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up,color:changecolor,opacity:1,visible:1 }));//DimGray
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn,color:changecolor,opacity:1,visible:1 }));//DimGray
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt,color:changecolor,opacity:1,visible:1 }));//DimGray
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf,color:changecolor,opacity:1,visible:1 }));//DimGray

        for (let i = 0; i < 6; i++)
          this.materialArray[i].side = THREE.BackSide;
        // console.log(this.materialArray);
        let skyboxGeo = new THREE.BoxGeometry( 15000, 15000, 15000); //15k
        let skybox = new THREE.Mesh( skyboxGeo, this.materialArray );
        // console.log(skybox);
        this.scene.add( skybox );
  }
}
