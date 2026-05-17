let video;
let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  // flipped: true で出力座標が左右反転されるため、映像も鏡像表示
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i];
    for (let kp of pose.keypoints) {
      if (kp.confidence > 0.2) {
        fill(255, 0, 100);
        noStroke();
        circle(kp.x, kp.y, 10);
      }
    }
  }
}
