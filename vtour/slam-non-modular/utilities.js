function intersectVisibleObjects(objects, raycaster, intersects, skipsorting) {
    for (const object of objects) {
        if (object.visible) {
            if (object.isMesh) object.raycast(raycaster, intersects);
            intersectVisibleObjects(object.children, raycaster, intersects, true);
        }
    }
    if (!skipsorting) {
        intersects.sort((a, b) => a.distance - b.distance);
    }
}

// Expose the function globally
window.intersectVisibleObjects = intersectVisibleObjects;
