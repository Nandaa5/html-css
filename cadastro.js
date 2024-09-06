document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const usuario = document.getElementById('usuario').value.trim();
    const dataNascimento = document.getElementById('data-nascimento').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const repitaSenha = document.getElementById('repita-senha').value.trim();

    // Verifica se as senhas são iguais
    if (senha !== repitaSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Armazena os dados no LocalStorage
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('dataNascimento', dataNascimento);
    localStorage.setItem('senha', senha);

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'home2.html'; // Redireciona para a página de login
});
