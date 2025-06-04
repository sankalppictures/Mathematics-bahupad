const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option');
const resultsContainer = document.getElementById('results-container');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');
const questionContainer = document.getElementById('question-container');
const timeDisplay = document.getElementById('time');

let currentQuestionIndex = 0;
let score = 0;
let questions = []; // यह एरे अब 100 प्रश्नों से भरी जाएगी
let timer;
let timeLeft = 60; // टाइमर 60 सेकंड किया गया
let canAnswer = true; // नई फ़्लैग

// सभी प्रश्न यहाँ परिभाषित करें
const allQuestions = [
    {
        question: "बहुपद P(x) = 2x² + 3x - 5 की घात क्या है?",
        options: ["1", "2", "3", "5"],
        correctAnswer: "2"
    },
    {
        question: "एक रैखिक बहुपद का मानक रूप क्या है?",
        options: ["ax² + bx + c", "ax + b", "ax³ + bx² + cx + d", "c"],
        correctAnswer: "ax + b"
    },
    {
        question: "यदि बहुपद x² - 2x - 8 के शून्यक α और β हैं, तो α + β का मान क्या है?",
        options: ["2", "-2", "8", "-8"],
        correctAnswer: "2"
    },
    {
        question: "यदि बहुपद x² - 2x - 8 के शून्यक α और β हैं, तो αβ का मान क्या है?",
        options: ["2", "-2", "8", "-8"],
        correctAnswer: "-8"
    },
    {
        question: "एक द्विघात बहुपद के अधिकतम कितने शून्यक हो सकते हैं?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
    {
        question: "एक त्रिघात बहुपद के अधिकतम कितने शून्यक हो सकते हैं?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = 5x³ + 4x² + 7x की घात क्या है?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
    },
    {
        question: "यदि P(x) = x - 5 है, तो P(5) का मान क्या होगा?",
        options: ["0", "5", "-5", "10"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = 7 की घात क्या है?",
        options: ["0", "1", "7", "अपरिभाषित"],
        correctAnswer: "0"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग 3 और गुणनफल 2 है, तो बहुपद क्या होगा?",
        options: ["x² + 3x + 2", "x² - 3x + 2", "x² + 3x - 2", "x² - 3x - 2"],
        correctAnswer: "x² - 3x + 2"
    },
    {
        question: "बहुपद x² - 9 के शून्यक क्या हैं?",
        options: ["3, -3", "3, 0", "-3, 0", "9, -9"],
        correctAnswer: "3, -3"
    },
    {
        question: "यदि P(x) को g(x) से भाग देने पर भागफल q(x) और शेषफल r(x) प्राप्त होता है, तो विभाजन एल्गोरिथम क्या है?",
        options: ["P(x) = g(x) × r(x) + q(x)", "P(x) = g(x) × q(x) + r(x)", "g(x) = P(x) × q(x) + r(x)", "q(x) = P(x) × g(x) + r(x)"],
        correctAnswer: "P(x) = g(x) × q(x) + r(x)"
    },
    {
        question: "यदि P(x) = x² - 4x + 4 है, तो P(2) का मान क्या होगा?",
        options: ["0", "2", "4", "8"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 3x² + x + 1 के शून्यकों का योग क्या है?",
        options: ["1", "3", "-1", "-3"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = x³ - 3x² + x + 1 के शून्यकों के गुणनफल का मान क्या है?",
        options: ["1", "-1", "3", "-3"],
        correctAnswer: "-1"
    },
    {
        question: "यदि x+1 बहुपद x² - kx - 5 का एक गुणनखंड है, तो k का मान क्या है?",
        options: ["-4", "4", "-6", "6"],
        correctAnswer: "-4"
    },
    {
        question: "एक बहुपद P(x) जिसका ग्राफ x-अक्ष को 3 बिंदुओं पर काटता है, उसकी घात कम से कम कितनी होगी?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद x² + 7x + 10 के शून्यक क्या हैं?",
        options: ["2, 5", "-2, -5", "2, -5", "-2, 5"],
        correctAnswer: "-2, -5"
    },
    {
        question: "यदि α और β बहुपद ax² + bx + c के शून्यक हैं, तो α + β का सूत्र क्या है?",
        options: ["c/a", "-b/a", "b/a", "-c/a"],
        correctAnswer: "-b/a"
    },
    {
        question: "यदि α और β बहुपद ax² + bx + c के शून्यक हैं, तो αβ का सूत्र क्या है?",
        options: ["c/a", "-b/a", "b/a", "-c/a"],
        correctAnswer: "c/a"
    },
    {
        question: "बहुपद P(x) = x² + 1 के वास्तविक शून्यकों की संख्या क्या है?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "0"
    },
    {
        question: "यदि बहुपद x² + kx - 12 का एक शून्यक 3 है, तो k का मान क्या है?",
        options: ["1", "-1", "3", "-3"],
        correctAnswer: "1"
    },
    {
        question: "बहुपद P(x) = x⁴ - 5x + 6 की घात क्या है?",
        options: ["1", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "बहुपद P(x) = 0 की घात क्या है?",
        options: ["0", "1", "अपरिभाषित", "कोई नहीं"],
        correctAnswer: "अपरिभाषित"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 4 और -2 हैं, तो बहुपद क्या होगा?",
        options: ["x² - 2x - 8", "x² + 2x - 8", "x² - 2x + 8", "x² + 2x + 8"],
        correctAnswer: "x² - 2x - 8"
    },
    {
        question: "बहुपद 3x² - x - 4 के शून्यक क्या हैं?",
        options: ["4/3, -1", "-4/3, 1", "4/3, 1", "-4/3, -1"],
        correctAnswer: "4/3, -1"
    },
    {
        question: "यदि P(x) = x² - 5x + 6 को (x-2) से भाग दिया जाए, तो शेषफल क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 6x² + 11x - 6 के शून्यकों का योग क्या है?",
        options: ["6", "-6", "11", "-11"],
        correctAnswer: "6"
    },
    {
        question: "बहुपद P(x) = x³ - 6x² + 11x - 6 के शून्यकों का गुणनफल क्या है?",
        options: ["6", "-6", "11", "-11"],
        correctAnswer: "6"
    },
    {
        question: "यदि x² + ax + b के शून्यक 2 और -3 हैं, तो a और b के मान क्या हैं?",
        options: ["a=1, b=6", "a=-1, b=-6", "a=1, b=-6", "a=-1, b=6"],
        correctAnswer: "a=1, b=-6"
    },
    {
        question: "एक बहुपद P(x) जिसका ग्राफ x-अक्ष को केवल एक बिंदु पर काटता है, उसकी घात कम से कम कितनी होगी?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "1"
    },
    {
        question: "बहुपद 4x² - 4x + 1 के शून्यक क्या हैं?",
        options: ["1/2, 1/2", "-1/2, -1/2", "1/2, -1/2", "1, 1"],
        correctAnswer: "1/2, 1/2"
    },
    {
        question: "यदि α, β, γ त्रिघात बहुपद ax³ + bx² + cx + d के शून्यक हैं, तो α + β + γ का सूत्र क्या है?",
        options: ["c/a", "-b/a", "d/a", "-d/a"],
        correctAnswer: "-b/a"
    },
    {
        question: "यदि α, β, γ त्रिघात बहुपद ax³ + bx² + cx + d के शून्यक हैं, तो αβ + βγ + γα का सूत्र क्या है?",
        options: ["c/a", "-b/a", "d/a", "-d/a"],
        correctAnswer: "c/a"
    },
    {
        question: "यदि α, β, γ त्रिघात बहुपद ax³ + bx² + cx + d के शून्यक हैं, तो αβγ का सूत्र क्या है?",
        options: ["c/a", "-b/a", "d/a", "-d/a"],
        correctAnswer: "-d/a"
    },
    {
        question: "बहुपद P(x) = x² - 16 के शून्यक क्या हैं?",
        options: ["4, -4", "4, 0", "-4, 0", "16, -16"],
        correctAnswer: "4, -4"
    },
    {
        question: "यदि बहुपद x² + 5x + k का एक शून्यक -2 है, तो k का मान क्या है?",
        options: ["-6", "6", "-2", "2"],
        correctAnswer: "6"
    },
    {
        question: "बहुपद P(x) = 2x² + 7x - 4 के शून्यकों का योग क्या है?",
        options: ["7/2", "-7/2", "4/2", "-4/2"],
        correctAnswer: "-7/2"
    },
    {
        question: "बहुपद P(x) = 2x² + 7x - 4 के शून्यकों का गुणनफल क्या है?",
        options: ["7/2", "-7/2", "4/2", "-4/2"],
        correctAnswer: "-4/2"
    },
    {
        question: "एक बहुपद P(x) जिसका ग्राफ x-अक्ष को स्पर्श करता है लेकिन काटता नहीं है, उस बिंदु पर शून्यकों की संख्या क्या होती है?",
        options: ["0", "1", "2 (समान शून्यक)", "3"],
        correctAnswer: "2 (समान शून्यक)"
    },
    {
        question: "बहुपद x² - 5x + 6 के शून्यक क्या हैं?",
        options: ["2, 3", "-2, -3", "2, -3", "-2, 3"],
        correctAnswer: "2, 3"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 0 और 5 हैं, तो बहुपद क्या होगा?",
        options: ["x² + 5x", "x² - 5x", "5x²", "x² + 5"],
        correctAnswer: "x² - 5x"
    },
    {
        question: "बहुपद P(x) = x³ - 4x के शून्यक क्या हैं?",
        options: ["0, 2, -2", "0, 4", "2, -2", "0, 0, 4"],
        correctAnswer: "0, 2, -2"
    },
    {
        question: "यदि बहुपद x² - 6x + k के शून्यकों का गुणनफल 8 है, तो k का मान क्या है?",
        options: ["-6", "6", "8", "-8"],
        correctAnswer: "8"
    },
    {
        question: "बहुपद P(x) = 3x² - 5x + 2 को (x-1) से भाग देने पर शेषफल क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "एक द्विघात बहुपद के शून्यक √2 और -√2 हैं। बहुपद क्या होगा?",
        options: ["x² - 2", "x² + 2", "x² - √2x - 2", "x² + √2x + 2"],
        correctAnswer: "x² - 2"
    },
    {
        question: "बहुपद P(x) = x² - 3x के शून्यक क्या हैं?",
        options: ["0, 3", "0, -3", "3, -3", "0, 0"],
        correctAnswer: "0, 3"
    },
    {
        question: "यदि बहुपद x² + (a+1)x + b के शून्यक 2 और -3 हैं, तो a और b के मान क्या हैं?",
        options: ["a=0, b=-6", "a=0, b=6", "a=1, b=-6", "a=-1, b=6"],
        correctAnswer: "a=0, b=-6"
    },
    {
        question: "बहुपद P(x) = x² - 2x + 1 के शून्यक क्या हैं?",
        options: ["1, 1", "-1, -1", "1, -1", "2, 1"],
        correctAnswer: "1, 1"
    },
    {
        question: "यदि P(x) = x³ + x² - ax + b के शून्यक 1 और -1 हैं, तो a और b के मान क्या हैं?",
        options: ["a=1, b=0", "a=0, b=1", "a=1, b=1", "a=0, b=0"],
        correctAnswer: "a=1, b=0"
    },
    {
        question: "बहुपद 4u² + 8u के शून्यक क्या हैं?",
        options: ["0, 2", "0, -2", "4, 8", "-4, -8"],
        correctAnswer: "0, -2"
    },
    {
        question: "यदि बहुपद x² + 7x + 10 के शून्यक α और β हैं, तो 1/α + 1/β का मान क्या है?",
        options: ["-7/10", "7/10", "-10/7", "10/7"],
        correctAnswer: "-7/10"
    },
    {
        question: "बहुपद P(x) = x² - 7x + 12 के शून्यक क्या हैं?",
        options: ["3, 4", "-3, -4", "3, -4", "-3, 4"],
        correctAnswer: "3, 4"
    },
    {
        question: "यदि बहुपद x² - 8x + k के शून्यकों का योग 8 है, तो k का मान क्या है?",
        options: ["-8", "8", "16", "-16"],
        correctAnswer: "16"
    },
    {
        question: "बहुपद P(x) = 6x² - 3 - 7x के शून्यक क्या हैं?",
        options: ["3/2, -1/3", "-3/2, 1/3", "3/2, 1/3", "-3/2, -1/3"],
        correctAnswer: "3/2, -1/3"
    },
    {
        question: "बहुपद P(x) = x³ - 3x² - x + 3 के शून्यक क्या हैं?",
        options: ["1, -1, 3", "1, -1, -3", "1, 1, 3", "-1, -1, 3"],
        correctAnswer: "1, -1, 3"
    },
    {
        question: "यदि P(x) = x² - 1 है, तो P(1) का मान क्या होगा?",
        options: ["0", "1", "-1", "2"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = √2x - 5 की घात क्या है?",
        options: ["0", "1", "2", "अपरिभाषित"],
        correctAnswer: "1"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग 0 और गुणनफल -√2 है, तो बहुपद क्या होगा?",
        options: ["x² + √2", "x² - √2", "x² + 0x - √2", "x² + √2x"],
        correctAnswer: "x² - √2"
    },
    {
        question: "बहुपद P(x) = x² + 2x + 1 के शून्यक क्या हैं?",
        options: ["1, 1", "-1, -1", "1, -1", "2, 1"],
        correctAnswer: "-1, -1"
    },
    {
        question: "यदि P(x) = x² - 4 को (x+2) से भाग दिया जाए, तो शेषफल क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 2x² - x + 2 के शून्यक क्या हैं?",
        options: ["1, -1, 2", "1, -1, -2", "1, 1, 2", "-1, -1, 2"],
        correctAnswer: "1, -1, 2"
    },
    {
        question: "बहुपद P(x) = 3x² - x - 4 के शून्यकों का योग क्या है?",
        options: ["1/3", "-1/3", "4/3", "-4/3"],
        correctAnswer: "1/3"
    },
    {
        question: "बहुपद P(x) = 3x² - x - 4 के शून्यकों का गुणनफल क्या है?",
        options: ["1/3", "-1/3", "4/3", "-4/3"],
        correctAnswer: "-4/3"
    },
    {
        question: "यदि बहुपद ax² + bx + c के शून्यक एक-दूसरे के व्युत्क्रम हैं, तो क्या संबंध होगा?",
        options: ["a=b", "a=c", "b=c", "a=-c"],
        correctAnswer: "a=c"
    },
    {
        question: "बहुपद P(x) = x² - 5x के शून्यक क्या हैं?",
        options: ["0, 5", "0, -5", "5, -5", "0, 0"],
        correctAnswer: "0, 5"
    },
    {
        question: "यदि P(x) = x² + kx + 6 का एक शून्यक -3 है, तो k का मान क्या है?",
        options: ["-5", "5", "-1", "1"],
        correctAnswer: "5"
    },
    {
        question: "बहुपद P(x) = 2x² - 8x + 6 के शून्यकों का योग क्या है?",
        options: ["4", "-4", "3", "-3"],
        correctAnswer: "4"
    },
    {
        question: "बहुपद P(x) = 2x² - 8x + 6 के शून्यकों का गुणनफल क्या है?",
        options: ["4", "-4", "3", "-3"],
        correctAnswer: "3"
    },
    {
        question: "एक बहुपद P(x) जिसका ग्राफ x-अक्ष को किसी भी बिंदु पर नहीं काटता है, उसके वास्तविक शून्यकों की संख्या क्या है?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "0"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग 4 और गुणनफल 1 है, तो बहुपद क्या होगा?",
        options: ["x² + 4x + 1", "x² - 4x + 1", "x² + 4x - 1", "x² - 4x - 1"],
        correctAnswer: "x² - 4x + 1"
    },
    {
        question: "बहुपद P(x) = x³ - 5x² + 6x के शून्यक क्या हैं?",
        options: ["0, 2, 3", "0, -2, -3", "2, 3", "0, 5, 6"],
        correctAnswer: "0, 2, 3"
    },
    {
        question: "यदि P(x) = x³ - 3x² + 5x - 3 को (x-1) से भाग दिया जाए, तो शेषफल क्या होगा?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = 4x² - 9 के शून्यक क्या हैं?",
        options: ["3/2, -3/2", "2/3, -2/3", "3, -3", "9, -9"],
        correctAnswer: "3/2, -3/2"
    },
    {
        question: "यदि P(x) = x² + ax - 20 का एक शून्यक 4 है, तो a का मान क्या है?",
        options: ["-1", "1", "-5", "5"],
        correctAnswer: "1"
    },
    {
        question: "बहुपद P(x) = x² + x - 12 के शून्यक क्या हैं?",
        options: ["3, 4", "-3, -4", "3, -4", "-3, 4"],
        correctAnswer: "3, -4"
    },
    {
        question: "यदि बहुपद x² - kx + 9 के शून्यक समान हैं, तो k का मान क्या है?",
        options: ["6", "-6", "± 6", "3"],
        correctAnswer: "± 6"
    },
    {
        question: "बहुपद P(x) = 2x³ - 11x² + 17x - 6 के शून्यकों का योग क्या है?",
        options: ["11/2", "-11/2", "17/2", "-17/2"],
        correctAnswer: "11/2"
    },
    {
        question: "बहुपद P(x) = 2x³ - 11x² + 17x - 6 के शून्यकों का गुणनफल क्या है?",
        options: ["3", "-3", "6", "-6"],
        correctAnswer: "3"
    },
    {
        question: "यदि α और β बहुपद x² + x + 1 के शून्यक हैं, तो 1/α + 1/β का मान क्या है?",
        options: ["-1", "1", "0", "2"],
        correctAnswer: "-1"
    },
    {
        question: "बहुपद P(x) = x² - 2x के शून्यक क्या हैं?",
        options: ["0, 2", "0, -2", "2, -2", "0, 0"],
        correctAnswer: "0, 2"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 1/4 और -1 हैं, तो बहुपद क्या होगा?",
        options: ["4x² + 3x - 1", "4x² - 3x - 1", "4x² + 3x + 1", "4x² - 3x + 1"],
        correctAnswer: "4x² + 3x - 1"
    },
    {
        question: "बहुपद P(x) = x³ - 6x² + 3x + 10 के शून्यक क्या हैं?",
        options: ["-1, 2, 5", "1, -2, 5", "-1, -2, -5", "1, 2, 5"],
        correctAnswer: "-1, 2, 5"
    },
    {
        question: "यदि P(x) = x² - 2x - 3 है, तो P(3) का मान क्या होगा?",
        options: ["0", "1", "-1", "3"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = 5x² - 4 - 8x के शून्यक क्या हैं?",
        options: ["2, -2/5", "-2, 2/5", "2, 2/5", "-2, -2/5"],
        correctAnswer: "2, -2/5"
    },
    {
        question: "बहुपद P(x) = x² + 4x + 4 के शून्यक क्या हैं?",
        options: ["2, 2", "-2, -2", "2, -2", "4, 4"],
        correctAnswer: "-2, -2"
    },
    {
        question: "यदि बहुपद x² - 4x + k के शून्यकों का गुणनफल 3 है, तो k का मान क्या है?",
        options: ["-4", "4", "3", "-3"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = x² - 5 के शून्यक क्या हैं?",
        options: ["√5, -√5", "5, -5", "√5, 0", "-√5, 0"],
        correctAnswer: "√5, -√5"
    },
    {
        question: "यदि P(x) = x³ - 2x² + ax - b के शून्यक 1 और 2 हैं, तो a और b के मान क्या हैं?",
        options: ["a=1, b=0", "a=0, b=1", "a=1, b=2", "a=2, b=1"],
        correctAnswer: "a=1, b=0"
    },
    {
        question: "बहुपद P(x) = 3x² - x - 4 के शून्यकों का योग और गुणनफल क्रमशः क्या है?",
        options: ["1/3, -4/3", "-1/3, 4/3", "1/3, 4/3", "-1/3, -4/3"],
        correctAnswer: "1/3, -4/3"
    },
    {
        question: "बहुपद P(x) = x² - 15 के शून्यक क्या हैं?",
        options: ["√15, -√15", "15, -15", "√15, 0", "-√15, 0"],
        correctAnswer: "√15, -√15"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 0 और -1 हैं, तो बहुपद क्या होगा?",
        options: ["x² + x", "x² - x", "x²", "x² - 1"],
        correctAnswer: "x² + x"
    },
    {
        question: "बहुपद P(x) = x³ - 3x के शून्यक क्या हैं?",
        options: ["0, √3, -√3", "0, 3", "√3, -√3", "0, 0, 3"],
        correctAnswer: "0, √3, -√3"
    },
    {
        question: "यदि बहुपद x² + ax + b के शून्यक -2 और 5 हैं, तो a और b के मान क्या हैं?",
        options: ["a=3, b=-10", "a=-3, b=10", "a=3, b=10", "a=-3, b=-10"],
        correctAnswer: "a=-3, b=-10"
    },
    {
        question: "बहुपद P(x) = 4x² - 12x + 9 के शून्यक क्या हैं?",
        options: ["3/2, 3/2", "-3/2, -3/2", "3/2, -3/2", "3, 3"],
        correctAnswer: "3/2, 3/2"
    },
    {
        question: "यदि P(x) = x² + 2x - 3 है, तो P(1) का मान क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = 2x² - 5x + 3 के शून्यकों का योग क्या है?",
        options: ["5/2", "-5/2", "3/2", "-3/2"],
        correctAnswer: "5/2"
    },
    {
        question: "बहुपद P(x) = 2x² - 5x + 3 के शून्यकों का गुणनफल क्या है?",
        options: ["5/2", "-5/2", "3/2", "-3/2"],
        correctAnswer: "3/2"
    },
    {
        question: "यदि बहुपद x² + kx - 15 का एक शून्यक -3 है, तो k का मान क्या है?",
        options: ["-2", "2", "-8", "8"],
        correctAnswer: "-2"
    },
    {
        question: "बहुपद P(x) = x² - 100 के शून्यक क्या हैं?",
        options: ["10, -10", "10, 0", "-10, 0", "100, -100"],
        correctAnswer: "10, -10"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 1/2 और 1/2 हैं, तो बहुपद क्या होगा?",
        options: ["4x² - 4x + 1", "4x² + 4x + 1", "2x² - 2x + 1", "x² - x + 1/4"],
        correctAnswer: "4x² - 4x + 1"
    },
    {
        question: "बहुपद P(x) = x³ - x² - 2x के शून्यक क्या हैं?",
        options: ["0, 1, 2", "0, -1, 2", "0, 1, -2", "1, 2"],
        correctAnswer: "0, -1, 2"
    },
    {
        question: "बहुपद P(x) = x² + 5x + 6 के शून्यक क्या हैं?",
        options: ["2, 3", "-2, -3", "2, -3", "-2, 3"],
        correctAnswer: "-2, -3"
    },
    {
        question: "यदि बहुपद x² + kx + 1 के शून्यक एक-दूसरे के व्युत्क्रम हैं, तो k का मान क्या है?",
        options: ["1", "-1", "0", "2"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x² + 2x - 3 के शून्यक क्या हैं?",
        options: ["1, 3", "-1, -3", "1, -3", "-1, 3"],
        correctAnswer: "1, -3"
    },
    {
        question: "यदि P(x) = x² - 3x + 2 को (x-1) से भाग दिया जाए, तो शेषफल क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 7x² + 14x - 8 के शून्यकों का योग क्या है?",
        options: ["7", "-7", "14", "-14"],
        correctAnswer: "7"
    },
    {
        question: "बहुपद P(x) = x³ - 7x² + 14x - 8 के शून्यकों का गुणनफल क्या है?",
        options: ["8", "-8", "14", "-14"],
        correctAnswer: "8"
    },
    {
        question: "यदि α और β बहुपद x² - 5x + k के शून्यक हैं और α + β = αβ है, तो k का मान क्या है?",
        options: ["-5", "5", "0", "1"],
        correctAnswer: "5"
    },
    {
        question: "बहुपद P(x) = x² - 4x के शून्यक क्या हैं?",
        options: ["0, 4", "0, -4", "4, -4", "0, 0"],
        correctAnswer: "0, 4"
    },
    {
        question: "यदि बहुपद x² + kx + 4 के शून्यक समान हैं, तो k का मान क्या है?",
        options: ["4", "-4", "± 4", "2"],
        correctAnswer: "± 4"
    },
    {
        question: "बहुपद P(x) = 3x² - 2x - 5 के शून्यकों का योग क्या है?",
        options: ["2/3", "-2/3", "5/3", "-5/3"],
        correctAnswer: "2/3"
    },
    {
        question: "बहुपद P(x) = 3x² - 2x - 5 के शून्यकों का गुणनफल क्या है?",
        options: ["2/3", "-2/3", "5/3", "-5/3"],
        correctAnswer: "-5/3"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक √3 और -√3 हैं, तो बहुपद क्या होगा?",
        options: ["x² - 3", "x² + 3", "x² - √3x - 3", "x² + √3x + 3"],
        correctAnswer: "x² - 3"
    },
    {
        question: "बहुपद P(x) = x² + 6x + 9 के शून्यक क्या हैं?",
        options: ["3, 3", "-3, -3", "3, -3", "6, 9"],
        correctAnswer: "-3, -3"
    },
    {
        question: "यदि P(x) = x³ - 3x² + 2x के शून्यक 0, 1, 2 हैं, तो P(x) के शून्यकों का योग क्या है?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = 5x² - 13x - 6 के शून्यक क्या हैं?",
        options: ["3, -2/5", "-3, 2/5", "3, 2/5", "-3, -2/5"],
        correctAnswer: "3, -2/5"
    },
    {
        question: "यदि बहुपद x² - 2x + (3k-1) के शून्यकों का गुणनफल 5 है, तो k का मान क्या है?",
        options: ["1", "2", "3", "-2"],
        correctAnswer: "2"
    },
    {
        question: "बहुपद P(x) = x² - 25 के शून्यक क्या हैं?",
        options: ["5, -5", "5, 0", "-5, 0", "25, -25"],
        correctAnswer: "5, -5"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग -1/4 और गुणनफल 1/4 है, तो बहुपद क्या होगा?",
        options: ["4x² + x + 1", "4x² - x + 1", "4x² + x - 1", "4x² - x - 1"],
        correctAnswer: "4x² + x + 1"
    },
    {
        question: "बहुपद P(x) = x³ - 4x² + 5x - 2 के शून्यक क्या हैं?",
        options: ["1, 1, 2", "1, -1, 2", "1, 1, -2", "-1, -1, 2"],
        correctAnswer: "1, 1, 2"
    },
    {
        question: "बहुपद P(x) = x² - 3x - 10 के शून्यक क्या हैं?",
        options: ["5, 2", "-5, -2", "5, -2", "-5, 2"],
        correctAnswer: "5, -2"
    },
    {
        question: "यदि बहुपद x² - 4x + a के शून्यक α और 1/α हैं, तो a का मान क्या है?",
        options: ["-4", "4", "1", "-1"],
        correctAnswer: "1"
    },
    {
        question: "बहुपद P(x) = 2x² + 5x - 12 के शून्यक क्या हैं?",
        options: ["3/2, -4", "-3/2, 4", "3/2, 4", "-3/2, -4"],
        correctAnswer: "3/2, -4"
    },
    {
        question: "यदि P(x) = x² - 2x - 15 है, तो P(5) का मान क्या होगा?",
        options: ["0", "1", "-1", "5"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 2x² - 5x + 6 के शून्यक क्या हैं?",
        options: ["1, -2, 3", "1, 2, -3", "-1, 2, 3", "-1, -2, -3"],
        correctAnswer: "-1, 2, 3"
    },
    {
        question: "बहुपद P(x) = 4x² - 1 के शून्यक क्या हैं?",
        options: ["1/2, -1/2", "1, -1", "1/4, -1/4", "2, -2"],
        correctAnswer: "1/2, -1/2"
    },
    {
        question: "यदि P(x) = x² - kx + 6 के शून्यक 2 और 3 हैं, तो k का मान क्या है?",
        options: ["-5", "5", "-6", "6"],
        correctAnswer: "5"
    },
    {
        question: "बहुपद P(x) = x² - 11 के शून्यक क्या हैं?",
        options: ["√11, -√11", "11, -11", "√11, 0", "-√11, 0"],
        correctAnswer: "√11, -√11"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग √2 और गुणनफल 1/3 है, तो बहुपद क्या होगा?",
        options: ["3x² - 3√2x + 1", "3x² + 3√2x + 1", "x² - √2x + 1/3", "x² + √2x - 1/3"],
        correctAnswer: "3x² - 3√2x + 1"
    },
    {
        question: "बहुपद P(x) = x³ - 5x² + 2x + 8 के शून्यक क्या हैं?",
        options: ["-1, 2, 4", "1, -2, 4", "1, 2, -4", "-1, -2, -4"],
        correctAnswer: "-1, 2, 4"
    },
    {
        question: "बहुपद P(x) = 3x² - x - 2 के शून्यक क्या हैं?",
        options: ["1, -2/3", "-1, 2/3", "1, 2/3", "-1, -2/3"],
        correctAnswer: "1, -2/3"
    },
    {
        question: "यदि बहुपद x² - 6x + k के शून्यक α और β हैं, तो α² + β² का मान क्या होगा?",
        options: ["36 - 2k", "36 + 2k", "6 - 2k", "6 + 2k"],
        correctAnswer: "36 - 2k"
    },
    {
        question: "बहुपद P(x) = x² - 8x + 16 के शून्यक क्या हैं?",
        options: ["4, 4", "-4, -4", "4, -4", "8, 16"],
        correctAnswer: "4, 4"
    },
    {
        question: "यदि P(x) = x³ - 3x² + x + 2 को g(x) से भाग देने पर भागफल x-2 और शेषफल -2x+4 है, तो g(x) क्या होगा?",
        options: ["x² - x + 1", "x² + x - 1", "x² - x - 1", "x² + x + 1"],
        correctAnswer: "x² - x + 1"
    },
    {
        question: "बहुपद P(x) = 3x² - 5x के शून्यक क्या हैं?",
        options: ["0, 5/3", "0, -5/3", "5/3, -5/3", "0, 0"],
        correctAnswer: "0, 5/3"
    },
    {
        question: "यदि बहुपद ax² + 9x + 6 का एक शून्यक दूसरे का दुगुना है, तो a का मान क्या है?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = x² - x - 6 के शून्यक क्या हैं?",
        options: ["3, 2", "-3, -2", "3, -2", "-3, 2"],
        correctAnswer: "3, -2"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 1 और -1/2 हैं, तो बहुपद क्या होगा?",
        options: ["2x² + x - 1", "2x² - x - 1", "2x² + x + 1", "2x² - x + 1"],
        correctAnswer: "2x² - x - 1"
    },
    {
        question: "बहुपद P(x) = x³ - 3x² + 4x - 12 के शून्यक क्या हैं?",
        options: ["3, 2i, -2i", "3, -2, 2", "3, 0", "3, 4, -1"],
        correctAnswer: "3, 2i, -2i" // वास्तविक शून्यक केवल 3 है
    },
    {
        question: "बहुपद P(x) = 7x² - 11x - 6 के शून्यकों का योग क्या है?",
        options: ["11/7", "-11/7", "6/7", "-6/7"],
        correctAnswer: "11/7"
    },
    {
        question: "बहुपद P(x) = 7x² - 11x - 6 के शून्यकों का गुणनफल क्या है?",
        options: ["11/7", "-11/7", "6/7", "-6/7"],
        correctAnswer: "-6/7"
    },
    {
        question: "यदि बहुपद x² - 4x + k के शून्यक α और β हैं और α² + β² = 10 है, तो k का मान क्या है?",
        options: ["3", "6", "1", "-3"],
        correctAnswer: "3"
    },
    {
        question: "बहुपद P(x) = x² + 10x + 25 के शून्यक क्या हैं?",
        options: ["5, 5", "-5, -5", "5, -5", "10, 25"],
        correctAnswer: "-5, -5"
    },
    {
        question: "यदि P(x) = x² - 7x + 10 है, तो P(2) का मान क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 3x² + 3x - 1 के शून्यक क्या हैं?",
        options: ["1, 1, 1", "-1, -1, -1", "1, -1, 1", "3, -1"],
        correctAnswer: "1, 1, 1"
    },
    {
        question: "बहुपद P(x) = 2x² + 3x के शून्यक क्या हैं?",
        options: ["0, -3/2", "0, 3/2", "3/2, -3/2", "2, 3"],
        correctAnswer: "0, -3/2"
    },
    {
        question: "यदि बहुपद x² - 5x + k के शून्यक α और β हैं और α - β = 1 है, तो k का मान क्या है?",
        options: ["4", "6", "8", "-6"],
        correctAnswer: "6"
    },
    {
        question: "बहुपद P(x) = x² - 18 के शून्यक क्या हैं?",
        options: ["√18, -√18", "18, -18", "3√2, -3√2", "2√3, -2√3"],
        correctAnswer: "3√2, -3√2"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 2 + √3 और 2 - √3 हैं, तो बहुपद क्या होगा?",
        options: ["x² - 4x + 1", "x² + 4x + 1", "x² - 4x - 1", "x² + 4x - 1"],
        correctAnswer: "x² - 4x + 1"
    },
    {
        question: "बहुपद P(x) = x³ - 2x² - 9x + 18 के शून्यक क्या हैं?",
        options: ["2, 3, -3", "-2, 3, -3", "2, -3, 3", "2, 2, 3"],
        correctAnswer: "2, 3, -3"
    },
    {
        question: "बहुपद P(x) = 5x² - 4x - 2 के शून्यकों का योग क्या है?",
        options: ["4/5", "-4/5", "2/5", "-2/5"],
        correctAnswer: "4/5"
    },
    {
        question: "बहुपद P(x) = 5x² - 4x - 2 के शून्यकों का गुणनफल क्या है?",
        options: ["4/5", "-4/5", "2/5", "-2/5"],
        correctAnswer: "-2/5"
    },
    {
        question: "यदि बहुपद x² - 2x + k के शून्यक α और β हैं और α² + β² = 8 है, तो k का मान क्या है?",
        options: ["-2", "2", "-4", "4"],
        correctAnswer: "-2"
    },
    {
        question: "बहुपद P(x) = x² - 6x + 8 के शून्यक क्या हैं?",
        options: ["2, 4", "-2, -4", "2, -4", "-2, 4"],
        correctAnswer: "2, 4"
    },
    {
        question: "यदि P(x) = x³ - 4x² + 5x - 2 को (x-1) से भाग दिया जाए, तो शेषफल क्या होगा?",
        options: ["0", "1", "2", "-1"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = x³ - 6x² + 12x - 8 के शून्यक क्या हैं?",
        options: ["2, 2, 2", "-2, -2, -2", "2, -2, 2", "6, 12, 8"],
        correctAnswer: "2, 2, 2"
    },
    {
        question: "बहुपद P(x) = 3x² - 7x + 4 के शून्यक क्या हैं?",
        options: ["1, 4/3", "-1, -4/3", "1, -4/3", "-1, 4/3"],
        correctAnswer: "1, 4/3"
    },
    {
        question: "यदि बहुपद x² + ax - 12 का एक शून्यक 3 है, तो दूसरा शून्यक क्या है?",
        options: ["-4", "4", "2", "-2"],
        correctAnswer: "-4"
    },
    {
        question: "बहुपद P(x) = x² - 2x - 15 के शून्यक क्या हैं?",
        options: ["5, 3", "-5, -3", "5, -3", "-5, 3"],
        correctAnswer: "5, -3"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यकों का योग 0 और गुणनफल -4 है, तो बहुपद क्या होगा?",
        options: ["x² + 4", "x² - 4", "x² + 0x - 4", "x² + 4x"],
        correctAnswer: "x² - 4"
    },
    {
        question: "बहुपद P(x) = x³ - 5x² + 8x - 4 के शून्यक क्या हैं?",
        options: ["1, 2, 2", "1, -2, 2", "-1, 2, 2", "1, 1, 4"],
        correctAnswer: "1, 2, 2"
    },
    {
        question: "बहुपद P(x) = x² - 1 के शून्यक क्या हैं?",
        options: ["1, -1", "1, 0", "-1, 0", "1, 1"],
        correctAnswer: "1, -1"
    },
    {
        question: "यदि बहुपद ax² + bx + c के शून्यक α और β हैं, तो 1/α + 1/β का मान क्या है?",
        options: ["b/c", "-b/c", "c/b", "-c/b"],
        correctAnswer: "-b/c"
    },
    {
        question: "बहुपद P(x) = 4x² - 4x + 1 के शून्यकों का योग क्या है?",
        options: ["1", "-1", "1/2", "-1/2"],
        correctAnswer: "1"
    },
    {
        question: "बहुपद P(x) = 4x² - 4x + 1 के शून्यकों का गुणनफल क्या है?",
        options: ["1", "-1", "1/4", "-1/4"],
        correctAnswer: "1/4"
    },
    {
        question: "यदि बहुपद x² + kx + 16 के शून्यक समान हैं, तो k का मान क्या है?",
        options: ["8", "-8", "± 8", "4"],
        correctAnswer: "± 8"
    },
    {
        question: "बहुपद P(x) = x² - 3 के शून्यक क्या हैं?",
        options: ["√3, -√3", "3, -3", "√3, 0", "-√3, 0"],
        correctAnswer: "√3, -√3"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 1/3 और 2 हैं, तो बहुपद क्या होगा?",
        options: ["3x² - 7x + 2", "3x² + 7x + 2", "3x² - 7x - 2", "3x² + 7x - 2"],
        correctAnswer: "3x² - 7x + 2"
    },
    {
        question: "बहुपद P(x) = x³ - 7x + 6 के शून्यक क्या हैं?",
        options: ["1, 2, -3", "1, -2, 3", "-1, 2, 3", "1, 2, 3"],
        correctAnswer: "1, 2, -3"
    },
    {
        question: "बहुपद P(x) = x² - 4x - 5 के शून्यक क्या हैं?",
        options: ["5, 1", "-5, -1", "5, -1", "-5, 1"],
        correctAnswer: "5, -1"
    },
    {
        question: "यदि बहुपद x² + (a+1)x + b के शून्यक 2 और -3 हैं, तो a+b का मान क्या है?",
        options: ["-6", "-5", "5", "6"],
        correctAnswer: "-6"
    },
    {
        question: "बहुपद P(x) = x² - 13x + 30 के शून्यक क्या हैं?",
        options: ["3, 10", "-3, -10", "3, -10", "-3, 10"],
        correctAnswer: "3, 10"
    },
    {
        question: "यदि बहुपद x² + kx + 12 का एक शून्यक -4 है, तो k का मान क्या है?",
        options: ["-7", "7", "-1", "1"],
        correctAnswer: "7"
    },
    {
        question: "बहुपद P(x) = 2x² + 5x - 3 के शून्यक क्या हैं?",
        options: ["1/2, -3", "-1/2, 3", "1/2, 3", "-1/2, -3"],
        correctAnswer: "1/2, -3"
    },
    {
        question: "यदि P(x) = x³ - 6x² + 11x - 6 है, तो P(1) का मान क्या होगा?",
        options: ["0", "1", "-1", "6"],
        correctAnswer: "0"
    },
    {
        question: "बहुपद P(x) = 4x² - 5x - 1 के शून्यकों का योग क्या है?",
        options: ["5/4", "-5/4", "1/4", "-1/4"],
        correctAnswer: "5/4"
    },
    {
        question: "बहुपद P(x) = 4x² - 5x - 1 के शून्यकों का गुणनफल क्या है?",
        options: ["5/4", "-5/4", "1/4", "-1/4"],
        correctAnswer: "-1/4"
    },
    {
        question: "यदि बहुपद x² - 2x + k के शून्यक α और β हैं और α + β = αβ है, तो k का मान क्या है?",
        options: ["-2", "2", "0", "1"],
        correctAnswer: "2"
    },
    {
        question: "बहुपद P(x) = x² - 2x - 8 के शून्यक क्या हैं?",
        options: ["4, 2", "-4, -2", "4, -2", "-4, 2"],
        correctAnswer: "4, -2"
    },
    {
        question: "यदि किसी द्विघात बहुपद के शून्यक 1/2 और -1/2 हैं, तो बहुपद क्या होगा?",
        options: ["4x² - 1", "4x² + 1", "x² - 1/4", "x² + 1/4"],
        correctAnswer: "4x² - 1"
    },
    {
        question: "बहुपद P(x) = x³ - 10x² + 27x - 18 के शून्यक क्या हैं?",
        options: ["1, 3, 6", "1, -3, 6", "-1, 3, 6", "1, 2, 9"],
        correctAnswer: "1, 3, 6"
    },
    {
        question: "बहुपद P(x) = 6x² - 7x - 3 के शून्यक क्या हैं?",
        options: ["3/2, -1/3", "-3/2, 1/3", "3/2, 1/3", "-3/2, -1/3"],
        correctAnswer: "3/2, -1/3"
    },
    {
        question: "यदि बहुपद x² - (k+1)x + 6 के शून्यक 2 और 3 हैं, तो k का मान क्या है?",
        options: ["4", "5", "6", "0"],
        correctAnswer: "4"
    },
    {
        question: "बहुपद P(x) = x² - 2x + 1 के शून्यकों का योग और गुणनफल क्रमशः क्या है?",
        options: ["2, 1", "-2, 1", "2, -1", "-2, -1"],
        correctAnswer: "2, 1"
    },
    {
        question: "बहुपद P(x) = x² - 2x - 3 के शून्यक क्या हैं?",
        options: ["3, 1", "-3, -1", "3, -1", "-3, 1"],
        correctAnswer: "3, -1"
    }
];

// प्रश्नों को शफल करें ताकि हर बार खेलने पर क्रम बदल जाए
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // तत्वों का आदान-प्रदान
    }
    return array;
}

// क्विज़ शुरू करने पर प्रश्नों को शफल करें
function startQuiz() {
    questions = shuffleArray([...allQuestions]); // सभी प्रश्नों को कॉपी और शफल करें
    currentQuestionIndex = 0;
    score = 0;
    resultsContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    resetOptions();
    timeLeft = 60; // टाइमर को रीसेट करें
    updateTimerDisplay();
    clearInterval(timer);
    startTimer();
    canAnswer = true; // प्रश्न लोड होने पर उत्तर दिया जा सकता है

    // सुनिश्चित करें कि प्रश्न मौजूद है
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // विकल्पों को शफल करें ताकि हर बार उनका क्रम बदल जाए
    const shuffledOptions = shuffleArray([...currentQuestion.options]);

    shuffledOptions.forEach((option, index) => {
        optionButtons[index].textContent = option;
        // data-correct एट्रीब्यूट को सही उत्तर के लिए 'true' सेट करें
        optionButtons[index].dataset.correct = (currentQuestion.correctAnswer === option).toString();
    });
    enableOptions(); // विकल्प फिर से क्लिक करने योग्य बनाएं
}

function resetOptions() {
    optionButtons.forEach(button => {
        button.className = 'option'; // सभी अतिरिक्त क्लास हटा दें
    });
}

function selectAnswer(e) {
    if (!canAnswer) return; // यदि उत्तर नहीं दिया जा सकता है तो कुछ न करें
    canAnswer = false; // एक बार उत्तर दिए जाने के बाद, और उत्तर नहीं दिया जा सकता

    clearInterval(timer); // टाइमर बंद करें
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        // सही उत्तर को हरे रंग में हाइलाइट करें
        optionButtons.forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
    }

    disableOptionsTemporarily(); // तुरंत क्लिक करने से रोकने के लिए

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500); // थोड़ी देर के लिए रंग दिखाएं
}

function disableOptionsTemporarily() {
    optionButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });
    // अगले प्रश्न पर जाने के बाद enableOptions को कॉल किया जाएगा
}

function enableOptions() {
    optionButtons.forEach(button => {
        button.addEventListener('click', selectAnswer);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            canAnswer = false; // समय समाप्त होने पर और उत्तर नहीं दिया जा सकता
            // समय समाप्त होने पर भी सही उत्तर को हरे रंग में दिखाएं
            optionButtons.forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                } else {
                    // अगर यूजर ने गलत जवाब दिया या टाइम आउट हो गया तो उसका बटन लाल हो
                    if (!button.classList.contains('correct')) {
                         button.classList.add('incorrect');
                    }
                }
            });
            disableOptionsTemporarily(); // सभी बटन को अक्षम करें
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            }, 1500);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timeDisplay.textContent = timeLeft;
}

function showResults() {
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = questions.length;
    clearInterval(timer); // परिणाम दिखाने पर टाइमर बंद करें
}

// इवेंट लिसनर
restartButton.addEventListener('click', startQuiz);

// क्विज़ शुरू करें जब पेज लोड हो जाए
window.onload = startQuiz;
