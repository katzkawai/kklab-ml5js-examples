let regressor;
let status = "学習データを準備中...";
let predictionMsg = "";

function setup() {
  createCanvas(640, 400);
  ml5.setBackend("webgl");

  const options = {
    inputs: ["sqft", "bedrooms"],
    outputs: ["price"],
    task: "regression",
    debug: true,
  };
  regressor = ml5.neuralNetwork(options);

  // ダミーデータ
  const data = [
    { xs: { sqft: 1000, bedrooms: 2 }, ys: { price:  220000 } },
    { xs: { sqft: 1200, bedrooms: 2 }, ys: { price:  260000 } },
    { xs: { sqft: 1500, bedrooms: 3 }, ys: { price:  320000 } },
    { xs: { sqft: 2000, bedrooms: 3 }, ys: { price:  430000 } },
    { xs: { sqft: 2500, bedrooms: 4 }, ys: { price:  520000 } },
    { xs: { sqft: 3000, bedrooms: 4 }, ys: { price:  610000 } },
  ];
  for (const d of data) regressor.addData(d.xs, d.ys);

  regressor.normalizeData();
  status = "学習中... (debug:true でグラフ表示)";
  regressor.train(
    { epochs: 100, batchSize: 2 },
    () => {
      status = "学習完了";
      regressor.predict({ sqft: 2200, bedrooms: 3 }, (res) => {
        const v = Math.round(res[0].value);
        predictionMsg = "2200ft² / 3BR の予測価格: $" + v.toLocaleString();
        console.log("2200ft^2 / 3BR の予測価格: $", res[0].value);
      });
    }
  );
}

function draw() {
  background(255);
  fill(20); textSize(16);
  text(status, 20, 30);
  if (predictionMsg) {
    fill(20, 100, 200); textSize(20);
    text(predictionMsg, 20, 80);
  }
  fill(100); textSize(12);
  text("※ tfvis のグラフがブラウザ右上に開きます (debug: true)", 20, height - 16);
}
