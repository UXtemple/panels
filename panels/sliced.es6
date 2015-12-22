import { Action } from 'panels-ui';
import { alignItemsCenter, flexDirectionColumn } from 'browser-vendor-prefix';
import getHrefToUnsliceUri from '../router/get-href-to-unslice-uri';
import React from 'react';

const Sliced = props => (
  <Action href={getHrefToUnsliceUri(props.route, props.uri)} style={{...style.wrapper, width: props.width}}>
    <div style={style.dot} />
    <div style={style.dot} />
    <div style={style.dot} />
  </Action>
);
export default Sliced;

const SHADOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzQTgxOTZBQTA1RTExRTU5ODM5QjU5M0UzQjQ2MEFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzQTgxOTZCQTA1RTExRTU5ODM5QjU5M0UzQjQ2MEFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU4MEEzMDlBMDVEMTFFNTk4MzlCNTkzRTNCNDYwQUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU4MEEzMEFBMDVEMTFFNTk4MzlCNTkzRTNCNDYwQUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ECkOJAAAAKElEQVR42mL8//8/AyMjIxMDAwMjEDMDMROUhmEWAnyYepB+JoAAAwD09QM1DhODCgAAAABJRU5ErkJggg==';

const style = {
  dot: {
    backgroundColor: '#939598',
    borderRadius: 3,
    height: 3,
    marginTop: 5,
    width: 3
  },
  wrapper: {
    ...alignItemsCenter,
    background: `#58595b url(${SHADOW}) repeat-y right`,
    ...flexDirectionColumn,
    paddingTop: 20
  }
}

