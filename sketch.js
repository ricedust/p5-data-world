let topography;
let bathymetry;
let testSection;

let worldPixels;

const rows = 100;
const columns = 100;

const dotRadius = 2;
const dotSpacing = 8;
const dotZScale = 50;

let cam;

const maxElevation = 6400;
const seaLevel = 0;
const minSeaDepth = -8000;

function preload() {
  topography = loadImage("img/earth-topography-small.png");
  bathymetry = loadImage("img/earth-bathymetry-small.png");

  console.log("preloaded");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCamera();
  positionCamera(cam);

  topography.loadPixels();
  bathymetry.loadPixels();

  worldPixels = Array(topography.pixels.length / 4);

  for (let i = 0; i < worldPixels.length; i++) {
    let seaElevation = map(bathymetry.pixels[i * 4], 0, 255, minSeaDepth, seaLevel);
    let landElevation = map(topography.pixels[i * 4], 0, 255, seaLevel, maxElevation);
    worldPixels[i] = seaElevation + landElevation;
  }

  console.log(worldPixels);

  console.log("setup");
  noStroke();
  noLoop();
}

function positionCamera(cam) {
  // TODO set z to default
  cam.setPosition(0, height * 2, (height) / tan(PI/6));
  cam.lookAt(0, 0, 0);
}

function centerGrid() {
  // let xOffset = -(topography.width/3 - 1) * dotSpacing / 2;
  // let yOffset = -(topography.height/3 - 1) * dotSpacing / 2;
  let xOffset = -(topography.width / 4  - 1) * dotSpacing / 2;
  let yOffset = -(topography.height / 4 - 1) * dotSpacing / 2;
  translate(xOffset, yOffset);
}

function draw() {
  background(0);
  positionCamera(cam);
  centerGrid();

  for (let y = 0; y < topography.height; y+=4) {
    push();
    for (let x = 0; x < topography.width; x+=4) {
      push();
      translate(0, 0, getWorldPixel(x, y) / 100);
      sphere(dotRadius);
      pop();

      translate(dotSpacing, 0);
    }
    pop();
    translate(0, dotSpacing);
  }
}

function getWorldPixel(x, y) {
  return worldPixels[topography.width * y + x];
}
