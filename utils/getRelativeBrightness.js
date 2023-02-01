const getRelativeBrightness = (red, green, blue) => {
    // return Math.sqrt(
    //     (red * red) * 0.299 +
    //     (green * green) * 0.587 +
    //     (blue * blue) * 0.114
    // ) / 255;
    return ~~Math.sqrt(
        (red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114
    );
}

export default getRelativeBrightness;