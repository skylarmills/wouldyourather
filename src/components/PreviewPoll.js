import React, { Component } from 'react';
import {Button} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import {Redirect} from 'react-router-dom';

export class PreviewPoll extends Component {
    state = {
        pollViewed: false
    };

    handleClick = () => {
        this.setState(prevState => ({
            pollViewed: !prevState.pollViewed
        }));
    };
    
    render() {
        const {question, answered} = this.props;
        const buttonContent = answered === true ? 'View Results' : 'Take Poll';

        if(this.state.pollViewed === true)
        {
            return <Redirect to={`/questions/${question.id}`} />
        }

        return (
            <>
            <div>
                <h3>Would you rather {question.optionOne.text} or...</h3>
                <Button variant="contained" color="primary" onClick={this.handleClick}>{buttonContent}</Button>
            </div>
            </>
        );

    }
}

export default PreviewPoll;