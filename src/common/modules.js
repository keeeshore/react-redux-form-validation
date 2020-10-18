// const masthead = document.location.pathname.split('/')[2];
const Module = require(`../mastheads/${process.env.MASTHEAD}/modules`);

// TEST LOG FOR DEBUGGING START --------------
Object.keys(Module).forEach(k => console.log(`:::::::::::: ${process.env.MASTHEAD} has custom Module.${k}::::::::::::::::::`));
// TEST LOG FOR DEBUGGING END ----------------

export const { FormComponent, FormDataContext } = require('./FormComponent');
export const { FormInput } = require('./FormComponent/FormInput');
export const { InputComponent } = Module.InputComponent ? Module : require('./InputComponent');
export const { LeftComponent } = Module.LeftComponent ? Module : require('./LeftComponent');

export const InputComponentStyles =  Module.InputComponentStyles ||  require('./InputComponent/styles.scss');
