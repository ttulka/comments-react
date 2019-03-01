import React, {Component} from 'react';
import './App.css';

const SERVICE_API = process.env.SERVICE_API || '/server';
const CAPTCHA_URL = process.env.CAPTCHA_URL || '/captcha.png';

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

    onLeaveComment() {
        console.log('Leave a new comment...');
        const newComment = {
            "id": 123,
            "body": "My test comment 123",
            "createdAt": "1549648553",
            "author": "Author 123"
        };
        this.setState({comments: [newComment, ...this.state.comments]});
    }

    render() {
        return (
        <div className="comments-app">
            <h2>{title}</h2>

            <LeaveCommentForm
                serviceApi={SERVICE_API}
                captchaUrl={CAPTCHA_URL}
                onLeaveComment={this.onLeaveComment}/>

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

class LeaveCommentForm extends Component {
    render() {
        const {serviceApi, captchaUrl, onLeaveComment} = this.props;
        return (
        <form action={serviceApi} method="post">
            <input type="hidden" name="parent"/>
            <div className="form-group row">
                <label htmlFor="nickname" className="col-sm-2 col-form-label">Nickname</label>
                <div className="col-sm-4">
                    <input name="nickname" id="nickname" className="form-control"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="captcha" className="col-sm-2 col-form-label"><img src={captchaUrl}/></label>
                <div className="col-sm-2">
                    <input name="captcha" id="captcha" className="form-control"/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12">
                    <textarea name="message" rows="5" className="form-control"></textarea>
                </div>
            </div>
            <button type="button" onClick={onLeaveComment} className="btn btn-primary mb-2">Submit</button>
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
            next: props.comment.next
        }

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

    onLeaveAnswer() {
        console.log('Leave a new answer...');
        const newAnswer = {
            "id": 999999,
            "body": "My test answer XXX",
            "createdAt": "1549648553",
            "author": "Author XXX"
        };
        this.setState({answers: [newAnswer, ...this.state.answers]});
    }

    render() {
        const {author, createdAt, body} = this.props.comment;
        return (
        <div className="comment card mb-3">
            <div className="card-header">
                <span className="author">{author}</span>
                <span className="createdAt">{formattedDate(createdAt)}</span>
            </div>
            <div className="body card-body">
                {body}
            </div>

            {(this.state.answers || []).map(answer =>
                 <Answer answer={answer} key={answer.id}/>
            )}

            {this.state.next &&
             <Pagination
                 next={this.state.next}
                 label='More...'
                 onLoadNextItems={this.loadAnswers}/>
            }
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

