import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


export function getCords(Wall){
     //first we need charater position;
    var newCords = Wall.geometry.vertices;
    var i;
    for(i = 0; i < newCords.length; i++){
        newCords[i].x +=Wall.position.x;
        newCords[i].y +=Wall.position.y;
        newCords[i].z +=Wall.position.z;
       // console.log(i,' ',newCords[i].x);
        

    }
   
   
    // assume charater position is:
    var position ={x: 10,y:20,z:30};
    // now create ranges not to pass
 

   //horizontal lower part
    // make ranges that cannot be passed;
   if(position.x >= newCords[7].x && position.x <= newCords[2].x ){
        if(position.z >= newCords[3].z && position.z <= newCords[2].z){

            // get back

        }
   }
  



}

