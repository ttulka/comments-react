import axios from 'axios';
import Cookies from 'js-cookie';

const err_msg = {
    name: 'Please fill your name!',
    message: 'Please fill your message!',
    captcha: 'Please fill the captcha!',
    captcha_wrong: 'Captcha does not match!',
}

class CommentService {
    constructor(serviceApi, captchaCookieName) {
        this.serviceApi = serviceApi;
        this.captchaCookieName = captchaCookieName;
    }

    loadComments(href) {
        return axios.get(`${this.serviceApi}${href}`)
           .then(response => response.data);
    }

    loadAnswers(href) {
        return axios.get(`${this.serviceApi}${href}`)
           .then(response => response.data);
    }

    saveComment(href, {name, message}, captcha) {
        if (!name) {
            return Promise.reject(new Error(err_msg.name));
        }
        if (!message) {
            return Promise.reject(new Error(err_msg.message));
        }
        if (!captcha) {
            return Promise.reject(new Error(err_msg.captcha));
        }

        const captchaCookie = Cookies.get(this.captchaCookieName);
        if (captchaCookie && captchaCookie !== captcha) {
            return Promise.reject(new Error(err_msg.captcha_wrong));
        }
        console.log('COOKIE', this.captchaCookieName, Cookies.get(this.captchaCookieName), captcha);

        return axios({
            url: `${this.serviceApi}${href}`,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formUrlEncoded({
                body: message,
                author: name
            })
        })
            .then(res => { console.log('RESPONSE', res); return res;})
            .then(response => response.data);
    }

    saveAnswer(href, {name, message}, captcha) {
        if (!name) {
            return Promise.reject(new Error(err_msg.name));
        }
        if (!message) {
            return Promise.reject(new Error(err_msg.message));
        }
        if (!captcha) {
            return Promise.reject(new Error(err_msg.captcha));
        }

        const captchaCookie = Cookies.get(this.captchaCookieName);
        if (captchaCookie && captchaCookie !== captcha) {
            return Promise.reject(new Error(err_msg.captcha_wrong));
        }
        console.log('COOKIE', this.captchaCookieName, Cookies.get(this.captchaCookieName), captcha);

        return axios({
            url: `${this.serviceApi}${href}`,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formUrlEncoded({
                body: message,
                author: name
            })
        })
            .then(res => { console.log('RESPONSE', res); return res;})
            .then(response => response.data);
    }
}

function formUrlEncoded(x){
    return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
}

export default CommentService;