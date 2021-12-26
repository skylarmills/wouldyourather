import React, { Component } from 'react';
import {connect} from 'react-redux';
import {RadioGroup, Radio, Button, FormControlLabel} from '@mui/material';
import {handleSaveQuestionAnswer} from '../actions/users';

class TakePoll extends Component {

    state = {
        answer: this.props.answer
    }

    handleChange = (e) => {
        this.setState({ answer: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if( this.state.answer !== '' ) {
            const {authedUser, question, handleSaveQuestionAnswer} = this.props;
                handleSaveQuestionAnswer(authedUser, question.id, this.state.answer);
        }
        else{
            alert('Select an option');
        }
    }

    render() {
        const question = this.props.question;

        return (
            <div>
                <RadioGroup row>
                    <FormControlLabel name="option1" label={question.optionOne.text} value="optionOne" onChange={this.handleChange} control={<Radio/>} />
                    <FormControlLabel name="option2" label={question.optionTwo.text} value="optionTwo" onChange={this.handleChange} control={<Radio/>} />
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser}, { match, answer }) => {

    if(answer === undefined)
    {
        answer = '';
    }

    return {
        authedUser,
        answer
    };
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(TakePoll);