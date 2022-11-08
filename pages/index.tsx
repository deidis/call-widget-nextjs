import type { NextPage } from 'next';
import axios from 'axios';

import PhoneInput from 'react-phone-input-2'
import {CountryData} from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {parsePhoneNumber, isValidPhoneNumber, PhoneNumber, CountryCode} from 'libphonenumber-js';

import styles from '../styles/Widget.module.css';
import { useEffect } from 'react';

var phoneNumber:PhoneNumber | undefined;
var valid:boolean = false;

/**
 * Validates the phone number. Also sets the `phoneNumber` variable.
 * @param number The phone number as a string.
 * @returns If the phone number is valid or not.
 */
function validatePhoneNumber(number:string, code:{} | CountryData)
{
    // Reset the error message when the input has changed.
    var errorText:HTMLElement = document.getElementById("error")!;
    errorText.innerHTML = "";

    var countryCode = (code as CountryData).countryCode.toUpperCase();

    try {
        phoneNumber = parsePhoneNumber(number, countryCode as CountryCode);
        valid = isValidPhoneNumber(phoneNumber.number, countryCode as CountryCode);
    } catch (error) {
        // The functions above throw errors. Catch them so they don't stop the page.
    }
}

function onCallButtonClicked()
{
    if(phoneNumber === undefined || !valid)
    {
        var errorText:HTMLElement = document.getElementById("error")!;
        errorText.innerHTML = "Invalid phone number.";
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
    useEffect(() => {
        function onMessage(e:MessageEvent<any>)
        {
            console.log(e);
        }

        window.addEventListener("message", onMessage);

        return () => {
            window.removeEventListener("message", onMessage);
        }
    });

    return (
        <div className={styles.widget}>
            <div className={styles.center}>
                <h1 className={styles.title}>Title</h1>
                <div>
                    <PhoneInput
                        onChange={(_, country, __, formattedValue) => validatePhoneNumber(formattedValue, country)}
                        country="us"
                        countryCodeEditable={false}
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
            <p id="error" className={styles.error_text}></p>
            <div style={{"height": "100%"}}></div>
            <button className={styles.call_btn} onClick={onCallButtonClicked}>Call Us</button>
            <button className={styles.close_btn}>X</button>
        </div>
    );
};

export default Widget;