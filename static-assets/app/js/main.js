
(function() {

	var myVideo = {outOfScope:0}
    var myMarker
    var myGroup
    var myRenderer 

  function onResize(){
    if(myRenderer) {
        var w = window.innerWidth-10;
        var h = window.innerHeight-10;
        myRenderer.setSize(w, h);
    }
  }
  
    document.getElementById("startVideo").addEventListener('click', function (event) {
    	//for(var i=0; i<videos.length; i++) {
      
      var video = document.getElementById("video0")// videos[i].videoEl;
      video.muted = false;
      video.currentTime = 0;
      video.muted = true;
      //video.addEventListener('ended',myHandler,false);
    //}

    this.style.display = "none";
  });

  window.addEventListener('resize', function(){
    onResize()
  })
  
    window.ARThreeOnLoad = function () {

		ARController.getUserMediaThreeScene({
            maxARVideoSize: 320,
            cameraParam: '/static-assets/data/camera_para.dat',
            onSuccess: function (arScene, arController) {
                var renderer = new THREE.WebGLRenderer({
                    antialias: true
                });

				var adjustPortrait = false;
				//if(/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
				if(/iPhone/i.test(navigator.userAgent)) {
                	if(arController.orientation=="portrait") {
                  		adjustPortrait = true;
                    }
				}
				
                myRenderer = renderer
                var w = window.innerWidth-10;
                var h = window.innerHeight-10;
                renderer.setSize(w, h);
                document.body.appendChild(renderer.domElement);

                /* ============= */
                // Video
                /* ============= */
                var crafterArMarker = crafterAr.markers[0]
                crafterArMarker.patternBase = crafterArMarker.pattern.substring(0,crafterArMarker.indexOf(".")-1)
                alert(patternBase)
                
                 myVideo.videoEl = document.getElementById("video0")
                 myVideo.videoEl.muted = true
                 myVideo.videoEl.playsInline = true
                 myVideo.videoEl.autoplay = true
                 myVideo.videoEl.play()

				var group = new THREE.Group
                
                var geometry = new THREE.PlaneGeometry(3, 2, 1);
                if(adjustPortrait==true) {
                	geometry = new THREE.PlaneGeometry(2.2, 1.5, 1);
				}
                
                var image = document.createElement( 'canvas' );
                
               	var imageW = 640
                var imageH = 360
                
                image.width = imageW;
                image.height = imageH;
  
                myVideo.imageContext = image.getContext( '2d' );
                myVideo.imageContext.fillStyle = '#000000';
                myVideo.imageContext.fillRect( 0, 0, imageW, imageH );
  
                myVideo.texture = new THREE.Texture( image );
                var material = new THREE.MeshBasicMaterial( { map: myVideo.texture, side:THREE.BothSide });  
                
                var mesh = new THREE.Mesh( geometry, material );
                group.add( mesh ); 
                myVideo.group = group
                myGroup = group
                myVideo.videoEl.currentTime = 0;

                group.position.z = 10;
                group.position.x = 100;
                group.position.y = 80;
                group.scale.set(80,80,80);

                if(adjustPortrait==true) {
                	group.position.x = 120;
                    group.position.y = 100;
                    group.scale.set(100,100,100);
				}
                
                /* ============= */
                // Complete Scene and Marker setup
                /* ============= */                
                renderer.domElement.addEventListener('click', function (ev) {
                    ev.preventDefault();
                	// dont do anything when user taps scene
                }, false);

                arController.loadNFTMarker('/static-assets/data/nft/great-lakes/great-lakes', function (id) {
                    var marker = arController.createThreeNFTMarker(id);
                    myMarker = marker;
                    marker.add(myGroup);
                    arScene.scene.add(marker);
                });

                function tick() {
                    arScene.process();

					if(myMarker) {

					if(myMarker.visible==true) {
                        myGroup.visible = true
                        myVideo.videoEl.muted = false
                        myVideo.videoEl.play()

                        if(myVideo.outOfScope > 30) {
                            myVideo.videoEl.currentTime = 0;
                        }

                         myVideo.outOfScope=0;

							if(myVideo.videoEl.readyState === myVideo.videoEl.HAVE_ENOUGH_DATA ) {
                              
                              myVideo.imageContext.drawImage( myVideo.videoEl, 0, 0 );
                              myVideo.texture.needsUpdate = true;
							}
                      }
                      else {
                            myGroup.visible = false
                            myVideo.videoEl.muted =true
                            myVideo.outOfScope+=1
                      }
                    }

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