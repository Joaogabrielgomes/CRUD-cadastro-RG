function buscarPessoa() {
    const rg = document.getElementById('rgBusca').value.trim();

    if (!rg) {
        mostrarAlerta('Digite o RG para buscar.', 'erro');
        return;
    }

    fetch('/pessoas')
        .then(response => response.json())
        .then(data => {
            const pessoa = data.find(p => p.rg === rg);

            if (!pessoa) {
                mostrarAlerta('❌ Nenhuma pessoa encontrada com esse RG.', 'erro');
                return;
            }

            document.getElementById('idOculto').value           = pessoa.id;
            document.getElementById('rgAtualizar').value        = pessoa.rg        || '';
            document.getElementById('nomeAtualizar').value      = pessoa.nome      || '';
            document.getElementById('sobrenomeAtualizar').value = pessoa.sobrenome || '';
            document.getElementById('emailAtualizar').value     = pessoa.email     || '';
            document.getElementById('idadeAtualizar').value     = pessoa.idade     || '';
            document.getElementById('telefoneAtualizar').value  = pessoa.telefone  || '';
            document.getElementById('ruaAtualizar').value       = pessoa.rua       || '';
            document.getElementById('bairroAtualizar').value    = pessoa.bairro    || '';
            document.getElementById('cidadeAtualizar').value    = pessoa.cidade    || '';
            document.getElementById('estadoAtualizar').value    = pessoa.estado    || '';

            mostrarAlerta(`✅ Pessoa encontrada: ${pessoa.nome} ${pessoa.sobrenome}. Edite e clique em Atualizar.`, 'info');
        })
        .catch(() => mostrarAlerta('❌ Erro ao buscar. Verifique o servidor.', 'erro'));
}

function atualizarPessoa() {
    const id = document.getElementById('idOculto').value;

    if (!id) {
        mostrarAlerta('Busque uma pessoa pelo RG antes de atualizar.', 'erro');
        return;
    }

    const dados = {
        nome:      document.getElementById('nomeAtualizar').value.trim(),
        sobrenome: document.getElementById('sobrenomeAtualizar').value.trim(),
        email:     document.getElementById('emailAtualizar').value.trim(),
        idade:     document.getElementById('idadeAtualizar').value.trim(),
        telefone:  document.getElementById('telefoneAtualizar').value.trim(),
        rg:        document.getElementById('rgAtualizar').value.trim(),
        rua:       document.getElementById('ruaAtualizar').value.trim(),
        bairro:    document.getElementById('bairroAtualizar').value.trim(),
        cidade:    document.getElementById('cidadeAtualizar').value.trim(),
        estado:    document.getElementById('estadoAtualizar').value.trim()
    };

    fetch(`/pessoas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        mostrarAlerta(`✅ Registro ID ${data.id} atualizado com sucesso!`, 'sucesso');
        limparFormulario();
    })
    .catch(() => mostrarAlerta('❌ Erro ao atualizar. Verifique o servidor.', 'erro'));
}

function limparFormulario() {
    ['rgBusca','idOculto','rgAtualizar','nomeAtualizar','sobrenomeAtualizar',
     'emailAtualizar','idadeAtualizar','telefoneAtualizar',
     'ruaAtualizar','bairroAtualizar','cidadeAtualizar','estadoAtualizar']
        .forEach(id => document.getElementById(id).value = '');
}

function mostrarAlerta(mensagem, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensagem;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 5000);
}
