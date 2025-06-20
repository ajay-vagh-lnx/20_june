function addKrpanoListeners(krpano, raycaster, models, SCALE_FACTOR, camera, group, trajectoryPoints, trajectoryMesh, sceneScale, sceneToTrajectoryMapping) {
    const threejsPlugin = krpano.get('plugin[threejs]');
    const THREE = threejsPlugin.THREE;
    let hoveredSphere = null;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Initialize all spheres as transparent
    models.forEach((sphere) => {
        sphere.material.transparent = true;
        sphere.material.opacity = 0;
    });

    krpano.webGL.addListener('hittest', (eventtype, origin, dir) => {
        if (isMobile) return;
        raycaster.ray.origin.set(
            origin.z * SCALE_FACTOR,
            -origin.y * SCALE_FACTOR,
            origin.x * SCALE_FACTOR
        );
        raycaster.ray.direction.set(-dir.x, -dir.y, dir.z).normalize();

        const intersects = [];

        const expansionRadius = 0.1;

        const offsetDirections = [
            new THREE.Vector3(0, 0, 0),                         // Center
        
            // Primary axis offsets
            new THREE.Vector3(expansionRadius, 0, 0),           // +X (Right)
            new THREE.Vector3(-expansionRadius, 0, 0),          // -X (Left)
            new THREE.Vector3(0, expansionRadius, 0),           // +Y (Up)
            new THREE.Vector3(0, -expansionRadius, 0),          // -Y (Down)
            new THREE.Vector3(0, 0, expansionRadius),           // +Z (Forward)
            new THREE.Vector3(0, 0, -expansionRadius),          // -Z (Backward)
        
            // XY plane diagonals
            new THREE.Vector3(expansionRadius, expansionRadius, 0),   // +X +Y (Top-right)
            new THREE.Vector3(-expansionRadius, -expansionRadius, 0), // -X -Y (Bottom-left)
            new THREE.Vector3(expansionRadius, -expansionRadius, 0),  // +X -Y (Bottom-right)
            new THREE.Vector3(-expansionRadius, expansionRadius, 0),  // -X +Y (Top-left)
        
            // XZ plane diagonals
            new THREE.Vector3(-expansionRadius, 0, expansionRadius),  // -X +Z (Left-Forward)
            new THREE.Vector3(-expansionRadius, 0, -expansionRadius), // -X -Z (Left-Backward)
            new THREE.Vector3(expansionRadius, 0, -expansionRadius),  // +X -Z (Right-Backward)
            new THREE.Vector3(expansionRadius, 0, expansionRadius),   // +X +Z (Right-Forward)
        
            // YZ plane diagonals
            new THREE.Vector3(0, -expansionRadius, expansionRadius),  // -Y +Z (Down-Forward)
            new THREE.Vector3(0, expansionRadius, -expansionRadius),  // +Y -Z (Up-Backward)
            new THREE.Vector3(0, -expansionRadius, -expansionRadius), // -Y -Z (Down-Backward)
            new THREE.Vector3(0, expansionRadius, expansionRadius),   // +Y +Z (Up-Forward)
        ];
        

        offsetDirections.forEach((offset) => {
        const modifiedDirection = raycaster.ray.direction.clone().add(offset).normalize();
        raycaster.set(raycaster.ray.origin.clone(), modifiedDirection);
        intersectVisibleObjects(models, raycaster, intersects);
        });


        // intersectVisibleObjects(models, raycaster, intersects);

        // when trajectory line is visibile so click on this line for change frame 
        const isShowTrajectory = JSON.parse(localStorage.getItem("isShowTrajectory"));
        if (intersects.length > 0 && isShowTrajectory) {
            const hitSphere = intersects[0].object;

            if (hoveredSphere !== hitSphere) {
                if (hoveredSphere) {
                    hoveredSphere.material.opacity = 0;
                    //hoveredSphere.material.color.set(0xF5F000);
                    console.log("No-Hit!");
                }
                hoveredSphere = hitSphere;
                hoveredSphere.material.opacity = 1;
                //hoveredSphere.material.color.set(0x99FD9D);
                
            }
        } else if (hoveredSphere) {
            hoveredSphere.material.opacity = 0;
            //hoveredSphere.material.color.set(0xF5F000);
            hoveredSphere = null;

        }
    });

    krpano.control.layer.addEventListener(
        'mousedown',
        (event) => {
            raycasterMouseHandler(
                event,
                krpano,
                models,
                raycaster,
                camera,
                group,
                trajectoryPoints,
                trajectoryMesh,
                sceneScale,
                sceneToTrajectoryMapping,
            );
        },
        true
    );

     // Touch interaction (mobile)
     krpano.control.layer.addEventListener('touchstart', (event) => {
        if (event.touches.length > 0) {
            event.preventDefault();
            const touchEvent = event.touches[0];
            
            // Clone the event to avoid mutation issues
            const clonedEvent = {
                clientX: touchEvent.clientX,
                clientY: touchEvent.clientY,
                preventDefault: () => touchEvent.preventDefault()
            };
            
            raycasterMouseHandler(clonedEvent, krpano, models, raycaster, camera, 
                group, trajectoryPoints, trajectoryMesh, sceneScale, sceneToTrajectoryMapping);
        }
    }, { passive: false }); 
}