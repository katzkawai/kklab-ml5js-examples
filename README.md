# kklab-ml5js-examples

[ml5.js](https://ml5js.org/) v1.3.1 のサンプルコード集です。GitHub Pages 上で 19 個のデモがブラウザだけで動作します。

🏠 **トップページ**: <https://katzkawai.org/kklab-ml5js-examples/>

## ライブサンプル一覧

凡例: 📷 カメラ / 🎤 マイク / 🖼 画像 / 🧠 ブラウザ学習

### 導入

| # | サンプル | 説明 | リソース |
|---|---------|------|---------|
| 01 | [バージョン確認](https://katzkawai.org/kklab-ml5js-examples/examples/01-version-check/) | `ml5.version` をキャンバスに表示する最小サンプル | — |
| 02 | [ウェブカメラ基本](https://katzkawai.org/kklab-ml5js-examples/examples/02-webcam-basic/) | `createCapture(VIDEO)` の最小例 | 📷 |

### 学習済みモデル ── 画像

| # | サンプル | 説明 | リソース |
|---|---------|------|---------|
| 03 | [静止画の画像分類](https://katzkawai.org/kklab-ml5js-examples/examples/03-image-classifier-static/) | 同梱の cat.jpg を MobileNet で分類 | 🖼 |
| 04 | [ウェブカメラ画像分類](https://katzkawai.org/kklab-ml5js-examples/examples/04-image-classifier-webcam/) | カメラ映像を連続分類 | 📷 |

### 学習済みモデル ── 姿勢・顔・身体

| # | サンプル | 説明 | リソース |
|---|---------|------|---------|
| 05 | [BodyPose キーポイント](https://katzkawai.org/kklab-ml5js-examples/examples/05-bodypose-keypoints/) | MoveNet で 17 関節キーポイント | 📷 |
| 06 | [BodyPose スケルトン](https://katzkawai.org/kklab-ml5js-examples/examples/06-bodypose-skeleton/) | `getSkeleton()` で骨格線 | 📷 |
| 07 | [右肘の角度計算](https://katzkawai.org/kklab-ml5js-examples/examples/07-bodypose-arm-angle/) | 肩・肘・手首の 3 点から角度 | 📷 |
| 08 | [HandPose 指先追跡](https://katzkawai.org/kklab-ml5js-examples/examples/08-handpose-fingertip/) | 人差し指の先端を色付き円で表示 | 📷 |
| 09 | [ピンチで描画](https://katzkawai.org/kklab-ml5js-examples/examples/09-handpose-pinch-draw/) | 親指と人差し指が接近すると軌跡を残す | 📷 |
| 10 | [FaceMesh 468 点表示](https://katzkawai.org/kklab-ml5js-examples/examples/10-facemesh-all-points/) | 顔ランドマーク全点 | 📷 |
| 11 | [目だけ匿名化](https://katzkawai.org/kklab-ml5js-examples/examples/11-facemesh-eye-mosaic/) | leftEye/rightEye をマスク | 📷 |
| 12 | [背景置換 (クロマキー)](https://katzkawai.org/kklab-ml5js-examples/examples/12-bodyseg-background/) | SelfieSegmentation + `video.mask()` | 📷 |
| 13 | [BodyPix 24 部位色分け](https://katzkawai.org/kklab-ml5js-examples/examples/13-bodyseg-parts/) | 部位ごとに虹色マスク | 📷 |

### 学習済みモデル ── 音声・テキスト

| # | サンプル | 説明 | リソース |
|---|---------|------|---------|
| 14 | [音声で円を上下に](https://katzkawai.org/kklab-ml5js-examples/examples/14-soundclassifier-voice/) | "up"/"down" と発音 (SpeechCommands18w) | 🎤 |
| 15 | [感情極性スライダー](https://katzkawai.org/kklab-ml5js-examples/examples/15-sentiment-slider/) | 英文をタイプすると肯定度を可視化 | — |

### 自前モデル学習(ブラウザ内学習)

| # | サンプル | 説明 | リソース |
|---|---------|------|---------|
| 16 | [色名分類器 (分類)](https://katzkawai.org/kklab-ml5js-examples/examples/16-nn-color-classifier/) | 9 件の学習で色を予測 | 🧠 |
| 17 | [住宅価格 (回帰)](https://katzkawai.org/kklab-ml5js-examples/examples/17-nn-housing-regression/) | 床面積と部屋数 → 価格 | 🧠 |
| 18 | [カメラ 2 クラス転移学習](https://katzkawai.org/kklab-ml5js-examples/examples/18-nn-imageclass-webcam/) | [A]OK/[B]NG/[T]学習/[P]予測/[S]保存 | 📷🧠 |
| 19 | [神経進化 Flappy 風](https://katzkawai.org/kklab-ml5js-examples/examples/19-neuroevolution-flappy/) | 50 個体の遺伝的アルゴリズム + NN | 🧠 |

## 注意事項

- 初回ロードはモデルのダウンロード (数 MB〜) のため数秒〜数十秒かかります。
- カメラ/マイクを使うサンプルは初回起動時に許可ダイアログが出ます。
- GitHub Pages は HTTPS なのでカメラ・マイクは正常に動作します(ローカルで開く場合は `http://localhost` 経由で配信してください)。
- 17 (回帰) は `debug: true` 指定により tfvis の学習グラフがブラウザ右側に開きます。

## ローカルで試す

```bash
git clone https://github.com/katzkawai/kklab-ml5js-examples.git
cd kklab-ml5js-examples
python3 -m http.server 8080
# ブラウザで http://localhost:8080/ を開く
```

## ライセンス

MIT ライセンス相当で自由に再利用できます。
