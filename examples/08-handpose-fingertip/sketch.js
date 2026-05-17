let handPose, video, hands = [];

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  // flipped: true なので映像も鏡像表示
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  for (const h of hands) {
    const tip = h.index_finger_tip;  // 人差し指の先
    noStroke();
    fill(h.handedness === "Right" ? "red" : "blue");
    circle(tip.x, tip.y, 24);
  }
}
