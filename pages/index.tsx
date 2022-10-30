import type { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

import PhoneInput from 'react-phone-input-2'
import {CountryData} from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {parsePhoneNumber, isValidPhoneNumber, PhoneNumber} from 'libphonenumber-js';

import styles from '../styles/Widget.module.css';

var phoneNumber:PhoneNumber | undefined;
var valid:boolean = false;

function onPhoneNumberChanged(
    value: string,
    data: {} | CountryData,
    _: ChangeEvent<HTMLInputElement>,
    formattedValue: string)
{
    try {
        phoneNumber = parsePhoneNumber(formattedValue);
        valid = isValidPhoneNumber(phoneNumber.number);
    } catch (error) {
        // The functions above throw errors. Catch them so they don't stop the page.
    }
}

function onCallButtonClicked()
{
    if(phoneNumber === undefined || !valid)
    {
        //TODO: Show the user that they have incorrectly entered their phone number.
        console.error("Invalid");
        return;
    }

    axios.post(
        "/api/call",
        {
            "uid": "",
            "phoneNumber": phoneNumber.number
        }
    );
}

const Widget:NextPage = () => {
    return (
        <div className={styles.widget}>
            <div className={styles.center}>
                <h1 className={styles.title}>Title</h1>
                <div>
                    <PhoneInput
                        onChange={onPhoneNumberChanged}
                        country="us"
                        inputStyle={{
                            color: "#000000",
                            width: "100%"
                        }}
                        dropdownStyle={{
                            color: "#000000"
                        }}
                    />
                </div>
            </div>
            <div style={{"position": "relative", "height": "45%"}}></div>
            <button className={styles.call_btn} onClick={onCallButtonClicked}>Call Us</button>
            <button className={styles.close_btn}>X</button>
        </div>
    );
};

export default Widget;