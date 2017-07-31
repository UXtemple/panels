import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <div>:/</div>
    }

    return this.props.children
  }
}
