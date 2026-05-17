// 同一オリジンの画像なので CORS の問題なし
let classifier;
let img;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("cat.jpg");
}

function setup() {
  createCanvas(400, 400);
  image(img, 0, 0, width, height);
  classifier.classify(img, gotResult);
}

function gotResult(results, error) {
  if (error) {
    console.error(error);
    fill(255, 0, 0);
    textSize(14);
    text("Error: " + error, 10, 30);
    return;
  }
  // 上位 1 件を画面下部に表示
  fill(0, 200);
  noStroke();
  rect(0, height - 40, width, 40);
  fill(255);
  textSize(16);
  text(
    results[0].label + " (" + nf(results[0].confidence, 1, 2) + ")",
    10, height - 15
  );
}
