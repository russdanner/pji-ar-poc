(function() {
    window.ARThreeOnLoad = function () {
        ARController.getUserMediaThreeScene({
            maxARVideoSize: 320,
            cameraParam: '/static-assets/data/camera_para.dat',
            onSuccess: function (arScene, arController) {
                var renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
                if (arController.orientation === 'portrait') {
                    var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
                    var h = window.innerWidth;
                    renderer.setSize(w, h);
                    renderer.domElement.style.paddingBottom = (w - h) + 'px';
                } else {
                    if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
                        renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
                    } else {
                        renderer.setSize(arController.videoWidth, arController.videoHeight);
                        document.body.className += ' desktop';
                    }
                }
                document.body.className = arController.orientation;
                document.body.appendChild(renderer.domElement);

                var rotationV = 0;
                var rotationTarget = 0;

                var object = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 8, 8),
                    new THREE.MeshNormalMaterial()
                );
                object.material.shading = THREE.FlatShading;
                object.position.z = 40;
                object.position.x = 80;
                object.position.y = 80;
                object.scale.set(80,80,80);

                renderer.domElement.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    rotationTarget += 1;
                }, false);

                arController.loadNFTMarker('/static-assets/data/nft/box', function (id) {
                    var marker = arController.createThreeNFTMarker(id);
                    marker.add(object);
                    arScene.scene.add(marker);
                });

                function tick() {
                    arScene.process();

                    rotationV += (rotationTarget - object.rotation.z) * 0.05;
                    object.rotation.z += rotationV;
                    rotationV *= 0.8;

                    arScene.renderOn(renderer);
                    requestAnimationFrame(tick);
                };

                tick();
            }
        });

        delete window.ARThreeOnLoad;
    };

    if (window.ARController && ARController.getUserMediaThreeScene)
        ARThreeOnLoad();
})();