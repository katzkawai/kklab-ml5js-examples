let classifier, video;
let label = "未予測";
let counts = { OK: 0, NG: 0 };
let trained = false;

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  const options = {
    task: "imageClassification",
    debug: true,
  };
  classifier = ml5.neuralNetwork(options);
}

// キー A:OK ラベル,キー B:NG ラベルでデータ収集
function keyPressed() {
  if (key === "a" || key === "A") {
    classifier.addData(video, ["OK"]);
    counts.OK++;
  }
  if (key === "b" || key === "B") {
    classifier.addData(video, ["NG"]);
    counts.NG++;
  }

  // T で学習開始
  if (key === "t" || key === "T") {
    if (counts.OK < 2 || counts.NG < 2) {
      label = "各ラベル 2 枚以上必要です";
      return;
    }
    label = "学習中...";
    classifier.normalizeData();
    classifier.train({ epochs: 30 }, () => {
      trained = true;
      label = "学習完了";
      console.log("学習完了");
    });
  }

  // P で予測
  if (key === "p" || key === "P") {
    if (!trained) { label = "先に [T] で学習してください"; return; }
    classifier.classify(video, (r) => {
      label = r[0].label + " " + nf(r[0].confidence, 1, 2);
    });
  }

  // S で保存
  if (key === "s" || key === "S") {
    if (!trained) { label = "学習後に保存可能"; return; }
    classifier.save("my-image-model");
  }
}

function draw() {
  image(video, 0, 0, 640, 480);
  fill(0, 200); noStroke(); rect(0, 480, width, 40);
  fill(255); textSize(15);
  text(`[A]OK(${counts.OK}) [B]NG(${counts.NG}) [T]Train [P]Predict [S]Save  →  ${label}`,
       10, 504);
}
