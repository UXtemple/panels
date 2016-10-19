import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import debounce from 'lodash.debounce'
import Expand from '../expand.js'
import Horizontal from '../../blocks/horizontal.js'
import React, { Component, PropTypes } from 'react'
import text from './text.js'
import Text from '../../blocks/text.js'
import Vertical from '../../blocks/vertical.js'

const Content = (props, context) => (
  <Vertical style={{ backgroundColor: props.color, marginTop: 25, opacity: props.on ? 1 : 0.5 }} _ref={props._ref}>
    <Text text={text} />
    { context.scrollTo ? <button onClick={() => context.scrollTo(300)}>scroll to 300</button> : null }
  </Vertical>
)
Content.contextTypes = {
  scrollTo: PropTypes.func
}

const style = {
  innerWrapper: {
    height: '100%',
    overflow: 'auto',
    padding: 20
  }
}

class Lightgreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showText: true
    }
  }

  update() {
    this.props.panels.updateSettings({
      maxWidth: 400,
      width: 200
    })

    this.$vHorizontal.runAnimation()

    this.setState({
      showText: !this.state.showText
    })
  }

  scrollTo = (y) => {
    this.$scroller.scrollTop = y
  }

  getChildContext() {
    return {
      scrollTo: this.scrollTo
    }
  }

  // componentDidMount() {
  //   this.$scroller.addEventListener
  // }

  onScroll = debounce(e => {
    const { redTop:r, greenTop:g, blueTop:b } = this
    const top = this.$scroller.scrollTop

    console.log(r, g, b)

    let on
    if (top > r && top < g) {
      on = 'red'
    } else if (top > g && top < b) {
      on = 'green'
    } else if (top > b) {
      on = 'blue'
    }

    this.setState({
      on
    })
  }, 25)

  componentDidUpdate(prevState) {
    if (prevState.on === this.state.on)  return

    switch (this.state.on) {
    case 'green':
        return this.vG.runAnimation()
    case 'blue':
        return this.vB.runAnimation()
    case 'red':
        return this.vR.runAnimation()
    }
  }

  render() {
    const { props, state } = this
    return (
      <Vertical style={{ backgroundColor: state.on, height: '100%', overflowY: 'auto', width: props.width, transition: 'all 0.5s linear' }}>
        <Vertical style={style.innerWrapper} _ref={$e => { this.$scroller = $e }} onScroll={this.onScroll}>
          <VelocityTransitionGroup
            enter={{ animation: "transition.slideUpIn", stagger: 55, drag: true }}
            leave={{animation: "transition.slideUpOut"}}
            runOnMount
          >
            { state.showText ? <Text text={`width: ${props.width}`} /> : null }

            <VelocityComponent
              animation={"callout.tada"}
              ref={$e => { this.$vHorizontal = $e }}
            >
              <Horizontal onClick={() => this.update()}>update</Horizontal>
            </VelocityComponent>

            <Horizontal teleportTo='a/'
              context={1}
              style={{paddingBottom: 10, paddingTop: 10, textDecoration: 'none'}}
              styleActive={{ backgroundColor: 'white', color: 'lightgreen'}}
              styleHover={{ backgroundColor: 'lightgreen', color: 'white'}}>{'/a'}</Horizontal>

            <Horizontal teleportTo='..'>..</Horizontal>

            <Horizontal teleportTo=')a'>sliced a</Horizontal>

            <VelocityComponent
              animation={"transition.slideLeftBigIn"}
              ref={$e => { this.vR = $e }}
            >
              <Content _ref={$e => this.redTop = $e ? $e.offsetTop : 0 }/>
            </VelocityComponent>

            <VelocityComponent
              animation={"transition.slideLeftBigIn"}
              ref={$e => { this.vG = $e }}
            >
              <Content _ref={$e => this.greenTop = $e ? $e.offsetTop : 0 } />
            </VelocityComponent>

            <VelocityComponent
              animation={"transition.slideLeftBigIn"}
              ref={$e => { this.vB = $e }}
            >
              <Content _ref={$e => this.blueTop = $e ? $e.offsetTop : 0 }/>
            </VelocityComponent>

            <Horizontal onClick={() => this.scrollTo(100) }>scroll</Horizontal>

            <Horizontal teleportTo='a/'
              style={{paddingBottom: 10, paddingTop: 10, textDecoration: 'none'}}
              styleActive={{ backgroundColor: 'white', color: 'lightgreen'}}
              styleHover={{ backgroundColor: 'lightgreen', color: 'white'}}>{'/a'}</Horizontal>
            <Horizontal teleportTo='..'>..</Horizontal>
          </VelocityTransitionGroup>
        </Vertical>
        <Expand />
      </Vertical>
    )
  }
}
Lightgreen.childContextTypes = {
  scrollTo: PropTypes.func
}

