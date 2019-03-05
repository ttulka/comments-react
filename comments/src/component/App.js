import React, {Component} from 'react';

import CommentService from '../service/CommentService';

import Comment from './Comment';
import LeaveMessageForm from './LeaveMessageForm';
import Pagination from './Pagination';

import './App.css';

import Config from '../config.json';

const service = new CommentService(Config.ServiceAPI);

const title = 'Leave a comment';
const nextComments_label = 'Older';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.captchaCommentUrl = Config.CaptchaCommentUrl;
        this.captchaAnswerUrl = Config.CaptchaAnswerUrl;

        this.state = {
            comments: [],
            next: null,
            isLoading: false
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

    onLoadComments(href = this.state.next) {
        this.setState({isLoading: true});
        this.loadComments(href)
            .then(result => {
                this.setComments(result.comments);
                this.setNext(result.next);
                this.setState({isLoading: false});
            })
            .catch(err => this.setState({isLoading: false}) && console.error('Cannot load comments: ', err));
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
                    captchaUrl={this.captchaCommentUrl}/>
            </div>

            {this.state.isLoading &&
                <div className="loading"></div>
            }

            {this.state.comments.map(comment =>
                <Comment key={comment.id}
                    comment={comment}
                    loadAnswers={this.loadAnswers}
                    saveAnswer={this.saveAnswer}
                    captchaUrl={this.captchaAnswerUrl}/>
            )}

            {this.state.next &&
                <Pagination
                    label={nextComments_label}
                    onLoadNextItems={this.onLoadComments}/>
            }
        </div>
        );
    }
}

export default Comments;

