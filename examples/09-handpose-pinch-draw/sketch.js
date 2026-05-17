let handPose, video, hands = [];
let trail = [];

function preload() { handPose = ml5.handPose({ flipped: true }); }

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, (r) => { hands = r; });
  background(0);
}

function draw() {
  background(0, 30);                  // 残像のために半透明背景
  // flipped: true なので映像も鏡像表示
  push();
  translate(width, 0);
  scale(-1, 1);
  tint(255, 120);
  image(video, 0, 0, width, height);
  noTint();
  pop();

  for (const h of hands) {
    const idx = h.index_finger_tip;
    const thb = h.thumb_tip;
    const d = dist(idx.x, idx.y, thb.x, thb.y);
    if (d < 40) {                     // 指がピンチ状態
      trail.push({ x: idx.x, y: idx.y });
    }
  }
  noFill(); stroke(0, 255, 200); strokeWeight(4);
  beginShape();
  for (const p of trail) vertex(p.x, p.y);
  endShape();
}

function keyPressed() {
  if (key === "c" || key === "C") {
    trail = [];
    background(0);
  }
}
