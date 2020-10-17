import React from 'react';
import content from '../content.json';
import {getDynamicContent} from "../../utils";

function LeftComponent({counter = 0, count = 0}) {

   console.log(`LeftComponent common ____ render = `, arguments);

    return (
        <div className="LeftComponent">
            <h3>left component : common { counter } </h3>
            <p>{ getDynamicContent(content.intro_1, count) }, counter = { counter }</p>
        </div>
    );
}

export { LeftComponent };
