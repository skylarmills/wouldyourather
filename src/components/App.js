import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import QuestionCard from './QuestionCard';
import Login from './Login';
import { NoMatch } from './NoMatch';
import Nav from './Nav';
import { Container} from '@mui/material';


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {

        const { authedUser } = this.props;

        return (
            <Container>
            <Router>
                <Fragment>
                
                {this.props.loading === true 
                ? null
                :
                
                authedUser === null ?

                (<Login />)

                :
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/leaderboard" component={LeaderBoard} />
                        <Route path="/login" component={Login} />
                        <Route path="/add" component={NewQuestion} />
                        <Route path="/questions/:question_id" component={QuestionCard} />
                        <Route component={NoMatch} />
                    </Switch>
                    <div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
                </div>
            }
            </Fragment>
            </Router>
            </Container>
        )}   
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App);