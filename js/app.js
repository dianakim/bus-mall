'use strict';

var canvasEl = document.getElementById('my-canvas');

var firstImgEl = document.getElementById('firstImg');
var secondImgEl = document.getElementById('secondImg');
var thirdImgEl = document.getElementById('thirdImg');

var allPics = [];

function Picture(name) {
  this.src = `../img/${name}.jpg`;
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
new Picture('r2d2-rolling-bag');
new Picture('shark-sleeping-bag');
new Picture('tauntaun-sleeping-bag');
new Picture('toaster-coffee-maker');
new Picture('toeless-galoshes');
new Picture('usb-tentacle');
new Picture('warped-watering-can');

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate three random numbers in the range of 0 and allPics.length - 1.
// Store in the threePics array
(function() {
  var pictureIndexArr = [];
  var i = 3; // Number of photos needed to be selected

  // While we still need another picture
  while(i > 0) {
    var randNum = randomInteger(0, allPics.length - 1);

    pictureIndexArr.push(randNum);
    i--;
  }
  console.log('pictureIndexArr ', pictureIndexArr);
  console.log('allpics ', allPics);

  // Display the three images from the allPics[] with indices matching the three random numbers
  firstImgEl.src = allPics[pictureIndexArr[0]].src;
  secondImgEl.src = allPics[pictureIndexArr[1]].src;
  thirdImgEl.src = allPics[pictureIndexArr[2]].src;
})();

  // var pictureIndexArr = [];
  // var i = 3; // Number of photos needed to be selecte

// // While we still need another picture
// while(i > 0) {
  //   var randNum = randomInteger(0, allPics.length - 1);
  //   // Loop through pictureIndexArr
  //   for(var j = 0; j < pictureIndexArr.length - 1; j++) {
//     // If randNum matches any of the current values, get another random number1
//     if(randNum === pictureIndexArr[j]) {
//       break;
//     // Else store the random number in the pictureIndexArr
//     // Increment j
//     } else {
//       pictureIndexArr.push;
//       i--;
//     }
//   }