import { Dispatch } from "redux";
import { Action, ActionType } from "../model/action.type";
import Axios from "axios";
import { User, UnregisteredUser } from "../model/model.type";
//@ts-ignore
import * as querystring from 'querystring'
export const loginUser = (dispach: Dispatch<Action>) => {

    return (username: string, password: string) => {
        let str = querystring.stringify({
            action: 'login',
            username: username,
            password: password
        });
        console.log(str);
        return Axios.post('https://localhost:5000/user', str
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(value => {
                console.log(value.data);
                if (!value.data) {
                    return Promise.resolve(false);
                }
                dispach(setUserAction(value.data));
            })
    }
}
export const setUserAction = (user?: User): Action => {

    return {
        type: ActionType.LOGIN,
        user: user
    }
}
export const chechUser = (dispach: Dispatch<Action>) => () => {

    return Axios.post('https://localhost:5000/user', { action: 'check' }).then(value => {

        if (!value.data) {
            return;
        }
        console.log(value.data)
        dispach(setUserAction(value.data));
    })
}
export const logout = (dispach: Dispatch<Action>) => () => {
    return Axios.post('https://localhost:5000/user', { action: 'logout' }).then(value => {
        if (value.data !== true) {
            alert(value.data);
        } else {

            dispach({ type: ActionType.LOGOUT });
        }
    })
}

export const registerUser = (dispach: Dispatch<Action>) => (user: UnregisteredUser) => {
    return Axios.post('https://localhost:5000/user', {
        action: 'register',
        user: user
    }).then(value => {
        let data = value.data;
        console.log(value.data);
        if (data.error) {
            return Promise.resolve({ error: data.error });
        } else {
            dispach(setUserAction(value.data));
        }
    })
}