import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './component/App';

import Config from './config.json';
import CommentService from './service/CommentService';

const commentService = new CommentService(Config.ServiceHost);

const commentsDiv = document.getElementById('comments');
const postId = commentsDiv.getAttribute('postId');

const serviceCommentsHref = Config.ServiceComments.replace('[:postId:]', postId);

ReactDOM.render(
    <Comments commentService={commentService}
              serviceCommentsHref={serviceCommentsHref}
    />,
    commentsDiv
);