import React, {Component} from 'react';
import './App.css';
import * as ReactDOM from "react-dom";

const SERVICE_API = process.env.SERVICE_API || '/server';
const CAPTCHA_COMMENT_URL = process.env.CAPTCHA_URL || '/captcha.png';
const CAPTCHA_ANSWER_URL = process.env.CAPTCHA_URL || '/captcha.png';

class CommentService {
    constructor(serviceApi) {
        this.serviceApi = serviceApi;
    }

    loadComments(href) {
        return fetch(`${SERVICE_API}/${href}`)
           .then(response => response.json());
    }

    loadAnswers(href) {
        return fetch(`${SERVICE_API}/${href}`)
           .then(response => response.json());
    }

    saveComment({name, message}, captcha) {
        if (!name) {
            return Promise.reject(new Error('Please fill your name!'));
        }
        if (!message) {
            return Promise.reject(new Error('Please fill your message!'));
        }
        if (!captcha) {
            return Promise.reject(new Error('Please fill the captcha!'));
        }

        return new Promise((resolve, reject) => {
            // TODO
            const comment = {
                id: new Date().getTime(),
                body: message,
                author: name,
                createdAt: new Date().getTime() / 1000
            };
            resolve(comment);
        });
    }

    saveAnswer(commentId, {name, message}, captcha) {
        if (!commentId) {
            return Promise.reject(new Error('Comment ID must be set!'));
        }
        if (!name) {
            return Promise.reject(new Error('Please fill your name!'));
        }
        if (!message) {
            return Promise.reject(new Error('Please fill your message!'));
        }
        if (!captcha) {
            return Promise.reject(new Error('Please fill the captcha!'));
        }

        return new Promise((resolve, reject) => {
            // TODO
            console.log('start promising')
            const answer = {
                id: new Date().getTime(),
                body: message,
                author: name,
                createdAt: new Date().getTime() / 1000
            };
            console.log('ANSWER', answer)
            resolve(answer);
        });
    }
}

const service = new CommentService(SERVICE_API);

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
        service.loadComments(href)
            .then(result => {
                this.setComments(result.comments);
                this.setNext(result.next);
            })
            .catch(err => console.error('Cannot load comments: ', err));
    }

    setComments(comments = []) {
        this.setState({comments: [...this.state.comments, ...comments]});
    }

    setNext(href) {
        this.setState({next: href});
    }

    onLeaveComment(comment, captcha) {
        return service.saveComment(comment, captcha)
            .then(comment => this.setState({comments: [comment, ...this.state.comments]}));
    }

    render() {
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
            captcha: null,
            info: null,
            error: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const message = {
            name: this.state.name,
            message: this.state.message
        };
        this.props.onLeaveMessage(message, this.state.captcha)
            .then(() => this.setState({name: null, message: null, captcha: null}))
            .then(() => this.setState({info: 'Thanks for your message!'}))
            .catch(err => {
                this.setState({error: err.message});
                console.log('Error by sending', err);
            });
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.setState({info: null, error: null});
    }

    render() {
        const {captchaUrl} = this.props;
        return (
        <form onSubmit={this.onSubmit} method="post">
            {this.state.error &&
             <div className="alert alert-danger" role="alert">
                {this.state.error}
             </div>
            }
            {this.state.info &&
             <div className="alert alert-info" role="alert">
                {this.state.info}
             </div>
            }
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-4">
                    <input name="name" id="name" className="form-control"
                        value={this.state.name || ''} onChange={this.onInputChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="captcha" className="col-sm-2 col-form-label"><img src={captchaUrl}/></label>
                <div className="col-sm-2">
                    <input name="captcha" id="captcha" className="form-control"
                        value={this.state.captcha || ''} onChange={this.onInputChange}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12">
                    <textarea name="message" rows="5" className="form-control"
                        value={this.state.message || ''} onChange={this.onInputChange}/>
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
            answers: props.comment.answers || [],
            next: props.comment.next,
            formVisible: false
        }

        this.formRef = React.createRef();

        this.onReply = this.onReply.bind(this);
        this.onLeaveAnswer = this.onLeaveAnswer.bind(this);
        this.loadAnswers = this.loadAnswers.bind(this);
    }

    loadAnswers(href) {
        service.loadAnswers(href)
            .then(result => {
                this.setAnswers(result.answers);
                this.setNext(result.next);
            })
            .catch(err => console.error('Cannot load answers: ', err));
    }

    setAnswers(answers = []) {
        this.setState({answers: [...this.state.answers, ...answers]});
    }

    setNext(href) {
        this.setState({next: href});
    }

    onReply(e) {
        e.preventDefault();
        this.setState({formVisible: true});
        this.formRef.current.scrollIntoView();
    }

    onLeaveAnswer(answer, captcha) {
        return service.saveAnswer(this.props.comment.id, answer, captcha)
            .then(answer => this.setState({answers: [...this.state.answers, answer]}));
    }

    render() {
        const {author, createdAt, body} = this.props.comment;
        return (
        <div className="comment card mb-3">
            <div className="card-header">
                <span className="author">{author}</span>
                <span className="createdAt">{formattedDate(createdAt)}</span>
                <a onClick={this.onReply} className="reply" href="#">Reply</a>
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
                     onLoadNextItems={this.loadAnswers}/>
                }

                <div ref={this.formRef} tabIndex="-1">
                {this.state.formVisible &&
                 <div className="p-3">
                     <h3>Your answer</h3>
                     <LeaveMessageForm
                         captchaUrl={CAPTCHA_ANSWER_URL}
                         onLeaveMessage={this.onLeaveAnswer}/>
                 </div>
                }
                </div>
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

