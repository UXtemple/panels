import { connect } from 'react-redux'
import { moveLeft, setViewportWidth, setX } from '../actions.js'
import { navigate, toggleExpand, updateSettings } from '../../actions.js'
import { snapX } from '../../utils/snap.js'
import BaseStyle from '../base-style.js'
import debounce from 'lodash.debounce'
import getViewportWidth from '../get-viewport-width.js'
import Horizontal from '../../blocks/horizontal.js'
import Knocking from '../../blocks/knocking.js'
import MoveLeft from './move-left.js'
import React from 'react'
import Route from '../../route.js'
import supportsPassiveEvents from '../../utils/supports-passive-events.js'

const DEBOUNCE = 250
const LOADING_SIZE = 100
const LOADING_OFFSET = LOADING_SIZE / -2
const REBOUND = 500

const scrollEventOptions = supportsPassiveEvents ? { passive: true } : false

const style = {
  height: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100vw',
}

export class Runtime extends React.Component {
  state = {
    autoScroll: null,
  }

  componentDidMount() {
    if (this.props.snap) {
      this.$runtime.addEventListener('scroll', this.setX, scrollEventOptions)
    }
    window.addEventListener('resize', this.setViewportWidth, false)
    window.addEventListener('orientationchange', this.setViewportWidth, false)
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  componentDidUpdate(prevProps) {
    const { props } = this

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type
    }

    if (props.snap && prevProps.runtime.x !== props.runtime.x) {
      snapX(this.$runtime, props.runtime.x)
    }
  }

  componentWillUnmount() {
    if (this.props.snap) {
      this.$runtime.removeEventListener('scroll', this.setX)
    }
    window.removeEventListener('resize', this.setViewportWidth)
    window.removeEventListener('orientationchange', this.setViewportWidth)
  }

  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      if (this.props.snap) {
        this.$runtime.removeEventListener('scroll', this.setX)
      }
      window.removeEventListener('resize', this.setViewportWidth)
      window.removeEventListener('orientationchange', this.setViewportWidth)
    } else {
      setTimeout(() => {
        if (this.props.snap) {
          this.$runtime.addEventListener(
            'scroll',
            this.setX,
            scrollEventOptions
          )
        }
        window.addEventListener('resize', this.setViewportWidth, false)
        window.addEventListener(
          'orientationchange',
          this.setViewportWidth,
          false
        )
      }, REBOUND)
    }
  }

  render() {
    const {
      apps,
      canMoveLeft,
      focusPanel,
      moveLeft,
      navigate,
      panels,
      router,
      runtime,
      snap,
      toggleExpand,
      updateSettings,
      visibleRoutes,
    } = this.props

    const runtimeStyle = focusPanel
      ? {
          ...style,
          ...focusPanel.styleBackground,
        }
      : style

    return (
      <Horizontal _ref={$e => (this.$runtime = $e)} style={runtimeStyle}>
        <BaseStyle />

        {canMoveLeft &&
          snap &&
          <MoveLeft onClick={moveLeft} snapPoint={runtime.snapPoint} />}

        <Horizontal
          style={{
            flexDirection: 'row',
            height: '100%',
            overflowY: 'hidden',
            paddingLeft: runtime.snapPoint,
            width: runtime.width,
            willChange: 'scroll-position',
          }}
        >
          {visibleRoutes.map((context, i) => {
            const route = router.routes.byContext[context]
            const app = apps[route.app]
            const panel = panels[route.panelId]

            return (
              <Route
                isContext={i >= router.context}
                isFocus={i === router.focus}
                key={`${i}-${app.name}-${panel.type}`}
                navigate={navigate}
                panel={panel}
                route={route}
                routeIndex={i}
                router={router}
                store={app.store}
                toggleExpand={toggleExpand}
                Type={app.types[panel.type]}
                updateSettings={updateSettings}
                width={route.width}
                zIndex={router.routes.items.length - i}
              />
            )
          })}
        </Horizontal>

        {router.isLoading
          ? <Horizontal
              style={{
                justifyContent: 'center',
                left: router.routes.items.length
                  ? LOADING_OFFSET
                  : LOADING_OFFSET - runtime.snapPoint,
                marginTop: LOADING_OFFSET,
              }}
            >
              <Knocking size={LOADING_SIZE} />
            </Horizontal>
          : null}
      </Horizontal>
    )
  }

  scrollRuntime = ({ x }) => {
    const { autoScroll } = this.state

    if (this.$runtime && autoScroll) {
      this.$runtime.scrollLeft = autoScroll.from + x
    }
    return null
  }

  setViewportWidth = debounce(() => {
    this.props.setViewportWidth(getViewportWidth())
  }, DEBOUNCE)

  setX = debounce(event => {
    if (!this.props.snap) return

    if (this.state.autoScroll) {
      this.setState({
        autoScroll: null,
      })
    }

    const nextX = this.$runtime.scrollLeft
    if (Math.abs(this.props.runtime.x - nextX) > 5) {
      this.props.setX(nextX)
    }
  }, DEBOUNCE)
}

const getFocusPanel = ({ panels, router }) => {
  const focusRoute = router.routes.byContext[router.routes.items[router.focus]]
  return focusRoute && panels.byId[focusRoute.panelId]
}

const getCanMoveLeft = ({ runtime }) => !runtime.shouldGoMobile && runtime.x > 0

function mapStateToProps(state, props) {
  return {
    apps: state.apps.byName,
    canMoveLeft: getCanMoveLeft(state),
    focusPanel: getFocusPanel(state),
    panels: state.panels.byId,
    router: state.router,
    runtime: state.runtime,
    visibleRoutes: state.router.routes.items.filter(
      r => state.router.routes.byContext[r].isVisible
    ),
  }
}

const mapDispatchToProps = {
  moveLeft,
  navigate,
  setViewportWidth,
  setX,
  toggleExpand,
  updateSettings,
}
export default connect(mapStateToProps, mapDispatchToProps)(Runtime)
