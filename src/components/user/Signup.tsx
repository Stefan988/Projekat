import React from 'react'
import { connect } from 'react-redux'
import { Form, Label, Button } from 'semantic-ui-react';
import { UnregisteredUser, User } from '../../model/model.type';
import { registerUser } from '../../actions/UserActions';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { StateType } from '../../model/store.type';
interface Props {
    onSubmit: (user: UnregisteredUser) => Promise<any>,
    user: User | null
}
function Signup(props: Props & RouteComponentProps) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setlLastname] = React.useState('');
    const [age, setAge] = React.useState<number | undefined>(undefined);
    const [error, setError] = React.useState('');
    if (props.user) {
        return (
            <Redirect to='/' />
        )
    }
    return (
        <Form size='big' onSubmit={(e, data) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                setError(`Passwords don't match`);
                return;
            }
            if (username === '') {
                setError('Username is required');
                return;
            }
            if (password === '') {
                setError('password is required');
                return;
            }
            if (firstname === '') {
                setError('firstname is required');
                return;
            }
            if (lastname === '') {
                setError('lastname is required');
                return;
            }
            if (!age) {
                setError('Age is required');
                return;
            }
            props.onSubmit({
                age: age,
                firstName: firstname,
                lastName: lastname,
                password: password,
                username: username
            }).then(value => {
                if (value && value.error) {
                    setError(value.error);
                } else {
                    props.history.push('/');
                }
            })

        }}>
            {error !== '' && <Label color='red' >{error}</Label>}
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type='password' value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Repeat password</label>
                <input type='password' value={confirmPassword} onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>First name</label>
                <input type="text" value={firstname} onChange={(e) => {
                    setFirstname(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Last name</label>
                <input type="text" value={lastname} onChange={(e) => {
                    setlLastname(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Age</label>
                <input type="number" value={age} onChange={(e) => {
                    setAge(parseInt(e.target.value));
                }} />
            </Form.Field>
            <Button className='inverted'>
                Sign up
            </Button>
        </Form>
    )
}
export default withRouter(connect((state: StateType) => {
    return {
        user: state.user
    }
}, dispach => {
    return {
        onSubmit: registerUser(dispach)
    }
})(Signup));