export const types = {
  Lightgreen,
  Lightyellow: props => (
    <Vertical style={{ backgroundColor: 'lightyellow', height: '100%', overflowY: 'auto', padding: 20, width: props.width }}>
      <Horizontal context={0} teleportTo='b/'>{'/a/b'}</Horizontal>
      <Horizontal teleportTo='http://panels.dev/'>{'teleport /'}</Horizontal>
      <Horizontal teleportTo='..'>..</Horizontal>
      <Content />
    </Vertical>
  ),
  Lightblue: props => (
    <Vertical style={{ backgroundColor: 'lightblue', padding: 20, width: props.width }}>
      <Horizontal teleportTo='c/'>{'/a/b/c'}</Horizontal>
      <Horizontal teleportTo='..'>..</Horizontal>
      <Content />
    </Vertical>
  ),
  Lightpink: props => (
    <Vertical style={{ backgroundColor: 'lightpink', height: '100%', width: props.width }}>
      <Vertical style={style.innerWrapper}>
        <Horizontal teleportTo='d/'>{'/a/b/c/d'}</Horizontal>
        <Horizontal teleportTo='..'>..</Horizontal>
        <Content />
      </Vertical>
      <Expand />
    </Vertical>
  ),
  Fuchsia: props => (
    <Vertical style={{ backgroundColor: 'fuchsia', padding: 20, width: props.width }}>
      <Horizontal teleportTo='e/'>{'/a/b/c/d/e'}</Horizontal>
      <Horizontal teleportTo='..'>..</Horizontal>
      <Content />
    </Vertical>
  ),
  Red: props => (
    <Vertical style={{ backgroundColor: 'red', width: props.width }}>
      <Horizontal teleportTo='f/'>{'/a/b/c/d/e/f'}</Horizontal>
      <Horizontal teleportTo='..'>..</Horizontal>
      <Content />
    </Vertical>
  ),
  Blue: props => (
    <Vertical style={{ backgroundColor: 'blue', width: props.width }}>
      <Horizontal teleportTo='..'>..</Horizontal>
      <Content />
    </Vertical>
  ),
  Random: props => (
    <Vertical style={{ border: '1px solid black', width: props.width }}>
      random { props.id }
    </Vertical>
  )
}

export const panels = {
  '/': {type: 'Lightgreen', maxWidth: 720, styleBackground: {backgroundColor: '#f2f2f2'}, title: 'main'},
  '/a': {type: 'Lightyellow', width: 720 },
  '/a/b': {context: 0, type: 'Lightblue', width: 720},
  '/a/b/c': {type: 'Lightpink', maxWidth: 560},
  '/a/b/c/d': {type: 'Fuchsia'},
  '/a/b/c/d/e': {type: 'Red'},
  '/a/b/c/d/e/f': {type: 'Blue'},
  '/random:id': ({ id }) => ({
    context: 0,
    title: id,
    type: 'Random',
    width: 360 * parseFloat(id, 10)
  })
}

export const lookup = ['/random:id']

export const notify = action => {
  console.info('notified', action)
}
