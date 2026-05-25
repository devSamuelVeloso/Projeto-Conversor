const convertButton = document.querySelector('.convert-button'); // seleciona o botão de converter no HTML (dispara a função principal de conversão)

const input = document.querySelector('.currency-input'); // seleciona o input onde o usuário digita o valor em reais (base da conversão)

const currencySelect = document.querySelector('.currency-select'); // pega o select onde o usuário escolhe a moeda

input.addEventListener('input', formatCurrency); // escuta cada digitação no input para formatar automaticamente o valor em moeda

function formatCurrency() {

    let value = input.value; // pega o valor atual digitado no input

    value = value.replace(/\D/g, ''); // remove tudo que não for número (evita letras e símbolos que quebrariam cálculos)

    value = Number(value) / 100; // transforma em número real e ajusta para centavos (ex: 1000 -> 10.00)

    input.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value); // formata o valor para padrão de moeda brasileira (melhora a leitura e UX)
}

function convertValues() {
    const inputValue = document.querySelector('.currency-input').value; // pega o valor do input (já formatado visualmente)
    const currencyValue = document.querySelector('.currency-value'); // elemento onde será exibido o valor em BRL
    const currencyValueConverted = document.querySelector('#currency-value-dolar'); // elemento onde será exibido o valor convertido (USD ou EUR)

    const cleanValue = Number(inputValue.replace(/\D/g, '')) / 100; // remove formatação e transforma em número real para cálculo correto

    const dolarToday = 5.2; // taxa de câmbio do dólar (valor fixo simulado)
    const euroToday = 5.83; // taxa de câmbio do euro (valor fixo simulado)

    currencyValue.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(cleanValue); // exibe o valor em reais formatado corretamente

    if (currencySelect.value === 'USD') {
        currencyValueConverted.innerHTML =
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(cleanValue / dolarToday); // converte e exibe o valor em dólar
    }

    if (currencySelect.value === 'EUR') {
        currencyValueConverted.innerHTML =
            new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(cleanValue / euroToday); // converte e exibe o valor em euro
    }
}

function changeCurrency() {
    const currencyName = document.querySelector("#currency-dolar")
    const currencyImg = document.querySelector(".pais")

    if(currencySelect.value === 'USD'){
        currencyName.innerHTML = 'Dólar'
        currencyImg.src = './assets/usa.png'
    }

    if(currencySelect.value === 'EUR'){
        currencyName.innerHTML = 'Euro'
        currencyImg.src = './assets/euro.png'
    }

    convertValues()
}

currencySelect.addEventListener('change', changeCurrency); // escuta mudanças no select para atualizar a conversão automaticamente

convertButton.addEventListener('click', convertValues); // conecta o botão à função de conversão