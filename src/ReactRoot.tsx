import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button'
import { TextField, Typography } from '@mui/material';
import './css/index.css';
import HelpIcon from '@mui/icons-material/Help';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Popup from 'reactjs-popup';
import ImageIcon from '@mui/icons-material/Image';
import { textAlign } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: '#a51e35',
        },
        secondary: {
            main: '#fec52e',
        },
    },
});


function ReactRoot() {

    const [orderNumber, setOrderNumber] = useState<string>("");

    interface listData {
        uid: number,
        data: string
    }

    // ----------- Tickers
    const [tickers, setTickers] = useState<listData[]>([]);

    function submitTicker(e: any): void {
        if (orderNumber === "") {
            return;
        }

        let ticker: listData = {
            uid: Date.now(),
            data: '#' + orderNumber
        }

        setTickers([ticker, ...tickers]);
        updateHistory('Added ' + ticker.data);
        setOrderNumber("");
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
        let removed: listData = tickers.find(ticker => ticker.uid === e);
        updateHistory('Removed ' + removed.data);
        const newTickers = tickers.filter(ticker => ticker.uid != e);
        setTickers(newTickers);
    }

    const Input = styled('input')({
        display: 'none',
    });

    //-------------- Popup
    const contentStyle = {
        background: '#f0f0f0',
        borderRadius: '10px',
        width: '50vmin',
        height: '20em',
        padding: '1em'
    };
    const arrowStyle = { color: '#f0f0f0' };

    const [businessName, setBusinessName] = useState<string>();
    const [displayBusinessName, setDisplayBusinessName] = useState<string>();

    function handleBusinessNameChange(e: any) {
        setBusinessName(e.currentTarget.value);
    }

    function saveInfo() {
        setDisplayBusinessName(businessName);
    }

    const [history, setHistory] = useState<string[]>([]);

    function updateHistory(data: string) {
        setHistory([data, ...history.slice(0, 4)]);
    }



    return (
        <ThemeProvider theme={theme}>

            <Typography variant='h2' textAlign={'center'}>{displayBusinessName}</Typography>


            <div style={{ columns: '3', columnFill: 'auto', height: '80vh' }}>
                <TransitionGroup>
                    {
                        tickers.map((ticker) => (

                            <CSSTransition key={ticker.uid} classNames="item" timeout={1000}>
                                <div style={{ display: 'flex', justifyContent: 'center', breakInside: 'avoid', marginBottom: '0.5em' }} onClick={() => removeTicker(ticker.uid)}>
                                    <Typography variant='h4' style={{ textAlign: 'center', cursor: 'pointer' }}>{ticker.data}</Typography>
                                </div>
                            </CSSTransition>

                        ))

                    }
                </TransitionGroup>
            </div>


            <div style={{ display: 'flex', position: 'absolute', bottom: '1em', right: '1em' }}>
                <TextField id="filled-number" type={'number'} label='Order Number' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} value={orderNumber}></TextField>
                <Button variant='contained' sx={{ ml: '1em' }} onClick={(e) => submitTicker(e)}>Submit</Button>
            </div>

            <Popup onClose={() => setBusinessName(displayBusinessName)} trigger={
                <div style={{ position: 'absolute', bottom: '1em', left: '1em', cursor: 'pointer' }}>
                    <HelpIcon fontSize='large' color='primary' />

                </div>
            } position="right bottom" {...{ contentStyle, arrowStyle }}>
                <Typography variant='h5' sx={{ textAlign: 'center' }}>Info</Typography>


                <div style={{ margin: '1em 0', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField id="filled-basic" label='Business Name' onChange={(e) => handleBusinessNameChange(e)} value={businessName}></TextField>

                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span" endIcon={<ImageIcon />} style={{ height: '100%' }}>
                            Upload
                        </Button>
                    </label>

                </div>


                <Typography variant='h6'>History</Typography>
                {
                    history.map((historyElem: string) => (
                        <Typography variant='body1' style={{ marginLeft: '1em' }}>{historyElem}</Typography>
                    ))
                }
                <Button variant='contained' sx={{ position: 'absolute', bottom: '1em', right: '50%', transform: 'translateX(50%)', width: '10em' }} onClick={() => saveInfo()}>Save</Button>
            </Popup>

        </ThemeProvider >
    )

}

export default ReactRoot;

