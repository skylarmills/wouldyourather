import React, { Component } from 'react';
import { Container } from '@mui/material';

export class NoMatch extends Component {
    render() {
        return (
        <Container>
            <h3>404</h3>
            <p>Page not found</p>
        </Container>
        );
    }
}

export default NoMatch;