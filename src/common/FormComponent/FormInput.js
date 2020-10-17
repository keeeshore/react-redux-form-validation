import regeneratorRuntime from "regenerator-runtime"; // webpack bug
import React, { useEffect, useRef, useContext} from 'react';
import {FormDataContext, InputComponent} from '../modules';

export const FormInput = (props) => {

    console.log(`FormInput ___ render = `);

    const childRef = useRef();

    const formDataContext = useContext(FormDataContext);

    useEffect(() => {
        console.log(`FormInput :: useEffect componentDidMount for ${props.id}`);
        formDataContext.onInputElemAdded(childRef);
    }, []);

    return <InputComponent ref={childRef} {...props} />;

};
