
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    return this.on(event, onceWrapper);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    this.events.get(event).forEach(listener => listener.apply(this, args));
    return true;
  }

  off(event, listener) {
    if (!this.events.has(event)) return this;
    if (!listener) {
      this.events.delete(event);
      return this;
    }
    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    return this;
  }

  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

module.exports = EventEmitter;
