const { Duplex } = require('stream');

class EchoDuplex extends Duplex {
  _write(chunk, encoding, callback) {
    this.push(chunk);   // echo lại dữ liệu
    callback();
  }

  _read(size) {}
}

module.exports = EchoDuplex;