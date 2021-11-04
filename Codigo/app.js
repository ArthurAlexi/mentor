let siteName = 'Mentor'

// Format as currency
let formatCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

// Format as number
let formatNumber = new Intl.NumberFormat('pt-BR')

// Get screen elements
let assetId = document.querySelector('.asset-icon')
let assetRank = document.querySelector('.asset-rank')
let assetName = document.querySelector('.asset-name')
let assetTicker = document.querySelector('.asset-ticker')
let assetMarketcap = document.querySelector('.asset-marketcap')
let assetVolume = document.querySelector('.asset-volume')
let assetPrice = document.querySelector('.asset-price')
let assetIcon = document.querySelector('.asset-icon')
let assetExchanges = document.querySelector('.asset-exchanges')
let assetHistory = document.querySelector('.asset-history')
let high24h = document.querySelector('.asset-high24h')
let low24h = document.querySelector('.asset-low24h')
let assetAth = document.querySelector('.asset-ath')
let assetAtl = document.querySelector('.asset-atl')
let assetTotalSupply = document.querySelector('.asset-total-supply')
let assetCirculatingSupply = document.querySelector('.asset-circulating-supply')

// Get API data
function getAPIData(assetPos) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Changes HTML data
            document.title = `${data[assetPos].name} | Preço, Volume, Perfil | ${siteName}`
            assetRank.innerHTML = `${data[assetPos].market_cap_rank}º`
            assetName.innerHTML = `${data[assetPos].name} (${data[assetPos].symbol})`
            assetIcon.src = data[assetPos].image
            high24h.innerHTML = `${'<strong>Máximo (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].high_24h
            )}`
            low24h.innerHTML = `${'<strong>Mínimo (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].low_24h
            )}`
            assetPrice.innerHTML = formatCurrency.format(
                data[assetPos].current_price
            )
            assetMarketcap.innerHTML = `${'<strong>Capitalização de mercado:</strong>'} ${formatCurrency.format(
                data[assetPos].market_cap
            )}`
            assetVolume.innerHTML = `${'<strong>Volume (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].total_volume
            )}`
            assetAth.innerHTML = `${'<strong>Máximo histórico:</strong>'} ${formatCurrency.format(
                data[assetPos].ath
            )}`
            assetAtl.innerHTML = `${'<strong>Mínimo histórico:</strong>'} ${formatCurrency.format(
                data[assetPos].atl
            )}`
            assetTotalSupply.innerHTML = `${'<strong>Fornecimento total:</strong>'} ${formatNumber.format(
                data[assetPos].total_supply.toFixed(2)
            )}`
            assetCirculatingSupply.innerHTML = `${'<strong>Fornecimento em circulação:</strong>'} ${formatNumber.format(
                data[assetPos].circulating_supply.toFixed(2)
            )} (${(
                (data[assetPos].circulating_supply /
                    data[assetPos].total_supply) *
                100
            ).toFixed(2)}%)
            `
        })
}
