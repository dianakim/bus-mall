'use strict';

var formEl = document.getElementById('form-container');

var firstImgEl = document.getElementById('first');
var secondImgEl = document.getElementById('second');
var thirdImgEl = document.getElementById('third');
var imagesToSelect = document.getElementsByClassName('select-image');
var radioEls = document.getElementsByName('select');
var submitEl = document.getElementById('vote-button');

var previousPics = [];
var picIndexesToRender = [];
var selectionsNeeded = 5;
var allPics = [];
var allPicNames = ['baby-sweep-onesie', 'banana-cutter', 'bathroom-stand', 'canned-unicorn-meat', 'canned-dragon-meat', 'cthulhu-toy', 'duck-muzzle', 'lump-chair', 'meatball-bubblegum', 'modern-wine-goblet', 'pen-cutlery', 'pet-sweep','pizza-scissor-spatula', 'r2d2-rolling-bag', 'shark-sleeping-bag', 'tauntaun-sleeping-bag', 'toaster-coffee-maker', 'toeless-galoshes', 'usb-tentacle', 'warped-watering-can'];
var picsKey;

function Picture(name) {
  this.src = `/img/${name}.jpg`;
  this.alt = name;
  this.title = name;
  this.shown = '0';
  this.clicked = '0';

  allPics.push(this);
}

function makeNewPics(){
  for(var n = 0; n < allPicNames.length; n++) {
    new Picture(allPicNames[n]);
  }
}

formEl.addEventListener('submit', handleSelectionSubmit);
firstImgEl.addEventListener('click', handleImageClick);
secondImgEl.addEventListener('click', handleImageClick);
thirdImgEl.addEventListener('click', handleImageClick);

function handleSelectionSubmit(event) {
  event.preventDefault();
  console.log('after click, allPics: ', allPics);
  // update click property for picture that was selected
  for(var b = 0; b < radioEls.length; b++) {
    if(radioEls[b].checked) {
      allPics[picIndexesToRender[b]].clicked++;
    }
  }

  if(selectionsNeeded === 1) {
    formEl.removeEventListener('submit', handleSelectionSubmit);
    firstImgEl.removeEventListener('click', handleImageClick);
    secondImgEl.removeEventListener('click', handleImageClick);
    thirdImgEl.removeEventListener('click', handleImageClick);
    submitEl.disabled = true;
    clearRadioSelection();
    renderResults();
    storeLocalAllPics();
    alert('Your participation is now complete. Thank you');
  } else {
    selectionsNeeded--;
    renderPictures();
  }
}
function storeLocalAllPics() {
  var jsonAllPics = JSON.stringify(allPics);
  localStorage.setItem(picsKey, jsonAllPics);
  console.log('stringified ', jsonAllPics);
}

function handleImageClick(event) {
  for(var b = 0; b < radioEls.length; b++) {
    if(radioEls[b].id === `${event.target.id}Radio`) {
      radioEls[b].checked = true;
    }
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function storePreviousPics() {
  // Store current photo alt values into previousPicsArr
  previousPics[0] = firstImgEl.alt;
  previousPics[1] = secondImgEl.alt;
  previousPics[2] = thirdImgEl.alt;
}

function clearRadioSelection() {
  for(var b = 0; b < radioEls.length; b++) {
    radioEls[b].checked = false;
  }
}

function renderPictures() {
  storePreviousPics();
  clearRadioSelection();
  picIndexesToRender.length = 0;

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
    if(picIndexesToRender.length > 0) {
      for(var j = 0; j < picIndexesToRender.length; j++) {
        if(randNum === picIndexesToRender[j]) {
          duplicateIndex = true; // Photo at this index has already been selected
        }
      }
    }

    // If it's not a duplicate, save it to the array to be rendered
    if(duplicateIndex === false) {
      picIndexesToRender.push(randNum);
      i--;
    }
  }

  //Loop through imagesToSelect and render photos from picIndexesToRender
  for(var a = 0; a < imagesToSelect.length; a++) {
    imagesToSelect[a].src = allPics[picIndexesToRender[a]].src;
    imagesToSelect[a].alt = allPics[picIndexesToRender[a]].alt;
    imagesToSelect[a].title = allPics[picIndexesToRender[a]].title;
    allPics[picIndexesToRender[a]].shown++;
  }
}

function renderResults(){
  var allPicPercentages = [];

  for(var i = 0; i < allPics.length; i++) {
    var oldName = allPics[i].title;
    var newName = oldName.replace(/-/g, ' ');

    myChart.data.labels[i] = newName;
    myChart.data.datasets[0].data[i] = allPics[i].clicked;

    allPicPercentages.push(calcPercentageClicked(allPics[i].clicked, allPics[i].shown));

    myChart.update();
  }
}

function calcPercentageClicked(clicked, shown) {
  return Math.floor((clicked / shown) * 100);
}

var ctx = document.getElementById('results-chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    // replace values in labels with names of all the pictures
    labels: [],
    datasets: [{
      label: '# of Votes',
      // replace values in data with number of votes for each picture
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

(function() {
  makeNewPics();
  renderPictures();
  if(localStorage.length > 0) {
    allPics = JSON.parse(localStorage.getItem(picsKey));
    console.log('parsed ', allPics);
  }

  alert('Please select which one of the three displayed products you would be most likely to purchase. You will be asked to make 25 selections. Thank you for your participation.');
})();
