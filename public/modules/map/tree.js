export class Tree{
    constructor(scene){
        this.scene=scene;
    }
    init(){
      let gltfLoader = new THREE.GLTFLoader();
      let url = "../PublicModel/GLBs/plants/tree.glb";
      gltfLoader.load(url, (gltf) => {
        this.planes = gltf.scene;
        this.scene.add(this.planes);
        const a =Math.random()*3000-1500,
              b = Math.random()*-3000+1500;
        let x = Math.floor(Math.random()*2+1)==1 ? a:b,
          z = Math.random() * 3000-1500;
          // console.log(x)
        // this.planes.position.set(0, 0, 0);
        this.planes.position.set(x, 0, z);

        this.planes.scale.set(20, 20, 20);
      });

    }
}