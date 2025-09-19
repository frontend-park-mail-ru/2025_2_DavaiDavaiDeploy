export function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}

export function addEventListeners(listeners = {}, el) {
  const addedListeners = {};
  Object.entries(listeners).forEach(([eventName, handler]) => {
    addedListeners[eventName] = addEventListener(eventName, handler, el);
  });
  return addedListeners;
}

export function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler);
  });
}
