import React from 'react';
import ReactDOM from 'react-dom';
import LeaveMessageForm from './LeaveMessageForm';

describe('LeaveMessageForm', () => {

    const onLeaveMessage = () => {};

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<LeaveMessageForm onLeaveMessage={onLeaveMessage}/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});