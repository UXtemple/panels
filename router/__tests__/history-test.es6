import { spy, stub } from 'sinon';
import { windowSpy, windowRestore } from './window-spy';
import assert from 'assert';
import history from '../history';
import jsdom from 'mocha-jsdom';

describe('history', () => {
  jsdom();

  let navigate;
  let originalPushState;
  let redux;
  let unsubscribeHistory;
  let unsubscribeRedux;

  beforeEach(() => {
    navigate = spy();
    unsubscribeRedux = spy();
    redux = {
      getState: () => ({router: {uri: '/'}}),
      subscribe: stub().returns(unsubscribeRedux)
    };

    ['addEventListener', 'removeEventListener'].forEach(fn => windowSpy(global.window, 'w', fn));
    originalPushState = global.window.history.pushState;
    global.window.history.pushState = spy(originalPushState);

    unsubscribeHistory = history(redux, navigate);
  });

  afterEach(() => {
    ['addEventListener', 'removeEventListener'].forEach(fn => windowRestore(global.window, 'w', fn));
    global.window.history.pushState = originalPushState;
  });

  it('calls navigate when the URI changes via popstate', () => {
    const navigateHandler = global.window.addEventListener.firstCall.args[1];
    navigateHandler();
    assert(navigate.calledOnce, 'calls navigate');
    assert(navigate.calledWith(location.href), 'calls with the current URI');
  });

  it('pushes the new URI into the browser\'s history on a navigate action', () => {
    const reduxListener = redux.subscribe.firstCall.args[0];
    const uri = redux.getState().router.uri;
    reduxListener();

    assert(global.window.history.pushState.calledOnce, 'calls pushState');
    assert(global.window.history.pushState.calledWithExactly(null, null, uri), 'calls with the router\'s state uri');
  });

  it('should listen to popstate and to redux\'s changes', () => {
    assert(redux.subscribe.calledOnce, 'subscribes to redux');
    assert(global.window.addEventListener.calledOnce, 'adds the event listener on window');
    assert(global.window.addEventListener.calledWith('popstate'), 'the added event is popstate');
  });

  it('should return an unsubscribe function to cancel the redux\'s and the popstate listeners', () => {
    assert(typeof unsubscribeHistory === 'function', 'history returns a function');

    unsubscribeHistory();

    assert(unsubscribeRedux.calledOnce, 'unsubscribes from redux');
    assert(global.window.removeEventListener.calledOnce, 'removes the event listener on window');
    assert(global.window.removeEventListener.calledWith('popstate'), 'the removed event is popstate');
  });
});
