import React, {useState, useEffect, useRef} from 'react';
import {FormComponent, InputComponent, LeftComponent} from './modules';
import { config  } from '../utils';

function AppComponent(props) {

    console.log(`AppComponent ____ render = `, props);

    const [counter, setCounter] = useState(0);

    const [stripeEnabled, setStripeEnabled] = useState(false);

    const customNameValidator = async (value) => {
        const errorMessage = `Has custom error ${value}`;
        console.log('AppComponent :: customValidator START ', value);
        return new Promise((resolve, reject)=> {
            if (value && value.toUpperCase() === 'TEST') {
                setTimeout(() => {
                    console.log('AppComponent :: customValidator setTimeout return error: ', value);
                    resolve(errorMessage + new Date().toUTCString().substr(5, 20).replace(/[ ,:-]/g, '.') );
                }, 3000);
            } else {
                console.log('AppComponent :: customValidator resolve ', value);
                resolve('');
            }
        });
    };

    const appFormSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        // console.log('AppComponent :: onFormSubmit: formData: ', formData, ' props: ', props);
        // console.log('AppComponent :: onFormSubmit: stripeToken: ', stripeToken);
        // console.log('AppComponent :: onFormSubmit: counter: ', counter);
        // console.log(`AppComponent :: onFormChange store.getState() = `, store.getState());
        // const customerObj = store.getState().customer;
        // const url = `${config.COMMERCE_API}/customersapi/customers`;
        // const customerData = {
        //     phoneNumbers: [ '1234567890' ],
        //     acceptedTermsAndCondition: true,
        //     paymentAccount: {
        //         token: event.stripeToken,
        //         paymentType: 'CARD'
        //     },
        //     username: customerObj.email,
        //     optIn: true,
        //     site: process.env.MASTHEAD,
        //     intendedOrders: [
        //         {
        //             siteId: "dailytelegraph",
        //             pkgDef: "DT_SDO_P0420A_W04",
        //             sourceCode: "DTWEB_ONL100",
        //             v21: "dt-shopfront-spc"
        //         }
        //     ],
        //     billingAddress: {
        //         isManual: false,
        //         formattedAddress: '',
        //         streetAddress1: 'Test',
        //         city: 'test',
        //         dpid: '',
        //         lookupId: '',
        //         state: 'NSW',
        //         postCode: "2041",
        //         formattedPostCode: '',
        //         status: 'QAS_POSTCODE_ONLY',
        //         country: 'AU'
        //     },
        //     token: "03AGdBq27tReEc1TA8hvTBDneDm9SXfXfyNNUJV0446Ow1e4FRdTLNS0pDKzTNM_QJtLp7qxb5sAO3gwUbcl8Fj0f_1kqlSrBFLxOnBYurQ6OjbmcNObqkAkf0E_FvVOEhuZmgEWN4VPK_rk0-ly_9x7VazL2Qz00YPkHQBDgdqVyVRKThCrzwZSIMuB2Fp4e0XUmLAp6rYuJqD7zlRF1OEbQXnrzp6Vx8wcJTPjWngZeJEedk9V_UdjNu90SocK4Mm6iFFAafq1TQkkMVfX4EybbPwKT1fuHM_ZMoqkaytiIYC10y5I1fi5BrT1CViH06yMVIqxWuhl5xT6zXuoD51p0_jMg6PIz0_UisCCECr9Lw28ehZG1nw1Io5mYEZT2N37tog0UY6nuBO8o_2VV5PMcoIlyKlVwK7ceM6IxtDeIxxMvJcc3txgmWekeAKBJ-XqZjehftXVkZmACWrPr9ubGKSOhVdguc2CAJE5Oc5lC-tBThDWKrJ0g",
        //     ...customerObj
        // };
        // console.log(' BEFORE FETCH customerData ============================ ', customerData);
        // const options = {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-api-key': config.X_API_KEY
        //     },
        //     body: JSON.stringify(customerData)
        // };
        // console.log(' BEFORE FETCH url ============================ ', url);
        // console.log(' BEFORE FETCH options ============================ ', options);
        // return fetch(url, options)
        //     .then((res)=>{
        //         return res.json();
        //     }).then((result)=>{
        //         console.log(' FINAL RESULT ============================ ', result);
        //         postMessageToParent('EVENT_STRIPE_CUSTOMER_SUCCESS', result);
        //     }).catch((err) => {
        //         console.log(' FINAL err ============================ ', err);
        //         postMessageToParent('EVENT_REACT_CUSTOMER_ERROR', err);
        //     });
    };

    const testClick = () => {
        console.log(`AppComponent ____ appFormSubmit testClick = `);
    };

    // const [stripeToken, setStripeToken] = useState();
    // const onStripeSubmit = (event) => {
    //     postMessageToParent('EVENT_REACT_STRIPE_SUBMIT', store.getState().customer);
    // };
    //
    // const receiveMessageFromParent = (event) => {
    //     console.log(`AppComponent :: receiveMessage event.origin = `, event.origin, ' event.data ', event.data);
    //     const eventName = event && event.data && event.data.name;
    //     const result = event && event.data && event.data.value;
    //
    //     if (eventName === 'EVENT_STRIPE_CAN_MAKE_PAYMENT') {
    //         setStripeEnabled(true);
    //         return;
    //     }
    //
    //     if (eventName === 'EVENT_STRIPE_TOKEN_SUCCESS') {
    //         console.log(`AppComponent :: EVENT_STRIPE_TOKEN_SUCCESS  result `, result);
    //         const tokenMethod = (result.token && result.token.card && result.token.card.tokenization_method || 'card').toUpperCase();
    //         const tokenId = result.token.id;
    //         console.log(`AppComponent :: EVENT_STRIPE_TOKEN_SUCCESS  tokenId `, tokenId);
    //         setStripeToken(tokenId);
    //         console.log(`AppComponent :: EVENT_STRIPE_TOKEN_SUCCESS  stripeToken `, stripeToken);
    //         onFormSubmit({stripeToken: tokenId});
    //     }
    //
    // };
    //
    // const postMessageToParent = (name, value) => {
    //     window.parent.postMessage({ name, value }, 'https://localhost/');
    // };
    //
    // useEffect(() => {
    //     console.log('AppComponent onComponentMount ONCE_____');
    //     window.addEventListener('message', receiveMessageFromParent, false);
    //     postMessageToParent('EVENT_REACT_APP_LOADED', 'test  loaded ');
    // }, []);

    return (
        <div className={`container`}>
            <FormComponent onSubmit={appFormSubmit} { ...props }>
                <div className={`row`}>
                    <div className={`col-sm-12`}>
                        <InputComponent
                            mandatory={true}
                            label={'Email'}
                            name={'email'}
                            id={'email'}
                            type={'text'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <InputComponent
                            mandatory={true}
                            label={'Password'}
                            name={'password'}
                            id={'password'}
                            type={'password'}
                            dispatchName={'customer'}
                        />
                    </div>
                    {stripeEnabled === true &&
                        <div className={`col-sm-12`}>
                            <button type={'button'} className={`btn btn-primary`} onClick={(e) => onStripeSubmit(e)}>
                                Buy with Google/Apple pay
                            </button>
                            <br/>
                            <br/>
                        </div>
                    }
                    <div className={`col-sm-6`}>
                        <InputComponent
                            mandatory={true}
                            label={'First Name'}
                            name={'firstName'}
                            id={'firstName'}
                            type={'text'}
                            dispatchName={'customer'}
                            validator={customNameValidator}
                        />
                    </div>
                    <div className={`col-sm-6`}>
                        <InputComponent
                            mandatory={true}
                            label={'Last Name'}
                            name={'lastName'}
                            id={'lastName'}
                            type={'text'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <InputComponent
                            mandatory={true}
                            label={'Postcode'}
                            name={'postcode'}
                            id={'postcode'}
                            type={'text'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <InputComponent
                            mandatory={true}
                            label={'Phone Number'}
                            name={'phoneNumber'}
                            id={'phoneNumber'}
                            type={'text'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <div className={`form-group form-check`}>
                            <input type="checkbox" className={`form-check-input`} />
                                <label className={`form-check-label`}>I agree to terms and conditions</label>
                        </div>
                    </div>
                    <div className={`col-sm-12`}>
                        <button type={'submit'} className={`btn btn-primary`}>
                            Create Customer and Continue
                        </button>
                    </div>
                </div>
            </FormComponent>
            <div className={`col-sm-12`}>
                <button type={'button'} className={`btn btn-primary`} onClick={testClick}>
                    test
                </button>
            </div>
            counter = {counter}
            <LeftComponent count={props.data.count} counter={counter} />
            <p>{process.env.MASTHEAD}, {config.id}, { config.title }</p>
        </div>
    );
}

export default AppComponent;
