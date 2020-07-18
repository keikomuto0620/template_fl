# 静的HTML用テンプレート
- トップページ用のテンプレートを下層にコピーして、**json['home']** の値をページに合わせて書き換える。
- 各ページの設定は **/views/_data.json** に書く。

# CSSコーディングルール
## ブレイクポイント
- 768px スマホファースト（@media (min-width: 768px)）で記述
- その他補足的に480px、1000pxを設定

## マークアップ
- **セマンティクス、アクセシビリティ**を意識して行う。
- **余計なタグは記載しない**。できるだけシンプルな構造を心がける。
- HTMLバリデートを行う

## Sass
- ブレイクポイント、共通カラーコードはassets/scss/\_setting\.scss参照
- foundation,layoutは、下層ページコーディング時は**編集しない**
- 小さな単位のモジュール（ボタン、見出しなど）は object/component ディレクトリ内のファイルに記述
- ページ固有の要素、大きな塊のモジュールは object/project ディレクトリ内のファイルに記述
- ユーティリティクラスは object/utility ディレクトリ内のファイルに記述、基本的に**編集しない**
- **セレクタのネストはなるべく行わない**。深くても3階層まで。

## フォントサイズ
- ベースのフォントサイズは16px。下記mixinを使用する
- @include rem(16);
- レスポンシブフォントサイズ使用可（\_mixin.scss参照）

## フォントファミリー
- 游ゴシック体
- ie11のみメイリオ

# class 命名規則
## css設計
- FLOCCS + BEM
	- https://github.com/hiloki/flocss
	- https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1
- レイヤー接頭辞（l,c,p,u）-ページ固有接頭辞（ディレクトリ名）-block名\_\_element--modifier (例:p-news-card__body--a)
- 単語の区切りはハイフンつなぎ
- id属性はスタイリングに使用しない
- 大文字は使わない

## js用class 命名規則
- jsで扱うclasssにはスタイリングをしない。接頭辞js-をつけたclassを別途設定する
- #js-camelCase(ページ内の対象要素が一つのみのときはid属性を使う)
- .js-camelCase

## ステート
- .is-close
- .is-open
- .is-selected
- .is-active...etc

# 画像ファイル命名規則
## 接頭辞_ブロック名連番.拡張子 アンダースコアでつなぐ(例:img_card02.jpg)
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

