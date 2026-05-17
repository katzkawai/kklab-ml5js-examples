// チュートリアル雛形を、実際にパイプを潜り抜ける Flappy 風 NE デモに拡張
const POP_SIZE = 50;
const GRAVITY = 0.4;
const JUMP = -7;
const PIPE_SPEED = 3;
const GAP_SIZE = 140;

let population = [];
let pipes = [];
let generation = 0;
let frameCount2 = 0;
let bestScore = 0;

function setup() {
  createCanvas(600, 400);
  ml5.setBackend("cpu");  // 多数の小さな NN は cpu の方が安定
  for (let i = 0; i < POP_SIZE; i++) population.push(new Agent());
  spawnPipe();
}

function draw() {
  background(10, 10, 30);
  frameCount2++;
  if (frameCount2 % 90 === 0) spawnPipe();

  // パイプ更新
  for (const p of pipes) p.update();
  pipes = pipes.filter(p => p.x + p.w > 0);

  // パイプ描画
  for (const p of pipes) p.show();

  // 個体更新・描画
  let aliveCount = 0;
  for (const a of population) {
    if (!a.dead) {
      a.think(pipes);
      a.update(pipes);
      a.show();
      aliveCount++;
    }
  }

  // HUD
  fill(255); noStroke(); textSize(14);
  text(`Gen: ${generation}  Alive: ${aliveCount}/${POP_SIZE}  Best: ${bestScore}`, 10, 20);

  // 全員死んだら次世代
  if (aliveCount === 0) nextGeneration();
}

function spawnPipe() {
  pipes.push(new Pipe());
}

class Pipe {
  constructor() {
    this.x = width;
    this.w = 50;
    this.gapY = random(80, height - 80 - GAP_SIZE);
  }
  update() { this.x -= PIPE_SPEED; }
  show() {
    fill(60, 160, 80);
    noStroke();
    rect(this.x, 0, this.w, this.gapY);
    rect(this.x, this.gapY + GAP_SIZE, this.w, height - (this.gapY + GAP_SIZE));
  }
  hits(y) {
    if (y < this.gapY || y > this.gapY + GAP_SIZE) return true;
    return false;
  }
}

class Agent {
  constructor(brain) {
    this.x = 100;
    this.y = height / 2;
    this.vy = 0;
    this.dead = false;
    this.score = 0;
    this.r = 10;
    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: 5,             // y, vy, pipe距離, ギャップ上端, ギャップ下端
        outputs: ["jump", "stay"],
        task: "classification",
        neuroEvolution: true,
      });
    }
  }

  nextPipe() {
    for (const p of pipes) {
      if (p.x + p.w > this.x) return p;
    }
    return null;
  }

  think(_pipes) {
    const p = this.nextPipe();
    if (!p) return;
    const inputs = [
      this.y / height,
      (this.vy + 10) / 20,
      (p.x - this.x) / width,
      p.gapY / height,
      (p.gapY + GAP_SIZE) / height,
    ];
    const r = this.brain.classifySync(inputs);
    if (r[0].label === "jump") this.vy = JUMP;
  }

  update(_pipes) {
    if (this.dead) return;
    this.vy += GRAVITY;
    this.y += this.vy;
    if (this.y < 0 || this.y > height) this.dead = true;
    const p = this.nextPipe();
    if (p && p.x < this.x + this.r && p.x + p.w > this.x - this.r) {
      if (p.hits(this.y)) this.dead = true;
    }
    this.score++;
    if (this.score > bestScore) bestScore = this.score;
  }

  show() {
    if (this.dead) return;
    noStroke();
    fill(255, 220, 0, 150);
    circle(this.x, this.y, this.r * 2);
  }
}

function nextGeneration() {
  generation++;
  // 適応度でソート
  population.sort((a, b) => b.score - a.score);
  const survivors = population.slice(0, 10);
  const newPop = [];
  for (let i = 0; i < POP_SIZE; i++) {
    const p1 = random(survivors).brain;
    const p2 = random(survivors).brain;
    const childBrain = p1.crossover(p2);
    childBrain.mutate(0.1);
    newPop.push(new Agent(childBrain));
  }
  // 旧 brain を破棄
  for (const a of population) a.brain.dispose();
  population = newPop;
  pipes = [];
  frameCount2 = 0;
  spawnPipe();
}
