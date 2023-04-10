let topography;
let bathymetry;
let testSection;

let rows = 50;
let columns = 50;
let dotRadius = 2;
let dotSpacing = 25;

let cam;

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
  positionCamera(cam);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // testSection = topography.get(0, 0, 100, 100);
  // bathymetry.loadPixels();
  cam = createCamera();
  positionCamera(cam);
  
  noStroke();

  console.log("setup");
}

function positionCamera(cam) {
  cam.setPosition(0, height * 1.5, (height/2) / tan(PI/6));
  cam.lookAt(0, 0, 0);
}

function centerGrid() {
  let xOffset = -(columns - 1) * dotSpacing / 2;
  let yOffset = -(rows - 1) * dotSpacing / 2;
  translate(xOffset, yOffset);
}

function draw() {
  background(0);
  centerGrid();

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      push();
      translate(x * dotSpacing, y * dotSpacing, 0);
      fill(255);
      sphere(dotRadius);
      pop();
    }
  }
}

// returns the red value of a pixel at (x, y) treated as grayscale value
function getGrayscale(img, x, y) {
  let index = 4 * (y * img.width) + x;
  return img.pixels[index];
}
