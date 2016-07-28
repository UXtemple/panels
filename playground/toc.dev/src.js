import { Panel, wrap } from 'panels-ui';
import { Horizontal, Text } from 'usepages-blocks';
import normaliseUri from 'panels-normalise-uri';
import React, { Component, PropTypes } from 'react';

const getTeleportTo = ({ path, route, routeIndex, router }) => {
  const prevRouteContext = router.routes.items[routeIndex - 1];

  const currentPathToRemainInContext = route.context.replace(prevRouteContext, '');
  const dotsToGoBack = currentPathToRemainInContext.split('/')
    .map((s, i) => (i > 0 ? '../' : '')).join('');

  return `${dotsToGoBack}${path}/${currentPathToRemainInContext}`;
};

class Toc extends Component {
  isActive = path => {
    const { route, router } = this.props.panels;
    return normaliseUri(`${route.context}${path}`) === router.uri;
  }

  getChildContext() {
    return {
      isActive: this.isActive
    }
  }

  render() {
    const { list, panels: { route, routeIndex, router } } = this.props;

    return (
      <Panel
        style={{
          backgroundColor: '#3D3DF4',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          fontSize: 125,
          padding: 20,
          width: route.width
        }}
      >
        Toc

        {list.map(({ path, title }, i) => (
          <Horizontal
            style={styleAction}
            styleActive={styleActionActive}
            styleHover={styleActionActive}
            teleportTo={getTeleportTo({ path, routeIndex, route, router })}
          >
            <Text key={i} text={title} />
          </Horizontal>
        ))}
      </Panel>
    );
  }
}
Toc.defaultProps = {
  list: [{
    path: 'cover',
    title: 'Cover'
  }, {
    path: 'page-1',
    title: 'Page 1'
  }, {
    path: 'page-2',
    title: 'Page 2'
  }, {
    path: 'page-3',
    title: 'Page 3'
  }, {
    path: 'page-4',
    title: 'Page 4'
  }]
};
Toc.childContextTypes = {
  isActive: PropTypes.func
}

export const types = {
  'Toc': wrap(Toc)
};

export const panels = {
  '/': {
    dockLeft: true,
    type: 'Toc',
    width: 360
  }
};

const styleAction = {
  backgroundColor: '#f0f0f0',
  borderRadius: 5,
  color: '#000000',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 20,
  justifyContent: 'center',
  margin: 2.5,
  padding: '10px 20px',
  textDecoration: 'none',
  textTransform: 'uppercase'
};
const styleActionActive = {
  backgroundColor: '#000000',
  color: '#f0f0f0'
};
