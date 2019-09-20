'use strict';

var canvasEl = document.getElementById('my-canvas');

var formEl = document.getElementById('form-container');
var firstImgEl = document.getElementById('firstImg');
var secondImgEl = document.getElementById('secondImg');
var thirdImgEl = document.getElementById('thirdImg');
var firstRadioEl = document.getElementById('imgOne');
var secondRadioEl = document.getElementById('imgTwo');
var thirdRadioEl = document.getElementById('imgThree');
var previousPics = [];
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

formEl.addEventListener('submit', handleSelectionSubmit);

function handleSelectionSubmit(event) {
  event.preventDefault();

  // On click, update clicked property of Picture that was clicked on
  storePreviousPics();
  renderPictures();
  clearSelection();
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function storePreviousPics() {
  // Store current photo alt values into previousPicsArr
  previousPics[0] = firstImgEl.alt;
  previousPics[1] = secondImgEl.alt;
  previousPics[2] = thirdImgEl.alt;
  console.log('previousPics ', previousPics);
}

function clearSelection() {
  firstRadioEl.checked = false;
  secondRadioEl.checked = false;
  thirdRadioEl.checked = false;
}

function renderPictures() {

  var picsToBeRendered = [];
  var i = 3; // Number of photos needed to be selected

  // While a photo is still needed
  while(i > 0) {
    var duplicateIndex = false;
    var randNum = randomInteger(0, allPics.length - 1);
    // Loop through previousPics
    // Get new randNum if current photo alt at index of randNum matches a previously rendered photo alt
    for(var k = 0; k < previousPics.length; k++) {
      while(allPics[randNum].alt === previousPics[k]) {
        randNum = randomInteger(0, allPics.length - 1);
      }
    }
    // Check if there is already a photo in the picsToBeRendered
    // If the current randNum is already in the picsToBeRendered
    // Set duplicateIndex value to true and get a different randNum
    if(picsToBeRendered.length > 0) {
      for(var j = 0; j < picsToBeRendered.length; j++) {
        if(randNum === picsToBeRendered[j]) {
          duplicateIndex = true; // Photo at this index has already been selected
        }
      }
    }

    // If it's not a duplicate, save it to the array to be rendered
    if(duplicateIndex === false) {
      picsToBeRendered.push(randNum);
      i--;
    }
  }

  firstImgEl.src = allPics[picsToBeRendered[0]].src;
  secondImgEl.src = allPics[picsToBeRendered[1]].src;
  thirdImgEl.src = allPics[picsToBeRendered[2]].src;
}

// Generate three random numbers
// Store in the threePics array
// Display the three images from the allPics[] with indices matching the three random numbers
(function() {
  renderPictures();
})();
