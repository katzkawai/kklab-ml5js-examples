let bodySeg, video, seg;

function preload() {
  bodySeg = ml5.bodySegmentation("BodyPix",
    { maskType: "parts" });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodySeg.detectStart(video, (r) => { seg = r; });
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
  if (seg) image(seg.mask, 0, 0, width, height);
}
