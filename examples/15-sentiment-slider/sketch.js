let sentiment;
let inp, score = 0.5;

function preload() {
  sentiment = ml5.sentiment("MovieReviews");
}

function setup() {
  createCanvas(640, 200);
  inp = createInput("This movie is fantastic!");
  inp.size(600);
  inp.position(20, 20);
  inp.input(updateScore);
  updateScore();
}

function updateScore() {
  // v1.x の predict は非同期。コールバックで結果を受け取る
  sentiment.predict(inp.value(), (r) => { score = r.confidence; });
}

function draw() {
  background(255);
  // 0=否定(赤), 1=肯定(緑)
  fill(lerpColor(color(220,0,0), color(0,180,0), score));
  noStroke();
  rect(20, 100, 600 * score, 40);
  // 枠
  noFill(); stroke(150);
  rect(20, 100, 600, 40);
  fill(0); noStroke(); textSize(18);
  text("肯定度: " + nf(score, 1, 3), 20, 90);
}
