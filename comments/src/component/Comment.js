import React, {Component} from 'react';

import LeaveMessageForm from './LeaveMessageForm';
import Pagination from './Pagination';

import './Comment.css';

const nextAnswers_label = 'More...'

class Comment extends Component {
    constructor(props) {
        super(props);

        this.comment = props.comment;
        this.loadAnswers = props.loadAnswers;
        this.saveAnswer = props.saveAnswer;
        this.captchaUrl = props.captchaUrl;

        this.state = {
            answers: props.comment.answers || [],
            next: props.comment.next,
            formVisible: false,
            isLoading: false
        }

        this.formRef = React.createRef();

        this.onReply = this.onReply.bind(this);
        this.onLoadAnswers = this.onLoadAnswers.bind(this);
        this.onLeaveAnswer = this.onLeaveAnswer.bind(this);
    }

    onLoadAnswers(href = this.state.next) {
        this.setState({isLoading: true});
        this.loadAnswers(href)
            .then(result => {
                this.setAnswers(result.answers);
                this.setNext(result.next);
                this.setState({isLoading: false});
            })
            .catch(err => {
                console.error('Cannot load answers:', err.message, err.response);
                this.setState({isLoading: false});
            });
    }

    onLeaveAnswer(answer, captcha) {
        return this.saveAnswer(this.comment.id, answer, captcha)
            .then(answer => this.setState({answers: [...this.state.answers, answer]}));
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

    render() {
        const {author, createdAt, body} = this.comment;
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

                {this.state.isLoading &&
                    <div className="loading"></div>
                }

                {this.state.next &&
                 <Pagination
                     label={nextAnswers_label}
                     onLoadNextItems={this.onLoadAnswers}/>
                }

                <div ref={this.formRef} tabIndex="-1">
                {this.state.formVisible &&
                 <div className="p-3">
                     <h3>Your answer</h3>
                     <LeaveMessageForm
                         captchaUrl={this.captchaUrl}
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
    constructor(props) {
        super(props);

        this.answer = props.answer;
    }

    render() {
        const {author, createdAt, body} = this.answer;
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

export default Comment;