import {destroyDOM} from './destroy-dom.js';
import {Dispatcher} from './dispatcher.js';
import {patchDOM} from './patch-dom';

export function createApp({state, view, reducers = {}}) {
  let parentEl = null;
  let vdom = null;
  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];
  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }
  for (const actionName in reducers) {
    const reducer = reducers[actionName];
    const subs = dispatcher.subscribe(actionName, payload => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }
  function renderApp() {
    const newVdom = view(state, emit);
    vdom = patchDOM(vdom, newVdom, parentEl);
  }
  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view(state, emit);
      mountDOM(vdom, parentEl);
    },
    unmount() {
      destroyDOM(vdom);
      vdom = null;
      subscriptions.forEach(unsubscribe => unsubscribe());
    },
  };
}
