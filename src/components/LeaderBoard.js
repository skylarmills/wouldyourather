
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Stack } from '@mui/material';

class LeaderBoard extends Component {

    render() {

        const leaderBoardStats = this.props.leaderBoardStats;

        console.log(leaderBoardStats);

        return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>User</strong></TableCell>
                                <TableCell><strong>Questions Created</strong></TableCell>
                                <TableCell><strong>Questions Answered</strong></TableCell>
                                <TableCell><strong>Total Score</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaderBoardStats.map((user,index) => (    
                                <TableRow key={index}>
                                    <TableCell>
                                        <Stack directionjs="row" spacing={2}>
                                            <Avatar src={user.avatarURL}/> 
                                            {user.name}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{user.questions}</TableCell>
                                    <TableCell>{user.answers}</TableCell>
                                    <TableCell>{user.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
               </TableContainer>
        )
    }

}

function mapStateToProps({users}) {

    console.log(users);

    const leaderBoardStats = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answers: Object.values(user.answers).length,
            questions: Object.values(user.questions).length,
            total: Object.values(user.answers).length + Object.values(user.questions).length
        }))
        .sort((a, b) => a.total - b.total)
        .reverse()
        .slice(0, 3);

    return {
        leaderBoardStats
    }
}

export default connect(mapStateToProps)(LeaderBoard);