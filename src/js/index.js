import "../assets/styles/main.scss"

import {el, setChildren} from 'redom';
import Inputmask from "inputmask";

const CardInfo = require('card-info');
const cardValidator = require('card-validator');
const validator = require('validator');
const {getDaysInMonth} = require('date-fns');

import question from '../assets/images/icons8-вопросительный-знак-52.png';
import mir from '../assets/images/brands-logos/mir-white.svg';
import visa from '../assets/images/brands-logos/visa-white.svg';
import mastercard from '../assets/images/brands-logos/master-card-white.svg';
import sberbank from '../assets/images/banks-logos/ru-sberbank.svg';


const numberInput = document.getElementById('number');
const cvvInput = document.getElementById('cvv');
const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');
const emailInput = document.getElementById('email');

const now = new Date();

function check_number(event) {
    return (event.key < 10 && event.key >= 0 && event.key !== ' ') || event.key === 'Backspace'
}

yearInput.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (check_number(event)) {
        // Удаление или добавление
        if (event.key === 'Backspace') {
            event.target.value = event.target.value.slice(0, -1);
        } else {
            if (event.target.value.length < 2 && ((now.getFullYear().toString().slice(2) < (event.target.value + event.key) && monthInput.value < now.getMonth() + 1) || (now.getFullYear().toString().slice(2, 3) <= (event.target.value + event.key).toString().slice(0, 1) && event.target.value.length === 0
                || now.getFullYear().toString().slice(3) <= (event.target.value + event.key).toString().slice(1) && monthInput.value >= now.getMonth() + 1))) {
                event.target.value += event.key;
            }
        }
        check_validation();
    }
});

monthInput.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (check_number(event)) {
        // Удаление или добавление
        if (event.key === 'Backspace') {
            event.target.value = event.target.value.slice(0, -1);
        } else {
            if (event.target.value.length < 2 &&
                ((yearInput.value === now.getFullYear().toString().slice(2) && event.target.value + event.key <= 12 && (event.target.value + event.key >= now.getMonth() + 1 || event.target.value.length === 0 && event.key === "1"))
                    || (event.target.value + event.key <= 12 && event.target.value + event.key > 0 && !(yearInput.value === now.getFullYear().toString().slice(2))))) {
                event.target.value += event.key;
            }
        }
        check_validation();
    }
});

cvvInput.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (check_number(event)) {

        // Удаление или добавление
        if (event.key === 'Backspace') {
            event.target.value = event.target.value.slice(0, -1);
        } else {
            if (event.target.value.length < 3) {
                event.target.value += event.key;
            }
        }
        check_validation();
    }
});

numberInput.addEventListener('keydown', (event) => {
    event.preventDefault();

    if (check_number(event)) {

        // Создания массива цифр
        let input = event.target.value;
        const digits = input.match(/\d/g);
        const digitArray = digits ? digits : [];

        // Удаление или добавление в массив
        if (event.key === 'Backspace') {
            digitArray.pop()
        } else {
            if (digitArray.length < 16) {
                digitArray.push(event.key);
            }
        }

        // Сборка результата для отображения
        let number = "";
        for (let i = 0; i < digitArray.length; i++) {
            number += digitArray[i];
        }
        Inputmask({mask: "9999 9999 9999 9999"}).mask(event.target);
        event.target.value = number;
        // event.target.setSelectionRange(select,select);

        if (digitArray.length === 16 && cardValidator.number(number).isValid) {
            const card = new CardInfo(number)
            console.log(card);
            switch (card.brandName) {
                case "MIR":
                    setChildren(document.getElementById("brand"), el("img", {src: mir}))
                    break;
                case "Visa":
                    setChildren(document.getElementById("brand"), el("img", {src: visa}))
                    break;
                case "MasterCard":
                    setChildren(document.getElementById("brand"), el("img", {src: mastercard}))
                    break;
                default:
                    setChildren(document.getElementById("brand"), el("img", {src: question}))
                    break;
            }
            document.getElementById("buy").disabled = false;
        } else {
            setChildren(document.getElementById("brand"), el("p"))
        }
        check_validation();
    }

});

emailInput.addEventListener('keyup', (e) => {
    check_validation();
})

function check_validation() {
    const date = new Date(Number("20" + yearInput.value), monthInput.value - 1, getDaysInMonth(new Date(Number("20" + yearInput.value), monthInput.value - 1)));
    if (cardValidator.number(numberInput.value).isValid
        && cvvInput.value.length === 3
        && now <= date
        && validator.isEmail(emailInput.value)
    ) {
        document.getElementById("buy").disabled = false;
    } else {
        document.getElementById("buy").disabled = true;
    }
}



