let bodySeg, video, seg;

function preload() {
  bodySeg = ml5.bodySegmentation("SelfieSegmentation",
    { maskType: "body" });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodySeg.detectStart(video, (r) => { seg = r; });
}

function draw() {
  background(0, 200, 0);                  // 緑バック
  if (seg) {
    // video 自身をマスクして人物のみ抜き出し、緑背景の上に重ねる
    video.mask(seg.mask);
    image(video, 0, 0, width, height);
  }
}
