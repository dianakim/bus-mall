'use strict';

var canvasEl = document.getElementById('my-canvas');

var picContainerEl = document.getElementById('pic-container');

var firstImgEl = document.getElementById('firstImg');

var secondImgEl = document.getElementById('secondImg');

var thirdImgEl = document.getElementById('thirdImg');

var allPics = [];

function Picture(name) {
  this.url = '../img/${name}.';
  this.src = name;
  this.alt = 

  allPics.push(this);
}

var newGraph = document.getElementById('bar-chart');

new Chart(newGraph).baseURI(barData);

var barData = {
  labels: ['one', 'two', 'three', 'four'],
  datasets: [
    {
      fillColor: 'rgba(172, 194, 132, 0.5)',
      strokeColor: '#ACC260',
      pointColor: '#fff',
      pointStrokeColor: '#9DB86D',
      data: [203, 156, 99, 251, 305, 247]
    }
  ]
}

