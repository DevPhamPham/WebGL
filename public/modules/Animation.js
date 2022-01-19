function animate(scene, camera, renderer,sun) { //animate(now)
    // let mixerUpdateDelta = clock.getDelta();
    // if (characterControls) {
    //   characterControls.update(mixerUpdateDelta, keysPressed);
    // }
    // now *= 0.001;
    // const deltaTime = now - then;
    // then = now;
    // for (const mixer of mixers) {
    //   mixer.update(deltaTime);
    // }
    // orbitControls.target.y = 20;
    // orbitControls.update();
    // document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default animate;