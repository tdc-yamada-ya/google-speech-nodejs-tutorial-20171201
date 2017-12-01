# google-speech-nodejs-tutorial-20171201

Google Speech API を使用して音声認識を行うチュートリアルです。

## 必要なもの

* Node.js
* SoX
* Googleアカウント

## SoXのインストール

node-record-lpcm16 の記述を参考に SoX をインストールしてください。

https://github.com/gillesdemey/node-record-lpcm16

## Googleアカウントの準備

以下のURLを参考にサービスアカウントキーファイルをダウンロードして、
環境変数 `GOOGLE_APPLICATION_CREDENTIALS` に参照パスを設定してください。

https://cloud.google.com/speech/docs/getting-started?hl=ja

## 実行

```bash
npm install
npm start
```

http://localhost:3000 を開いてマイクに話しかけると認識結果が表示されます。
