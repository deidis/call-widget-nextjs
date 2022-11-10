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

function onCloseButtonClicked()
{
    // Send a message to parent of this IFrame
    // to tell it that it is supposed to close.
    window.parent.postMessage({
        "message": "openState",
        "contents": false
    }, "*");
}

/**
 * Called when the parent window sends a message to this iframe.
 * 
 * @param e The message from the parent window.
 * 
 * A message will contain a `message` key and `contents` with additional information.
 */
function onMessageReceived(e:MessageEvent<any>)
{
    var contents = e.data["contents"];

    switch(e.data["message"])
    {
        case "init":
            var title:string | undefined = contents["title"];
            var buttonText:string | undefined = contents["buttonText"];
            document.getElementById("title")!.innerHTML = title ?? "Title";
            document.getElementById("call-button")!.innerHTML = buttonText ?? "Call Us";
            break;
    }
}

const Widget:NextPage = () => {
    useEffect(() => {
        window.addEventListener("message", onMessageReceived);
        window.parent.postMessage("done", "*");

        return () => {
            window.removeEventListener("message", onMessageReceived);
        }
    });

    return (
        <div className={styles.widget}>
            <div className={styles.center}>
                <h1 id="title" className={styles.title}>Title</h1>
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
            <button id="call-button" className={styles.call_btn} onClick={onCallButtonClicked}>Call Us</button>
            <button className={styles.close_btn} onClick={onCloseButtonClicked}>X</button>
        </div>
    );
};

export default Widget;