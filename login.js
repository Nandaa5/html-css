document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const usuarioInput = document.getElementById('Usuario').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();

    // Recupera os dados armazenados no LocalStorage
    const storedUsuario = localStorage.getItem('usuario');
    const storedSenha = localStorage.getItem('senha');

    // Verifica as credenciais
    if (usuarioInput === storedUsuario && senhaInput === storedSenha) {
        alert('Login bem-sucedido!');
        window.location.href = 'home2.html'; // Redireciona para a página home
    } else {
        alert('Usuário ou senha incorretos!');
    }
});
localStorage.setItem('usuario', 'meuUsuario');
localStorage.setItem('senha', 'adm');

// Exemplo de como você poderia salvar os dados de cadastro
// Isto deveria ser executado na página de cadastro ao invés de na página de login
// cadastrarUsuario('meuUsuario', 'minhaSenha');
