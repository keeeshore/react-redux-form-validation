import React, {useState} from 'react';
import {getDynamicContent} from "../../../utils";
let { LeftComponent } = require('../../../../src/common/LeftComponent');

function withCommonLeftComponent(WrappedComponent) {
    // console.log(`DT dailytelegraph LeftComponent DT ONLY ONLT ____ 1 render = `);
    return function (...props) {
        const [counter, setCounter] = useState(5);
        console.log(`DT LeftComponent DT ____ 2 closure = `);
        props['counter'] = counter;
        props['setCounter'] = setCounter;
        return (
            <div className="LeftComponent">
            <h3>Left component { counter } </h3>

        </div>);
    }
}

LeftComponent = withCommonLeftComponent(LeftComponent);

export { LeftComponent };
