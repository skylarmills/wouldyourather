import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Box, Tab, Tabs, Avatar } from '@mui/material';
import { TabContext, TabPanel} from '@mui/lab';
import QuestionCard from './QuestionCard';

class Dashboard extends Component {

    state = {
        value: '1',
    };

    handleClick = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };

  render() {

    const { value } = this.state;

    console.log(this.props);
    const { userQuestions} = this.props;
    const { answeredQuestions, unansweredQuestions} = userQuestions;

    return(

        <>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value}>
                <Tab label="Answered" value="0"  onClick={(e)=>this.handleClick(e, "0")}/>
                <Tab label="Unanswered" value="1"  onClick={(e)=>this.handleClick(e, "1")}/>
            </Tabs>
        </Box>
            <TabPanel value="0" index="0">
                <ol>
                {answeredQuestions.length > 0 && answeredQuestions.map((question, index) => (
                   <QuestionCard key={question.id} question_id={question.id} answered={true} />
                ))}
                </ol>
            </TabPanel>
            <TabPanel value="1" index="1">
            <ol>
                {console.log(unansweredQuestions)}
                {unansweredQuestions.length > 0 && unansweredQuestions.map((question) => (
                    <QuestionCard key={question.id} question_id={question.id} />
                ))}
                </ol>
            </TabPanel>
        </TabContext>
        </>    
    )
  }

}



function mapStateToProps({authedUser, users, questions}){

    console.log(users);
    console.log(Object.keys(users));

    const ansIDs = Object.keys(users[authedUser].answers);

    console.log(Object.values(questions));

    const answeredQuestions = Object.values(questions)
        .filter(question => ansIDs.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unansweredQuestions = Object.values(questions)
        .filter(question => !ansIDs.includes(question.id))
        .sort ((a,b) => b.timestamp - a.timestamp);

    return {
        userQuestions: {
            answeredQuestions,  
            unansweredQuestions
        }
    };

}




export default connect(mapStateToProps)(Dashboard);