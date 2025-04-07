//Selecionar os elementos do formulário
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const form = document.querySelector('form');

//seleciona os elementos da lista
const expenseList = document.querySelector('ul');
//posso usar o queryselector para navegar entre os elementos do html e pegar o que eu quero

//captura o elemento do total de gastos
const expenseQuantity = document.querySelector('aside header p span');
const expenseTotal = document.querySelector('aside header h2 ');

//Validar os elementos de amount
//O elemento oninput captura a aentrada de dados no inputt de amount
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    //transformar o valor em centavos para que a formatação seja feita corretamente	
    value = parseInt(value, 10); // Converte o valor para um inteiro
    //recebe  o valor do input e remove todos os caracteres que não são números

    amount.value = formatCurrencyBRL(value / 100); // Formata o valor com a função de moeda
    //value / value / 100 = value em centavos divide o valor do imput value por 100 para que o valor seja em centavos

    //O valor do input é substituído pelo valor sem caracteres não numéricos
}

//funcao de formataçao para moeda BRL
function formatCurrencyBRL(value) {
    //formata com base em uma localidade no caso a ptbr 
    // na area de style e adicionado o estilo de moeda e a moeda em si com currency. currency e brl (reais brasileiros)
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //retorna o valor formatado
    return value;
}
//captura o evento de submit
form.onsubmit = (event) => {
    //previne reload na pagina
    event.preventDefault();

    //objeto 
    const newExpense = {
        
        //criar um id para novo gasto
        Id: new Date().getTime(),
        //propriedade gasto
        expense: expense.value,

        //id de categoria
        categoryId: category.value,
        //texto da categoria
        categoryName: category.options[category.selectedIndex].text,

        amount: amount.value,

        create_at: new Date().toISOString(),
    }
    //chama a funcao criada para adicionar novo item a lista
    expenseAdd(newExpense);

}
//adiciona o novo gasto na (lista)
function expenseAdd(newExpense) {
    try {
         // Cria o elemento para ser adicionado à lista
         const expenseItem = document.createElement('li');
         expenseItem.classList.add('expense');
 
         // Cria o ícone do item
         const expenseIcon = document.createElement('img');
         //ao criar esse atributo ele seta a src da imagem sendo ela img/${newExpense.categoryId}.svg
         //e o alt da imagem sendo o nome da categoria que e extraido do formulario 
         expenseIcon.setAttribute('src', `img/${newExpense.categoryId}.svg`);
         expenseIcon.setAttribute('alt', newExpense.category_name); // Corrige o valor do 'alt'

         //cria o conteiner de informacao da despesa
         const expenseInfo = document.createElement('div');
         //classe pre criada adicionada a divv
         expenseInfo.classList.add('expense-info');
         
         //cria o nome das despesas
            const expenseName = document.createElement('strong');
            //adiciona o nome da despesa ao elemento strong apartir do que for enviado de imput do formulario
            //eça pega e passa o noome da despesa para o strong ou seja ela pega diretamentte do formulario o valor do input e coloca dentro do strong utilizando o newExpense.expense
            expenseName.textContent = newExpense.expense;

        //criando o icone para remover o gasto
        const removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        //src da imagem do botao de removver
        removeIcon.setAttribute('src', 'img/remove.svg');    
        removeIcon.setAttribute('alt', 'Remover gasto');


        //cria o valor da despesa
        const expenseAmount = document.createElement('span');
        //adiciona a classe no span que contem o  simbolo R$ do valor da despesa
        expenseAmount.classList.add('expense-amount');

        //cria a categoria small e adiciona o R$ dentro dela
        //innerhtml serve para escrever como o codigo html em si facilitando a sua adicao para evitar codigo descnescesario nesse caso 
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`;



        //cria o span que contem o nome da categoria
        const expenseCategory = document.createElement('span');
        //pega o nome do gasto do form e apartir disso o adiciona no span (dentro da categoria o conteudo de texto e = a newExpense.categoryName)
        //ou seja o valor do input do formulario e adicionado ao span
        expenseCategory.textContent = newExpense.categoryName; // Corrige o valor do 'categoryName'

        //adiciona nome e categoria na divv expense-info
        expenseInfo.append(expenseName, expenseCategory);
         
        //adiciona as informacoes do item uma dentro da outra o icone as informacoes e o total sendo estilizado pelo css
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        //adiciona o item na lista
        expenseList.append(expenseItem);

        //limpa o formulario 
        formClear();

        updateTotals(); // Atualiza os totais após adicionar o novo gasto

    }
    catch (error) {
        console.error('Erro ao adicionar um gasto:', error);
    }
}
//funcao que remove o gasto
expenseList.addEventListener("click", function (event) {
    
    if (event.target.classList.contains("remove-icon")) {
        //pegar o item inteiro para remover
        const item = event.target.closest(".expense");
        item.remove(); // Remove o item da lista

        
        // Remove o item da lista
        item.remove()

    }
})
//caucula o total de gastos
function updateTotals() {
    try {
        const items = expenseList.children;

        //atualiza a quantidade de items na lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`
        //ele detecta se ha mais de um item (se houver atualiza o total de gastos)

        let total = 0;

        // Percorre cada item (li) da lista (ul)
        for (let item = 0; item < items.length; item++) {
                //remove caracteres naoo numericos e subistitui virgula por ponto para caucular
                const itemAmount = items[item].querySelector(".expense-amount")

                let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
    
                value = parseFloat(value)// Converte o valor para um número de ponto flutuante
                //verifica se esse valor e validoo
                if (isNaN(value)) {
                  return alert('Valor inválido encontrado.'); // Exibe um alerta para o usuário
                }
                //caculo de valor total
                total += Number(value); // Adiciona o valor ao total
        }
        //cria o small para o total
        const symbolBRl = document.createElement('small');
        symbolBRl.textContent = 'R$';

        expenseTotal.textContent = formatCurrencyBRL(total).toUpperCase().replace('R$', ''); 
        // Formata o total como moeda BRL (na aula foi ensinado o motivo de criar essas funcoes separadamente no casoo aqui para facilitar e poder ser puxado mais vezes)

        expenseTotal.prepend(symbolBRl); // Adiciona o símbolo "R$" antes do valor total
    }
    catch (error) {
        console.error('Erro ao atualizar o total de gastos:', error);
        alert('Erro ao atualizar o total de gastos.'); // Exibe um alerta para o usuário
    }   
}
//limpar formulario
function formClear(){
    //limpa o imput de amount
    expense.value = '';
    category.value = '0';   
    amount.value = '';

    expense.focus(); // Coloca o foco no campo de despesa após limpar o formulário
}