document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-livro');
    const listaLivros = document.getElementById('lista-livros');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const ano = document.getElementById('ano').value.trim();
    
        // Verificação se os campos estão preenchidos
        if (titulo === '' || autor === '' || ano === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        const livroItem = document.createElement('li');
        livroItem.innerHTML = `
            ${titulo} por ${autor} (${ano})
            <button class="remover-livro">Remover</button>
            <span class="classificacao"></span>
        `;
    
        listaLivros.appendChild(livroItem);
        form.reset(); // Reseta o formulário
    });
})