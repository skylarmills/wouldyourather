import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Stack, Container, Card, LinearProgress } from '@mui/material';
import { red, green } from '@mui/material/colors';
import {MdBookmarkAdded} from "react-icons/md";

const YourVote = () => (

    <div>
        <MdBookmarkAdded/>
        Your Vote
    </div>
);

export class ViewPoll extends Component {


    handleClick = () => {
        this.props.history.push('/');
    }

    color = (percentage) => {
        if (percentage > 50)
        {
            return "#c8e6c9";
        }
        if (percentage < 50){
            return "#ffccbc";
        }
    }

    render() {

        const { question, user, author} = this.props;
        const { optionOne, optionTwo } = question;
        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;

        const optionOnePercentage = optionOneVotes + optionTwoVotes === 0 ? 0 : (optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100;
        const optionTwoPercentage = optionOneVotes + optionTwoVotes === 0 ? 0 : (optionTwoVotes / (optionOneVotes + optionTwoVotes)) * 100;

        const userVote = user.answers[question.id];

        return (

                <>
                    <Card style={{backgroundColor:  this.color(optionOnePercentage)}}>
                        {userVote === 'optionOne' && <YourVote/>}
                        <div><strong>{optionOne.text}</strong></div>
                        <div> Votes: {optionOneVotes}</div>
                        <Container>
                            {optionOnePercentage}%
                        </Container>
                        <LinearProgress variant="determinate" value={optionOnePercentage} />
                    </Card>
                    <br></br>
                    <Card style={{backgroundColor:  this.color(optionTwoPercentage)}}>
                        {userVote === 'optionTwo' && <YourVote/>}
                        <div><strong>{optionTwo.text}</strong></div>
                        <div>Votes: {optionTwoVotes} </div>
                        <Container>
                            {optionTwoPercentage}%
                        </Container>
                        <LinearProgress  variant="determinate" value={optionTwoPercentage} />
                    </Card>
                    <h5>Total votes: {optionOneVotes + optionTwoVotes}</h5>
                </>
        );


    }
}

const mapStateToProps = ({ authedUser, users}, author) => {
    const user = users[authedUser];
    return {
        user,
        author
    };
}

export default connect(mapStateToProps)(ViewPoll);