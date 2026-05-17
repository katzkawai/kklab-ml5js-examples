let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);
  for (const pose of poses) {
    for (const [a, b] of connections) {
      const ka = pose.keypoints[a];
      const kb = pose.keypoints[b];
      if (ka.confidence > 0.2 && kb.confidence > 0.2) {
        stroke(0, 255, 200);
        strokeWeight(3);
        line(ka.x, ka.y, kb.x, kb.y);
      }
    }
    noStroke();
    fill(255, 0, 100);
    for (const kp of pose.keypoints) {
      if (kp.confidence > 0.2) circle(kp.x, kp.y, 8);
    }
  }
}
