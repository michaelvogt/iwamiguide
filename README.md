[日本語版は下記です] (https://github.com/michaelvogt/iwamiguide/blob/master/README.md#石見銀山-ar-アプリ-企画)

# Iwami Ginzan AR app proposal
2017.07.05

Michael Vogt
ar@michaelvogt.eu


## Overview

Iwami Iwami Ginzan is a historic silver mine area, registered as a World Heritage site in 2007, in Shimane prefecture in Japan, In an area of over 500ha there are many relicts from its over 700 years of mining history.

Japan. While volunteering in the closeby Ohda, Michael Vogt had the opportunity to get to know Iwami Ginzan a little bit. This let to this document, reflecting on what he learned and how the then upcoming next big wave of Augmented Reality (AR) could be used to address some of the problems I heard about.

In short, people working around the tourist services would like that more visitors, especially international visitors, visit Iwami Ginzan. While there are very obvious reasons for the lack of visitors (almost no places to stay closeby, hard to find information about why to go there in the first place, no english speaking staff), they haven't been addressed since last year. Repeaters are sparse, because the things to do on offer are uninspiring.

Since the above mentioned document was written, I had many more chances to talk with people around Iwami Ginzan. Most regard the proposed application helpful and good to have. In addition to that, AR technology has improved a lot. 

This motivated me to write down this more specific plan on what would be needed for such an application and what its features could be.

## Goals
- Provide better access to information about Iwami Ginzan for people researching for their next holiday trip at home. People need to understand easily why to travel to Iwami Ginzan and what to do there. 

- Provide access to the information about all the historic places in the area via a progressive web application (PWA), which can be used with a PC, notebook, tablet and smartphone. Also works offline.

- When interested to visit Iwami Ginzan, allow people to plan the trip at home with their home computer, then access this plan on location from a smartphone - either with their own or with one rented from local rental stations (not available right now).

- Provide an immersive experience on location using smartphone's sensors (Compass, GPS) and new AR technologies like Tango from Google or the ARKit from Apple.

- Let users of the application ask questions through an AI supported (i.e. Google Actions) chat service. Be it for additional historical information about the place they currently are, or for directions.

- Allow visitors to follow up on their visit, giving easy access to information of the places they visited. Offer push notifications for updated information.

- Support tour guides with their explanations with a special password protected area, containing targeted visualisations and animations.
No installation necessary for the application itself, with Device inspection done remotely. 

- Keep the whole setup as flexible as possible, so it can possibly be used in comparable places like Hiraizumi, Kumano kodo and Yakushima. Internationally, maybe Grand Canyon and Machu Picchu.

- The application will be developed in the open as open source, being owned by the local community.

# AR use

AR came a long way since last year, but it's still difficult to really understand how and where it can be applied usefully. Because of this, the following are just the first ideas for discussion on how to use it in the context of this application. I'm sure many more possibilities exist.

Very important is, that no special markers will be needed for this AR functionality, and it is not necessary to stay at a fixed point to make it work.

## Information access
While GPS will be used to make it as easy as possible to offer general information about a certain place. Tabbing on an AR overlay will provide more information about that specific element. For example about a historical building or a sign post. Also, when tabbing on a japanese language information board, its contents could be displayed in a different language on screen.

## Orientation/Navigation
When searching for the next parking spot, rest area, information point or rest room, the application could show an interactive map with the respective places highlighted. 
While on a tour, the path to the next POI could be displayed on screen as a line, as known from Google street view.

## Building overlay
Display historical buildings that aren't existing anymore. For example the castles or the houses at Ishigane residential area.

## See through
Some areas are restricted or inaccessible. To allow visitor still get to know them, for example walls of a house could become semi transparent, unveiling the internals.


ー

# 石見銀山 AR アプリ 企画
2017.07.09

Michael Vogt
ar@michaelvogt.eu


## 概要

石見銀山は2007年に世界遺産に登録された歴史的な銀山地域です。500ヘクタール以上の面積で700年以上にわたる鉱業の歴史があり、多くの遺跡があります。
　
去年大田市でボランティア活動した北斗さんは、その時に石見銀山を少し知る事ができました。そしてその時耳にしたいくつかの問題点に対して、今注目を集めている拡張現実（ＡＲ）を活用できるのではないかと考え、この企画を提案することにしました。
　
観光業に携わる人たちは、より多くの観光客、特に外国人観光客に石見銀山を訪問してもらいたいと考えています。観光者数が増えないのには、明白な理由があるのです（宿泊施設の不足、石見銀山を訪れたくなるような情報の不足、英語のできるスタッフの不足）が、昨年来、十分な取り組みがなされていません。観光客がそそられるようなイベントなどもないのでリピーターの数も増えません。
　
この企画書が書かれてから、アプリを介して石見銀山に関わる人たちと話をする機会が何度もありました。だいたいみなさん役に立っていてと欲しいと言いました。さらにAR技術も大きく進化しています。
　
このようなことをきっかけに、アプリ作成に何が必要なのか、どんな機能が可能となるのかなど、より詳しい内容をこの企画書にまとめました。

## 目的

- 家に居たままで休みの計画のために献策する人々に石見銀山の情報を分かりやすくて楽しい情報を与えます。どうやって石見銀山に行くとか、そこで何ができるかなどがかんたんに分かるのです。

- 歴史的な場所の情報を全部プログレッシブ ウェブアプリ（PWA）でアクセスできを与えます。これはパソコンやノートパソコンやタブレットやスマートフォンで使えます。オフラインでも使えます。

- 石見銀山見学に興味を持ったら、家のパソコンで訪問の計画練ることができます。訪問する時にその計画をスマートフォンで見る事がきます。スマートフォンとは自分のとか貸しけいたいです（貸しけいたいはまだありません）。

- スマートフォンのセンサーを使って石見銀山で没入感のある体験ができます。センサーとはコンパスやGPSです。そして新しい技術とはGoogle TangoとかApple ARkitです。

- アプリを使いながら石見銀山の地域にハイキングすると人工知能（AI、例えばGoogle Actions(en)）チャットで質問を聞くこともできます。たとえば今いるところの情報とか次の目的地への歩き方です。

- 石見銀山に行った後、家で行ったところの情報がもう一度かん新しい情報を示してくれましたらプッシュ通知でお知らせします。

- ツアーガイドの説明が特別なパスワードで保護されたエリアで可視化とかアニメを使って手伝いします。

- アプリはインストールが必要ではありません。デバイス点検はリモートアクセスでします。

- 同じシステムは同等の場所でも使用することができるのために、システムはできる限りだけユニバーサルアプリケーションアーキテクチャで作ります。同等の場所は例えば平泉、熊野古道、屋久島などです。国際的に例えばGran CanyonとかMachu Picchuかもしれません。

- このアプリケーションはオープンソースとして開発され、地域社会が所有しています。

# AR技術の使い方
去年からAR技術は大向上した。しかし、その技術はまだ新しいので、何のためにどういった所で有効に使うのか、まだ誰もよくわかっていません。今あるのは、このアプリケーションがどういったものかという、初期のアイディアがあるだけです。他にも使える可能性が、たくさんあると思います。

重要な点は、このAR技術には特殊なマーカーを必要とせず、作動させるために、定点にいる必要がないことです。

## 情報アクセス
基本的な情報が出来る限りだけ簡単に見つけるのためにGPSも使えます。ARオーバーレイをタッチするとその物の詳しい情報を表せます。例えば、歴史的な建物とか道標。そして、日本語看板をタッチすると、その看板の内容は画面でほかの言葉を表せます。

## オリエンテーション ・ ンナビゲーション
もし次の駐車場とか休憩所とか案内所とか洗面所さがしたらアプリはその点を対話式の地図で表せます。
ツアー中に次のPOIまでの道は画面に線で表せます。Googleストリートビューのようです。

## 情報建物オーバーレイ
もういない歴史的な建物を昔にあったところで画面で表せます。例えばお城とか石銀集落の住宅地のたてものです。

## 情報見通す
いろんな所は立入禁止や険しいです。それでもその所を観光者に見せたいです。例えば建物の壁はスマートフォンの画面で半透明んにしたら、建物の中にも見えます。
