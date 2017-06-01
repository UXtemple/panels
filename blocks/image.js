import Knocking from './knocking'
import React from 'react'

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.state = {
      isLoading: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        isLoading: true,
      })
    }
  }

  onLoad() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { isLoading } = this.state
    const { text, src, style, styleLoading, styleWrapper } = this.props

    return (
      <div style={styleWrapper}>
        {isLoading && <Knocking style={styleLoading} />}
        <img
          alt={text}
          onLoad={this.onLoad}
          src={src}
          style={style}
          title={text}
        />
      </div>
    )
  }
}

Image.defaultProps = {
  src: 'https://files.usepages.today/usepages.today/image-placeholder.svg',
  style: {},
  styleLoading: {
    position: 'absolute',
  },
  styleWrapper: {},
  text: 'Alternative text',
}

export default Image
