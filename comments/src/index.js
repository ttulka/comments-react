import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './component/App';

const commentsDiv = document.getElementById('comments');
const articleId = commentsDiv.getAttribute('articleId')

ReactDOM.render(<Comments articleId={articleId} />, commentsDiv);