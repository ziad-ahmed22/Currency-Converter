let numInput = document.getElementById('num');
let currency = document.getElementById('currency');
let result = document.querySelector('.result');
let copyBtn = document.querySelector('.copy');

window.onload = () => numInput.focus();

copyBtn.addEventListener('click', copyCurrency);
result.addEventListener('click', copyCurrency);

function copyCurrency() {
    navigator.clipboard.writeText(result.textContent);
    copyBtn.textContent = "currency copied to clipboard"
    setTimeout(() => {
        copyBtn.textContent = "click to copy"
    }, 2000);
}

// Fill In Select Option From API
fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=25eab7c6824a4a4c83ea7cf3ba49ad0b")
.then((response) => {
    return response.json();
})
.then((data) => {
    return Object.keys(data.rates);
})
.then((data) => {    
    data.sort();
    data.forEach(e => {
        let option = document.createElement('option');
        option.setAttribute('value', e);
        option.textContent = e;
        currency.appendChild(option);
    });
});

currency.addEventListener('input', getData);
numInput.addEventListener('input', getData);

function getData() {
    fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=25eab7c6824a4a4c83ea7cf3ba49ad0b")
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        result.textContent = numInput.value * data.rates[currency.value];
    });
}
