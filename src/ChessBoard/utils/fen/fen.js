const piecesMap = {
  'p': 'bp',
  'b': 'bb',
  'n': 'bn',
  'r': 'br',
  'q': 'bq',
  'k': 'bk',
  'P': 'wp',
  'B': 'wb',
  'N': 'wn',
  'R': 'wr',
  'Q': 'wq',
  'K': 'wk',
  '.': null
};

function removeRowNumbers(row) {
  return row.replace(/(\d)/g, digit => '.'.repeat(+digit));
}

function getFenArray(fen) {
  return fen.split(' ')[0].split('/').map(removeRowNumbers);
}

function getPieces(fen) {
  let pieces = [];

  getFenArray(fen).forEach(row => {
    row.split('').forEach(char => pieces.push(piecesMap[char]));
  });

  return pieces;
}

function getFEN(pieces) {
    let fen = '';
    let color, type, piece;

    for (var i = 0; i < pieces.length; i++) {
        if (i > 0 && i % 8 === 0) {
            fen += '/';
        }

        piece = pieces[i];
        if (piece) {
            color = piece[0];
            type  = piece[1];
        } else {
            color = '.';
            type  = '1';
        }

        if (color === 'w') {
            type = type.toUpperCase();
        }
        fen += type;
    }

    fen = fen.replace(/11111111/g, '8');
    fen = fen.replace(/1111111/g, '7');
    fen = fen.replace(/111111/g, '6');
    fen = fen.replace(/11111/g, '5');
    fen = fen.replace(/1111/g, '4');
    fen = fen.replace(/111/g, '3');
    fen = fen.replace(/11/g, '2');
    return fen;
}


exports.getPieces = getPieces;
exports.getFEN    = getFEN;
