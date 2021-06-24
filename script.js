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
let  removeVietnameseTones = function(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}


//
let translateText = function (original_value, dictionary_array) {
    original_value = removeVietnameseTones(original_value.toLowerCase());
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
    original_value = original_value.replaceAll('☺️', 'h');
    let original_text = original_value.split(/.*?/u);
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
        let t = _ORIGINAL.value;
        _ORIGINAL.value = _TRANSLATE.value;
        _TRANSLATE.value = t;
    };
});

_BTN_COPY.addEventListener("click", function () {
    _TRANSLATE.select();
    document.execCommand('copy');
    showToast();
})


//b5 toast
let option = {
    animation: true,
    delay: 2000,
}

let showToast= function(){
    const _TOAST = document.getElementById("myToast");
    let toastElement = new bootstrap.Toast(_TOAST, option);
    toastElement.show();
}