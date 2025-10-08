export function addEventListener(eventName, handler, el, hostComponent = null) {
  function boundHandler() {
    hostComponent ? handler.apply(hostComponent, arguments) : handler(...arguments);
  }
  el.addEventListener(eventName, boundHandler);
  return boundHandler;
}

export function addEventListeners(listeners = {}, el, hostComponent = null) {
  const addedListeners = {};
  Object.entries(listeners).forEach(([eventName, handler]) => {
    addedListeners[eventName] = addEventListener(eventName, handler, el, hostComponent);
  });
  return addedListeners;
}

export function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler);
  });
}
