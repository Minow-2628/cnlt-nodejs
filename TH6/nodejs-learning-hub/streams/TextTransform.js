const { Transform } = require('stream');

class TextTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const result = chunk.toString().toUpperCase();
    callback(null, result);
  }
}

module.exports = TextTransform;