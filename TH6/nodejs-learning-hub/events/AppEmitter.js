const EventEmitter = require('events');

class AppEmitter extends EventEmitter {
  constructor() {
    super();
    this.count = 0;

    this.on('trigger', (message) => {
      this.count++;
      console.log('EVENT:', message);
      console.log('COUNT:', this.count);
    });

    this.once('onceEvent', () => {
      console.log('ONCE EVENT triggered');
    });
  }
}

module.exports = new AppEmitter();