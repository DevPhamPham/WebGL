function light(scene) {
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
    
    let target = new THREE.Object3D();
    target.position.z = -20;
    dirLight.target = target;
    dirLight.target.updateMatrixWorld();
    dirLight.shadow.camera.lookAt(0, 0, -30);

    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
}

export default light