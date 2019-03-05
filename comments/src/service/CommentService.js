import axios from 'axios';
import Cookies from 'js-cookie';

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