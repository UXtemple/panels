import { load } from 'webfontloader'
import { Component, PropTypes } from 'react'

const loaded = []

export default class Font extends Component {
  componentDidMount() {
    this.load()
  }

  componentDidUpdate() {
    this.load()
  }

  load() {
    const { props } = this

    let family = props.family
    let source = props.source

    let urls
    if (props.family === 'FontAwesome') {
      source = 'custom'
      urls = [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
      ]
    } else if (typeof props.weight === 'string') {
      family = `${family}:${props.weight}`
    }

    if (loaded.includes(family)) return
    loaded.push(family)

    load({
      [source]: {
        families: [family],
        urls
      }
    })
  }

  render() {
    return null
  }
}
Font.defaultProps = {
  source: 'google'
}
Font.propTypes = {
  family: PropTypes.string.isRequired,
  source: PropTypes.oneOf([
    'custom',
    'google'
  ]).isRequired,
  weight: PropTypes.string
}
