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

    const [ forceValidate, setForceValidate ] = useState(false);

    const [ isFormInvalid, setIsFormInvalid ] = useState(false);

    console.log(`FormComponent common ____ render = `, validators);

    const onFormSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        console.log(`FormComponent :: onFormSubmit store :: `, store.getState().customer);
        setIsFormInvalid(false);
        setForceValidate(true);
        console.log(`FormComponent :: isFormInvalid ? `, isFormInvalid);
        // props.onSubmit(isFormInvalid);
        if (!isFormInvalid) {
            alert(JSON.stringify(store.getState().customer));
        }
    };

    console.log(`FormComponent common ____ render = `);

    return (
        <form className="FormComponent" onSubmit={onFormSubmit}>
            <h4>Enter your Details </h4>
            <p>
                { getDynamicContent(config.content.intro_1, process.env.MASTHEAD) }, counter = { counter }
                { appDataContext.test }
            </p>
            <FormDataContext.Provider value={{ forceValidate, setForceValidate, setIsFormInvalid }}>
                {props.children}
            </FormDataContext.Provider>
        </form>
    );
}

export { FormComponent, FormDataContext };
