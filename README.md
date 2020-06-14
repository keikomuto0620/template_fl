# 静的HTML用テンプレート
- トップページ用のテンプレートを下層にコピーして、**json['home']** の値をページに合わせて書き換える。
- 各ページの設定は **/views/_data.json** に書く。

# CSSコーディングルール
## ブレイクポイント
- 768px スマホファースト（@media (min-width: 768px)）で記述
- その他補足的に480px、1000pxを設定

## sass
- ブレイクポイント、共通カラーコードはassets/scss/\_setting\.scss参照
- 小さな単位のモジュール（ボタン、見出しなど）は object/component ディレクトリ内のファイルに記述
- ページ固有の要素、大きな塊のモジュールは object/project ディレクトリ内のファイルに記述
- ユーティリティクラスは object/utility ディレクトリ内のファイルに記述、基本的に編集しない

## フォントサイズ
- ベースのフォントサイズは16px。下記mixinを使用すること
- @include rem(16);
- レスポンシブフォントサイズ使用可（\_mixin.scss参照）

## フォントファミリー
- 游ゴシック体

# class 命名規則
## css設計
- FLOCCS + BEM
	- https://github.com/hiloki/flocss
	- https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1
- レイヤー接頭辞（l,c,p,u）-ページ固有接頭辞（news,listなどディレクトリ名）-block名\_\_element--modifier
- 単語の区切りはハイフンつなぎ
- id属性はスタイリングに使用しない
- 大文字は使わない

## js制御
- #js-camelCase(ページ内の対象要素が一つのみのときはid属性を使う)
- .js-camelCase

## ステート
- .is-open

# 画像ファイル命名規則
## 接頭辞_ブロック名_連番.拡張子 アンダースコアでつなぐ
- logo_
- img_
- bg_
- txt_
- ico_
- btn_
- bnr_

# 不要ファイル
- アンダーバー付与（scss、\_inc以外）
- delディレクトリ内のファイル

# jsプラグインなど
- main.js メインの設定ファイル 全ページ共通設定 → 各ページ個別の順で記述
- ofi.min.js(object-fitプロパティ ie11用ポリフィル)
- stickyfill.min.js(display:sticky ie11用ポリフィル)
- intersection-observer.js(要素の交差監視API ie11用ポリフィル)

# サーバー起動（browser-sync）、Sassコンパイル環境
1. node.js + gulpをグローバルインストール
2. npm iでパッケージをインストール
3. gulpfile.jsがあるディレクトリでターミナル起動
4. コマンド： gulp

