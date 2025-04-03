class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.v = 5;
    this.a = 10;
    satisfies
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(keys) {
    if (keys["w"]) {
      if (this.y - this.v > 0){
        this.y -= this.v;
      }
    }
    if (keys["s"]){
      if (this.y + this.h + this.v < gameCanvas.height){
        this.y += this.v;
      }
    } 
    if (keys["a"]) {
      if (this.x - this.v > 0){
        this.x -= this.v;
      }
    }
    if (keys["d"]){
      if (this.x + this.w + this.v < gameCanvas.width){
        this.x += this.v;
      }
    }

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

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

const testObject = {
  w: 100,
  h: 100,
  x: 200,
  y: 300,
  c: "blue"
}

const gameLoop = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  myPlayer.update(keys); 

  myPlayer.draw(ctx);
  ctx.fillStyle = testObject.c;
  ctx.fillRect(testObject.x, testObject.y, testObject.w, testObject.h)
  checkCollision(myPlayer, testObject);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

const checkCollision = (object1, object2) =>{
  if(object1.x + object1.w > object2.x && object1.x < object2.x + object2.w && object1.y < object2.y + object2.h && object1.y + object1.h > object2.y){
    console.log("Collision detected, opinion rejected");
  } 
}