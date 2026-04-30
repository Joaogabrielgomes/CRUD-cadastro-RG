function cadastrarPessoa() {
    const nome      = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email     = document.getElementById('email').value.trim();
    const idade     = document.getElementById('idade').value.trim();
    const telefone  = document.getElementById('telefone').value.trim();
    const rg        = document.getElementById('rg').value.trim();
    const rua       = document.getElementById('rua').value.trim();
    const bairro    = document.getElementById('bairro').value.trim();
    const cidade    = document.getElementById('cidade').value.trim();
    const estado    = document.getElementById('estado').value.trim();

    if (!nome || !sobrenome || !email || !rg) {
        mostrarAlerta('Preencha ao menos Nome, Sobrenome, E-mail e RG.', 'erro');
        return;
    }

    fetch('/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, email, idade, telefone, rg, rua, bairro, cidade, estado })
    })
    .then(response => response.json())
    .then(data => {
        mostrarAlerta(`✅ Pessoa cadastrada com sucesso! ID: ${data.id}`, 'sucesso');
        limparFormulario();
    })
    .catch(() => mostrarAlerta('❌ Erro ao cadastrar. Verifique o servidor.', 'erro'));
}

function limparFormulario() {
    ['nome','sobrenome','email','idade','telefone','rg','rua','bairro','cidade','estado']
        .forEach(id => document.getElementById(id).value = '');
}

function mostrarAlerta(mensagem, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensagem;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 4000);
}
