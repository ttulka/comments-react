import React, {Component} from 'react';

import CommentService from '../service/CommentService';

import Comment from './Comment';
import LeaveMessageForm from './LeaveMessageForm';
import Pagination from './Pagination';

import './App.css';

import Config from '../config.json';

const restService = new CommentService(Config.ServiceHost, Config.CaptchaCookieName);

const title = 'Leave a comment';
const nextComments_label = 'Older';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.serviceCommentsHref = Config.ServiceComments.replace('[:articleId:]', props.articleId);
        this.captchaUrl = Config.CaptchaUrl;

        this.state = {
            comments: [],
            next: null,
            isLoading: false
        }

        this.onLoadComments = this.onLoadComments.bind(this);
        this.onLeaveComment = this.onLeaveComment.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
    }

    componentDidMount() {
        this.onLoadComments(this.serviceCommentsHref);
    }

    loadComments(href) {
        return restService.loadComments(href);
    }

    loadAnswers(href) {
        return restService.loadAnswers(href);
    }

    saveComment(comment, captcha) {
        return restService.saveComment(this.serviceCommentsHref, comment, captcha);
    }

    saveAnswer(commentId, answer, captcha) {
        return restService.saveAnswer(`${this.serviceCommentsHref}/${commentId}`, answer, captcha);
    }

    onLoadComments(href = this.state.next) {
        this.setState({isLoading: true});
        this.loadComments(href)
            .then(result => {
                this.setComments(result.comments);
                this.setNext(result.next);
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.error('Cannot load comments:', err.message, err.response);
                this.setState({isLoading: false});
            });
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
                    captchaUrl={this.captchaUrl}/>
            </div>

            {this.state.isLoading &&
                <div className="loading"></div>
            }

            {this.state.comments.map(comment =>
                <Comment key={comment.id}
                    comment={comment}
                    loadAnswers={this.loadAnswers}
                    saveAnswer={this.saveAnswer}
                    captchaUrl={this.captchaUrl}/>
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

