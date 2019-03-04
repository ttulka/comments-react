import axios from 'axios';

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

export default CommentService;