import React, {Component} from 'react';

import Captcha from '../util/Captcha';

import './LeaveMessageForm.css';

const success_msg_def = 'Thanks for your message!';
const error_msg = 'Server error. Please try it again.';
const captcha_msg = 'Captcha does not match!';

class LeaveMessageForm extends Component {
    constructor(props) {
        super(props);

        this.onLeaveMessage = props.onLeaveMessage;

        this.captcha = new Captcha(this.captchaCookieName);
        this.successMsg = props.successMsg || success_msg_def;

        this.formUUID = this.uniqueId();

        this.state = {
            name: null,
            message: null,
            captcha: null,
            nameValid: true,
            messageValid: true,
            captchaValid: true,
            captchaUrl: props.captchaUrl,
            info: null,
            error: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onLeaveMessage = this.onLeaveMessage.bind(this);
    }

    componentDidMount() {
        this.reloadCaptcha();
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value, [name + 'Valid']: true});
        this.setState({info: null, error: null});
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const message = {
            name: this.state.name,
            message: this.state.message
        };

        this.onLeaveMessage(message, this.state.captcha)
            .then(() => this.setState({name: null, message: null, captcha: null}))
            .then(() => this.setState({info: this.successMsg}))
            .catch(err => {
                console.log('Error by sending a message', err.message, err.response);
                this.handleResponseError(err);
            })
            .finally(() => this.reloadCaptcha());
    }

    validateForm() {
        let hasError = false;

        if (!this.state.name) {
            this.setState({nameValid: false});
            hasError = true;
        }
        if (!this.state.captcha) {
            this.setState({captchaValid: false});
            hasError = true;
        }
        if (!this.state.message) {
            this.setState({messageValid: false});
            hasError = true;
        }

        if (this.state.captcha && this.state.captcha.toUpperCase() !== this.captcha.getCode().toUpperCase()) {
            this.setState({captchaValid: false, error: captcha_msg});
            this.reloadCaptcha();
            hasError = true;
        }

        return !hasError;
    }

    handleResponseError(err) {
        if (err.response) {
            if (err.response.status === 400 && err.response.data) {
                this.setState({error: err.response.data});
            } else {
                this.setState({error: error_msg});
            }
        } else {
            this.setState({error: err.message});
        }
    }

    reloadCaptcha() {
        const canvas = document.getElementById('captchaImg-' + this.formUUID);
        this.captcha.create(canvas);
    }

    uniqueId() {
        return String(new Date().getTime() + '' + Math.random()).replace('.', '');
    }

    render() {
        return (
        <form onSubmit={this.onSubmit} method="post" className="leaveMessageForm">
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
                <label htmlFor={"name-" + this.formUUID} className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-4">
                    <input name="name" id={"name-" + this.formUUID} className={"form-control" + (!this.state.nameValid ? ' is-invalid' : '')}
                        value={this.state.name || ''} onChange={this.onInputChange} maxLength="50"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor={"captcha-" + this.formUUID} className="col-sm-2 col-form-label captcha">
                    <canvas id={"captchaImg-" + this.formUUID} width="170" height="50"></canvas></label>
                <div className="col-sm-2">
                    <input name="captcha" id={"captcha-" + this.formUUID} className={"form-control" + (!this.state.captchaValid ? ' is-invalid' : '')}
                        value={this.state.captcha || ''} onChange={this.onInputChange} maxLength="10"/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12">
                    <textarea name="message" rows="5" className={"form-control" + (!this.state.messageValid ? ' is-invalid' : '')}
                        value={this.state.message || ''} onChange={this.onInputChange} maxLength="1000"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
        );
    }
}

export default LeaveMessageForm;