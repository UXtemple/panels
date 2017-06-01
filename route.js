import normaliseUri from './utils/normalise-uri/index.js'
import PropTypes from 'prop-types'
import React from 'react'

export default class Route extends React.Component {
  isActive = path => {
    const { route, router, routeIndex } = this.props

    const routeAfterContext = router.routes.items[routeIndex + 1]
    return (
      routeAfterContext &&
      normaliseUri(`${route.context}${path}`) === routeAfterContext
    )
  }

  navigate = (toUri, focus, context, raw = false) =>
    this.props.navigate(
      raw ? toUri : `${this.props.route.context}${toUri}`,
      focus,
      context
    )

  toggleExpand = () => this.props.toggleExpand(this.props.route.context)

  updateSettings = settings =>
    this.props.updateSettings(this.props.route.context, settings)

  getChildContext() {
    const { isActive, navigate, toggleExpand, updateSettings } = this
    const { isContext, isFocus, panel, route, routeIndex, router } = this.props

    return {
      isActive,
      isContext,
      isFocus,
      navigate,
      panel,
      route,
      routeIndex,
      router,
      toggleExpand,
      updateSettings,
    }
  }

  render() {
    const { isActive, navigate, props, toggleExpand, updateSettings } = this

    if (props.panel.isCustom) {
      return <CustomRoute {...props} />
    } else {
      const { Type, width, ...rest } = props

      // the order below is correct, width can be overwritten but panels shouldn't be
      return (
        <Type
          width={width}
          {...props.panel.props}
          panels={{
            ...rest,
            isActive,
            navigate,
            toggleExpand,
            updateSettings,
          }}
        />
      )
    }
  }
}

const routeShape = PropTypes.shape({
  app: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  panelId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
})

Route.childContextTypes = {
  isActive: PropTypes.func.isRequired,
  isContext: PropTypes.bool,
  isFocus: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  panel: PropTypes.object.isRequired,
  route: routeShape.isRequired,
  routeIndex: PropTypes.number.isRequired,
  router: PropTypes.shape({
    routes: PropTypes.shape({
      byContext: PropTypes.objectOf(routeShape),
      items: PropTypes.arrayOf(PropTypes.string),
    }),
    uri: PropTypes.string.isRequired,
  }),
  toggleExpand: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
}

class CustomRoute extends React.Component {
  state = {}

  componentDidMount() {
    const { isActive, navigate, toggleExpand, updateSettings } = this
    const {
      isContext,
      isFocus,
      panel,
      route,
      routeIndex,
      router,
      store,
      Type,
    } = this.props

    const typeProps = {
      isActive,
      isContext,
      isFocus,
      navigate,
      panel,
      route,
      routeIndex,
      router,
      store,
      toggleExpand,
      updateSettings,
    }

    try {
      this.onDestroy = Type(this.$el, typeProps, this.subscribe)
    } catch (error) {
      console.error('panels:route', error)
    }
  }

  componentDidUpdate(prevProps) {
    const { panel, route, routeIndex, router, type } = this.props

    if (prevProps.type !== type) {
      this.componentWillUnmount()
      this.componentDidMount()
    } else if (
      typeof this.onChange === 'function' &&
      (prevProps.panel !== panel ||
        prevProps.route !== route ||
        prevProps.routeIndex !== routeIndex ||
        prevProps.router !== router)
    ) {
      this.onChange({
        panel,
        route,
        routeIndex,
        router,
      })
    }
  }

  componentWillUnmount() {
    if (typeof this.onDestroy === 'function') {
      this.onDestroy()
    }
  }

  subscribe = onChange => (this.onChange = onChange)

  render() {
    const { props, state } = this

    return (
      <div
        ref={$el => {
          this.$el = $el
        }}
        style={{
          backgroundColor: state.error && '#ff5959',
          height: '100%',
          overflowY: 'auto',
          width: props.width,
          zIndex: props.zIndex,
          ...props.style,
        }}
      >
        {state.error &&
          <pre style={{ color: '#ffffff', overflowX: 'scroll', padding: 10 }}>
            {state.error.stack}
          </pre>}
      </div>
    )
  }
}
