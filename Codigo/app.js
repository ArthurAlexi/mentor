let siteName = 'Mentor'

// Formata o número como moeda
let formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

// Amostra inicial para o banco de dados
let database = {
    assets: [
        {
            id: 64,
            rank: 1,
            name: 'Bitcoin',
            ticker: 'BTC',
            marketcap: 1158823597511,
            price: 342099.68,
            volume: 18851968,
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
            exchanges: ['Binance', 'Bittrex'],
            history:
                'Bitcoin é uma criptomoeda descentralizada originalmente descrita em 2008 em seu whitepaper por uma pessoa, ou grupo de pessoas, usando o pseudônimo Satoshi Nakamoto. Foi lançado um pouco depois, em janeiro de 2009.'
        },
        {
            id: 1027,
            rank: 2,
            name: 'Ethereum',
            ticker: 'ETH',
            marketcap: 476991570353,
            price: 3983.16,
            volume: 118043593,
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
            exchanges: ['Binance', 'Bittrex'],
            history:
                'Ethereum é um sistema de blockchain descentralizado e open-source, que possui sua própria criptomoeda, o Ether. O ETH funciona como uma plataforma para várias outras criptomoedas, bem como para a execução de smart contracts descentralizados.'
        },
        {
            id: 2010,
            rank: 3,
            name: 'Cardano',
            ticker: 'ADA',
            marketcap: 71170628563,
            price: 2.15,
            volume: 32904527669,
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
            exchanges: ['Binance', 'Bittrex'],
            history:
                'Cardano é uma plataforma blockchain proof-of-stake que afirma ter o objetivo de permitir que “agentes de mudança, inovadores e visionários” tragam mudanças globais positivas.'
        }
    ]
}

// Popula o localStorage
// Adiciona uma chave "database", e um objeto convertido em string no valor
function setLocalStorage() {
    localStorage.setItem('database', JSON.stringify(database))
}

// Recupera a string do localStorage, converte em JSON, e atribui o valor de cada chave à sua devida variável
function getLocalStorage() {
    let assetId = JSON.parse(localStorage.getItem('database')).assets[0].id
    let assetRank = JSON.parse(localStorage.getItem('database')).assets[0].rank
    let assetName = JSON.parse(localStorage.getItem('database')).assets[0].name
    let assetTicker = JSON.parse(localStorage.getItem('database')).assets[0]
        .ticker
    let assetMarketcap = formatter.format(
        JSON.parse(localStorage.getItem('database')).assets[0].marketcap
    )
    let assetPrice = formatter.format(
        JSON.parse(localStorage.getItem('database')).assets[0].price
    )
    let assetVolume = formatter.format(
        JSON.parse(localStorage.getItem('database')).assets[0].volume
    )
    let assetIcon = JSON.parse(localStorage.getItem('database')).assets[0].icon
    let assetExchanges = JSON.parse(localStorage.getItem('database')).assets[0]
        .exchanges
    let assetHistory = JSON.parse(localStorage.getItem('database')).assets[0]
        .history

    // Altera o conteúdo do HTML
    document.title = `${assetName} | Preço, Volume, Perfil | ${siteName}`

    document.querySelector('.asset-icon').src = assetIcon

    document.querySelector(
        '.asset-name'
    ).innerHTML = `${assetName} (${assetTicker})`

    document.querySelector(
        '.asset-volume'
    ).innerHTML = `Volume (24h): ${assetVolume}`

    document.querySelector(
        '.asset-marketcap'
    ).innerHTML = `Marketcap: ${assetMarketcap}`

    document.querySelector('.asset-rank').innerHTML = `${assetRank}º`

    document.querySelector('.asset-price').innerHTML = assetPrice

    document.querySelector(
        '.asset-exchanges'
    ).innerHTML = `Exchanges: ${assetExchanges}`

    document.querySelector(
        '.asset-history'
    ).innerHTML = `História: ${assetHistory}`
}

setLocalStorage()
getLocalStorage()
