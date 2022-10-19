import type { NextPage } from 'next'
import axios from 'axios';

import styles from '../styles/Widget.module.css'
import { ChangeEvent } from 'react';

const regex:RegExp = /[\W\D]/g;
var countryCode:number = 1;
var phoneNumber:string = "";

function onPhoneNumberInputChanged(event:ChangeEvent<HTMLInputElement>)
{
    phoneNumber = event.target.value.trim();
}

function onCallButtonClicked()
{
    var parsedNumber:string = phoneNumber.replaceAll(regex, "");

    axios.post(
        "/api/call",
        {
            "uid": "",
            "phoneNumber": `+${countryCode}${parsedNumber}`
        }
    );
}

const Widget:NextPage = () => {
    return (
        <div className={styles.widget}>
            <div className={styles.center}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.row}>
                    <button>Country</button>
                    <div style={{"width": 5}}></div>
                    <input id="phoneNumberInput" onChange={onPhoneNumberInputChanged}/>
                </div>
            </div>
            <div style={{"position": "relative", "height": "50%"}}></div>
            <button className={styles.call_btn} onClick={onCallButtonClicked}>Call Us</button>
            <button className={styles.close_btn}>X</button>
        </div>
    );
};

export default Widget;