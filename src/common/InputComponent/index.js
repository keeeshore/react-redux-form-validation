import regeneratorRuntime from "regenerator-runtime"; // webpack bug
import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {InputComponentStyles, FormDataContext} from '../modules';

const Input = (props, ref) => {

    console.log(`InputComponent ___ render = `, props, ' ref = ', ref);

    const inputStates = {
        PRISTINE: 'pristine',
        FILLED: 'filled',
        EMPTY: 'empty',
        FOCUSED: 'focused'
    };

    const formStates = {
        VALID: '',
        INVALID: 'invalid'
    };

    const loadingState = {
        START: 'loading',
        DONE: 'done'
    };

    const [error, setError] = useState();

    const [inputState, setInputState] = useState(inputStates.PRISTINE);

    const [loaderClass, setLoaderClass] = useState(false);

    const dispatch = useDispatch();

    const value = useSelector((state) => {
        return state[props.dispatchName][props.id];
    });

    const formDataContext = useContext(FormDataContext);

    useEffect(() => {
        console.log(`InputComponent :: useEffect componentDidMount for ${props.id}`);
        setError();
    }, []);

    useEffect(() => {
        console.log(`InputComponent :: useEffect formDataContent.forceValidate for ${props.id} as ${formDataContext.forceValidate}`);
        if(formDataContext.forceValidate) {
            async function anyNameFunction(opts) {
                setLoaderClass(loadingState.START);
                const error = await validate(opts);
                setLoaderClass(loadingState.DONE);
                setError(error);
                formDataContext.setForceValidate(false);
                if (error) {
                    console.log(`InputComponent :: useEffect formDataContent.forceValidate  ${props.id} HAS error`);
                    formDataContext.setIsFormInvalid(true);
                }
            }
            anyNameFunction({isForced:true});
        }
    }, [formDataContext.forceValidate]);

    useEffect(() => {
        console.log(`InputComponent :: useEffect componentDidUpdate value for ${props.id} : ${value}`);
        if (value) {
            setInputState(inputStates.FILLED);
        }
        async function anyNameFunction() {
            setLoaderClass(loadingState.START);
            const error = await validate();
            setError(error);
            setLoaderClass(loadingState.DONE);
        }
        anyNameFunction();
    }, [value]);

    const validate = async (args) => {
        console.log(`InputComponent :: validate for ${props.id} : ${value}`);
        let error = '';
        if (!value && (inputState !== inputStates.PRISTINE || (args && args.isForced))) {
            error = `${props.label} is required`;
            return error;
        }
        if (typeof props.validator === 'function') {
            error = await props.validator(value);
        }
        return error;
    };

    const handleInputChange = (event) => {
        console.log(`InputComponent :: handleInputChange ${event.type.toUpperCase()} for ${props.id}`, event.target.value);
        const {value} = event.target;
        const dispatchType = props.dispatchName.toUpperCase();
        const keyValue = {};
        keyValue[props.id] = value;
        switch (event.type.toUpperCase()) {
            case 'FOCUS':
                setInputState(inputStates.FOCUSED);
                break;
            case 'CHANGE':
                dispatch({type: dispatchType, payload: keyValue});
                break;
            case 'BLUR':
                setInputState(value ? inputStates.FILLED : inputStates.EMPTY);
                break;
            default:
        }
    };

    const TextInput = (<div className={`${InputComponentStyles.InputComponent}`}>
        <div className={`form-group ${inputState} ${loaderClass}`}>
            <label for={props.id}>{props.label}</label>
            <input type={props.type}
                   id={props.id}
                   value={value}
                   className={`form-control is-${error ? formStates.INVALID : formStates.VALID}`}
                   onFocus={handleInputChange}
                   onChange={handleInputChange}
                   onBlur={handleInputChange}
            />
            <div className={`${error ? formStates.INVALID : formStates.VALID}-feedback`}>{error}</div>
        </div>
    </div>);

    return TextInput;

};


export const InputComponent = Input;
