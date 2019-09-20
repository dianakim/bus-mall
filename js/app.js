'use strict';

var canvasEl = document.getElementById('my-canvas');

var firstImgEl = document.getElementById('firstImg');
var secondImgEl = document.getElementById('secondImg');
var thirdImgEl = document.getElementById('thirdImg');

var allPics = [];

function Picture(name) {
  this.src = '../img/${name}.jpg';
  this.alt = name;
  this.title = name;
  this.shown = '0';
  this.clicked = '0';

  allPics.push(this);
}

new Picture('baby-sweep-onesie');
new Picture('banana-cutter');
new Picture('bathroom-stand');
new Picture('canned-unicorn-meat');
new Picture('canned-dragon-meat');
new Picture('cthulhu-toy');
new Picture('duck-muzzle');
new Picture('lump-chair');
new Picture('meatball-bubblegum');
new Picture('modern-wine-goblet');
new Picture('pen-cutlery');
new Picture('pet-sweep');
new Picture('pizza-scissor-spatula');
new Picture('R2D2-rolling-bag');
new Picture('shark-sleeping-bag');
new Picture('tauntaun-sleeping-bag');
new Picture('toaster-coffee-maker');
new Picture('toeless-galoshes');
new Picture('usb-tentacle');
new Picture('warped-watering-can');
