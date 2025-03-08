let pedidos = [];

document.querySelectorAll('.pedir').forEach(botao => {
    botao.addEventListener('click', function() {
        let item = this.parentElement.querySelector('h3').innerText;
        pedidos.push(item);
        alert(`${item} adicionado ao carrinho!`);
    });
});

function mostrarCarrinho() {
    const carrinhoModal = document.getElementById('carrinhoModal');
    carrinhoModal.classList.add('active'); // Exibe o modal

    const lista = document.getElementById('itensEscolhidos');
    lista.innerHTML = pedidos.map(item => `<li>${item}</li>`).join('');
}

function fecharCarrinho() {
    const carrinhoModal = document.getElementById('carrinhoModal');
    carrinhoModal.classList.remove('active'); // Fecha o modal
}

function selecionarPagamento(tipo) {
    const detalhes = document.getElementById('pagamentoDetalhes');
    detalhes.innerHTML = ''; // Limpa os detalhes antes de exibir novos

    switch (tipo) {
        case 'credito':
            detalhes.innerHTML = `
                <div id="credito-form">
                    <input type="text" id="nome-cartao" placeholder="Nome no Cartão" oninput="verificarCamposCredito()"><br>
                    <input type="text" id="numero-cartao" placeholder="Número do Cartão" oninput="verificarCamposCredito()"><br>
                    <input type="text" id="validade-cartao" placeholder="Data de Validade (MM/AA)" oninput="verificarCamposCredito()"><br>
                    <input type="text" id="cvv-cartao" placeholder="CVV" oninput="verificarCamposCredito()"><br>
                    <button id="cadastrar-cartao" onclick="confirmarCartao()" disabled>Cadastrar Cartão</button>
                </div>
            `;
            break;

            case 'pix':
                detalhes.innerHTML = `
                    <div id="pix-form" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
                        <p>Chave Pix: 123e4567-e89b-12d3-a456-426614174000</p>
                        <button onclick="copiarChavePix()">Copiar Chave Pix</button>
                        <img src="assets/qrcode.png" alt="Pagamento Concluído" style="display: block; margin: 0 auto; max-width: 150px; height: auto;">
                    </div>
                `;
                break;
            

        case 'dinheiro':
            detalhes.innerHTML = `
                <p>Pagamento concluído</p>
                <img src="assets/pagamento.png" alt="Pagamento Concluído" class="center">
            `;
            break;

        default:
            detalhes.innerHTML = `<p>Opção de pagamento não válida.</p>`;
            break;
    }
}

function confirmarCartao() {
    alert("Cartão cadastrado com sucesso!");
    fecharCarrinho(); // Fecha o modal após o pagamento
}

function verificarCamposCredito() {
    const nome = document.getElementById('nome-cartao').value;
    const numero = document.getElementById('numero-cartao').value;
    const validade = document.getElementById('validade-cartao').value;
    const cvv = document.getElementById('cvv-cartao').value;
    const botao = document.getElementById('cadastrar-cartao');
    
    if (nome && numero && validade && cvv) {
        botao.disabled = false; // Habilita o botão se todos os campos estiverem preenchidos
    } else {
        botao.disabled = true; // Desabilita o botão caso contrário
    }
}

function copiarChavePix() {
    const chavePix = "123e4567-e89b-12d3-a456-426614174000"; // Chave Pix a ser copiada
    navigator.clipboard.writeText(chavePix).then(() => {
        alert("Chave Pix copiada para a área de transferência!");
    }).catch(err => {
        alert("Erro ao copiar a chave Pix.");
    });
}
