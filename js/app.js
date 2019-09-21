'use strict';

var formEl = document.getElementById('form-container');
var firstImgEl = document.getElementById('firstImg');
var secondImgEl = document.getElementById('secondImg');
var thirdImgEl = document.getElementById('thirdImg');
var firstRadioEl = document.getElementById('imgOne');
var secondRadioEl = document.getElementById('imgTwo');
var thirdRadioEl = document.getElementById('imgThree');
var submitEl = document.getElementById('vote-button');
var previousPics = [];
var picIndexesToRender = [];
var selectionsNeeded = 25;
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
firstImgEl.addEventListener('click', handleImageClick);
secondImgEl.addEventListener('click', handleImageClick);
thirdImgEl.addEventListener('click', handleImageClick);

function handleSelectionSubmit(event) {
  event.preventDefault();

  // update click property for picture that was selected
  if(firstRadioEl.checked) {
    allPics[picIndexesToRender[0]].clicked++;
    selectionsNeeded--;
    renderPictures();
  } else if(secondRadioEl.checked) {
    allPics[picIndexesToRender[1]].clicked++;
    selectionsNeeded--;
    renderPictures();
  } else if(thirdRadioEl.checked) {
    allPics[picIndexesToRender[2]].clicked++;
    selectionsNeeded--;
    renderPictures();
  } else {
    alert('Please select one product.');
  }

  if(selectionsNeeded === 0) {
    formEl.removeEventListener('submit', handleSelectionSubmit);
    firstImgEl.removeEventListener('click', handleImageClick);
    secondImgEl.removeEventListener('click', handleImageClick);
    thirdImgEl.removeEventListener('click', handleImageClick);
    submitEl.disabled = true;
    renderResults();
  }
}

function handleImageClick(event) {
  var radioEl = document.getElementById(event.target.className);
  radioEl.checked = true;
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
  firstRadioEl.checked = false;
  secondRadioEl.checked = false;
  thirdRadioEl.checked = false;
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

  // REFACTOR!!!!
  firstImgEl.src = allPics[picIndexesToRender[0]].src;
  firstImgEl.alt = allPics[picIndexesToRender[0]].alt;
  firstImgEl.title = allPics[picIndexesToRender[0]].title;
  secondImgEl.src = allPics[picIndexesToRender[1]].src;
  secondImgEl.alt = allPics[picIndexesToRender[1]].alt;
  secondImgEl.title = allPics[picIndexesToRender[1]].title;
  thirdImgEl.src = allPics[picIndexesToRender[2]].src;
  thirdImgEl.alt = allPics[picIndexesToRender[2]].alt;
  thirdImgEl.title = allPics[picIndexesToRender[2]].title;
  allPics[picIndexesToRender[0]].shown++;
  allPics[picIndexesToRender[1]].shown++;
  allPics[picIndexesToRender[2]].shown++;
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
  renderPictures();
  alert('Please select which one of the three displayed products you would be most likely to purchase. You will be asked to make 25 selections. Thank you for your participation.');
})();
