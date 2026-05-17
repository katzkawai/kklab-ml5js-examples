let classifier;
let y = 240;
let label = "?";

function preload() {
  classifier = ml5.soundClassifier("SpeechCommands18w",
    { probabilityThreshold: 0.7 });
}

function setup() {
  createCanvas(400, 480);
  classifier.classifyStart(gotResult);
}

function draw() {
  background(220);
  fill(0, 100, 200);
  noStroke();
  circle(width / 2, y, 80);
  fill(0);
  textSize(20);
  text("最後の音声: " + label, 10, 30);
  textSize(13);
  fill(80);
  text("'up' / 'down' と発音してください", 10, 460);
}

function gotResult(results) {
  label = results[0].label;
  if (label === "up")    y = max(40,  y - 20);
  if (label === "down")  y = min(440, y + 20);
}
