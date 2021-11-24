const siteName = 'Mentor';

// Format as currency
const formatCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

// Format as number
const formatNumber = new Intl.NumberFormat('pt-BR');

// Get screen elements
const assetId = document.querySelector('.asset-icon');
const assetRank = document.querySelector('.asset-rank');
const assetName = document.querySelector('.asset-name');
const assetTicker = document.querySelector('.asset-ticker');
const assetMarketcap = document.querySelector('.asset-marketcap');
const assetVolume = document.querySelector('.asset-volume');
const assetPrice = document.querySelector('.asset-price');
const assetIcon = document.querySelector('.asset-icon');
const assetExchanges = document.querySelector('.asset-exchanges');
const assetHistory = document.querySelector('.asset-history');
const high24h = document.querySelector('.asset-high24h');
const low24h = document.querySelector('.asset-low24h');
const assetAth = document.querySelector('.asset-ath');
const assetAtl = document.querySelector('.asset-atl');
const assetTotalSupply = document.querySelector('.asset-total-supply');
const assetCirculatingSupply = document.querySelector(
    '.asset-circulating-supply'
);

// Get API data
function getAPIData(assetPos) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Changes HTML data
            document.title = `${data[assetPos].name} | Preço, Volume, Perfil | ${siteName}`;
            assetRank.innerHTML = `${data[assetPos].market_cap_rank}º`;
            assetName.innerHTML = `${data[assetPos].name} (${data[assetPos].symbol})`;
            assetIcon.src = data[assetPos].image;
            high24h.innerHTML = `${'<strong>Máximo (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].high_24h
            )}`;
            low24h.innerHTML = `${'<strong>Mínimo (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].low_24h
            )}`;
            assetPrice.innerHTML = formatCurrency.format(
                data[assetPos].current_price
            );
            assetMarketcap.innerHTML = `${'<strong>Capitalização de mercado:</strong>'} ${formatCurrency.format(
                data[assetPos].market_cap
            )}`;
            assetVolume.innerHTML = `${'<strong>Volume (24h):</strong>'} ${formatCurrency.format(
                data[assetPos].total_volume
            )}`;
            assetAth.innerHTML = `${'<strong>Máximo histórico:</strong>'} ${formatCurrency.format(
                data[assetPos].ath
            )}`;
            assetAtl.innerHTML = `${'<strong>Mínimo histórico:</strong>'} ${formatCurrency.format(
                data[assetPos].atl
            )}`;
            assetTotalSupply.innerHTML = `${'<strong>Fornecimento total:</strong>'} ${formatNumber.format(
                data[assetPos].total_supply.toFixed(2)
            )}`;
            assetCirculatingSupply.innerHTML = `${'<strong>Fornecimento em circulação:</strong>'} ${formatNumber.format(
                data[assetPos].circulating_supply.toFixed(2)
            )} (${(
                (data[assetPos].circulating_supply /
                    data[assetPos].total_supply) *
                100
            ).toFixed(2)}%)
            `;
        });
}
