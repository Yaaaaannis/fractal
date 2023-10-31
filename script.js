let maxIterations = 100;
let minval = -2.5;
let maxval = 2.5;
let zoom = 1;
let panX = 0;
let panY = 0;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minval * zoom + panX, maxval * zoom + panX);
      let b = map(y, 0, height, minval * zoom + panY, maxval * zoom + panY);

      let ca = a;
      let cb = b;

      let n = 0;
      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (dist(a, b, 0, 0) > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxIterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}

function mouseWheel(event) {
  zoom -= event.delta * 0.001;
  zoom = constrain(zoom, 0.1, 5);  // Constrain zoom level between 0.1 and 5
}
