import defaultData from './../../config/default.json';
import defaultContent from '../common/content.json';

const config = ((stage = process.env.STAGE, masthead = process.env.MASTHEAD) => {
    return {
        ...defaultData,
        ...require(`../../config/${stage}.json`),
        content: {
            ...defaultContent,
            ...require(`../mastheads/${masthead}/content.json`),
        }
    };
})(process.env.STAGE, process.env.MASTHEAD);

const getDynamicContent = (textString = '', ...values) => {
    return textString.replace('${masthead}', values);
};

export { config, getDynamicContent };
