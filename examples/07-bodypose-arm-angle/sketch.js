let video;
let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose("MoveNet");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, (r) => { poses = r; });
}

function angleAt(a, b, c) {
  // b を頂点とする角 abc を度で返す
  const v1x = a.x - b.x, v1y = a.y - b.y;
  const v2x = c.x - b.x, v2y = c.y - b.y;
  const dot = v1x * v2x + v1y * v2y;
  const m1 = sqrt(v1x*v1x + v1y*v1y);
  const m2 = sqrt(v2x*v2x + v2y*v2y);
  return degrees(acos(dot / (m1 * m2)));
}

function draw() {
  image(video, 0, 0, width, height);
  if (poses[0]) {
    const k = poses[0].keypoints;
    // 右腕:肩(6),肘(8),手首(10)
    const s = k[6], e = k[8], w = k[10];
    if (s.confidence > 0.2 && e.confidence > 0.2 && w.confidence > 0.2) {
      stroke(0, 255, 200); strokeWeight(4); noFill();
      line(s.x, s.y, e.x, e.y);
      line(e.x, e.y, w.x, w.y);
      noStroke(); fill(255, 80, 80);
      circle(s.x, s.y, 12); circle(e.x, e.y, 12); circle(w.x, w.y, 12);
      const theta = angleAt(s, e, w);
      fill(0, 200); rect(0, 0, 260, 36);
      fill(255); textSize(18);
      text("右肘の角度: " + nf(theta, 1, 1) + " 度", 10, 25);
    }
  }
}
