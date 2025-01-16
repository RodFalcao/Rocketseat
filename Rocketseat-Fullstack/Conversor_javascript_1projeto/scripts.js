//Constante de obtenção de elementos.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency =document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById ("description")

//constantes das moedas
const USD = 6.05
const EUR = 6.23
const GDP = 7.40

//Func para conversao na decrição.

function convertCurrency (amount, price, symbol)  {
    try {

        description.textContent = `${symbol} 1 = ${price} `
        //Mostra o o valor de brl para a moeda selecionada.
          footer.classList.add("show-result")

          let total = amount * price
          
        //Exibir o resultado da conversão sendo utilizado interpolaçao.
        result.textContent = `${total} Reais`

        if(isNaN(total)) {
            return alert("por favor digite o valor corretamente!")
        }

    }
    catch (error) {
        footer.classList.remove ("show-result")
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}
//formata a moeda em brl (reais brasileiros)
function formatCurrencyBRL(value) {
    //Converte para utilizar o toLocaleString para formatar no padrão BRL.
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
}


//Check para saber se ha ou nao characters que nao sao numericos.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
  })

//Captura o evento submit do formulario.
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break

        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break

        case "GDP":
            convertCurrency(amount.value, GDP, "£" )
            break
        
    }


}