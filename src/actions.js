import constants from './constants';

export function temp(message) {
    return {type: constants.TEMP, message}
}
