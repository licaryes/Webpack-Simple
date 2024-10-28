// imports
import '../assets/styles/main.scss';

import question from '../assets/images/icons8-вопросительный-знак-52.png';
import mir from '../assets/images/brands-logos/mir-white.svg';
import visa from '../assets/images/brands-logos/visa-white.svg';
import mastercard from '../assets/images/brands-logos/master-card-white.svg';

import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';

const CardInfo = require('card-info');
const cardValidator = require('card-validator');
const validator = require('validator');
const { getDaysInMonth } = require('date-fns');

import { createDOM } from './DOM'

export {
    question,
    mir,
    visa,
    mastercard,
    el,
    setChildren,
    Inputmask,
    CardInfo,
    cardValidator,
    validator,
    getDaysInMonth,
    createDOM
};