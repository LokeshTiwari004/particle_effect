export default function drawImage(image, canvas, context, fir='center') {
    const wFac = image.width / canvas.width;
    const hFac = image.height / canvas.height;
    const fac = wFac > hFac ? wFac : hFac;

    const width = fac < 1 ? image.width : ~~(image.width / fac);
    const height = fac < 1 ? image.height : ~~(image.height / fac);
    const topLeftX = ~~((canvas.width - width) * .5);
    const topLeftY = ~~((canvas.height - height) * .5);

    context.drawImage(
        image,
        topLeftX,
        topLeftY,
        width,
        height
    )

    return {
        topLeftX,
        topLeftY,
        width,
        height
    }
}