document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-livro');
    const listaLivros = document.getElementById('lista-livros');
    const filtro = document.getElementById('filtro');

    // Função para carregar os livros do arquivo de dados.js
    function carregarLivrosIniciais() {
        livrosIniciais.forEach(function(livro) {
            adicionarLivroNaLista(livro.titulo, livro.autor, livro.ano, livro.nota);
        });
    }

    // Função para adicionar o livro na lista visual
    function adicionarLivroNaLista(titulo, autor, ano, nota = 0) {
        const livroItem = document.createElement('li');
        livroItem.innerHTML = `
            ${titulo} por ${autor} (${ano})
            <button class="remover-livro">Remover</button>
            <label>Nota: </label>
            <input type="number" class="classificacao" min="1" max="5" step="1" value="${nota}">
        `;
        listaLivros.appendChild(livroItem);
    }

    // Carregar os livros ao iniciar a página
    carregarLivrosIniciais();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const ano = document.getElementById('ano').value.trim();

        if (titulo === '' || autor === '' || ano === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        adicionarLivroNaLista(titulo, autor, ano);

        // Resetar o formulário
        form.reset();
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remover-livro')) {
            const livroItem = event.target.parentElement;
            listaLivros.removeChild(livroItem);
        }
    });

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
