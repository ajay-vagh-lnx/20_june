function navigateToClickedPoint(targetPosition, camera, group, trajectoryMesh, krpano, sceneScale) {
    const threejsPlugin = krpano.get('plugin[threejs]');
    const THREE = threejsPlugin.THREE;

    // Get the camera's world position (unscaled)
    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);

    // Use current positions without modifying the original objects
    const initialCameraPosition = camera.position;
    const initialGroupPosition = group.position;
    const initialTrajectoryPosition = trajectoryMesh.position;

    // Calculate the translation vector in the scaled space
    const translationVector = new THREE.Vector3().subVectors(targetPosition, cameraWorldPosition).divide(sceneScale);
    console.log("Translation Vector:", translationVector);

    // Proximity check to avoid unnecessary translation
    const epsilon = 0.1; // Tolerance for floating-point comparison
    if (translationVector.length() < epsilon) {
        console.log("You are already at the target position. No movement required.");
        return;
    }

    // Calculate target positions directly based on translation
    const targetCameraPosition = initialCameraPosition.clone().add(translationVector).multiply(sceneScale);
    const targetGroupPosition = initialGroupPosition.clone().sub(translationVector).multiply(sceneScale);
    const targetTrajectoryPosition = initialTrajectoryPosition.clone().sub(translationVector).multiply(sceneScale);

    // Animation parameters
    const duration = 1; // Animation duration in seconds
    const startTime = performance.now();

    // Add a blur effect
    const canvas = krpano.webGL.canvas;
    const blurFactor = 50; // Blur intensity
    canvas.style.transition = `filter ${duration}s ease-in`;
    canvas.style.filter = `blur(${blurFactor}px)`; // Apply blur effect

    function animate() {
        const elapsedTime = (performance.now() - startTime) / 1000; // Elapsed time in seconds
        const t = Math.min(elapsedTime / duration, 1); // Normalize time between 0 and 1

        // Interpolate positions for smooth animation
        camera.position.lerpVectors(initialCameraPosition, targetCameraPosition, t);
        group.position.lerpVectors(initialGroupPosition, targetGroupPosition, t);
        trajectoryMesh.position.lerpVectors(initialTrajectoryPosition, targetTrajectoryPosition, t);

        // Ensure the camera looks at the target
        const lookAtPosition = new THREE.Vector3().copy(targetPosition);
        camera.lookAt(lookAtPosition);

        // Continue the animation until complete
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            // Finalize positions after animation ends
            camera.position.copy(targetCameraPosition);
            group.position.copy(targetGroupPosition);
            trajectoryMesh.position.copy(targetTrajectoryPosition);

            // Remove the blur effect
            canvas.style.filter = 'none';
            console.log("Animation complete.");
        }
    }

    // Start the animation
    animate();
}

// Expose the function globally
window.navigateToClickedPoint = navigateToClickedPoint;
