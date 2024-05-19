// Get ApiKey
const apiKey = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Ctron%2Ctether%2Ckucoin-shares%2Cpepe%2Cdai%2Csei-network%2Ctezos%2Cretardio%2Cgigachad-2%2Cpedro-the-raccoon&vs_currencies=eur&include_24hr_change=true";

let xhr = new XMLHttpRequest();
xhr.open("GET", apiKey);
xhr.responseType = 'json';
xhr.onload = function () {

    const result = this.response;
    for (const item in result) {
        const divMoeda = document.createElement('div');
        const value = result[item];
        const divPrincipal = document.createElement('div');

        // Criar elementos separados para cada parte do texto
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

        // Definir valores para o nome da moeda, valor em euros e alteração em euros
        NomeMoeda.textContent = item;
        ValorEuro.textContent = value.eur;
        EuroChange.textContent = value.eur_24h_change;

        // Criar e definir propriedades para a imagem do logótipo da moeda
        const logoDiv = document.createElement('div');
        logoDiv.className = 'coin-logo';
        const logoImg = document.createElement('img');
        logoImg.src = `imagensdasmoedas/${item}.png`;
        logoImg.style.width = '30px';
        logoImg.style.height = '30px';
        logoDiv.appendChild(logoImg);

        

        // Add a class to all other coins when one is clicked
        divPrincipal.addEventListener('click', function () {
    let additionalInfo = divPrincipal.nextElementSibling;
    const allCoins = document.querySelectorAll('.div-content');
    const currentIndex = Array.from(allCoins).indexOf(divMoeda);
    
    if (additionalInfo && additionalInfo.classList.contains('additional-info')) {
        // Toggle visibility
        additionalInfo.classList.toggle('hidden');
        // Toggle the pushed class for coins below
        for (let i = currentIndex + 1; i < allCoins.length; i++) {
            allCoins[i].classList.toggle('pushed');
        }
    } else {
        // Create and append additional information div
        additionalInfo = document.createElement('div');
        additionalInfo.className = 'additional-info';

        const infoTitler = document.createElement('p');
        infoTitler.textContent = `${item}`;
        additionalInfo.appendChild(infoTitler);
        const infoText = document.createElement('p');
        infoText.textContent = `${item}`;
        additionalInfo.appendChild(infoText);


        const graphic = document.createElement('img');
        graphic.src = `graphics/${item}.png`;
        graphic.style.width = '100px';
        graphic.style.height = '100px';
        additionalInfo.appendChild(graphic);

        divMoeda.insertBefore(additionalInfo, divPrincipal.nextSibling);

        for (let i = currentIndex + 1; i < allCoins.length; i++) {
            allCoins[i].classList.add('pushed');
        }
    }
});

        // Anexar elementos aos respetivos contentores pais
        divPrincipal.appendChild(logoDiv);
        divValores.appendChild(ValorEuro);
        divValores.appendChild(EuroChange);
        divPrincipal.appendChild(NomeMoeda);
        divPrincipal.appendChild(Separados);
        divValores.appendChild(ValorEuro);
        divValores.appendChild(EuroChange);
        divPrincipal.appendChild(divValores);

        // Adicionar classes CSS com base na alteração do valor em euros
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
    
    inputInicial.addEventListener('change', ()=>{
      let v = parseInt(inputInicial.value);
      if (v < 1) inputInicial.value = 1;
      inputConvertido.value = inputInicial.value * value.eur + "€";
    });
    const inputDivs = document.createElement('div');
    
    inputDivs.appendChild(inputInicial);
    inputDivs.appendChild(inputConvertido);

    inputDivs.className = "div-inputs"
    divMoeda.appendChild(inputDivs);



        // Anexar o contentor de moeda ao contentor principal
        divMoeda.appendChild(divPrincipal);
        divMoeda.className = "div-content"
        cnt.appendChild(divMoeda);

    };

};

// Enviar o XMLHttpRequest
xhr.send();

// Selecionar o elemento contentor
const cnt = document.querySelector('.Moeda');