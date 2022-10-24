'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理を終了する
        return;
    }
    console.log(userName);

    //TODO 診断結果表示エリアの作成
    resultDivided.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName); //assessment関数に取得したuserNameを代入
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    tweetDivided.innerText = '';

    const anchor = document.createElement('a');
    const hrefValue =
        'https//twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('今日の運勢') + '&ref_src=twsrc%5Etfw'
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #今日の運勢';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

}
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick()
    }
}
const answers = [
    '{userName}さんの今日の運勢は☆☆☆☆☆です。今日はちょっとアクティブになってみましょう。そんなあなたのラッキーアイテムは電子メモです。',
    '{userName}さんの今日の運勢は☆☆☆☆です。いつもと違う。そんな1日になるかも？そんなあなたのラッキーアイテムはキーケースです。',
    '{userName}さんの今日の運勢は☆☆☆です。何か新しいことを一つ始めてみては？そんなあなたのラッキーアイテムは炭酸飲料です。',
    '{userName}さんの今日の運勢は☆☆です。ゆっくりと休憩時間をとってリフレッシュを。そんなあなたのラッキーアイテムはボールペンです。',
    '{userName}さんの今日の運勢は☆です。今日はなんだか調子が出ないかもしれません。ゆっくり行きましょう！そんなあなたのラッキーアイテムはシュシュです。',
    '{userName}さんの今日の運勢は☆☆☆☆☆です。今日はたくさん人と話してみて！そんなあなたのラッキーアイテムはリングピアスです。',
    '{userName}さんの今日の運勢は☆☆☆☆です。自分のために時間とお金を使うって大事！そんなあなたのラッキーアイテムはUピンです。',
    '{userName}さんの今日の運勢は☆☆☆です。久しぶりのあの人に電話を一本かけてみて。そんなあなたのラッキーアイテムはあなたの隣にいる大事な人です。',
    '{userName}さんの今日の運勢は☆☆です。大好きなスイーツを食べてエネルギーチャージを。そんなあなたのラッキーアイテムはリップクリームです。',
    '{userName}さんの今日の運勢は☆です。落ち込む1日でも大丈夫！明日がある！そんなあなたのラッキーアイテムは青いタオルです。',
    '{userName}さんの今日の運勢は☆☆☆☆☆です。そんなあなたのラッキーアイテムは緑のマーカーペンです。',
    '{userName}さんの今日の運勢は☆☆☆☆です。そんなあなたのラッキーアイテムはミントガムです。',
    '{userName}さんの今日の運勢は☆☆☆です。そんなあなたのラッキーアイテムは猫耳です。',
    '{userName}さんの今日の運勢は☆☆です。トラブっちゃったそんな日も意外とどうにかなるもの。そんなあなたのラッキーアイテムは恋愛小説です。',
    '{userName}さんの今日の運勢は☆です。そんなあなたのラッキーアイテムは飴玉です。',
    '{userName}さんの今日の運勢は☆☆☆☆☆☆です。そんなあなたのラッキーアイテムはティースプーンです。',
    '{userName}さんの今日の運勢は☆です。生きているだけでえらいですよ。そんなあなたのラッキーアイテムはカイロです。'
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return{string} 診断結果
 */

function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    const today = new Date();

    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i) * today.getDate();
    }

    //文字のコード番号の合計を解答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}

//テスト関数
/**console.assert(
    assessment('太郎')==='太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。'
    ,'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
*/

console.assert(
    assessment('太郎') === assessment('太郎')
    , '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
)
