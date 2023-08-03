import yargs, { choices, options } from 'yargs';
import { presetEnum } from '../enums/preset.enum.js'
import _ from 'lodash'

export interface commandLineArgement {

_: (string | number) []
$0: string;
[argName: string]: unknown;
tag: string;
deviceIds: any;
preset?: string;

}

const getdefaultArgs = async (processArgc: string[]) => {
    const argv: commandLineArgement = await yargs(processArgc)
.usage(`Usage: npm run <android:app|iOS:app> -- [options]`)
.options( {
    provider: {
        describe: 'specific the platform config to run the test',
        type: 'string',
        string: true,
        default: 'android',
        choices: ['android', 'iOS']
    },
    tag: {
        alias: 't',
        describe: 'specify which tags to run',
        type: 'string',
        string: true,
        default: "@smoke",
    },

    deviceIds: {
        describe:'device IDs to run the tests against',
        type: 'string',
        string: true,
        default: 'randomDevices'
    },
    
    preset: {
        describe:'append the arguments from the predefined preset',
        type: 'string',
        string: true,
        default: undefined,
        choices: Object.keys(presetEnum)
    }

})
.help()
.alias('text', 't')
.strict()
 .parserConfiguration({'camel-case-expansion': false, 'short-option-groups': false}).argv;
return argv;

};

// Yet to create the preset

const applyPreset = (argv: commandLineArgement) => {
    if (argv.preset) {
        const presetparam = _.get(presetEnum,argv.preset);
        console.log(presetparam);
    if (presetparam) {
        Object.assign(argv, presetparam)
    }
 }
};

export const getArgv =async (processArgv:string[]) => {
    const argv = await getdefaultArgs(processArgv);
    const unrecognisedArguments = argv._.slice(2)
    if (unrecognisedArguments.length > 0) {
        throw new Error(`Found unrecognised arguments: ${unrecognisedArguments.join(' ')}`);
    } 
    applyPreset(argv);
    return argv;

};


