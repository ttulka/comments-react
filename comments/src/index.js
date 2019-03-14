import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './component/App';

import Config from './config.json';
import CommentService from './service/CommentService';

const commentService = new CommentService(Config.ServiceHost, Config.CaptchaCookieName);

const commentsDiv = document.getElementById('comments');
const articleId = commentsDiv.getAttribute('articleId');

const serviceCommentsHref = Config.ServiceComments.replace('[:articleId:]', articleId);
const captchaCookieName = Config.CaptchaCookieName;

ReactDOM.render(
    <Comments commentService={commentService}
              serviceCommentsHref={serviceCommentsHref}
              captchaCookieName={captchaCookieName}
    />,
    commentsDiv
);