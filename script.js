const time = document.getElementById('time'); // HTMLの時間を表示する要素を取得
const startButton = document.getElementById('start'); // スタートボタン要素を取得
const stopButton = document.getElementById('stop'); // ストップボタン要素を取得
const resetButton = document.getElementById('reset'); // リセットボタン要素を取得

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
  // 現在の時間を取得し、開始時間と停止時間を考慮して計算
  const currentTime = new Date(Date.now() - startTime + stopTime);
  // 分を取得し、2桁の文字列にフォーマット
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  // 秒を取得し、2桁の文字列にフォーマット
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  // ミリ秒を取得し、1桁の文字列にフォーマット
  const ms = String(Math.floor(currentTime.getMilliseconds() / 100));

  // フォーマットした時間をHTMLに表示
  time.textContent = `${m}:${s}.${ms}`;
  // 10ミリ秒ごとにdisplayTime関数を再帰的に呼び出す
  timeoutID = setTimeout(displayTime);
}

// スタートボタンがクリックされたら時間を進める
startButton.addEventListener('click', () => {
  startButton.disabled = true; // スタートボタンを非活性化
  stopButton.disabled = false; // ストップボタンを活性化
  resetButton.disabled = true; // リセットボタンを非活性化
  startTime = Date.now(); // 現在の時間を開始時間として記録
  displayTime(); // 時間表示を開始
});

// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener('click', function() {
  startButton.disabled = false; // スタートボタンを活性化
  stopButton.disabled = true; // ストップボタンを非活性化
  resetButton.disabled = false; // リセットボタンを活性化
  clearTimeout(timeoutID); // タイムアウトをクリアして時間表示を停止
  stopTime += (Date.now() - startTime); // 経過時間を停止時間に加算
});

// リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener('click', function() {
  startButton.disabled = false; // スタートボタンを活性化
  stopButton.disabled = true; // ストップボタンを非活性化
  resetButton.disabled = true; // リセットボタンを非活性化
  time.textContent = '00:00.0'; // HTMLに初期値を設定
  stopTime = 0; // 停止時間を0にリセット
});
