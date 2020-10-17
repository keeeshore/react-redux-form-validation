import React, {useEffect, useState, useContext, useRef, forwardRef} from 'react';
import { useSelector, useStore  } from "react-redux";
import {AppDataContext} from "../Redux";
import {config, getDynamicContent} from "../../utils";

const FormDataContext = React.createContext();

function FormComponent(props) {

   const [ counter, setCounter ] = useState(1);

   const [ validators, setValidators ] = useState([]);

    const appDataContext = useContext(AppDataContext);

    const store = useStore();

    const inputRef = useRef();

    const [ forceValidate, setForceValidate ] = useState(false);

    console.log(`FormComponent common ____ render = `, validators);

    const onFormChange = (validator) => {
        // console.log(`FormComponent :: onFormChange validators before = `, validators);
        // setValidators(validators.push({ validator }));
    };

    const onInputElemAdded = (elemRef) => {
        console.log(`FormComponent :: onInputElemAdded elemRef = `, elemRef);
        setValidators(validators => validators.concat({ elemRef }));
    };

    const onFormSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        console.log(`FormComponent :: onFormSubmit store = `, store.getState().customer);
        setForceValidate(true);
        props.onSubmit();
    };

    const validate = () => {
        console.log(`FormComponent :: validate props = `, props);
    };

    console.log(`FormComponent common ____ render = `, validators);

    return (
        <form className="FormComponent" onSubmit={onFormSubmit}>
            <h4>Enter your Details </h4>
            <p>
                { getDynamicContent(config.content.intro_1, process.env.MASTHEAD) }, counter = { counter }
                { appDataContext.test }
            </p>
            <FormDataContext.Provider value={{ onInputElemAdded, forceValidate, setForceValidate }}>
                {props.children}
            </FormDataContext.Provider>
        </form>
    );
}

export { FormComponent, FormDataContext };
