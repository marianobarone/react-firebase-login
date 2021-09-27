import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

function Listas(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <Container>
            <h1>Mis Listas</h1>
        </Container>
    )
}

export default Listas;