kaboom(); // adds the checkerboard background to start all the kaboom assets 

loadSprite("background", "./images/forest.jpg");
loadSprite("helicopter", "./images/helicopter.png");
loadSprite("water", "./images/waterballoon.png");
loadSprite("tree", "./images/tree.png");
loadSprite("burning-tree", "./images/burning-tree.png");
loadSprite("forest", "./images/new-background.png")

scene("start", () => {

  const backgroundImage = add([
    sprite("forest"),
    ]);

    const waterBalloon = add([
    sprite("water"), // sprite() component makes it render as a sprite
    pos(width()/2, height() / 2),
    anchor("center"),
    scale(1.5),
    ]);

  loadFont("speed", "./fonts/SpeedRush-JRKVB.ttf")

  const titleText = add([
    text("HeliQuench", {
      font: "speed", // Replace with the actual font you loaded
      size: 68, // Adjust the size as needed
      color: rgb(0, 1, 0.6), // Text color (white in this case)
    }),
    pos(width() / 2, height() / 3), // Adjust the position as needed
    anchor("center"),
    scale(1),
]);

  const enter = add([
    text("Press Enter to see Instructions", {
      font: "speed", 
      size: 68, 
      color: rgb(0, 1, 0.6), 
    }),
    pos(width() / 2, height() / 1.5), 
    anchor("center"),
    scale(0.8),
  ])

  onKeyPress("enter", () => {
    go("instructions");
  });
});

scene("instructions", () => {

  const backgroundImage = add([
    sprite("forest"),
  ]);

  const player = add([
    sprite("helicopter"), // sprite() component makes it render as a sprite
    pos(width()/2, height() /4),
    anchor("center"),
    scale(0.3, 0.3),
  ]);

  const spacebar = add([
    text("Press spacebar use water balloons", {
      font: "speed", // Replace with the actual font you loaded
      size: 40, // Adjust the size as needed
      color: rgb(0, 1, 0.6), // Text color (white in this case)
    }),
    pos(width() / 2, height() / 2.4), // Adjust the position as needed
    anchor("center"),
    scale(1),
  ])

  const movement = add([
    text("Press W, to move up, S to move down, A to move left, and D to move right", {
      font: "speed", // Replace with the actual font you loaded
      size: 40, // Adjust the size as needed
      color: rgb(0, 1, 0.6), // Text color (white in this case)
    }),
    pos(width() / 2, height() / 2), // Adjust the position as needed
    anchor("center"),
    scale(1),
  ])

  const enter = add([
    text("Press Enter to start game", {
      font: "speed", 
      size: 68, 
      color: rgb(0, 1, 0.6), 
    }),
    pos(width() / 2, height() / 1.5), 
    anchor("center"),
    scale(0.8),
  ])

  onKeyPress("enter", () => {
    go("game");
  });
})

go("start");

let score;

scene("game", () => {
  // Define player movement speed (pixels per second)
  // GAME VARIABLES 
  const SPEED = 320;
  let canSpawnWaterBalloon = true;
  // GAME OBJECTS 
  const background = add([
    sprite("forest"),
    scale(1),
  ]);

  const player = add([
    sprite("helicopter"), // sprite() component makes it render as a sprite
    pos(160, 140), // pos() component gives it position, also enables movement
    rotate(0), // rotate() component gives it rotation
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

  score = add([
    text("SCORE: 0", {
      font: "speed",
      size: 68,
      color: rgb(0, 1, 0.6),
    }),
    pos(24, 24),
    { value: 0 },
    color(255, 255, 255)
  ])

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

      waterBalloon.onCollide("fire", (fire) => {
        destroy(fire);
        destroy(waterBalloon);
        spawnNewObject(fire.pos); // Create a new object in place of the water balloon
        score.value += 1;
        score.text = "Score:" + score.value;
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
    go("game over")
  })
});

scene("game over", () => {
  const backgroundImage = add([
    sprite("forest"),
  ]);

  const gameOver = add([
    text("Game Over", {
      font: "speed",
      size: 68,
      color: rgb(0, 1, 0.6),
    }),
    pos(width() / 2, height() / 3),
    anchor("center"),
    scale(1),
  ]);

  const displayScore = add([
    text(`Score: ${score.value}`, {
      font: "speed",
      size: 68,
      color: rgb(0, 1, 0.6),
    }),
    pos(width() / 2, height() / 2),
    scale(1),
    anchor("center"),
  ])

  const enter = add([
    text("Press Enter to start game", {
      font: "speed", 
      size: 68, 
      color: rgb(0, 1, 0.6), 
    }),
    pos(width() / 2, height() / 1.5), 
    anchor("center"),
    scale(0.8),
  ])

  onKeyPress("enter", () => {
    go("game");
  });
});