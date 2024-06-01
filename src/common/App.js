import React, {useState, useEffect, useRef} from 'react';
import {FormComponent, InputComponent, LeftComponent, FormInput} from './modules';
import { config  } from '../utils';

function AppComponent(props) {

    console.log(`AppComponent ____ render = `, props);

    const [counter, setCounter] = useState(0);

    const customNameValidator = async (value) => {
        const inValid = /\d+/.test(value);
        if (!value) {
            return 'Name is required';
        }
        if (inValid) {
            return 'Name should not contain numbers'
        }
        return '';  
    };
    
    const emailValidator = async (value) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // if (!value) {
        //     return 'Email is required';
        // }
        return new Promise((resolve, reject)=> {      
            setTimeout(() => {
                console.log('value === ', value);
                const isInValid = (value || '').match(validRegex);
                console.log(isInValid)
                if (isInValid) {
                    resolve('')
                   
                } else {
                    resolve('Invalid email. Dated:' + new Date().toUTCString().substr(5, 20).replace(/[ ,:-]/g, '.') );
                }
            }, 3000);
        });
       
    }

    const phoneValidator = async (value) => {
        const isValid =  /^\d+$/.test(value);
        if (!value) {
            return 'Phone Number is required';
        }
        if (!isValid) {
            return 'Invalid Phone Number'
        }
        return '';
       
    }

    const appFormSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        setCounter(counter + 1);
    };

    return (
        <div className={`container`}>
            <FormComponent onSubmit={appFormSubmit} { ...props }>
                <div className={`row`}>
                    <div className={`col-sm-12`}>
                        <FormInput
                            mandatory={true}
                            label={'Email'}
                            name={'email'}
                            id={'email'}
                            type={'text'}
                            dispatchName={'customer'}
                            validator={emailValidator}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <FormInput
                            mandatory={true}
                            label={'Password'}
                            name={'password'}
                            id={'password'}
                            type={'password'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-6`}>
                        <FormInput
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
                        <FormInput
                            mandatory={true}
                            label={'Last Name'}
                            name={'lastName'}
                            id={'lastName'}
                            type={'text'}
                            dispatchName={'customer'}
                            validator={customNameValidator}
                             />
                    </div>
                    <div className={`col-sm-12`}>
                        <FormInput
                            mandatory={true}
                            label={'Postcode'}
                            name={'postcode'}
                            id={'postcode'}
                            type={'text'}
                            dispatchName={'customer'}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <FormInput
                            mandatory={true}
                            label={'Phone Number'}
                            name={'phoneNumber'}
                            id={'phoneNumber'}
                            type={'text'}
                            dispatchName={'customer'}
                            validator={phoneValidator}
                        />
                    </div>
                    <div className={`col-sm-12`}>
                        <button type={'submit'} className={`btn btn-primary`}>
                            Validate and Submit
                        </button>
                    </div>
                </div>
            </FormComponent>
            <LeftComponent count={props.data.count} counter={counter} />
            <p  class="lead"> counter = {counter} , {process.env.MASTHEAD}, {config.id}, { config.title }</p>
        </div>
    );
}

export default AppComponent;
