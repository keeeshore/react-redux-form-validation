import React, {useEffect, useState, useContext, useRef, forwardRef} from 'react';
import { useSelector, useStore  } from "react-redux";
import {AppDataContext} from "../Redux";
import {config, getDynamicContent} from "../../utils";

const FormDataContext = React.createContext();

function FormComponent(props) {

   const [ validators, setValidators ] = useState([]);

    const [loadingText, setLoadingText] = useState('ready...');

    const appDataContext = useContext(AppDataContext);

    const store = useStore();

    const [ forceValidate, setForceValidate ] = useState(false);

    console.log(`FormComponent common ____ render = `, validators);

    const onInputElemAdded = (elemRef) => {
        console.log(`FormComponent :: onInputElemAdded elemRef = `, elemRef);
        setValidators(validators => validators.concat(elemRef));
    };

    const onFormSubmit = (event) => {
        setLoadingText('In Progress...');
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        console.log(`FormComponent :: onFormSubmit 1 store = `, store.getState().customer);
        Promise.all(validators.map((elemRef) => {
            console.log(`FormComponent :: onFormSubmit validator = `, elemRef);
            return elemRef.current.isValid();
        })).then((errors) => {
            console.log(`FormComponent :: onFormSubmit 2 errors = `, errors);
            props.onSubmit();
            setLoadingText('Done!');
        });
    };

    console.log(`FormComponent common ____ render = `, validators);

    return (
        <form className="FormComponent" onSubmit={onFormSubmit}>
            <h4>Enter your Details </h4>
            <p>
                { getDynamicContent(config.content.intro_1, process.env.MASTHEAD) }
                { appDataContext.test }
            </p>
            <FormDataContext.Provider value={{ onInputElemAdded, forceValidate, setForceValidate }}>
                {props.children}
                {loadingText}
            </FormDataContext.Provider>
        </form>
    );
}

export { FormComponent, FormDataContext };
