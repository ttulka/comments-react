import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';

describe('Comment', () => {

    const comment = {
        id: 123,
        body: 'My test comment',
        createdAt: '1549645553',
        author: 'Author 1',
        answers: [{
            id: 7,
            body: 'My test answer 1',
            createdAt: '1549645553',
            author: 'Author 2'
        }, {
            id: 8,
            body: 'My test answer 2',
            createdAt: '1559645553',
            author: 'Author 3'
        }],
        next: 'test-2.json'
    }

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Comment comment={comment}/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});