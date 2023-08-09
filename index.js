kaboom(); // adds the checkerboard background to start all the kaboom assets 

loadSprite("background", "./images/forest.jpg");
loadSprite("helicopter", "./images/helicopter.png");
loadSprite("water", "./images/waterballoon.png");
loadSprite("tree", "./images/tree.png");
loadSprite("burning-tree", "./images/burning-tree.png");

scene("start", () => {
  loadFont()
  const bgColor = color(122, 48, 108);

  add([
    rect(width(), height()),
    bgColor,
    pos(width() / 2, height() / 2),
    anchor("center"),
  ]);

  const startGame = add([
    text("Press Enter to Continue", {
      transform: (idx, ch) => ({
        color: rgb(255, 255, 255),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, height() / 1.5),
    scale(0.75, 0.75),
    anchor("center"),
    area(),
  ]);

  const titleText = add([
    text("HeliQuench", {
      transform: (idx, ch) => ({
        color: rgb(255, 255, 255),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, startGame.pos.y / 2),
    scale(1.5),
    anchor("center"),
    area(),
  ])
  onKeyPress("enter", () => {
    go("game");
  });
});


go("start");

let score;

scene("game", () => {

every(1, () => {
    if (score.value >= 5) {
      go("You Win!"); // Transition to the "You Win!" scene when the score reaches 5
    }
  });
    }

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
    text("SCORE: 0"),
    pos(24, 24),
    { value: 0 },
    color(0, 90, 90)
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
        // if (score === 5) go("You win!")
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
  loadFont()
  const bgColor = color(122, 48, 108);

  add([
    rect(width(), height()),
    bgColor,
    pos(width() / 2, height() / 2),
    anchor("center"),
  ]);

  const retry = add([
    text("Press Enter to Try Again", {
      transform: (idx, ch) => ({
        color: rgb(255, 255, 255),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, height() / 1.5),
    scale(0.75, 0.75),
    anchor("center"),
    area(),
  ]);

  const titleText = add([
    text("Game Over", {
      transform: (idx, ch) => ({
        color: rgb(255, 255, 255),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, retry.pos.y / 2),
    scale(1.5),
    anchor("center"),
    area(),
  ])

c

  const displayScore = add([
    text(`Score: ${score.value}`, {
      transform: (idx, ch) => ({
        color: rgb(255, 255, 255),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, retry.pos.y / 1.5),
    scale(1.5),
    anchor("center"),
    area(),
  ])

  onKeyPress("enter", () => {
    go("game");
  });
  
  setInterval() => {
    if(gameOver) {
      
    }
  }
  
  
  // scene("You Win!", () => {
  //   loadFont()
  //   const bgColor = color(122, 48, 108);

  //   add([
  //     rect(width(), height()),
  //     bgColor,
  //     pos(width() / 2, height() / 2),
  //     anchor("center"),
  //   ]);

  //   const retry = add([
  //     text("Press Enter to Try Again", {
  //       transform: (idx, ch) => ({
  //         color: rgb(255, 255, 255),
  //         pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
  //         scale: wave(1, 1.2, time() * 3 + idx),
  //         angle: wave(-24, 9, time() * 3 + idx),
  //       }),
  //     }),
  //     pos(width() / 2, height() / 1.5),
  //     scale(0.75, 0.75),
  //     anchor("center"),
  //     area(),
  //   ]);

  //   const titleText = add([
  //     text("You Win!", {
  //       transform: (idx, ch) => ({
  //         color: rgb(255, 255, 255),
  //         pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
  //         scale: wave(1, 1.2, time() * 3 + idx),
  //         angle: wave(-24, 9, time() * 3 + idx),
  //       }),
  //     }),
  //     pos(width() / 2, retry.pos.y / 2),
  //     scale(1.5),
  //     anchor("center"),
  //     area(),
  //   ])

  //   const displayScore = add([
  //     text(`Score: ${score.value}`, {
  //       transform: (idx, ch) => ({
  //         color: rgb(255, 255, 255),
  //         pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
  //         scale: wave(1, 1.2, time() * 3 + idx),
  //         angle: wave(-24, 9, time() * 3 + idx),
  //       }),
  //     }),
  //     pos(width() / 2, retry.pos.y / 1.5),
  //     scale(1.5),
  //     anchor("center"),
  //     area(),
  //   ])

  //   onKeyPress("enter", () => {
  //     go("game");
  //   });
  // });








});
