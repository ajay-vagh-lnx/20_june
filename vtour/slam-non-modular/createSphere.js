// Define createSphere
// Inline createSphere function
// function createSphere(THREE, position, sceneId) {
//     const geometry = new THREE.SphereGeometry(80, 64, 2);
//     const material = new THREE.MeshBasicMaterial({
//         color: 0XFA8A12,
//         transparent: true,
//         opacity: 1,
//         depthTest: false,
//     });

//     const sphere = new THREE.Mesh(geometry, material);
//     sphere.position.copy(position);
//     sphere.userData.id = sceneId;
//     return sphere;
// }


function createSphere(THREE, _unused, curve, t = 0.5, offsetY = 100, sceneId) {
    const positionOnCurve = curve.getPoint(t);
    const elevatedPosition = positionOnCurve.clone().add(new THREE.Vector3(0, offsetY, 0));

    const geometry = new THREE.ConeGeometry(200, 400, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0xf0f8ff,
        //blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1,
        depthTest: false,
    });

    const cone = new THREE.Mesh(geometry, material);
    cone.position.copy(elevatedPosition);
    cone.rotation.x = Math.PI;
    cone.userData.id = sceneId;

    return cone;
}
