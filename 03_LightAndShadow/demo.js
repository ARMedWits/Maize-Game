var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = { height:5, speed:0.5, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(10,50,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);

	// MAZE DESIGN
          // ONE AS IN LIKE 1
          const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(1000, 100, 10),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          leftWall.position.set(0, 50, 500);
          leftWall.castShadow = true;
          leftWall.receiveShadow = true;
          scene.add(leftWall);
      
           // TWO AS IN LIKE 2
           const Wall2 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 400),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          Wall2.position.set(-500, 50, 300);
          Wall2.castShadow = true;
          Wall2.receiveShadow = true;
          scene.add(Wall2);
      
           // THREE AS IN LIKE 3
           const Wall3 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 500),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          Wall3.position.set(-500, 50, -250);
          Wall3.castShadow = true;
          Wall3.receiveShadow = true;
          scene.add(Wall3);
      
          // FOUR AS IN LIKE 4
          const Wall4 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 400),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          Wall4.position.set(500, 50, 300);
          Wall4.castShadow = true;
          Wall4.receiveShadow = true;
          scene.add(Wall4);
      
           // FIVE AS IN LIKE 5
           const Wall5 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 500),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          Wall5.position.set(500, 50, -250);
          Wall5.castShadow = true;
          Wall5.receiveShadow = true;
          scene.add(Wall5);
      
          // SIX AS IN LIKE 6
          const Wall6 = new THREE.Mesh(
            new THREE.BoxGeometry(1000, 100, 10),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
          Wall6.position.set(0, 50, -500);
          Wall6.castShadow = true;
          Wall6.receiveShadow = true;
          scene.add(Wall6);
      
          // HORIZONTAL LINE
      
          const Wall62 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 200),
            new THREE.MeshStandardMaterial({
                color: 0x800000,
            }));
          Wall62.position.set(20, 50, -400);
          Wall62.castShadow = true;
          Wall62.receiveShadow = true;
          scene.add(Wall62);
      
      
          // SEVEN AS IN LIKE SUBSECTIONS OF SEVEN 7
            //HORIZONTAL LINE
          const Wall71 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 300),
            new THREE.MeshStandardMaterial({
                color: 0x800000,
            }));
          Wall71.position.set(-100, 50, 350);
          Wall71.castShadow = true;
          Wall71.receiveShadow = true;
          scene.add(Wall71);
      
          // VERTICAL LINE
         
          const Wall72 = new THREE.Mesh(
            new THREE.BoxGeometry(200, 100, 10),
            new THREE.MeshStandardMaterial({
                color: 0x800000,
            }));
          Wall72.position.set(0, 50, 350);
          Wall72.castShadow = true;
          Wall72.receiveShadow = true;
          scene.add(Wall72);
      
          // EIGHT AS IN LIKE SUBSECTIONS OF EIGHT 8
              // HORIZONTAL LINE
      
          const Wall81 = new THREE.Mesh(
            new THREE.BoxGeometry(10, 100, 400),
            new THREE.MeshStandardMaterial({
                color: 0x800000,
            }));
          Wall81.position.set(200, 50, 300);
          Wall81.castShadow = true;
          Wall81.receiveShadow = true;
          scene.add(Wall81);
      
            // VERTICAL LINE
         
          const Wall82 = new THREE.Mesh(
            new THREE.BoxGeometry(300, 100, 10),
            new THREE.MeshStandardMaterial({
                color: 0x800000,
            }));
          Wall82.position.set(50, 50, 100);
          Wall82.castShadow = true;
          Wall82.receiveShadow = true;
          scene.add(Wall82);
      
      
             // HORIZONTAL LINE
      
             const Wall83 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 200),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall83.position.set(20, 50, 100);
            Wall83.castShadow = true;
            Wall83.receiveShadow = true;
            scene.add(Wall83);
          
      
      
          // NINE AS IN LIKE SUBSECTIONS OF NINE 9
            //HORIZONTAL LINE
            const Wall91 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 200),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall91.position.set(-250, 50, 300);
            Wall91.castShadow = true;
            Wall91.receiveShadow = true;
            scene.add(Wall91);
      
            //VERTICAL LINE
            const Wall92 = new THREE.Mesh(
              new THREE.BoxGeometry(300, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall92.position.set(-250, 50, 200);
            Wall92.castShadow = true;
            Wall92.receiveShadow = true;
            scene.add(Wall92);
      
      
      
      // TEN AS IN LIKE SUBSECTIONS OF TEN 10
            
             //VERTICAL LINE
             const Wall101 = new THREE.Mesh(
              new THREE.BoxGeometry(150, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall101.position.set(430, 50, 100);
            Wall101.castShadow = true;
            Wall101.receiveShadow = true;
            scene.add(Wall101)
      
      
            // HORIZONTAL LINE
      
            const Wall102 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 300),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall102.position.set(350, 50, 150);
            Wall102.castShadow = true;
            Wall102.receiveShadow = true;
            scene.add(Wall102);
            
      
      
      // ELEVEN AS IN LIKE SUBSECTIONS OF ELEVEN 11
            
             //VERTICAL LINE
             const Wall111 = new THREE.Mesh(
              new THREE.BoxGeometry(250, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall111.position.set(-380, 50, 100);
            Wall111.castShadow = true;
            Wall111.receiveShadow = true;
            scene.add(Wall111);
      
             // HORIZONTAL LINE
      
             const Wall112 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 100),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall112.position.set(-260, 50, 50);
            Wall112.castShadow = true;
            Wall112.receiveShadow = true;
            scene.add(Wall112);
      
            //VERTICAL LINE
            const Wall113 = new THREE.Mesh(
              new THREE.BoxGeometry(150, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x800000,
              }));
            Wall113.position.set(-330, 50, 0);
            Wall113.castShadow = true;
            Wall113.receiveShadow = true;
            scene.add(Wall113);
      
      
            // TWELVE AS IN LIKE SUBSECTIONS OF TWELVE 12
            
             //VERTICAL LINE
             const Wall121 = new THREE.Mesh(
              new THREE.BoxGeometry(600, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall121.position.set(200, 50, -100);
            Wall121.castShadow = true;
            Wall121.receiveShadow = true;
            scene.add(Wall121);
      
             // HORIZONTAL LINE
      
             const Wall122 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 200),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall122.position.set(180, 50, -100);
            Wall122.castShadow = true;
            Wall122.receiveShadow = true;
            scene.add(Wall122);
      
            // HORIZONTAL LINE
      
            const Wall123 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 100),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall123.position.set(-100, 50, -50);
            Wall123.castShadow = true;
            Wall123.receiveShadow = true;
            scene.add(Wall123);
      
      
            // THIRTEEN AS IN LIKE SUBSECTIONS OF THIRTEEN 13
            
             //VERTICAL LINE
             const Wall131 = new THREE.Mesh(
              new THREE.BoxGeometry(150, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall131.position.set(-330, 50, -100);
            Wall131.castShadow = true;
            Wall131.receiveShadow = true;
            scene.add(Wall131);
      
             // HORIZONTAL LINE
      
             const Wall132 = new THREE.Mesh(
              new THREE.BoxGeometry(10, 100, 400),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall132.position.set(-260, 50, -300);
            Wall132.castShadow = true;
            Wall132.receiveShadow = true;
            scene.add(Wall132);
      
            //VERTICAL LINE
            const Wall133 = new THREE.Mesh(
              new THREE.BoxGeometry(150, 100, 10),
              new THREE.MeshStandardMaterial({
                  color: 0x006400,
              }));
            Wall133.position.set(-180, 50, -300);
            Wall133.castShadow = true;
            Wall133.receiveShadow = true;
            scene.add(Wall133);
	
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(2000,2000, 10,10),
		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
		// See threejs.org/examples/ for other material types
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	
	// LIGHTS
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 10, 18*10000);
	light.position.set(100,500,0);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	// light.shadow.mapSize.width = 4096;
    // light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 5000.0;
    // light.shadow.camera.left = 5000;
    light.shadow.camera.right = -5000;
    // light.shadow.camera.top = 50;
    // light.shadow.camera.bottom = -50;
	scene.add(light);
	
	
	camera.position.set(600, 20, -100);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
	
	// Enable Shadows in the Renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;
	
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
