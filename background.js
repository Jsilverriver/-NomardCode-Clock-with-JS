const body = document.querySelector("body");

const IMAGE_NUM = 6;

function paintImage(imgNumbers) {
    const image = new Image();
    image.src = `images/${imgNumbers}.jpeg`
    image.classList.add('bgImages');
    body.prepend(image);
    //image.addEventLinstener("loadend", handleLoad);
    //api가 아니기 때문에 별로 필요 없음..
}

function genNumber() {
    const number = Math.floor(Math.random() * IMAGE_NUM + 1);
    return number;
};


function init() {
    const randomNumber = genNumber();
    paintImage(randomNumber);
};

init();