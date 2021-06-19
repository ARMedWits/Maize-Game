import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

var TheWall = [];
export function WallArr(){
    return TheWall;
}
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
        TheWall.push([Xposition,Zposition,Xgeometry,Zgeometry]);

    }
    // NOTE : Wall(Xgeometry,Ygeometry,Zgeometry,Xposition,Yposition,Zposition);

        // ONE AS IN LIKE 1
		Wall(1000, 100, 10, 0, 50, 500);

        // TWO AS IN LIKE 2
		Wall(1000, 100, 10, 0, 50, -500);

        // THREE AS IN LIKE 3
		Wall(10,100,500,500,50,250);
      
        // FOUR AS IN LIKE 4
		Wall(10,100,400,500,50,-300);
      
        // FIVE AS IN LIKE 5
		Wall(10,100,500,-500,50,-250);

        // SIX AS IN LIKE 6
        Wall(10, 100, 400,-500,50,300);

        // SEVEN AS IN LIKE SEVEN
            Wall(10, 100,500,200,50,0);
      
          // EIGHT AS IN LIKE EIGHT 8
            //HORIZONTAL LINE
            Wall(10,100,250,0,50,150);
      
          // NINE AS IN LIKE 9
         Wall(10,100,100,0,50,-325);
      
          // TEN AS IN LIKE 10
        Wall(10,100,100,300,50,-325);
      
         // ELEVEN AS IN LIKE ELEVEN
         Wall(10,100,250,-300,50,-370);
      
         // TWELVE 
            Wall(300,100,10,150,50,-350);
      
          // THIRTEEN
            Wall(10,100,110,450,50,-450);
      
            // FOURTEEN
            Wall(10,100,250,450,50,-225);
      
             // FIFTEEN
             Wall(150,100,10,375,50,-360);
      
            // SIXTEEN
            Wall(60,100,10,475,50,-100);
            
             //SEVENTEEN
             Wall(200,100,10,400,50,0);
      
             // EIGHTEEN
            Wall(10,100,150,300,50,-75);
      
            // NINETEEN
            Wall(300,100,10,150,50,-150);
      
             // TWENTY
             Wall(150,100,10,425,50,300);
      
             // TWENTY ONE
            Wall(160,100,10,300,50,150);
      
            // TWENTY TWO
            Wall(300,100,10,-150,50,30);
      
             // TWENTY THREE
            Wall(250,100,10,-300,50,300);
      
            /*//VERTICAL LINE
            Wall(150, 100, 10,-180, 50, -300);
        */

        // HORIZONTAL LINE

}