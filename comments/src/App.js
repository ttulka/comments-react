import React, {Component} from 'react';
import './App.css';

const SERVICE_API = process.env.SERVICE_API || '/server.json';
const CAPTCHA_URL = process.env.CAPTCHA_URL || '/captcha.png';

const title = 'Leave a comment';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.data = data;
        this.leaveComment = this.leaveComment.bind(this);
    }

    formattedDate = (time) => new Date(parseInt(time * 1000)).toLocaleDateString();

    leaveComment() {
        console.log('LEave comment');
    }

    render() {
        return (
        <div className="comments-app">
            <h2>{title}</h2>
            <form action={SERVICE_API} method="post">
                <input type="hidden" name="parent" />
                <div className="form-group row">
                    <label htmlFor="nickname" className="col-sm-2 col-form-label">Nickname</label>
                    <div className="col-sm-4">
                        <input name="nickname" id="nickname" className="form-control"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="captcha" className="col-sm-2 col-form-label"><img src={CAPTCHA_URL}/></label>
                    <div className="col-sm-2">
                        <input name="captcha" id="captcha" className="form-control"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <textarea name="message" rows="5" className="form-control"></textarea>
                    </div>
                </div>
                <button type="button" onClick={() => this.leaveComment()} className="btn btn-primary mb-2">Submit</button>
            </form>

            {this.data.comments.map(comment => {
                return (
                <div key={comment.id} className="comment card mb-3">
                    <div className="card-header">
                        <span className="author">{comment.author}</span>
                        <span className="createdAt">{this.formattedDate(comment.createdAt)}</span>
                    </div>
                    <div className="body card-body">
                        {comment.body}
                    </div>

                    {(comment.answers || []).map(answer => {
                        return (
                        <div key={answer.id} className="answer card-body bg-light">
                            <div>
                                <span className="author">{answer.author}</span>
                                <span className="createdAt">{this.formattedDate(answer.createdAt)}</span>
                            </div>
                            <div className="body">{answer.body}</div>
                        </div>
                        );
                    })}
                </div>
                );
            })}
        </div>
        );
    }
}

const data = {
    "version": "1.0",
    "href": "/api/comments/1",
    "comments": [
        {
            "id": 6,
            "body": "My test comment 6",
            "createdAt": "1549648553",
            "author": "Author 6",
            "answers": [
                {
                    "id": 9,
                    "body": "My test answer 9",
                    "createdAt": "1668645553",
                    "author": "Author 9"
                }
            ]
        },
        {
            "id": 5,
            "body": "My test comment 5",
            "createdAt": "1549645553",
            "author": "Author 5",
            "answers": [
                {
                    "id": 7,
                    "body": "My test answer 7",
                    "createdAt": "1549645553",
                    "author": "Author 5"
                },
                {
                    "id": 8,
                    "body": "My test answer 8",
                    "createdAt": "1559645553",
                    "author": "Author 8"
                },
                {
                    "id": 10,
                    "body": "My test answer 10",
                    "createdAt": "1559945553",
                    "author": "Author 5"
                }
            ],
            "next": "server-5-1.json"
        },
        {
            "id": 4,
            "body": "My test comment 4",
            "createdAt": "1549641553",
            "author": "Author 4"
        },
    ],
    "next": "server-1.json"
}

export default Comments;

