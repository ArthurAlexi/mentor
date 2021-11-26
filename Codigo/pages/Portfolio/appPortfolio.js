function start() {
    getAPIData()// chama API
    listaCriptos();// monta a tabela com os criptos
    calculaPatrimonio(); //soma os valores de compra para ter o patrimonio
    desenhaGrafico(); // desenha grafico_cripto

}

// valores relativos das moedas:
let dolar = 5.6;
let euro = 6.4;
let usdeur = 0.8;
let eurusd = 1.13;

function getAPIData() {
        
    //API COM AS COTAÇÕES DAS MOEDAS
    var xhr = new XMLHttpRequest();
    xhr.onload = valoresCotacao;
    xhr.open('GET','https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,USD-EUR,EUR-USD');
    xhr.send(); 
}

function valoresCotacao() {
    let dados = JSON.parse((this.responseText));
    dolar = parseFloat(dados.USDBRL.high);
    euro = parseFloat(dados.EURBRL.high);
    usdeur = parseFloat(dados.USDEUR.high);
    eurusd = parseFloat(dados.EURUSD.high);
}

function trataCambio(valor, moeda) {

    getAPIData();
    //Obtem a moeda que o usuário deseja:
    let cambio = document.getElementById('cambio').value;


    if (cambio == 'real') {
        //Transforma os valores para o real

        if (moeda == 'dolar') {
            return valor = parseFloat(valor) * dolar;
        } else if (moeda == 'euro') {
            return valor = parseFloat(valor) * euro;
        } else {
            return valor = parseFloat(valor);
        }

    } else if (cambio == 'dolar') {
        //Transforma os valores para o dolar

        if (moeda == 'real') {
            return valor = parseFloat(valor) / dolar;
        } else if (moeda == 'euro') {
            return valor = (parseFloat(valor) / euro) * dolar;
        } else {
            return valor = parseFloat(valor);
        }

    } else if (cambio == 'euro') {
        //Transforma os valores para o euro

        if (moeda == 'real') {
            return valor = parseFloat(valor) / euro;
        } else if (moeda == 'dolar') {
            return valor = (parseFloat(valor) / dolar) * euro;
        } else {
            return valor = parseFloat(valor);
        }
    }
}


function listaCriptos() {


    // limpa a lista de criptos apresentados
    $("#table-criptos").empty();

    // Popula a tabela com os registros do banco de dados
    for (let index = 0; index < db.cripto.length; index++) {
        const cripto = db.cripto[index];
        let valor;

        // TRATANDO A QUESTÃO DO CAMBIO: ainda a olhar

        valor = trataCambio(cripto.valor, cripto.moeda);


        $("#table-criptos").append(`<tr><td scope="row">${cripto.id}</td>
                                            <td>${cripto.nome}</td>
                                            <td>${cripto.data}</td>
                                            <td>${valor.toFixed(2)}</td>
                                           
                                        </tr>`);
    }
}

function calculaPatrimonio() {

    //limpa o div
    $("#patrimonio").empty();




    // variaveis com elementos HTML:
    let cambio = document.getElementById('cambio').value;
    let patrimonio = document.getElementById('patrimonio');

    //variaveis locais:
    let total = 0;
    let strHtml = '';
    let valor = 0;
    let simbolo;

    for (let index = 0; index < db.cripto.length; index++) {
        const cripto = db.cripto[index];

        valor = trataCambio(cripto.valor, cripto.moeda);

        total += valor; // soma os valores após as tranformações;
    }

    if (cambio == 'real') {
        simbolo = 'R$';
    } else if (cambio == 'dolar') {
        simbolo = 'US$';
    } else if (cambio == 'euro') {
        simbolo = '€';
    }

    strHtml += `<h1><strong> Patrimônio: </strong> ${simbolo} ${total.toFixed(2)}</h1> `;
    patrimonio.innerHTML = strHtml;

}
// Construção do grafico-cripto

function desenhaGrafico() {
    let nome = [10];
    let valor = [10];

    for (let index = 0; index < db.cripto.length; index++) {
        const cripto = db.cripto[index];

        nome[index] = cripto.nome;

        valor[index] = trataCambio(cripto.valor, cripto.moeda);
    }




    //-----------------------------------------------------------
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['cripto', 'value per total'],
            [nome[0], valor[0]],
            [nome[1], valor[1]],
            [nome[2], valor[2]],
            [nome[3], valor[3]],
            [nome[4], valor[4]],
            [nome[5], valor[5]],
            [nome[6], valor[6]],
            [nome[7], valor[7]],
            [nome[8], valor[8]],
            [nome[9], valor[9]]
        ]);

        var options = {
            title: 'Distribuição das criptomoedas na carteira',
            pieHole: 0.4,
        };


        var chart = new google.visualization.PieChart(document.getElementById('graficoCripto'));
        chart.draw(data, options);
    }
}