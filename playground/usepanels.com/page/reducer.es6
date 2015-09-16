const DUMMY = {
  '/': {
    blocks: [{
      element: 'action',
      data: {
        href: 'use-it/',
        text: 'Use it!'
      }
    }]
  },
  '/use-it': {
    blocks: [{
      element: 'title',
      data: {
        text: 'Use it! :)'
      }
    }, {
      element: 'text',
      data: {
        text: 'Now...'
      }
    }]
  }
};

export default function pageReducer(state=DUMMY, action) {
  return state;
}
