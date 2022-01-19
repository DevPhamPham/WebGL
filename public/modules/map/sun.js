export class Sun{
    constructor(scene){
        this.scene = scene;
    }
    init(alpha,timereset){
            let AmbientSun = new THREE.AmbientLight(0xffffff,alpha);
            this.scene.add(AmbientSun);
            let dirSun = new THREE.DirectionalLight(0xffffff, alpha);
            dirSun.position.set(0, 12000, 0);
            dirSun.castShadow = true;
            dirSun.shadow.camera.top = 400;
            dirSun.shadow.camera.bottom = -400;
            dirSun.shadow.camera.left = -400;
            dirSun.shadow.camera.right = 400;
            dirSun.shadow.camera.near = 1;
            dirSun.shadow.camera.far = 50000;
            dirSun.shadow.mapSize.width = 1024;
            dirSun.shadow.mapSize.height = 1024;
            //   dirSun.shadow.normalBias = 0.05
        
            let target = new THREE.Object3D();
            target.position.z = -20;
            dirSun.target = target;
            dirSun.target.updateMatrixWorld();
            dirSun.shadow.camera.lookAt(0, 0, -30);

            this.scene.add(dirSun);
            this.cycle(timereset,dirSun,AmbientSun,alpha);
    }
    cycle(timereset,dirSun,AmbientSun,alpha){
        let x=0,y=12000,R=12000,day=1;
        // ptdt x**2 +y**2 = R**2
        setInterval(function (){
            if (day==1){
                y-=250;
                x = Math.sqrt(R**2 - y**2);
                dirSun.position.set(x,y,0);
                if (y<=-R){
                    day=0;
                }
            } else {
                y+=250;
                x = -Math.sqrt(R**2-y**2);
                dirSun.position.set(x,y,0);
                if (y>=R){
                    day=1;
                }
            }
                // alpha value
            if (y>0 && day==1){
                alpha -=0.015;
            } else if (y>0 && day==0){
                alpha+=0.015;
            }
            AmbientSun.intensity = alpha;
            dirSun.intensity = alpha;
        },timereset);
    }
}
  