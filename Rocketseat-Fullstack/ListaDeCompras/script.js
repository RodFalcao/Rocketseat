// Referência aos elementos do DOM
const itemInput = document.getElementById("nameItem");
const list = document.getElementById("list");
const footer = document.querySelector("footer");
document.querySelector("button[type='button']").addEventListener("click", AddItem);

function AddItem(event) {
  event.preventDefault();

  // Obtém o valor do input e remove espaços extras
  const itemText = itemInput.value.trim();

  // Verifica se há texto no input
  if (itemText) {
    // Limpa o input
    itemInput.value = "";

    // Cria um novo <li> ou seja o novo container do item da lista
    const listItem = document.createElement("li");
    listItem.classList.add("item");

    // Cria um contêiner para o texto e o checkbox cria uma div que contem a checkbox e o nome
    const containerListItem = document.createElement("div");
    containerListItem.classList.add("flex", "items-center");

    // Adiciona uma checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    containerListItem.appendChild(checkbox);

    // Adiciona o nome do item como um <p>
    const nomeDoItem = document.createElement("p");
    nomeDoItem.innerText = itemText;
    containerListItem.appendChild(nomeDoItem);

    // Adiciona o contêiner ao <li>
    listItem.appendChild(containerListItem);

    // Cria o botão de remover
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("item-lista-button");

    // Adiciona o ícone de lixeira ao botão
    const btnImage = document.createElement("img");
    btnImage.src = "assets/icons/Frame.svg";
    btnImage.alt = "Remover";
    btnRemove.appendChild(btnImage);

    // Adiciona funcionalidade ao botão de remover
    btnRemove.addEventListener("click", () => {
      listItem.remove();
    });

    // Adiciona o botão de remover ao <li> (fora do container de texto e checkbox)
    listItem.appendChild(btnRemove);

    // Adiciona o <li> à lista
    list.appendChild(listItem);
  } else {
    alert("Por favor, insira o nome do item.");
  }
}

function RemoveItem(event) { //Essa funcao tem como finalidade remover determinado item da lista 
  // Obtém o botão clicado (ou seja apos a criaçao do botao ou nao ele seleciona esse botao)
  const button = event.target.closest("button");

  // Localiza o elemento <li> do botão
  const listItem = button.closest("li");

  // Remove o item da lista
  if (listItem) {
    listItem.remove();
    footer.classList.remove ("show-result")
  }
}