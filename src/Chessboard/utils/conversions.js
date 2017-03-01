let alpha = 'abcdefgh';

function coordinateToIndex(coordinate) {
    console.log(coordinate);
    //if (coordinate.length === 3) {
        //coordinate = coordinate.slice(1, 3);
    //} else if (coordinate.length === 4) {
        //coordinate = coordinate.slice(2, 4);
    //}
    let x = coordinate[0];
    let y = coordinate[1];

    x = alpha.indexOf(x) + 1;
    y = (8 - y) * 8;
    return (x + y) - 1;
}

function indexToCoordinate(index) {
    let x = index % 8;
    let y = Math.floor(index / 8) + 1;

    x = alpha[x];
    y = 9 - y;

    return x + y;
}

exports.indexToCoordinate = indexToCoordinate;
exports.coordinateToIndex = coordinateToIndex;
