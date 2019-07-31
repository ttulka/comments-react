import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './component/App';

import Config from './config.json';
import CommentService from './service/CommentServiceDev';

const commentService = new CommentService(Config.ServiceHost);

const commentsDiv = document.getElementById('comments');
const articleId = commentsDiv.getAttribute('articleId');

const serviceCommentsHref = Config.ServiceComments.replace('[:articleId:]', articleId);

ReactDOM.render(
    <Comments commentService={commentService}
              serviceCommentsHref={serviceCommentsHref}
    />,
    commentsDiv
);