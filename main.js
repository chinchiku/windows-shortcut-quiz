// main.js の中身

// ページが読み込まれたときに実行される処理
document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------
    // ① トップページ(index.html)にいる場合の処理
    // -------------------------------------------------
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            // 選ばれたカテゴリとモードを取得
            const category = document.getElementById('category-select').value;
            const mode = document.getElementById('mode-select').value;

            // 取得した設定をブラウザの一時保存領域(localStorage)に保存
            // これで study.html に設定を引き継げます
            localStorage.setItem('studyCategory', category);
            localStorage.setItem('studyMode', mode);

            // 学習ページに移動
            window.location.href = 'study.html';
        });
    }

    // -------------------------------------------------
    // ② 学習ページ(study.html)にいる場合の処理
    // -------------------------------------------------
    const studyArea = document.getElementById('study-area');
    if (studyArea) {
        // localStorageから設定を読み出す
        const category = localStorage.getItem('studyCategory');
        const mode = localStorage.getItem('studyMode');

        // カテゴリ名（日本語）を取得
        const categoryName = {
            chrome: "Google Chrome",
            slides: "Google スライド",
            sheets: "Google スプレッドシート"
        }[category];
        
        // モード名（日本語）を取得
        const modeName = (mode === 'quiz') ? "クイズ形式" : "フラッシュカード形式";

        // タイトルを設定
        document.getElementById('study-title').textContent = `${categoryName} - ${modeName}`;

        // 問題データを取得
        // ※ ...（スプレッド構文）で元の配列をコピーしています（元のデータを変更しないため）
        let questions = [...shortcutData[category]];
        
        // 問題をシャッフル
        shuffleArray(questions);
        
        let currentQuestionIndex = 0; // 現在の問題番号

        // === 画面表示用の要素を取得 ===
        const questionText = document.getElementById('question-text');
        const answerText = document.getElementById('answer-text');
        const quizOptions = document.getElementById('quiz-options');
        const showAnswerBtn = document.getElementById('show-answer-btn');
        const nextBtn = document.getElementById('next-btn');


        // --- モードに応じて初期設定 ---
        if (mode === 'quiz') {
            // クイズモード
            nextBtn.style.display = 'none'; // 次へボタンは隠す
            showAnswerBtn.style.display = 'none'; // 答えを見るボタンも隠す
            loadQuizQuestion();

        } else {
            // フラッシュカードモード
            studyArea.classList.add('flashcard-mode'); // カードをクリック可能にするCSSを適用
            quizOptions.style.display = 'none'; // クイズ選択肢は使わない
            nextBtn.style.display = 'none'; // 次へボタンは隠す
            showAnswerBtn.style.display = 'block'; // 答えを見るボタンを表示
            loadFlashcard();

            // 「答えを見る」ボタンの処理
            showAnswerBtn.addEventListener('click', showAnswer);
            // カード（study-area）自体をクリックしても答えを表示
            studyArea.addEventListener('click', showAnswer);
        }

        // --- 「次の問題へ」ボタンの処理 ---
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                // 全問終了
                alert("全問終了です！お疲れ様でした。");
                // 問題を再度シャッフルして最初から
                shuffleArray(questions);
                currentQuestionIndex = 0;
            }
            
            // 次の問題を読み込む
            if (mode === 'quiz') {
                loadQuizQuestion();
            } else {
                loadFlashcard();
            }

            // 状態をリセット
            resetCard();
        });


        // ---------------------------------
        // === 処理で使う関数群 ===
        // ---------------------------------

        // ■ クイズの問題を読み込む関数
        function loadQuizQuestion() {
            resetCard();
            quizOptions.style.display = 'block'; // 選択肢を表示

            const q = questions[currentQuestionIndex];
            questionText.textContent = q.q; // 問題文を設定
            
            // --- 選択肢を作成 ---
            quizOptions.innerHTML = ''; // 前の選択肢をクリア
            const options = createQuizOptions(q.a); // 正解を含む選択肢リストを作成
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'quiz-option'; // CSS適用
                
                button.addEventListener('click', () => {
                    // 全ての選択肢ボタンを無効化
                    document.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                    
                    if (option === q.a) {
                        // 正解
                        questionText.textContent = "正解！";
                        answerText.textContent = q.a;
                        answerText.style.display = 'block';
                    } else {
                        // 不正解
                        questionText.textContent = `不正解... (正解は ${q.a})`;
                    }
                    nextBtn.style.display = 'block'; // 「次へ」ボタン表示
                });
                quizOptions.appendChild(button);
            });
        }

        // ■ クイズのダミー選択肢を作る関数
        function createQuizOptions(correctAnswer) {
            let options = [correctAnswer];
            
            // data.js の全データからランダムにダミーを選ぶ
            let allAnswers = [];
            // Object.values(shortcutData)で全カテゴリの配列を取得し、flatMapで全問題の答え(a)を1つの配列にする
            allAnswers = Object.values(shortcutData).flatMap(category => category.map(item => item.a));
            // 重複を削除
            allAnswers = [...new Set(allAnswers)];

            // 正解以外の答えを3つ選ぶ
            while (options.length < 4 && allAnswers.length > 0) {
                const randomIndex = Math.floor(Math.random() * allAnswers.length);
                const randomAnswer = allAnswers[randomIndex];
                
                if (!options.includes(randomAnswer)) {
                    options.push(randomAnswer);
                }
                // 選んだものは削除（重複防止）
                allAnswers.splice(randomIndex, 1);
            }
            
            return shuffleArray(options); // 選択肢をシャッフル
        }

        // ■ フラッシュカードを読み込む関数
        function loadFlashcard() {
            const q = questions[currentQuestionIndex];
            questionText.textContent = q.q; // 問題文（カード表）
            answerText.textContent = q.a; // 答え（カード裏）
        }

        // ■ フラッシュカードの答えを表示する関数
        function showAnswer() {
            answerText.style.display = 'block';
            showAnswerBtn.style.display = 'none';
            nextBtn.style.display = 'block';
        }

        // ■ カードの状態をリセットする関数
        function resetCard() {
            answerText.style.display = 'none';
            quizOptions.innerHTML = ''; // クイズ選択肢をクリア
            
            if (mode === 'quiz') {
                nextBtn.style.display = 'none';
            } else {
                showAnswerBtn.style.display = 'block';
                nextBtn.style.display = 'none';
            }
        }
    }
});


// ■ 配列をシャッフルする関数（フィッシャー・イェーツのシャッフル）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
