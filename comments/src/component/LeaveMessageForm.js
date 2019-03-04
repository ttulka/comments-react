import React, {Component} from 'react';

import './LeaveMessageForm.css';

const success_msg_def = 'Thanks for your message!';

class LeaveMessageForm extends Component {
    constructor(props) {
        super(props);

        this.onLeaveMessage = props.onLeaveMessage;
        this.captchaUrl = props.captchaUrl;
        this.successMsg = props.successMsg || success_msg_def;

        this.state = {
            name: null,
            message: null,
            captcha: null,
            info: null,
            error: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onLeaveMessage = this.onLeaveMessage.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const message = {
            name: this.state.name,
            message: this.state.message
        };

        this.onLeaveMessage(message, this.state.captcha)
            .then(() => this.setState({name: null, message: null, captcha: null}))
            .then(() => this.setState({info: this.successMsg}))
            .catch(err => {
                this.setState({error: err.message});
                console.log('Error by sending a message', err);
            });
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.setState({info: null, error: null});
    }

    render() {
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
                <label htmlFor="captcha" className="col-sm-2 col-form-label"><img src={this.captchaUrl} alt="Captcha"/></label>
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

export default LeaveMessageForm;