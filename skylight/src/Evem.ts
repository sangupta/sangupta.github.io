export const emitter = new EventTarget();

function on(name: string, handler: EventListenerOrEventListenerObject) {
    emitter.addEventListener(name, handler);
}

function once(name: string, handler: EventListenerOrEventListenerObject) {
    emitter.addEventListener(name, handler, {
        once: true
    });
}

function off(name: string, handler: EventListenerOrEventListenerObject) {
    emitter.removeEventListener(name, handler);
}

function emit(name: string, payload: object = {}) {
    const event = new CustomEvent(name, {
        detail: payload
    });
    emitter.dispatchEvent(event);
}

const Evem = {
    on: on,
    off: off,
    once: once,
    emit: emit
};

export default Evem;
