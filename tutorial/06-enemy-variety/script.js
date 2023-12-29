document.addEventListener("DOMContentLoaded", function () {
  //todo change event to 'load'
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 500; //time between adding each enemy to the game
      this.enemyTimer = 0;
      this.enemyTypes = ["worm", "ghost", "spider"];
    }

    update(deltaTime) {
      this.enemies = this.enemies.filter((object) => !object.markeForDelition);

      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((object) => object.update(deltaTime));
    }

    draw() {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }

    #addNewEnemy() {
      const randomEnemy =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

      if (randomEnemy === "worm") this.enemies.push(new Worm(this));
      else if (randomEnemy === "ghost") this.enemies.push(new Ghost(this));
      else if (randomEnemy === "spider") this.enemies.push(new Spider(this));

      //   this.enemies.sort((a, b) => a.y - b.y);
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markeForDelition = false;
      this.frameX;
      this.maxFrame = 5; // qty of sprite image frames
      this.frameInterval = 100; // 100 ms
      this.frameTimer = 0;
    }

    update(deltaTime) {
      this.x -= this.vx * deltaTime;

      if (this.x < 0 - this.width) this.markeForDelition = true;

      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;

        this.frameTimer += deltaTime;
      } else {
        this.frameTimer += deltaTime;
      }
    }

    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);

      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = this.game.height - this.height;
      this.image = worm; // not an error 'cause there is an element with id "worm" - that works as a global variable
      this.vx = Math.random() * 0.1 + 0.1; // speed for horizontal movement
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);

      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.6;
      this.image = ghost; // not an error 'cause there is an element with id "ghost" - that works as a global variable
      this.vx = Math.random() * 0.2 + 0.1; // speed for horizontal movement
      this.angle = 0;
      this.curve = Math.random() * 3; // smth like a range of sinus wave for movement
    }

    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.7; // add opacity for ghosts

      super.draw(ctx);

      ctx.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);

      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = Math.random() * this.game.width;
      this.y = 0 - this.height;
      this.image = spider; // not an error 'cause there is an element with id "spider" - that works as a global variable
      this.vx = 0; // speed for horizontal movement
      this.vy = Math.random() * 0.1 + 0.1; // speed for vertical movement
      this.maxLength = Math.random() * this.game.height; // maximum movement range
    }

    update(deltaTime) {
      super.update(deltaTime);

      if (this.y < 0 - this.height * 2) this.markeForDelition = true;

      this.y += this.vy * deltaTime;

      if (this.y > this.maxLength) this.vy *= -1;
    }

    draw(ctx) {
      ctx.beginPath(); // to draw a spider-web
      ctx.moveTo(this.x + this.width / 2, 0);
      ctx.lineTo(this.x + this.width / 2, this.y + 10);
      ctx.stroke();

      super.draw(ctx);
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);

  let lastTime = 1;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    // some code
    requestAnimationFrame(animate);
  }

  animate(0);
});
