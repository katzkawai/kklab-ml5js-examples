let faceMesh, video, faces = [];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, refineLandmarks: false, flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, (r) => { faces = r; });
}

function draw() {
  // flipped: true なので映像も鏡像表示
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  noStroke();
  fill(0, 255, 0);
  for (const f of faces) {
    for (const kp of f.keypoints) {
      circle(kp.x, kp.y, 2);
    }
  }
}
