// declara um conjunto inicial de criptomoedas
var db_criptos_inicial = {
    "cripto": [
        {
            "id": 1,
            "nome": "BTC",
            "valor": "5000.00",
            "moeda": "Dolar",
            "data": "2020-10-26",
            "exchange": "Binance"
        },
        {
            "id": 2,
            "nome": "ETH",
            "valor": "14000.00",
            "moeda": "Dolar",
            "data": "2021-09-15",
            "exchange": "Binance"
        },
        {
            "id": 3,
            "nome": "DOGE",
            "valor": "1000.00",
            "moeda": "Real",
            "data": "2019-10-26 ",
            "exchange": "Mercado Bitcoin"
        }
        
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_criptos'));
if (!db) {
    db = db_criptos_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertCripto(cripto) {
    // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
    let moeda = document.getElementById('cambio').value;
    let novoId = db.cripto[db.cripto.length - 1].id + 1;
    let novoCripto = {
        "id": novoId,
        "nome": cripto.nome,
        "valor" : cripto.valor,
        "moeda" : document.getElementById('cambio').value,
        "data": cripto.data,
        "exchange" : cripto.exchange,
    };

    // Insere o novo objeto no array
    db.cripto.push(novoCripto);
    displayMessage("Criptomoeda inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_criptos', JSON.stringify(db));
}

function updateCripto(id, cripto) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.cripto.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.cripto[index].nome = cripto.nome,
    db.cripto[index].valor = cripto.valor,
    db.cripto[index].moeda = document.getElementById('cambio').value,
    db.cripto[index].data = cripto.data,
    db.cripto[index].exchange = cripto.exchange,

    displayMessage("Criptomoeda alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_criptos', JSON.stringify(db));
}

function deleteCripto(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.cripto = db.cripto.filter(function (element) { return element.id != id });

    displayMessage("Criptomoeda removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_criptos', JSON.stringify(db));
}