function generateAlphabeticString(stringLength = 5) {
    let randomString = '';
    let randomAscii = null;
    const asciiLow = 65;
    const asciiHigh = 90;
    for (let i = 0; i < stringLength; i++) {
        randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
        randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
}


function getElement(selector) {
    return document.querySelector(selector);
}
function getAllElement(selector) {
    return document.querySelectorAll(selector);
}

function isArrayHasItems(array) {
    return Array.isArray(array) && array.length > 0;
}

function getMillisecondsOfOneHourAddedOnNowDate() {
    let dt = new Date();
    return dt.setHours(dt.getHours() + 1);
}

function getMillisecondsOfNowDate() {
    return Date.now();
}

function encode(str) {
    return window.btoa(str);
}

function initDate(hours) {
    const date = new Date();
    const currentHours = date.getHours();
    date.setHours(currentHours + hours);
    return date;
}


function putTextIntoDiv(text) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, 'text/html');
    return doc.body;
    // const wrapper = document.createElement('div');
    // wrapper.insertAdjacentHTML('beforeend', text);
    // return wrapper.innerHTML;
}


async function fetchPageTemplate(name) {
    const response = await fetch(`./templates/${name}.html`);
    if (response.ok) {
        return response.text();
    } else {
        console.error(`Error fetching  ${name} templete`);
    }
}

function createScript(src) {
    const script = document.createElement('script');
    script.src = src;
    return script;
}