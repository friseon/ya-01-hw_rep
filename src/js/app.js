require('./../css/styles.scss');
    require('./ofi.min');
    

var gallery = document.querySelector('.gallery'),
    galleryItems = document.querySelectorAll('.gallery__image');

var imgSescriptions = [
    "Тотемное молчание",
    "Будоражущий локоть",
    "Кульминационное мандражирование",
    "Абсолютная асталависта"
];

// Формирование галереи изображений
for (var i = 1; i <= 7; i++) {
    var galleryItem = document.createElement('div');
        galleryImage = document.createElement('img'),
        imageInfo = document.createElement('div');
        imageTitle = imgSescriptions[Math.floor(Math.random()*imgSescriptions.length)],
        imgUrl = "./assets/img/preview/" + i + ".jpg",
        imgUrlFull = "./assets/img/" + i + ".jpg",
        imgUrlFullx2 = "./assets/img/" + i + "-2x.jpg";

    galleryItem.className = "gallery__item";
    galleryImage.className = "gallery__image";
    galleryImage.setAttribute("data-src", imgUrl);
    galleryImage.setAttribute("data-fullUrl", imgUrlFull);
    galleryImage.setAttribute("data-fullUrl-2x", imgUrlFullx2);
    galleryImage.setAttribute("alt", imageTitle);
    imageInfo.className = "image__info";
    imageInfo.innerHTML = imageTitle;
    galleryItem.appendChild(galleryImage);
    galleryItem.appendChild(imageInfo);
    gallery.appendChild(galleryItem);
}

// Появление изображений
[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
        img.removeAttribute('data-src');
    };
});

window.addEventListener('load', function(){
    var gallaryObj = new galleryViewer('.gallery__image');

    // класс для "нетелефонов"
    var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    if (!touchsupport){
        document.body.className += "notouch";
    }
});

window.addEventListener('DOMContentLoaded', function(){
    objectFitImages();
}, false);

// Модалка для просмотра изображений
function galleryViewer(items) {
    var gallary = document.querySelectorAll(items);
    this.create = create;
    this.open = open;
    this.close = close;
    var modalWindow = null;
    var modalImage = null;

    create();

    for (var i = 0; i < gallary.length; i++) {
        gallary[i].addEventListener('click', open);
    }

    function create() {
        var modalOverlay = document.createElement('div'),
            modalBody = document.createElement('div');

        modalWindow = document.createElement('div');
        modalImage = document.createElement('img');

        modalWindow.className = "modal";
        modalBody.className = "modal__body";
        modalImage.className = "modal__image";
        modalOverlay.className = "modal__overlay";

        modalWindow.appendChild(modalOverlay);
        modalWindow.appendChild(modalBody);
        modalBody.appendChild(modalImage);
        document.body.appendChild(modalWindow);

        modalWindow.addEventListener('click', close);
    }

    function open() {
        modalWindow.style.display = "block";
        modalImage.src = this.getAttribute("data-fullUrl");
        modalImage.setAttribute("srcset", this.getAttribute("data-fullUrl-2x") + " 2x");
        document.body.classList.add("noscroll");
    }

    function close() {
        modalWindow.style.display = "none";
        modalImage.src = "";
        document.body.classList.remove("noscroll");
    }
}