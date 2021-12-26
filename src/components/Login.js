import React, { Component } from 'react';
import {connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';

class Login extends Component {

    state = {
        selectedUser : '',
        loginDisabled : true
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.setAuthedUser(this.state.selectedUser);
        return (////
            <Route path="/" element={<Dashboard />}/>
        );
    }

    handleChange = (e) => {
        this.setState({ 
            selectedUser: e.target.value, 
            loginDisabled: false
        })
    }
 

    render() {

        const users = this.props.users;

        console.log(users);

        return(

            <>
            <h1>Would You Rather?</h1>
            <h3>Choose login user</h3>
            <FormControl fullWidth>
                <InputLabel htmlFor="user-select">Select User</InputLabel>
                <Select value={this.state.selectedUser || ''} labelId="user-select" id="user-select" label="Select User" onChange={this.handleChange}>
                    {users.map((user) => {
                        return (
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        );
                    })}
                </Select>
                <Button onClick={this.handleSubmit} disabled={this.state.loginDisabled}>Login</Button>
            </FormControl>
            </>
    );
}
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}


export default connect(mapStateToProps, {setAuthedUser})(Login);
