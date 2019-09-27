let articles = document.querySelectorAll('.features__item');

Array.prototype.forEach.call(articles, function (article) {
  article.addEventListener('mouseenter', function () {
    article.classList.add('active');
  });
  article.addEventListener('mouseleave', function () {
    article.classList.remove('active');
  });
});

let burger = document.querySelector('.nav__burger');
let navMenu = document.querySelector('.nav__menu');

burger.addEventListener('click', function () {
  navMenu.classList.toggle('close');
  burger.classList.toggle('close-menu');
});

let callFormOpenButton = document.querySelector('.header__consult');
let callFormCloseButton = document.querySelector('.form-close');
let form = document.querySelector('.overlay');

callFormOpenButton.addEventListener('click', function () {
  form.classList.toggle('close');
  callFormCloseButton.addEventListener('click', function () {
    form.classList.toggle('close');
  });
});
