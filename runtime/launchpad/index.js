import { connect } from 'react-redux';
import { setViewportWidth } from '../actions';
import { navigate, updateSettings } from '../../actions';
import debounce from 'lodash.debounce';
import FlipMove from 'react-flip-move';
import getViewportWidth from '../get-viewport-width';
import React, { Component, PropTypes } from 'react';
import Route from '../../route';
import Waiting from 'waiting';

const DEBOUNCE = 250;
const LOADING_SIZE = 100;
const LOADING_OFFSET = LOADING_SIZE / -2;
const REBOUND = 500;

export class LaunchpadRuntime extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.ensureDefault();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type;
    }

    this.ensureDefault();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewportWidth);
    window.removeEventListener('orientationchange', this.setViewportWidth);
  }

  ensureDefault() {
    const { props } = this;
    if (props.launchpadPanel && !props.mainPanel) {
      props.navigate(`${props.launchpadRoute.context}/${props.launchpadPanel.default}`);
    }
  }

  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      window.removeEventListener('resize', this.setViewportWidth);
      window.removeEventListener('orientationchange', this.setViewportWidth);
    } else {
      setTimeout(() => {
        window.addEventListener('resize', this.setViewportWidth, false);
        window.addEventListener('orientationchange', this.setViewportWidth, false);
      }, REBOUND);
    }
  }

  render() {
    const {
      dockedApp, dockedPanel, dockedRoute, dockedRouteIndex,
      mainApp, mainPanel, mainRoute,
      launchpadApp, launchpadPanel, launchpadRoute,
      navigate,
      router,
      runtime,
      updateSettings
    } = this.props;

    const docked = dockedPanel && (
      <Route
        key={`docked-${dockedPanel.dockLeft ? 'left' : 'right'}`}
        navigate={navigate}
        panel={dockedPanel}
        route={dockedRoute}
        routeIndex={dockedRouteIndex}
        router={router}
        store={dockedApp.store}
        type={dockedApp.types[dockedPanel.type]}
        updateSettings={updateSettings}
        width={dockedRoute.width}
      />
    );

    const translateX = dockedPanel ?
      (dockedPanel.dockLeft ? dockedRoute.width : -dockedRoute.width):
      0;

    const transform = `translateX(${ translateX }px)`;

    const mainWidth = runtime.viewportWidth - (dockedPanel && dockedRoute.width || 0);

    return (
      <div
        ref={$e => this.$runtime = $e}
        style={style}
      >
        {launchpadPanel && (
          <Route
            navigate={navigate}
            panel={launchpadPanel}
            route={launchpadRoute}
            routeIndex={0}
            router={router}
            store={launchpadApp.store}
            style={{
              height: launchpadPanel.height || 0,
              ...launchpadPanel.style
            }}
            type={launchpadApp.types[launchpadPanel.type]}
            updateSettings={updateSettings}
            width={'auto'}
          />
        )}

        <FlipMove
          duration={200}
          enterAnimation={'fade'}
          leaveAnimation={'fade'}
          style={{
            flexDirection: 'row',
            height: `calc(100% - ${(launchpadPanel && launchpadPanel.height) || 0}px)`,
            overflow: 'hidden',
            width: '100vw'
          }}>

          {dockedPanel && dockedPanel.dockLeft && docked}

          {mainPanel && (
            <Route
              key={'main'}
              navigate={navigate}
              panel={mainPanel}
              route={mainRoute}
              routeIndex={1}
              router={router}
              store={mainApp.store}
              type={mainApp.types[mainPanel.type]}
              updateSettings={updateSettings}
              width={mainWidth}
            />
          )}

          {dockedPanel && !dockedPanel.dockLeft && docked}

          {router.isLoading ? (
            <div
              style={{
                justifyContent: 'center',
                left: LOADING_OFFSET,
                marginTop: LOADING_OFFSET
              }}
            >
              <Waiting size={LOADING_SIZE} />
            </div>
            ) : null}
        </FlipMove>
      </div>
    );
  }

  setViewportWidth = debounce(() => this.props.setViewportWidth(getViewportWidth()), DEBOUNCE)
}

const style = {
  height: '100%',
  overflow: 'hidden',
  width: '100%'
};

const getCanMoveLeft = ({ runtime }) => !runtime.shouldGoMobile && runtime.x > 0;

function mapStateToProps({ apps, panels, runtime, router }, props) {
  const launchpadRoute = router.routes.byContext[
    router.routes.items[0]
  ];
  const mainRoute = router.routes.byContext[
    router.routes.items[1]
  ];
  let dockedRoute;
  let dockedRouteIndex;
  if (router.routes.items.length > 2) {
    dockedRouteIndex = router.routes.items.length - 1;
    dockedRoute = router.routes.byContext[
      router.routes.items[dockedRouteIndex]
    ];
  }

  const dockedPanel = dockedRoute && panels.byId[dockedRoute.panelId];
  const mainPanel = mainRoute && panels.byId[mainRoute.panelId];

  return {
    dockedApp: dockedRoute && apps.byName[dockedRoute.app],
    dockedPanel,
    dockedRoute,
    dockedRouteIndex,

    focusPanel: dockedPanel || mainPanel, // <-- TODO will change with what's open & focused, e.g. TOC

    mainApp: mainRoute && apps.byName[mainRoute.app],
    mainPanel,
    mainRoute,

    launchpadApp: launchpadRoute && apps.byName[launchpadRoute.app],
    launchpadPanel: launchpadRoute && panels.byId[launchpadRoute.panelId],
    launchpadRoute,

    router: router,
    runtime: runtime
  };
}

const mapDispatchToProps = {
  navigate,
  setViewportWidth,
  updateSettings
};
export default connect(mapStateToProps, mapDispatchToProps)(LaunchpadRuntime);
