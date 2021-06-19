//This part of the code is responsible for creating the maze walls and stuff

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';



export function maze(scene){
    // MAZE DESIGN
  
    function Wall(Xgeometry,Ygeometry,Zgeometry,Xposition,Yposition,Zposition){
        var textureLoader = new THREE.TextureLoader();
        var wallTexture = textureLoader.load("wall/woodenwall.jpg");
            const wall = new THREE.Mesh(
                new THREE.BoxGeometry(Xgeometry,Ygeometry,Zgeometry),
                new THREE.MeshStandardMaterial({
                    color: 0x654321,
            map:wallTexture,
                }));
              wall.position.set(Xposition,Yposition,Zposition);
              wall.castShadow = true;
              wall.receiveShadow = true;
              scene.add(wall);
              //console.log(wall.position);
             
       // TheWall.push([Xposition,Zposition,Xgeometry,Zgeometry]);
      // TheWall.push(wall);

    }
    

    // NOTE : Wall(Xgeometry,Ygeometry,Zgeometry,Xposition,Yposition,Zposition);

          // ONE AS IN LIKE 1
		  Wall(1000, 100, 10, 0, 50, 500);
      
           // TWO AS IN LIKE 2
		   Wall(10, 100, 400, -500, 50, 300);
      
           // THREE AS IN LIKE 3
		   Wall(10, 100, 500, -500, 50, -250);
      
          // FOUR AS IN LIKE 4
		  Wall(10, 100, 400,500, 50, 300);
      
           // FIVE AS IN LIKE 5
		   Wall(10, 100, 500, 500, 50, -250);
      
          // SIX AS IN LIKE 6
          Wall(1000, 100, 10, 0, 50, -500);
      
          // HORIZONTAL LINE
            Wall(10, 100, 200,20, 50, -400);
      
          // SEVEN AS IN LIKE SUBSECTIONS OF SEVEN 7
            //HORIZONTAL LINE
            Wall(10, 100, 300,-100, 50, 350);
      
          // VERTICAL LINE
         Wall(200, 100, 10,0, 50, 350);
      
          // EIGHT AS IN LIKE SUBSECTIONS OF EIGHT 8
              // HORIZONTAL LINE
        Wall(10, 100, 400,200, 50, 300);
      
            // VERTICAL LINE
         Wall(300, 100, 10,50, 50, 100);
      
             // HORIZONTAL LINE
        Wall(10, 100, 200,20, 50, 100);
      
          // NINE AS IN LIKE SUBSECTIONS OF NINE 9
            //HORIZONTAL LINE
            Wall(10, 100, 200,-250, 50, 300);
      
            //VERTICAL LINE
            Wall(300, 100, 10,-250, 50, 200);
      
      // TEN AS IN LIKE SUBSECTIONS OF TEN 10
            
             //VERTICAL LINE
             Wall(150, 100, 10,430, 50, 100);
      
            // HORIZONTAL LINE
            Wall(10, 100, 300,350, 50, 150);
      
      // ELEVEN AS IN LIKE SUBSECTIONS OF ELEVEN 11
            
             //VERTICAL LINE
             Wall(250, 100, 10,-380, 50, 100);
      
             // HORIZONTAL LINE
            Wall(10, 100, 100,-260, 50, 50);
      
            //VERTICAL LINE
            Wall(150, 100, 10,-330, 50, 0);
      
            // TWELVE AS IN LIKE SUBSECTIONS OF TWELVE 12
            
             //VERTICAL LINE
             Wall(600, 100, 10,200, 50, -100);
      
             // HORIZONTAL LINE
            Wall(10, 100, 200,180, 50, -100);
      
            // HORIZONTAL LINE
      
            Wall(10, 100, 100,-100, 50, -50);
      
            // THIRTEEN AS IN LIKE SUBSECTIONS OF THIRTEEN 13
            
             //VERTICAL LINE
             Wall(150, 100, 10,-330, 50, -100);
      
             // HORIZONTAL LINE
            Wall(10, 100, 400,-260, 50, -300);
      
            //VERTICAL LINE
            Wall(150, 100, 10,-180, 50, -300);
	
}
