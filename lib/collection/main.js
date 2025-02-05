
class Collection extends Map {
  filter(fn) {
    const filtered = new Collection();
    for (const [key, value] of this) {
      if (fn(value, key, this)) filtered.set(key, value);
    }
    return filtered;
  }

  map(fn) {
    const mapped = new Collection();
    for (const [key, value] of this) {
      mapped.set(key, fn(value, key, this));
    }
    return mapped;
  }

  find(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
    return undefined;
  }

  some(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return true;
    }
    return false;
  }

  every(fn) {
    for (const [key, value] of this) {
      if (!fn(value, key, this)) return false;
    }
    return true;
  }

  random() {
    const array = Array.from(this.values());
    return array[Math.floor(Math.random() * array.length)];
  }
}

module.exports = Collection;
