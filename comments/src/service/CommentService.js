import axios from 'axios';

const err_msg = {
    commentId: 'Comment ID must be set!',
    name: 'Please fill your name!',
    message: 'Please fill your message!',
    captcha: 'Please fill the captcha!',
}

class CommentService {
    constructor(serviceApi) {
        this.serviceApi = serviceApi;
    }

    loadComments(href) {
        return axios.get(`${this.serviceApi}/${href}`)
           .then(response => response.data);
    }

    loadAnswers(href) {
        return axios.get(`${this.serviceApi}/${href}`)
           .then(response => response.data);
    }

    saveComment({name, message}, captcha) {
        if (!name) {
            return Promise.reject(new Error(err_msg.name));
        }
        if (!message) {
            return Promise.reject(new Error(err_msg.message));
        }
        if (!captcha) {
            return Promise.reject(new Error(err_msg.captcha));
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
            return Promise.reject(new Error(err_msg.commentId));
        }
        if (!name) {
            return Promise.reject(new Error(err_msg.name));
        }
        if (!message) {
            return Promise.reject(new Error(err_msg.message));
        }
        if (!captcha) {
            return Promise.reject(new Error(err_msg.captcha));
        }

        return new Promise((resolve, reject) => {
            // TODO
            const answer = {
                id: new Date().getTime(),
                body: message,
                author: name,
                createdAt: new Date().getTime() / 1000
            };
            resolve(answer);
        });
    }
}

export default CommentService;