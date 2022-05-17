import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button'
import { Paper, TextField, Typography } from '@mui/material';
import './css/index.css';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


function ReactRoot() {

    const [orderNumber, setOrderNumber] = useState<string>("");

    interface displayTicker {
        uid: number,
        orderNumber: string
    }

    const data: displayTicker[] = [
        {
            uid: 908,
            orderNumber: '908'
        },
        {
            uid: 8979,
            orderNumber: '768'
        },
        {
            uid: 6765,
            orderNumber: '354'
        }
    ]


    const [tickers, setTickers] = useState<displayTicker[]>(data);

    function submitTicker(e: any): void {
        let ticker: displayTicker = {
            uid: Date.now(),
            orderNumber: orderNumber
        }

        setTickers([ticker, ...tickers]);
    }

    function handleKeyDown(e: any): void {
        if (e.key === 'Enter') {
            submitTicker(e);
        }
    }

    function handleChange(e: any): void {
        setOrderNumber(e.currentTarget.value);
    }

    function removeTicker(e: number) {
        const newTickers = tickers.filter(ticker => ticker.uid != e);
        setTickers(newTickers);
    }




    return (
        <div>

            <Typography variant='h2' textAlign={'center'}>Business Name</Typography>


            <div style={{ columns: 2, columnFill: 'auto', height: '88vh' }}>
                <TransitionGroup>
                    {
                        tickers.map((ticker) => (
                            <CSSTransition key={ticker.uid} classNames="item" timeout={1000}>
                                <div style={{ display: 'flex', justifyContent: 'center', breakInside: 'avoid' }}>

                                    <Typography variant='h4' style={{ textAlign: 'center', marginLeft: 'auto' }}>{ticker.orderNumber}</Typography>
                                    <CloseIcon style={{ marginLeft: 'auto' }} onClick={() => removeTicker(ticker.uid)} />


                                </div>
                            </CSSTransition>
                        ))

                    }
                </TransitionGroup>
            </div>


            <div style={{ display: 'flex', position: 'absolute', bottom: '1em', right: '1em' }}>
                <TextField id="filled-number" type={'number'} label='Order Number' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}></TextField>
                <Button variant='contained' sx={{ ml: '1em' }} onClick={(e) => submitTicker(e)}>Submit</Button>
            </div>
        </div >
    )

}

export default ReactRoot;