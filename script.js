document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-livro');
    const listaLivros = document.getElementById('lista-livros');
    const filtro = document.getElementById('filtro');

    // Função para carregar os livros do localStorage
    function carregarLivrosDoLocalStorage() {
        const livrosSalvos = localStorage.getItem('livros');
        if (livrosSalvos) {
            return JSON.parse(livrosSalvos);
        }
        return []; // Retorna uma lista vazia se não houver livros salvos
    }

    // Função para salvar a lista de livros no localStorage
    function salvarLivrosNoLocalStorage() {
        localStorage.setItem('livros', JSON.stringify(livrosAtuais));
    }

    // Inicializa a lista de livros com os livros carregados do localStorage
    let livrosAtuais = carregarLivrosDoLocalStorage();

    // Função para verificar e adicionar livros iniciais somente se eles não estiverem no localStorage
    function adicionarLivrosIniciais() {
        livrosIniciais.forEach(function(livroInicial) {
            const livroJaExiste = livrosAtuais.some(livro => livro.titulo === livroInicial.titulo);
            if (!livroJaExiste) {
                livrosAtuais.push(livroInicial);
            }
        });
        salvarLivrosNoLocalStorage(); // Salva os livros atualizados no localStorage
    }

    // Adicionar os livros iniciais (apenas se não já existirem no localStorage)
    adicionarLivrosIniciais();

    // Função para carregar os livros na lista visual
    function carregarLivrosNaLista() {
        listaLivros.innerHTML = ''; // Limpar a lista atual
        livrosAtuais.forEach(function(livro) {
            adicionarLivroNaLista(livro.titulo, livro.autor, livro.ano, livro.nota, livro.imagem);
        });
    }

    // Função para adicionar o livro na lista visual
    function adicionarLivroNaLista(titulo, autor, ano, nota = 0, imagem = '') {
        const livroItem = document.createElement('li');
        livroItem.innerHTML = `
            <img src="${imagem}" alt="Capa do livro ${titulo}" style="width: 50px; margin-right: 10px;">
            <span>${titulo} por ${autor} (${ano})</span>
            <button class="remover-livro">Remover</button>
            <label>Nota: </label>
            <input type="number" class="classificacao" min="1" max="5" step="1" value="${nota}">
        `;
        listaLivros.appendChild(livroItem);
    }

    // Carregar os livros ao iniciar a página
    carregarLivrosNaLista();

  // Função para mostrar mensagens de feedback
function mostrarFeedback(mensagem) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = mensagem;
    setTimeout(() => {
        feedback.textContent = ''; // Limpa a mensagem após 3 segundos
    }, 3000);
}

// Função de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const ano = document.getElementById('ano').value.trim();

    if (titulo === '' || autor === '' || ano === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novoLivro = {
        titulo: titulo,
        autor: autor,
        ano: ano,
        nota: 0,
        imagem: ''
    };

    adicionarLivroNaLista(novoLivro.titulo, novoLivro.autor, novoLivro.ano, novoLivro.nota, novoLivro.imagem);
    livrosAtuais.push(novoLivro);
    salvarLivrosNoLocalStorage();

    // Mostrar feedback
    mostrarFeedback('Livro adicionado com sucesso!');

    form.reset();
});

// Remover livros da lista
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remover-livro')) {
        const livroItem = event.target.parentElement;
        listaLivros.removeChild(livroItem);

        const tituloRemovido = livroItem.querySelector('span').textContent.split(' por ')[0];
        livrosAtuais = livrosAtuais.filter(livro => livro.titulo !== tituloRemovido);
        salvarLivrosNoLocalStorage();

        // Mostrar feedback
        mostrarFeedback('Livro removido com sucesso!');
    }
});


    // Filtro de livros
    filtro.addEventListener('input', function() {
        const termo = filtro.value.toLowerCase();
        const livros = document.querySelectorAll('#lista-livros li');
        
        livros.forEach(function(livro) {
            const texto = livro.textContent.toLowerCase();
            if (texto.includes(termo)) {
                livro.style.display = '';
            } else {
                livro.style.display = 'none';
            }
        });
    });
});

// Função para limpar a lista de livros
function limparLivros() {
    localStorage.removeItem('livros'); // Remove os livros do localStorage
    livrosAtuais = []; // Limpa a lista de livros atuais
    carregarLivrosNaLista(); // Atualiza a lista visual
}

// Adiciona o evento ao botão de limpar livros
document.getElementById('limpar-livros').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja limpar a lista de livros?')) {
        limparLivros(); // Chama a função para limpar livros
    }
});

//localStorage.clear();
