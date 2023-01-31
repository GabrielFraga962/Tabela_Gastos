// Função JavaScript que utiliza a biblioteca Fetch para buscar dados de um arquivo JSON chamado "data.json" que está localizado na pasta "data".
fetch("./data/data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    // Pega o dia da semana e remapeia (O primeiro dia é domingo
    // de acordo com JavaScript, não segunda-feira)
    let currentDay = new Date().getDay() - 1;
    if (currentDay < 0) currentDay = 6;

    const highestExpense = jsonData.reduce((prevVal, curVal) => {
      if (prevVal.amount < curVal.amount) {
        prevVal = curVal;
      }
      return prevVal;
    }).amount;

    // Calcula alturas em % da barra mais alta
    // e adiciona valores às caixas no topo das barras
    const heights = [];
    const boxes = document.querySelectorAll("li.dayContainer .chartBarAmount");
    for (let day = 0; day < jsonData.length; day++) {
      const { amount } = jsonData[day];
      const height = Math.round((amount * 100) / highestExpense);
      heights.push(height);

      // Adicionar texto à caixa
      boxes[day].insertAdjacentText("beforeend", `$${amount}`);
    }

    const chartBars = document.querySelectorAll("li.dayContainer .chartBar");

    // A barra mais alta no gráfico terá 9 rem de altura
    for (let i = 0; i < chartBars.length; i++) {
      chartBars[i].style.height = `${(9 * heights[i]) / 100}rem`;
    }
    // Realçar o dia atual em ciano
    chartBars[currentDay].style.backgroundColor = `hsl(186, 34%, 60%)`;

    // Adicionar manipuladores de eventos flutuantes
    const lis = document.querySelectorAll("li.dayContainer");
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const amountDiv = li.querySelector(".chartBarAmount");
      li.addEventListener("mouseenter", (event) => {
        amountDiv.style.visibility = "visible";
      });
      li.addEventListener("mouseleave", (event) => {
        amountDiv.style.visibility = "hidden";
      });
    }
  });
