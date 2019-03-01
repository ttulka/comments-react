import React, {Component} from 'react';
import './App.css';
import * as ReactDOM from "react-dom";

const SERVICE_API = process.env.SERVICE_API || '/server';
const CAPTCHA_COMMENT_URL = process.env.CAPTCHA_URL || '/captcha.png';
const CAPTCHA_ANSWER_URL = process.env.CAPTCHA_URL || '/captcha.png';

const title = 'Leave a comment';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            next: null
        }

        this.onLeaveComment = this.onLeaveComment.bind(this);
        this.loadComments = this.loadComments.bind(this);
    }

    componentDidMount() {
        this.loadComments('server.json');
    }

    loadComments(href) {
        fetch(`${SERVICE_API}/${href}`)
            .then(response => response.json())
            .then(result => {
                this.setComments(result.comments);
                this.setNext(result.next);
            })
            .catch(err => console.error('Cannot load comments: ', err));
    }

    setComments(comments) {
        console.debug('Setting comments', comments);
        this.setState({comments: [...this.state.comments, ...comments]});
    }

    setNext(href) {
        console.debug('Setting next', href);
        this.setState({next: href});
    }

    onLeaveComment({name, message, captcha}) {
        console.log('Leave a new comment...', message);
        // TODO call the storing service
        const comment = {
            "id": 123,
            "body": message,
            "createdAt": new Date().getTime() / 1000,
            "author": name
        };
        this.setState({comments: [comment, ...this.state.comments]});
    }

    render() {
        const onLeaveAnswer = () => {
            // TODO:
            // focus on the form

        }
        return (
        <div className="comments-app">
            <h2>{title}</h2>

            <div className="pb-3">
                <LeaveMessageForm
                    captchaUrl={CAPTCHA_COMMENT_URL}
                    onLeaveMessage={this.onLeaveComment}/>
            </div>

            {this.state.comments.map(comment =>
                <Comment
                    comment={comment}
                    onLeaveAnswer={onLeaveAnswer}
                    key={comment.id}/>
            )}

            {this.state.next &&
                <Pagination
                    next={this.state.next}
                    label='Older'
                    onLoadNextItems={this.loadComments}/>
            }
        </div>
        );
    }
}

class LeaveMessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            message: null,
            captcha: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onLeaveMessage(this.state);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {captchaUrl} = this.props;
        return (
        <form onSubmit={this.onSubmit} method="post">
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-4">
                    <input name="name" id="name" className="form-control" onChange={this.onInputChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="captcha" className="col-sm-2 col-form-label"><img src={captchaUrl}/></label>
                <div className="col-sm-2">
                    <input name="captcha" id="captcha" className="form-control" onChange={this.onInputChange}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12">
                    <textarea name="message" rows="5" className="form-control" onChange={this.onInputChange}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
        );
    }
}

class Pagination extends Component {
    loadNextItems = (loadFn, next) => e => {
        e.preventDefault();
        loadFn(next);
    }

    render() {
        const {next, label = 'Next', onLoadNextItems} = this.props;
        return  (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={this.loadNextItems(onLoadNextItems, next)} className="page-link" href="#">{label}</a>
                </li>
            </ul>
        </nav>
        );
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: props.comment.answers,
            next: props.comment.next,
            formVisible: false
        }

        this.onReply = this.onReply.bind(this);
        this.onLeaveAnswer = this.onLeaveAnswer.bind(this);
        this.loadAnswers = this.loadAnswers.bind(this);
    }

    loadAnswers(href) {
        fetch(`${SERVICE_API}/${href}`)
            .then(response => response.json())
            .then(result => {
                this.setAnswers(result.answers);
                this.setNext(result.next);
            })
            .catch(err => console.error('Cannot load answers: ', err));
    }

    setAnswers(answers) {
        console.debug('Setting answers', answers);
        this.setState({answers: [...this.state.answers, ...answers]});
    }

    setNext(href) {
        console.debug('Setting next', href);
        this.setState({next: href});
    }

    onReply(e) {
        this.setState({formVisible: true});
    }

    onLeaveAnswer({name, message, captcha}) {
        console.log('Leave a new answer...', message);
        // TODO call the storing service
        const answer = {
            "id": 321,
            "body": message,
            "createdAt": new Date().getTime() / 1000,
            "author": name
        };
        this.setState({answers: [...this.state.answers, answer]});
    }

    render() {
        const {id, author, createdAt, body} = this.props.comment;
        return (
        <div className="comment card mb-3">
            <div className="card-header">
                <span className="author">{author}</span>
                <span className="createdAt">{formattedDate(createdAt)}</span>
                <a onClick={this.onReply} className="reply" href={"#form-" + id}>Reply</a>
            </div>
            <div className="body card-body">
                {body}
            </div>

            <div className="answers">
                {(this.state.answers || []).map(answer =>
                     <Answer answer={answer} key={answer.id}/>
                )}

                {this.state.next &&
                 <Pagination
                     next={this.state.next}
                     label='More...'
                     onLoadNextItems={this.onLeaveAnswer}/>
                }

                {this.state.formVisible &&
                 <div className="p-3">
                     <a name={"form-" + id}></a>
                     <h3>Your answer</h3>
                     <LeaveMessageForm
                         captchaUrl={CAPTCHA_ANSWER_URL}
                         onLeaveMessage={this.onLeaveAnswer}/>
                 </div>
                }
            </div>
        </div>
        );
    }
}

class Answer extends Component {
    render() {
        const {author, createdAt, body} = this.props.answer;
        return (
        <div className="answer card-body bg-light">
            <div>
                <span className="author">{author}</span>
                <span className="createdAt">{formattedDate(createdAt)}</span>
            </div>
            <div className="body">
                {body}
            </div>
        </div>
        );
    }
}

function formattedDate(time) {
    return new Date(parseInt(time * 1000)).toLocaleDateString();
}

export default Comments;

