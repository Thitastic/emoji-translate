//
const _ORIGINAL = document.getElementById("original-text");
const _TRANSLATE = document.getElementById("translated-text");
const _BTN_TRANSLATE = document.getElementById("btn-translate");
const _BTN_SWAP = document.getElementById("btn-swap");
const _BTN_COPY = document.getElementById("btn-copy");

//
const _DICTIONARY = [
    { "text": 'a', "emo": '😀' },
    { "text": 'b', "emo": '😃' },
    { "text": 'c', "emo": '😁' },
    { "text": 'd', "emo": '😅' },
    { "text": 'e', "emo": '🥰' },
    { "text": 'f', "emo": '🤣' },
    { "text": 'g', "emo": '🥲' },
    { "text": 'h', "emo": '☺️' },
    { "text": 'i', "emo": '😊' },
    { "text": 'k', "emo": '😇' },
    { "text": 'l', "emo": '😉' },
    { "text": 'm', "emo": '😒' },
    { "text": 'n', "emo": '😞' },
    { "text": 'o', "emo": '😙' },
    { "text": 'p', "emo": '😟' },
    { "text": 'q', "emo": '😕' },
    { "text": 'r', "emo": '🙂' },
    { "text": 's', "emo": '🙃' },
    { "text": 't', "emo": '☹️' },
    { "text": 'u', "emo": '😡' },
    { "text": 'v', "emo": '😍' },
    { "text": 'w', "emo": '😳' },
    { "text": 'x', "emo": '😩' },
    { "text": 'y', "emo": '😭' },
    { "text": 'z', "emo": '😠' },
];

//
let reverse = 0;



//
let translateText = function (original_value, dictionary_array) {
    let original_text = original_value.split("");
    let output = "";
    for (let i = 0; i < original_text.length; i++) {
        if (original_text[i] === ' ') {
            output += ' ';
        }
        else {
            dictionary_array.forEach(word => {
                if (original_text[i] === word.text) {
                    output += word.emo;
                    return;
                }
            });
        }
    }
    return output;
}

let translateEmo = function (original_value, dictionary_array) {
    original_value = original_value.replace('☺️', 'h');
    let original_text = original_value.split(/.*?/u);
    console.log(original_value);
    let output = "";
    for (let i = 0; i < original_text.length; i++) {
        if (original_text[i] === ' ') {
            output += ' ';
        } else if (original_text[i] == 'h') {
            output += 'h';
        }
        else {
            dictionary_array.forEach(word => {
                if (original_text[i] === word.emo) {
                    output += word.text;
                    return;
                }
            });
        }
    }

    return output;
}

//Actions
_BTN_TRANSLATE.addEventListener("click", function () {
    if (reverse === 0) {
        _TRANSLATE.value = translateText(_ORIGINAL.value, _DICTIONARY);
    } else {
        _TRANSLATE.value = translateEmo(_ORIGINAL.value, _DICTIONARY);
    }
});

_BTN_SWAP.addEventListener("click", function () {
    if (reverse === 0) {
        reverse = 1;
        document.getElementById("ori-hint").textContent = "😀";
        document.getElementById("trans-hint").textContent = "Abc";
        let t = _ORIGINAL.value;
        _ORIGINAL.value = _TRANSLATE.value;
        _TRANSLATE.value = t;
    }
    else {
        reverse = 0;
        document.getElementById("ori-hint").textContent = "Abc";
        document.getElementById("trans-hint").textContent = "😀";
        swap(_TRANSLATE.value, _ORIGINAL.value);
        let t = _ORIGINAL.value;
        _ORIGINAL.value = _TRANSLATE.value;
        _TRANSLATE.value = t;
    };
});

_BTN_COPY.addEventListener("click", function () {
    _TRANSLATE.select();
    document.execCommand('copy');
})