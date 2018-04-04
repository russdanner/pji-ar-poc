<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <link type="text/css" rel="css/main.css"/>
        <script async src="/static-assets/app/js/lib/crafterar/artoolkit.min.js"></script>
        <script async src="/static-assets/app/js/lib/crafterar/three.js"></script>
        <script async src="/static-assets/app/js/lib/crafterar/artoolkit.three.js"></script>
    </head>
    <body>
      <script>
      	var crafterAR = {
        	markers: [{  pattern:"${contentModel.markers.item[0].patternImage}",
                         videoWidth: ${contentModel.markers.item[0].videoWidth},
                         videoHeight: ${contentModel.markers.item[0].videoHeight},
                         xScale: ${contentModel.markers.item[0].xScale},
                         yScale: ${contentModel.markers.item[0].yScale},
                         xPosition: ${contentModel.markers.item[0].xPosition},
                         yPosition: ${contentModel.markers.item[0].yPosition}                         
                      }]
        }
      </script>
      <script async src="/static-assets/app/js/main.js"></script>
      
      <div class="startVideo" id="startVideo" >
          <img style="margin-top:10%; width:300px;" src="${contentModel.splashLogo!""}"  /> 
          <h1><span>${contentModel.splashText!"Tap to start"}</span></h1>
      </div>

	  <div style="display:none;" >
          <video id="video0" autoplay muted  playsinline controls style="width:1920px; height:1080px;""">
              <source src="${contentModel.markers.item[0].video}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
          </video> 
      </div>
        
	  <style>          
        .startVideo {
          background: white; 
          border-radius: 25px;
          color: black; 
          font-weight: strong; 
          position: absolute; 
          top: 10px; 
          height: 70%; 
          width: 80%; 
          text-align: center; 
          z-index: 99999999999;
          margin: 10%;
          text-align: center;
          display:table-cell;
          vertical-align:middle;
        }
      </style>
    </body>
</html>