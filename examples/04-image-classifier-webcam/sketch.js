let classifier;
let video;
let label = "推論中...";
let confidence = 0;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0);
  image(video, 0, 0, 640, 480);
  fill(255);
  textSize(24);
  text(label + "  (" + nf(confidence, 1, 2) + ")", 10, 510);
}

function gotResult(results) {
  label = results[0].label;
  confidence = results[0].confidence;
}
