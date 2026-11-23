# えいたんごれんしゅう

小学3年生向けの、A4印刷用・英単語練習プリントを作る静的Webアプリです。ジャンルを選ぶと印刷プレビューが開き、ブラウザからそのまま印刷できます。

公開URL: https://yamadalabojp.github.io/eitango-print/

## 使い方

1. 上のURLを開きます（タッチパネルでもマウスでも同じです）。
2. ジャンル（くだもの、やさい、どうぶつ、たべもの、いろ、きもち）をタップします。
3. A4のプレビューを確認します。単語が10語を超えるジャンルは、複数ページになります。見出しはページごとに付きます。
4. 「🖨 印刷する」を押して印刷します。
5. プレビューをタップするか、「もどる」でジャンル一覧に戻ります。

印刷ダイアログでは、次の設定にしてください。

- 余白: なし
- 倍率: 100%
- 背景のグラフィック: オン

名前などの個人情報を入力する欄はありません。

## 手元で開く

GitHub Pages と同じく、サイトルートを配信する必要があります（`file://` では `data/words.json` を読めません）。

```bash
python3 -m http.server 8765
```

ブラウザで http://localhost:8765/ を開きます。特定のジャンルは `http://localhost:8765/#Animals` のようにハッシュで直接開けます。

## 構成

```
index.html       画面（Vue 2.7 のテンプレート）
css/index.css    画面と A4 印刷レイアウト
js/index.js      ジャンル選択とページ分割
data/words.json  単語データ（唯一のデータ源）
.nojekyll        GitHub Pages で Jekyll を無効にする
```

ビルド工程はありません。Vue 2.7 と axios は CDN から読みます。

## データとイラスト

`data/words.json` は `{ genre, words: [{ en, ja, image }] }` の配列です。ジャンルは Fruits / Vegetables / Animals / Food / Colors / Emotion の6つです。

`image` はいらすとやの画像URL（`blogger.googleusercontent.com`）です。表示時にそのURLを読み込むだけで、画像ファイルはこのリポジトリに置いていません。公開リポジトリへの再配布を避けるため、画像をダウンロードしてコミットしないでください。

## GitHub Pages

Settings → Pages → Build and deployment で、Branch を `main`、Folder を `/ (root)` にします。ルートの `.nojekyll` により、Jekyll を通さずそのまま公開されます。反映まで1〜2分かかることがあります。
