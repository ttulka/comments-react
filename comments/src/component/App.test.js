import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './App';

describe('App', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Comments />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});