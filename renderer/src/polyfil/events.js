export default class EventEmitter {
    events = {};

    setMaxListeners() {}

    on(event, callback) {
        if (!this.events[event]) this.events[event] = new Set();

        this.events[event].add(callback);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;

        for (const [index, listener] of this.events[event].entries()) {
            try {
                listener(...args);
            } catch (error) {
                Logger.error("Emitter", `Cannot fire listener for event ${event} at position ${index}:`, error);
            }
        }
    }

    off(event, callback) {
        if (!this.events[event]) return;

        return this.events[event].delete(callback);
    }
};