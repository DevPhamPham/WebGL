function light(scene, alpha,timereset) {
  let AmbientLightMoon = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(AmbientLightMoon);
  //
  let AmbientLight = new THREE.AmbientLight(0xffffff, alpha);
  let dirLight = new THREE.DirectionalLight(0xffffff, alpha);
  scene.add(AmbientLight);
  let time = 12,
    yLight = 132,
    xLight = 0;

  function AdvenLight(xLight, yLight) {
    dirLight.position.set(xLight, yLight, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 400;
    dirLight.shadow.camera.bottom = -400;
    dirLight.shadow.camera.left = -400;
    dirLight.shadow.camera.right = 400;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10000;
    dirLight.shadow.mapSize.width = 2000;
    dirLight.shadow.mapSize.height = 2000;
    //   dirLight.shadow.normalBias = 0.05

    let target = new THREE.Object3D();
    target.position.z = -20;
    dirLight.target = target;
    dirLight.target.updateMatrixWorld();
    dirLight.shadow.camera.lookAt(0, 0, -30);
  }
  AdvenLight(xLight, yLight);
  scene.add(dirLight);

  let kiem = -0.02,
    countNight = -1; // main : 0.02

  setInterval(function () {
    time+=3/11;
    let c = Math.round((time-12)/(3/11)*1)/1; // dem chu ki
    // console.log("c : ",c,"\ntime : ",time);
    // console.log("x : ",xLight,"\ny : ",yLight);
    if (time>=24) time-=24;
    else 
    if (time>=6 && time<=18){
      if (c>=-22 && c<=22){
        yLight = 132/22*(21-Math.abs(c));
      } 
      if (c>0&&c<=22){
        xLight = c*20;
      } else if (c>=-22 &&c<=0){
        xLight = c*20;
      }
    }
    AdvenLight(xLight, yLight)

    alpha = Math.round(alpha * 100) / 100;
    if (countNight != -1) {
      if (countNight == 43) {
        countNight = -1;
        alpha += kiem;
      } else countNight++;
    } else {
      alpha += kiem;
      if (alpha > 1) kiem *= -1;
      else if (alpha <= 0.12) {
        countNight = 1;
        kiem *= -1;
      }
    }
    AmbientLight.intensity = alpha;
    dirLight.intensity = alpha;
  }, timereset); // main: 12000 // 44 chu kì cho ánh sáng
}

export default light;
