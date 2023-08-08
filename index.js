kaboom(); // adds the checkerboard background to start all the kaboom assets 

loadSprite("background", "./images/forest.jpg");
loadSprite("helicopter", "./images/helicopter.png");
loadSprite("water", "./images/waterballoon.png");
loadSprite("tree", "./images/tree.png");
loadSprite("burning-tree", "./images/burning-tree.png");


scene("game", () => {

  // Define player movement speed (pixels per second)
  // GAME VARIABLES 
  const SPEED = 320;
  let canSpawnWaterBalloon = true;

  // GAME OBJECTS 


  const background = add([
    sprite("background"),
    scale(1.6),


  ]);

  const player = add([
    sprite("helicopter"), // sprite() component makes it render as a sprite
    pos(160, 140), // pos() component gives it position, also enables movement
    rotate(0), // rotate() component gives it rotation
    anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
    scale(0.5),
  ]);

  
  // let score = 0;
  // const scoreLabel = add([
  //   text(score),
  //   pos(24, 24),
  // ]);
  
  // onUpdate(() => {
  //   score++;
  //   scoreLabel.text = score;
  // });

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
    const score = 0;
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

      waterBalloon.onCollide("fire", (fire) => {
        destroy(fire);
        destroy(waterBalloon);

        spawnNewObject(fire.pos); // Create a new object in place of the water balloon
      })

    }
  });

  const protectTree = add([
    sprite("tree"),
    scale(0.7),
    pos(100, 400),
    area(),
    "protect",

  ]);

  function spawnTree() {
    add([
      sprite("burning-tree"),
      scale(0.7),
      pos(width(), height() + 10),
      anchor("botleft"),
      move(LEFT, 200),
      area(),
      "fire",
    ]);
    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  }

  spawnTree();

  function spawnNewObject(position) {
    const newObj = add([
      sprite("tree"),
      pos(position),
      scale(0.8),
    ]);
  }

  function spawnNewFireTree(position) {
    const newObj = add([
      sprite("burning-tree"),
      pos(position),
      scale(0.8),
    ]);
  }

  protectTree.onCollide("fire", () => {
    destroy(protectTree);
    spawnNewFireTree(protectTree.pos);

  })

});

go("game");
