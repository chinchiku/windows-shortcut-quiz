// data.js の中身

const shortcutData = {
  
// (data.js の中の shortcutData = { ... の中です)

  // Google Chrome のデータ (難易度レベル追加版)
  chrome: [
    // === タブとウィンドウの操作 ===
    { q: "新しいタブを開いて移動する", a: "Ctrl + T", level: 1 },
    { q: "新しいウィンドウを開く", a: "Ctrl + N", level: 1 },
    { q: "シークレット モードで新しいウィンドウを開く", a: "Ctrl + Shift + N", level: 2 },
    { q: "現在のタブを閉じる", a: "Ctrl + W", level: 1 },
    { q: "現在のウィンドウを閉じる", a: "Ctrl + Shift + W", level: 3 },
    { q: "閉じたタブを閉じた順序で再び開く", a: "Ctrl + Shift + T", level: 2 },
    { q: "開いている次のタブに移動する", a: "Ctrl + Tab", level: 2 },
    { q: "開いている前のタブに移動する", a: "Ctrl + Shift + Tab", level: 2 },
    { q: "左から(1～8番目)のタブに移動する", a: "Ctrl + 1 ～ 8", level: 3 },
    { q: "右端のタブに移動する", a: "Ctrl + 9", level: 3 },
    { q: "タブの検索を開く", a: "Ctrl + Shift + A", level: 3 },
    { q: "Google Chrome を終了する", a: "Alt + F4", level: 2 },

    // === ページ操作 ===
    { q: "ページを更新(再読み込み)する", a: "Ctrl + R (または F5)", level: 1 },
    { q: "キャッシュを無視してページを更新する", a: "Ctrl + Shift + R (または Shift + F5)", level: 3 },
    { q: "ページの読み込みを停止する", a: "Esc", level: 2 },
    { q: "ページ内検索を開く", a: "Ctrl + F (または F3)", level: 1 },
    { q: "ページ内検索: 次の候補に移動", a: "Ctrl + G", level: 2 },
    { q: "ページ内検索: 前の候補に移動", a: "Ctrl + Shift + G", level: 2 },
    { q: "ページを拡大する", a: "Ctrl + ＋", level: 1 },
    { q: "ページを縮小する", a: "Ctrl + －", level: 1 },
    { q: "ページの拡大率をリセットする", a: "Ctrl + 0", level: 1 },
    { q: "全画面表示のオン/オフ", a: "F11", level: 2 },
    { q: "ページの最上部に移動", a: "Home", level: 2 },
    { q: "ページの最下部に移動", a: "End", level: 2 },
    { q: "1画面分下にスクロール", a: "Space (または PgDn)", level: 2 },
    { q: "1画面分上にスクロール", a: "Shift + Space (または PgUp)", level: 3 },
    { q: "閲覧履歴で「前へ」", a: "Alt + ←", level: 1 },
    { q: "閲覧履歴で「次へ」", a: "Alt + →", level: 1 },
    { q: "ホームページを現在のタブで開く", a: "Alt + Home", level: 3 },

    // === Chromeの機能 ===
    { q: "アドレスバーに移動する", a: "Ctrl + L (または Alt + D, F6)", level: 1 },
    { q: "アドレスバーから検索 (デフォルト検索)", a: "Ctrl + K (または Ctrl + E)", level: 2 },
    { q: "現在のページをブックマークする", a: "Ctrl + D", level: 1 },
    { q: "開いているタブをすべてブックマーク(新しいフォルダ)", a: "Ctrl + Shift + D", level: 3 },
    { q: "ブックマーク バーの表示/非表示", a: "Ctrl + Shift + B", level: 2 },
    { q: "ブックマーク マネージャーを開く", a: "Ctrl + Shift + O", level: 3 },
    { q: "履歴ページを開く", a: "Ctrl + H", level: 2 },
    { q: "ダウンロード ページを開く", a: "Ctrl + J", level: 2 },
    { q: "閲覧履歴データを消去するダイアログを開く", a: "Ctrl + Shift + Delete", level: 2 },
    { q: "Chrome タスク マネージャーを開く", a: "Shift + Esc", level: 3 },
    { q: "デベロッパー ツールを開く", a: "Ctrl + Shift + I (または F12)", level: 2 },
    { q: "Chrome メニューを開く", a: "Alt + F (または Alt + E)", level: 2 },
    { q: "現在のページを印刷する", a: "Ctrl + P", level: 1 },
    { q: "現在のページを保存する", a: "Ctrl + S", level: 1 },
    { q: "ページのソースを表示する", a
