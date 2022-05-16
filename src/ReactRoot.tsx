import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button'
import { TextField, Typography } from '@mui/material';
import './css/index.css';

function ReactRoot() {

    const [orderNumber, setOrderNumber] = useState("");
    const [displayNumber, setDisplayNumber] = useState("");

    function testing(e: any): void {
        setDisplayNumber(orderNumber);
    }

    function handleKeyDown(e: any): void {
        if (e.key ==='Enter') {
            testing(e);
        }
    }

    function handleChange(e: any): void {
        setOrderNumber(e.currentTarget.value);
    }


    return (
        <div>
            
            <Typography variant='h2' textAlign={'center'}>{displayNumber}</Typography>

            <div style={{ display: 'flex', position: 'absolute', bottom: '1em', right: '1em' }}>
                <TextField id="filled-number" type={'number'} label='Order Number' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}></TextField>
                <Button variant='contained' sx={{ ml: '1em' }} onClick={(e) => testing(e)}>Submit</Button>
            </div>
        </div>
    )

}

export default ReactRoot;