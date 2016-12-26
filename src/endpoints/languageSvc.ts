import {Language} from './../types';

export default function getLanguages():Language[] {
    return [
        { key: 'en', title: 'English' },
        { key: 'sv', title: 'Swedish' }
    ];
}