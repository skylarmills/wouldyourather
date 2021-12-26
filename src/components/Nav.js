import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, MenuList, MenuItem } from '@mui/material';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {


    handleLogout = () => {
        this.props.setAuthedUser(null);
    }

    render() {

        const { authedUser, users } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <h1>Would You Rather?</h1>
                        <Link to="/" color="inherit" underline="none">Home</Link>&nbsp;
                        <Link to="/leaderboard" color="inherit" underline="none">Leaderboard</Link>&nbsp;
                        <Link to="/add" color="inherit" underline="none">New Poll</Link>&nbsp;&nbsp;
                        <p>Welcome, {users[authedUser].name}</p>
                        <Button variant="outline" onClick={this.handleLogout} >Logout</Button>
                </Toolbar>
            </AppBar>

        );
    }
}

function mapPropsToState({authedUser, users}) {
    return {
        authedUser,
        users
    };
}

export default connect(mapPropsToState, {setAuthedUser})(Nav);