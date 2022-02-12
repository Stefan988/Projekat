import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { logout } from '../actions/UserActions';
import { User } from '../model/model.type';
import { StateType } from '../model/store.type';
import Weather from './Weather';
interface Props {
    user?: User,
    logout: () => void;
}
function TopMenu(props: Props) {
    return (
        <Menu className='topMenu' borderless stackable fluid attached='top'   >
            <Weather />
            <Menu.Item
                as={Link}
                to='/'
            >Home</Menu.Item>
            {props.user && (
                <>
                    <Menu.Item as={Link} to='/post'  >
                        Posts
                    </Menu.Item>
                    <Menu.Item as={Link} to='/newPost'  >
                        New post
                    </Menu.Item>
                    {props.user.category === 'admin' && <Menu.Item as={Link} to='/admin' >
                        Admin
                    </Menu.Item>}
                </>)}

            <Menu.Menu position='right'>
                {!props.user ? (
                    <>
                        <Menu.Item  >
                            <Button as={Link} className='inverted' to='/login'>Login</Button>
                        </Menu.Item>
                        <Menu.Item  >
                            <Button as={Link} className='inverted' to='/signup'>Sign up</Button>
                        </Menu.Item>
                    </>) : (
                    <>
                        <Menu.Item>
                            {props.user.username}
                        </Menu.Item>
                        <Menu.Item>
                            <Button as={Link} onClick={() => {
                                props.logout();
                            }} className='inverted' to='/' >Logout</Button>
                        </Menu.Item>
                    </>
                )}
            </Menu.Menu>
        </Menu>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user
    }
}, (dispach) => {
    return {
        logout: logout(dispach)
    }
})(TopMenu);