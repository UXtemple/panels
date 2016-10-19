import Knocking from './knocking';
import React, { Component, PropTypes } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.state = {
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        isLoading: true
      });
    }
  }

  onLoad() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    const { isLoading } = this.state;
    const { text, src, style, styleLoading, styleWrapper } = this.props;

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
    );
  }
}

Image.defaultProps = {
  src: 'https://files.usepages.today/usepages.today/image-placeholder.svg',
  style: {},
  styleLoading: {
    position: 'absolute'
  },
  styleWrapper: {},
  text: 'Alternative text'
};

Image.description = "Add some text for when the image can't be displayed.";

Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  styleLoading: PropTypes.object,
  styleWrapper: PropTypes.object,
  text: PropTypes.string
};

export default Image;
