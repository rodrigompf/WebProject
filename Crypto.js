// Get ApiKey
const apiKey = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Ctron%2Ctether%2Ckucoin-shares%2Cpepe%2Cdai%2Csei-network%2Ctezos%2Cretardio%2Cgigachad-2%2Cpedro-the-raccoon&vs_currencies=eur&include_24hr_change=true";

let xhr = new XMLHttpRequest();
xhr.open("GET", apiKey );
xhr.responseType = 'json';
xhr.onload = function() {
   
    // Criar elementos separados para cada parte do texto
    const NomeMoeda = document.createElement('span');
    NomeMoeda.textContent = item;
    NomeMoeda.className = 'currency-name currency-coin';

    const separados = document.createElement('p');
    separados.textContent = "➜";
    separados.className = 'currency-name separator';

    const divValores = document.createElement('div');
    divValores.classList.add('div-values');
    
    const ValorEuro = document.createElement('span');
    ValorEuro.textContent = value.eur;
    ValorEuro.className = 'eur-value';
    
    const EuroChange = document.createElement('span');
    EuroChange.textContent = value.eur_24h_change;
    EuroChange.className = 'eur-change';

};
xhr.send();

const cnt = document.querySelector('.Moeda');