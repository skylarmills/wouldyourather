import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import TakePoll from './TakePoll';
import ViewPoll from './ViewPoll';
import PreviewPoll from './PreviewPoll';
import { Container, Paper, Card, Avatar } from '@mui/material';

const pollStatuses = {
    PREVIEW_POLL: 'PREVIEW_POLL',
    TAKE_POLL: 'TAKE_POLL',
    VIEW_POLL: 'VIEW_POLL'
}

const PollContent = (props) => {
    switch(props.pollStatus) {
        case pollStatuses.PREVIEW_POLL:
            console.log("preview");
            return <PreviewPoll question={props.question} answered={props.answered}/>
        case pollStatuses.TAKE_POLL:
            console.log("take");
            return <TakePoll question={props.question} />
        case pollStatuses.VIEW_POLL:
            console.log("viewpoll");
            return <ViewPoll question={props.question} author={props.author}/>
        default:
            return;
    }
}

export class QuestionCard extends Component {

    render() {
        const { author, question, noMatch, answered = null} = this.props;

        if(noMatch){
            console.log("no match");
            return <Redirect to="/noMatch"/>
        }

        console.log(this.props.pollStatus);

        return (

            <Container maxWidth="sm">
                <Paper>
                <h4>Question by {author.name}</h4>
                <Avatar src={author.avatarURL} />
                <h1>Would You Rather</h1>
                    <Card>
                        <PollContent pollStatus={this.props.pollStatus} question={question} answered={answered}/>
                        <br></br>
                    </Card>
                </Paper>
            </Container>

        );
    }
    
}

const mapStateToProps = ({ authedUser, users, questions }, {match, question_id}) => {

    let question, author, pollStatus, noMatch = false;
    
    if(question_id !== undefined) {
        question = questions[question_id];
        author = users[question.author];
        pollStatus = pollStatuses.PREVIEW_POLL;
    }
    else {
        console.log(match);
        const { question_id } = match.params;
        console.log(question_id);
        const user = users[authedUser];
        question = questions[question_id];
        console.log(question);
        
        if(question === undefined) {
            console.log("nomatch");
            noMatch = true;
        }
        else {
            author = users[question.author];
            pollStatus = pollStatuses.TAKE_POLL;
            if(Object.keys(user.answers).includes(question.id)){
                pollStatus = pollStatuses.VIEW_POLL;
            }
        }
    }

    return {
        authedUser,
        question,
        author,
        noMatch,
        pollStatus,
    }

}

export default connect(mapStateToProps)(QuestionCard);