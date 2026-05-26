// pega o botão de converter no HTML (quando clicar, faz a conversão)
const convertButton = document.querySelector('.convert-button');

// pega o input onde o usuário digita o valor em reais
const input = document.querySelector('.currency-input');

// pega o select da moeda de ORIGEM (de qual moeda vai converter)
const currencySelect = document.querySelector('.currency-select');

// pega o select da moeda de DESTINO (para qual moeda vai converter)
const currencySelect2 = document.querySelector('.currency-select2');

// elemento onde aparece o valor original formatado
const currencyValue = document.querySelector('.currency-value');

// elemento onde aparece o valor convertido
const currencyValueConverted = document.querySelector('#currency-value-dolar2');


// objeto com todas as moedas disponíveis no sistema
// cada moeda tem nome, valor base, imagem e formato de moeda
const moedas = {
    USD: {
        nome: 'Dólar',
        valor: 5.2, // 1 USD = 5.2 BRL
        img: './assets/usa.png',
        currency: 'USD',
        locale: 'en-US'
    },

    EUR: {
        nome: 'Euro',
        valor: 5.8, // 1 EUR = 5.8 BRL
        img: './assets/euro.png',
        currency: 'EUR',
        locale: 'de-DE'
    },

    BTC: {
        nome: 'Bitcoin',
        valor: 387111, // 1 BTC = 387111 BRL
        img: './assets/bitcoin.png',
        currency: 'BTC',
        locale: 'en-US'
    },

    BRL: {
        nome: 'Real',
        valor: 1, // base do sistema
        img: './assets/brasil.png',
        currency: 'BRL',
        locale: 'pt-BR'
    }
};


// escuta o que o usuário digita no input
input.addEventListener('input', formatCurrency);


// função que formata o valor digitado em moeda BRL
function formatCurrency() {

    let value = input.value; // pega o valor digitado

    value = value.replace(/\D/g, ''); // remove tudo que não for número

    value = Number(value) / 100; // transforma em número real (centavos)

    // formata no padrão brasileiro de moeda
    input.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}


// função principal de conversão de moedas
function convertValues() {

    // pega a moeda escolhida no select de origem
    const moedaOrigem = moedas[currencySelect.value];

    // pega a moeda escolhida no select de destino
    const moedaDestino = moedas[currencySelect2.value];

    // pega valor do input
    let value = input.value;

    // remove tudo que não for número
    value = value.replace(/\D/g, '');

    // transforma em número real
    const cleanValue = Number(value) / 100;


    // converte valor de origem para BRL
    const emBRL = cleanValue * moedaOrigem.valor;

    // converte BRL para moeda de destino
    const resultado = emBRL / moedaDestino.valor;


    // mostra valor original formatado na tela
    currencyValue.innerHTML = new Intl.NumberFormat(moedaOrigem.locale, {
        style: 'currency',
        currency: moedaOrigem.currency
    }).format(cleanValue);


    // mostra valor convertido na tela
    currencyValueConverted.innerHTML = new Intl.NumberFormat(moedaDestino.locale, {
        style: 'currency',
        currency: moedaDestino.currency
    }).format(resultado);
}


// atualiza a moeda de origem (texto e imagem)
function updateOrigin() {

    const moeda = moedas[currencySelect.value];

    // muda o nome da moeda na tela
    document.querySelector('#currency-dolar').innerHTML = moeda.nome;

    // muda a imagem da moeda
    document.querySelector('#img-currency').src = moeda.img;

    // recalcula conversão
    convertValues();
}


// atualiza a moeda de destino (texto e imagem)
function updateDestination() {

    const moeda = moedas[currencySelect2.value];

    // muda nome da moeda de destino
    document.querySelector('#currency-dolar2').innerHTML = moeda.nome;

    // muda imagem da moeda de destino
    document.querySelector('#img-currency2').src = moeda.img;

    // recalcula conversão
    convertValues();
}


// quando muda a moeda de origem
currencySelect.addEventListener('change', updateOrigin);

// quando muda a moeda de destino
currencySelect2.addEventListener('change', updateDestination);

// quando clica no botão, faz a conversão
convertButton.addEventListener('click', convertValues);


// quando abre a página, já atualiza origem
updateOrigin();

// quando abre a página, já atualiza destino
updateDestination();