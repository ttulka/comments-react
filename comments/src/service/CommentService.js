import axios from 'axios';

class CommentService {
    constructor(serviceApi) {
        this.serviceApi = serviceApi;
    }

    loadComments(href) {
        return axios.get(`${this.serviceApi}${href}`)
           .then(response => response.data);
    }

    loadAnswers(href) {
        return axios.get(`${this.serviceApi}${href}`)
           .then(response => response.data);
    }

    saveComment(href, {name, message}) {
        return axios({
            url: `${this.serviceApi}${href}`,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formUrlEncoded({
                body: secureString(message),
                author: secureString(name)
            })
        }).then(response => response.data);
    }

    saveAnswer(href, {name, message}) {
        return axios({
            url: `${this.serviceApi}${href}`,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formUrlEncoded({
                body: secureString(message),
                author: secureString(name)
            })
        }).then(response => response.data);
    }
}

function formUrlEncoded(x) {
    return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
}

function secureString(str, maxLength = 1000) {
    return /*encodedString(*/str.substring(0, maxLength)/*)*/;
}

// function encodedString(rawStr) {
//     return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
//         return '&#'+i.charCodeAt(0)+';';
//     });
// }

export default CommentService;