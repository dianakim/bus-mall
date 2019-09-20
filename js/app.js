'use strict';

var canvasEl = document.getElementById('my-canvas');

var formEl = document.getElementById('form-container');

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

formEl.addEventListener('click', someCallbackFunction);

function someCallbackFunction(event) {

}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate three random numbers
// Store in the threePics array
// Display the three images from the allPics[] with indices matching the three random numbers
(function() {
  var pictureIndexArr = [];
  var i = 3; // Number of photos needed to be selected
  
  while(i > 0) {
    var duplicateIndex = false;
    var randNum = randomInteger(0, allPics.length - 1);
    // If there is an index in the pictureIndexArr
    // And if the current randNum is already in the array
    // Break out of the loop to start the while loop again
    if(pictureIndexArr.length > 0) {
      for(var j = 0; j < pictureIndexArr.length - 1; j++) {
        if(randNum === pictureIndexArr[j]) {
          duplicateIndex = true;
        }
      }
    }
    if(duplicateIndex === false) {
      pictureIndexArr.push(randNum);
      i--;
    }
  }

  firstImgEl.src = allPics[pictureIndexArr[0]].src;
  secondImgEl.src = allPics[pictureIndexArr[1]].src;
  thirdImgEl.src = allPics[pictureIndexArr[2]].src;
})();
