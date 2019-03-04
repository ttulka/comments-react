import React, {Component} from 'react';

import CommentService from '../service/CommentService';

import Comment from './Comment';
import LeaveMessageForm from './LeaveMessageForm';
import Pagination from './Pagination';

import './App.css';

const SERVICE_API = process.env.SERVICE_API || '/server';

const CAPTCHA_COMMENT_URL = process.env.CAPTCHA_URL || '/captcha.png';
const CAPTCHA_ANSWER_URL = process.env.CAPTCHA_URL || '/captcha.png';

const service = new CommentService(SERVICE_API);

const title = 'Leave a comment';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            next: null
        }

        this.onLoadComments = this.onLoadComments.bind(this);
        this.onLeaveComment = this.onLeaveComment.bind(this);
    }

    componentDidMount() {
        this.onLoadComments('server.json');
    }

    loadComments(href) {
        return service.loadComments(href);
    }

    loadAnswers(href) {
        return service.loadAnswers(href);
    }

    saveComment(comment, captcha) {
        return service.saveComment(comment, captcha);
    }

    saveAnswer(commentId, answer, captcha) {
        return service.saveAnswer(commentId, answer, captcha);
    }

    onLoadComments(href) {
        this.loadComments(href)
            .then(result => {
                this.setComments(result.comments);
                this.setNext(result.next);
            })
            .catch(err => console.error('Cannot load comments: ', err));
    }

    onLeaveComment(comment, captcha) {
        return this.saveComment(comment, captcha)
            .then(comment => this.setState({comments: [comment, ...this.state.comments]}));
    }

    setComments(comments = []) {
        this.setState({comments: [...this.state.comments, ...comments]});
    }

    setNext(href) {
        this.setState({next: href});
    }

    render() {
        return (
        <div className="comments-app">
            <h2>{title}</h2>

            <div className="pb-3">
                <LeaveMessageForm
                    onLeaveMessage={this.onLeaveComment}
                    captchaUrl={CAPTCHA_COMMENT_URL}/>
            </div>

            {this.state.comments.map(comment =>
                <Comment key={comment.id}
                    comment={comment}
                    loadAnswers={this.loadAnswers}
                    saveAnswer={this.saveAnswer}
                    captchaUrl={CAPTCHA_ANSWER_URL}/>
            )}

            {this.state.next &&
                <Pagination
                    next={this.state.next}
                    label='Older'
                    onLoadNextItems={this.onLoadComments}/>
            }
        </div>
        );
    }
}

export default Comments;

