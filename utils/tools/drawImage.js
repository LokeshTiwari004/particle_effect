export function drawImage(image, fit = "center") {
  const wFac = image.width / this.canvas.width;
  const hFac = image.height / this.canvas.height;
  const fac = wFac > hFac ? wFac : hFac;

  const width = fac < 1 ? image.width : ~~(image.width / fac);
  const height = fac < 1 ? image.height : ~~(image.height / fac);
  const topLeftX = ~~((this.canvas.width - width) * 0.5);
  const topLeftY = ~~((this.canvas.height - height) * 0.5);

  this.context.drawImage(image, topLeftX, topLeftY, width, height);
  this.imgInfo = [topLeftX, topLeftY, width, height]
}
