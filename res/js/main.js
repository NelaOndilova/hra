class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.v = 5;
    this.a = 10;
    //velocity
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(keys) {
    if (keys["w"]) this.y -= this.v;
    if (keys["s"]) this.y += this.v;
    if (keys["a"]) this.x -= this.v;
    if (keys["d"]) this.x += this.v;
    if (keys[" "]) {
      this.w -= 2;
      this.h -= 2;
    }
    if (keys["k"]){
      if (keys["w"]) this.y -= this.a;
      if (keys["s"]) this.y += this.a;
      if (keys["a"]) this.x -= this.a;
      if (keys["d"]) this.x += this.a;
    }
  }
}

const myPlayer = new Player(10, 10, 50, 50, "red");

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const resizeCanvas = () => {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let keys = {};

//                             e.key = w, do keys se prida w: true
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

const gameLoop = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  //update
  myPlayer.update(keys);
  //draw
  myPlayer.draw(ctx);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);