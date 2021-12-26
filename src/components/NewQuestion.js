
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Paper, Card, Button, TextField, Container} from '@mui/material';
import { handleSaveQuestion} from '../actions/questions';
import { Redirect } from 'react-router-dom';

export class NewQuestion extends Component {

    state= {
        option1: '',
        option2: '',
        success: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {option1, option2} = this.state;

        console.log("trying");
        new Promise((resolve, reject) => {
            this.props.handleSaveQuestion(this.state.option1,this.state.option2, this.props.authedUser);
            setTimeout(() => resolve('success'), 1000);
        }).then(() => {
                this.setState({
                    success: true
            });
        });
    };

    render() {

        if(this.state.success) {
            return <Redirect to="/"/>
        }
        //const {option1, option2} = this.state;

        return (
            <Paper>
                <Container>
                <Card>
            <div>
                <h2><strong>New Question</strong></h2>
                <h3>Would you rather</h3>
                <TextField id="standard-basic" label="Option 1" name="option1" onChange={this.handleChange} value={this.state.option1} />
                <h3>OR</h3>
                <TextField id="standard-basic" label="Option 2" name="option2" onChange={this.handleChange} value={this.state.option2} />
                <br></br><br></br>
                <div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                </div>
                </div>
                </Card>
                </Container>
            </Paper>
        );
    }

}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps, {handleSaveQuestion})(NewQuestion);