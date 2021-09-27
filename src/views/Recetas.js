import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

function Recetas(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <Container>
            <h1>Recetas</h1>
        </Container>
    )
}

export default Recetas;     