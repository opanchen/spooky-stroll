export class InputHandler {
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      // use arrow func to bind context
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = "PRESS left";
          break;
        case "ArrowRight":
          this.lastKey = "PRESS right";
          break;
        case "ArrowDown":
          this.lastKey = "PRESS down";
          break;
        case "ArrowUp":
          this.lastKey = "PRESS up";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      // use arrow func to bind context
      switch (e.key) {
        case "ArrowLeft":
          this.lastKey = "RELEASE left";
          break;
        case "ArrowRight":
          this.lastKey = "RELEASE right";
          break;
        case "ArrowDown":
          this.lastKey = "RELEASE down";
          break;
        case "ArrowUp":
          this.lastKey = "RELEASE up";
          break;
      }
    });
  }
}
