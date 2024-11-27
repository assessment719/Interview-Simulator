import { atom } from 'recoil';

export const loaderAtom = atom({
    key: 'IsDataReceived',
    default: false,
});