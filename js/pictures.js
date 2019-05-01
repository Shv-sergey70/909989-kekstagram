'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var photos = [];
var randomPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var randomPhotosFragment = document.createDocumentFragment();
var usersPicturesContainer = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureSocialCommentsBlock = bigPicture.querySelector('.social__comments');
var bigPictureCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
var bigPictureCommentsFragment = document.createDocumentFragment();
var bigPictureSocialCommentsCountBlock = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElementFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateComments = function (isGetTwoComments) {
  var comments = [];
  if (isGetTwoComments) {
    comments.push(getRandomElementFromArray(COMMENTS));
  }
  comments.push(getRandomElementFromArray(COMMENTS));
  return comments;
};

var generatePictureData = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: generateComments(i % 2),
    description: getRandomElementFromArray(DESCRIPTIONS)
  };
};

var generatePictureElement = function (data, template) {
  template.querySelector('.picture__img').setAttribute('src', data.url);
  template.querySelector('.picture__likes').textContent = data.likes;
  template.querySelector('.picture__comments').textContent = data.comments.length;

  return template;
};

for (var i = 1; i <= 25; i++) {
  photos.push(generatePictureData(i));
}
for (var j = 0; j <= 24; j++) {
  randomPhotosFragment.appendChild(generatePictureElement(photos[j], randomPhotoTemplate.cloneNode(true)));
}
usersPicturesContainer.appendChild(randomPhotosFragment);

bigPictureImg.setAttribute('src', photos[0]['url']);
bigPictureLikesCount.textContent = photos[0]['likes'];
bigPictureCommentsCount.textContent = photos[0]['comments'].length;
bigPictureCaption.textContent = photos[0]['description'];
for (var k = 0; k < photos[0]['comments'].length; k++) {
  var commentTemplate = bigPictureCommentTemplate.cloneNode(true);
  commentTemplate.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + generateRandomNumber(1, 6) + '.svg');
  commentTemplate.querySelector('.social__text').textContent = photos[0]['comments'][k];
  bigPictureCommentsFragment.appendChild(commentTemplate);
}
bigPictureSocialCommentsBlock.appendChild(bigPictureCommentsFragment);

bigPictureSocialCommentsCountBlock.classList.add('visually-hidden');
bigPictureCommentsLoaderButton.classList.add('visually-hidden');
bigPicture.classList.remove('hidden');
