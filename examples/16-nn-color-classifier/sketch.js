let classifier;
let label = "学習前";

function setup() {
  createCanvas(400, 400);
  ml5.setBackend("webgl");

  // 1) モデル定義
  const options = {
    task: "classification",
    debug: true,            // 学習グラフを表示
  };
  classifier = ml5.neuralNetwork(options);

  // 2) データ投入
  const training = [
    { xs: [255,   0,   0], ys: ["red"] },
    { xs: [200,  20,  20], ys: ["red"] },
    { xs: [180,  60,  40], ys: ["red"] },
    { xs: [  0, 255,   0], ys: ["green"] },
    { xs: [ 30, 200,  20], ys: ["green"] },
    { xs: [ 60, 180,  60], ys: ["green"] },
    { xs: [  0,   0, 255], ys: ["blue"] },
    { xs: [ 30,  60, 200], ys: ["blue"] },
    { xs: [ 50,  60, 180], ys: ["blue"] },
  ];
  for (const t of training) classifier.addData(t.xs, t.ys);

  // 3) 正規化
  classifier.normalizeData();

  // 4) 学習
  classifier.train(
    { epochs: 50, batchSize: 4 },
    finishedTraining
  );
}

function finishedTraining() {
  label = "学習完了。クリックで予測。";
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  const c = get(mouseX, mouseY);     // クリックした画素の RGBA を取得
  classifier.classify([c[0], c[1], c[2]], (results) => {
    label = "予測: " + results[0].label
          + " (" + nf(results[0].confidence, 1, 2) + ")";
  });
}

function draw() {
  background(255);
  // パレットを描く
  noStroke();
  for (let i = 0; i < width; i++) {
    stroke(map(i, 0, width, 0, 255), 100, 200);
    line(i, 0, i, 200);
  }
  for (let i = 0; i < width; i++) {
    stroke(0, map(i, 0, width, 0, 255), 100);
    line(i, 200, i, 300);
  }
  for (let i = 0; i < width; i++) {
    stroke(50, 50, map(i, 0, width, 0, 255));
    line(i, 300, i, 400);
  }
  noStroke();
  fill(0, 200); rect(0, 0, width, 28);
  fill(255); textSize(14);
  text(label, 10, 20);
}
