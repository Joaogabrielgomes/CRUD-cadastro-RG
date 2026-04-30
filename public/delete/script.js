let idParaExcluir = null;

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
                document.getElementById('painel-confirmacao').classList.add('oculto');
                return;
            }

            idParaExcluir = pessoa.id;

            document.getElementById('idExibir').value        = pessoa.id;
            document.getElementById('rgExibir').value        = pessoa.rg        || '';
            document.getElementById('nomeExibir').value      = pessoa.nome      || '';
            document.getElementById('sobrenomeExibir').value = pessoa.sobrenome || '';
            document.getElementById('emailExibir').value     = pessoa.email     || '';
            document.getElementById('cidadeExibir').value    = pessoa.cidade    || '';
            document.getElementById('estadoExibir').value    = pessoa.estado    || '';

            document.getElementById('painel-confirmacao').classList.remove('oculto');
            mostrarAlerta('⚠️ Registro encontrado! Confirme a exclusão abaixo.', 'info');
        })
        .catch(() => mostrarAlerta('❌ Erro ao buscar. Verifique o servidor.', 'erro'));
}

function excluirPessoa() {
    if (!idParaExcluir) {
        mostrarAlerta('Nenhum registro selecionado.', 'erro');
        return;
    }

    fetch(`/pessoas/${idParaExcluir}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                mostrarAlerta('✅ Registro excluído com sucesso!', 'sucesso');
                cancelar();
            } else {
                mostrarAlerta('❌ Erro ao excluir o registro.', 'erro');
            }
        })
        .catch(() => mostrarAlerta('❌ Erro de conexão. Verifique o servidor.', 'erro'));
}

function cancelar() {
    idParaExcluir = null;
    document.getElementById('rgBusca').value = '';
    document.getElementById('painel-confirmacao').classList.add('oculto');
}

function mostrarAlerta(mensagem, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensagem;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 5000);
}
