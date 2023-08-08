kaboom(); // adds the checkerboard background to start all the kaboom assets 

loadSprite("background", "./images/forest.jpg");
loadSprite("helicopter", "./images/helicopter.png");
loadSprite("water", "./images/waterballoon.png");
loadSprite("tree", "./images/tree.png");
loadSprite("burning-tree", "./images/burning-tree.png");




// Define player movement speed (pixels per second)
// GAME VARIABLES 
const SPEED = 320;
let canSpawnWaterBalloon = true;

// GAME OBJECTS 


const background = add([
    sprite("background"),
    scale(2),
    
    
]);

const player = add([
	sprite("helicopter"),   // sprite() component makes it render as a sprite
	pos(160, 140),     // pos() component gives it position, also enables movement
	rotate(0),        // rotate() component gives it rotation
	anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
	scale(0.5), 
]);




onKeyDown("a", () => {
	// .move() is provided by pos() component, move by pixels per second
	player.move(-SPEED, 0)
})

onKeyDown("d", () => {
	player.move(SPEED, 0)
})

onKeyDown("w", () => {
	player.move(0, -SPEED)
})

onKeyDown("s", () => {
	player.move(0, SPEED)
})



onKeyDown("space", () => {
  if (canSpawnWaterBalloon) {
    canSpawnWaterBalloon = false; // Disable spawning while a water balloon is active

    const waterBalloon = add([
      sprite("water"),
      pos(player.pos.x, player.pos.y),
      scale(0.5),
      move(DOWN, 250),
      area(),
    ]);

    // After a delay, enable spawning again
    wait(1, () => {
      canSpawnWaterBalloon = true;
    })
    
    waterBalloon.onCollide("tree", (tree) => {
	  destroy(tree)
    })

        
  }
});

const tree = add([
    sprite("tree"),
    scale(1),
    pos(100, 500),
    area(),
    "tree",

]);

