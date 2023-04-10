let topography;
let bathymetry;
let testSection;

const maxElevation = 6400;
const seaLevel = 0;
const minOceanDepth = -8000;

function preload() {
  
  // bathymetry = loadImage("img/earth-bathymetry.png");
  
  topography = loadImage("img/earth-topography.png");
  console.log("preloaded");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  testSection = topography.get(0, 0, 100, 100);
  testSection.loadPixels();
  //bathymetry.loadPixels();
  
  
  console.log("setup");
}

function draw() {
  
  background(255);
  if (testSection.pixels[0] == 0) console.log("black pixel");
}

// returns the red value of a pixel at (x, y) treated as grayscale value
function getGrayscale(img, x, y) {
  let index = 4 * (y * img.width) + x;
  return img.pixels[index];
}
