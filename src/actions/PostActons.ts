import { Post, PostCategory, Comment } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";
import { Dispatch } from "redux";
import axios from 'axios'
axios.defaults.withCredentials = true;
export const setPosts = (posts: Post[]): Action => {
    return {
        type: ActionType.SET_POSTS,
        posts: posts
    }
}
export const loadPosts = (dispach: Dispatch<Action>) => {
    return () => {
        return axios.get('https://localhost:5000/post').then(value => {
            let posts = value.data as Post[];
            Promise.all(posts.map(element => {
                return axios.get(`https://localhost:5000/post/${element.id}/comments`).then(result => {

                    console.log(result.data);
                    element.comments = result.data;
                    return element;
                })
            })).then(value => {
                dispach(setPosts(value));
            })

        })
    }
}
export const addPost = (dispach: Dispatch<Action>) => (title: string, desc: string, cat: PostCategory, id?: number) => {
    return axios.post('https://localhost:5000/post', { title: title, description: desc, category: cat }, {
    }).then(value => {

        let data = { ...value.data, comments: [] };
        if (data.error) {

            return;
        }
        dispach({
            type: ActionType.ADD_POST,
            post: data
        })
    }).then(value => {
        alert('Successfully created post');
    }).catch(err => {
        alert(err);
    })
}

export const updatePost = (dispach: Dispatch<Action>) => (title: string, desc: string, cat: PostCategory, id?: number) => {
    return axios.patch(`https://localhost:5000/post/${id}`, {
        post: {
            title: title,
            description: desc,
            category: cat
        }
    }).then(value => {
        if (value.data.status && value.data.status === 'ok') {
            axios.get(`https://localhost:5000/post/${value.data.post.id}/comments`).then(result => {
                value.data.post.comments = result.data;
                dispach({
                    type: ActionType.UPDATE_POST,
                    post: value.data.post
                })
                alert('Post is updated successfully');
                return Promise.resolve({ status: 'ok' })
            })

        } else {
            alert(value.data.status);
            return Promise.resolve({ status: 'error' })
        }
    })
}

export const deletePost = (dispach: Dispatch<Action>) => (id: number) => {

    return axios.delete('https://localhost:5000/post/' + id).then(value => {

        if (!value.data.status) {
            alert('unknown error');
        }
        alert(value.data.status);
        if (value.data.status === 'success') {
            dispach({
                type: ActionType.DELETE_POST,
                id: id
            })
        }
    })
}
export const addComment = (dispach: Dispatch<Action>) => (content: string, post: Post) => {
    return axios.post(`https://localhost:5000/post/${post.id}/comments`, { content: content }).then(value => {

        const data = value.data;
        dispach({
            type: ActionType.ADD_COMMENT,
            comment: data
        })
    })
}
export const deleteComment = (dispach: Dispatch<Action>) => (comment: Comment) => {

    return axios.delete(`https://localhost:5000/post/${comment.post.id}/comments/${comment.id}`).then(value => {

        console.log(value);
        if (value.data.status === 'deleted') {
            dispach({
                type: ActionType.DELETE_COMMENT,
                comment: comment
            })
        }

    })
}