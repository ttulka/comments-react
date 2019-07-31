/**
/* This is an offline DEV-only service implementation
**/

const comments = [];
const answers = [];

class CommentService {
    constructor() {
    }

    async loadComments(href) {
        return comments[href];
    }

    async loadAnswers(href) {
        return answers[href];
    }

    async saveComment(href, {name, message}) {
        const comment = {
           id: Math.random(),
           body: secureString(message),
           author: secureString(name),
           createdAt: Date.now() / 1000
        };
        comments[href] = comments[href] || [];
        comments[href] = [...comments[href], comment];
        return comment;
    }

    async saveAnswer(href, {name, message}) {
        const answer = {
            id: Math.random(),
            body: secureString(message),
            author: secureString(name),
            createdAt: Date.now() / 1000
        };
        answers[href] = [...answers[href], answer];
        return answer;
    }
}

function secureString(str, maxLength = 1000) {
    return str.substring(0, maxLength);
}

export default CommentService;