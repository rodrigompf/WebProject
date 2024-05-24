const apiKey = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Ctron%2Ctether%2Ckucoin-shares%2Cpepe%2Cdai%2Csei-network%2Ctezos%2Cretardio%2Cgigachad-2%2Cpedro-the-raccoon&vs_currencies=eur&include_24hr_change=true";

let xhr = new XMLHttpRequest();
xhr.open("GET", apiKey);
xhr.responseType = 'json';
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const result = this.response;
        for (const item in result) {
            const divMoeda = document.createElement('div');
            const value = result[item];
            const divPrincipal = document.createElement('div');

            const NomeMoeda = document.createElement('span');
            NomeMoeda.className = 'currency-name currency-coin';

            const Separados = document.createElement('p');
            Separados.textContent = "➜";
            Separados.className = 'currency-name separator';
            const divValores = document.createElement('div');
            divValores.classList.add('div-values');

            const ValorEuro = document.createElement('span');
            ValorEuro.className = 'eur-value';

            const EuroChange = document.createElement('span');
            EuroChange.className = 'eur-change';

            NomeMoeda.textContent = item;
            ValorEuro.textContent = value.eur;
            EuroChange.textContent = value.eur_24h_change;

            const logoDiv = document.createElement('div');
            logoDiv.className = 'coin-logo';
            const logoImg = document.createElement('img');
            logoImg.src = `imagensdasmoedas/${item}.png`;
            logoImg.style.width = '30px';
            logoImg.style.height = '30px';
            logoDiv.appendChild(logoImg);

            divPrincipal.addEventListener('click', function () {
                let additionalInfo = divPrincipal.nextElementSibling;
                const allGraphics = document.querySelectorAll('.additional-info');
            
                if (additionalInfo && additionalInfo.classList.contains('additional-info')) {
                    additionalInfo.classList.toggle('hidden');
                } else {
                    additionalInfo = document.createElement('div');
                    additionalInfo.className = 'additional-info';
            
                    const chartContainer = document.createElement('div');
                    chartContainer.className = 'chart-container';
                    const chartCanvas = document.createElement('canvas');
                    chartCanvas.id = `${item}Chart`;
                    chartContainer.appendChild(chartCanvas);
                    additionalInfo.appendChild(chartContainer);
            
                    divPrincipal.insertAdjacentElement('afterend', additionalInfo);
            
                    fetchCoinData(item, createChart);
                }
            
                // Count the number of visible charts
                let visibleCharts = 0;
                allGraphics.forEach(graphic => {
                    if (!graphic.classList.contains('hidden')) {
                        visibleCharts++;
                    }
                });
            
                // Toggle justify-content based on the visibility of charts
                if (visibleCharts === 0) {
                    document.body.style.justifyContent = 'center';
                } else {
                    document.body.style.justifyContent = 'normal';
                }
            });
            divPrincipal.appendChild(logoDiv);
            divValores.appendChild(ValorEuro);
            divValores.appendChild(EuroChange);
            divPrincipal.appendChild(NomeMoeda);
            divPrincipal.appendChild(Separados);
            divValores.appendChild(ValorEuro);
            divValores.appendChild(EuroChange);
            divPrincipal.appendChild(divValores);

            divPrincipal.classList.add('currency');
            if (value.eur_24h_change < 0) {
                divPrincipal.classList.add("negative-change");
            } else if (value.eur_24h_change > 0) {
                divPrincipal.classList.add("positive-change");
            }

            const inputInicial = document.createElement('input');
            inputInicial.type = 'number';
            inputInicial.valueMin = 1;
            inputInicial.value = 1;

            const inputConvertido = document.createElement('input');
            inputConvertido.type = 'text';
            inputConvertido.disabled = true;
            inputConvertido.value = value.eur + "€";

            inputInicial.addEventListener('change', () => {
                let v = parseInt(inputInicial.value);
                if (v < 1) inputInicial.value = 1;
                inputConvertido.value = inputInicial.value * value.eur + "€";
            });

            const inputDivs = document.createElement('div');
            inputDivs.appendChild(inputInicial);
            inputDivs.appendChild(inputConvertido);
            inputDivs.className = "div-inputs";
            divMoeda.appendChild(inputDivs);

            divMoeda.appendChild(divPrincipal);
            divMoeda.className = "div-content";
            cnt.appendChild(divMoeda);
        }
    } else {
        console.error("Erro ao carregar dados da API:", xhr.status, xhr.statusText);
    }
};

xhr.onerror = function () {
    console.error("Erro na requisição:", xhr.statusText);
};

xhr.send();

const cnt = document.querySelector('.Moeda');

function fetchCoinData(coinId, callback) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=30&interval=daily`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API");
            }
            return response.json();
        })
        .then(data => {
            const prices = data.prices.map(price => price[1]);
            callback(prices, coinId);
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
}

function createChart(prices, coinId) {
    const ctx = document.getElementById(`${coinId}Chart`).getContext('2d');
    const labels = prices.map((_, index) => `Day ${index + 1}`);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Variação dos valores do ${coinId}`,
                data: prices,
                borderColor: '#36a2eb',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value.toFixed(2) + '€';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y || 0;
                            return label + ': ' + value.toFixed(2) + '€';
                        }
                    }
                }
            }
        }
    });
}
