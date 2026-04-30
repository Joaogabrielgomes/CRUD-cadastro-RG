function carregarPessoas() {
    const tabela = document.getElementById('tabela-corpo');
    tabela.innerHTML = '<tr><td colspan="11" class="td-vazio">Carregando...</td></tr>';

    fetch('/pessoas')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                tabela.innerHTML = '<tr><td colspan="11" class="td-vazio">Nenhum registro encontrado.</td></tr>';
                document.getElementById('total').textContent = '';
                return;
            }

            tabela.innerHTML = '';
            data.forEach(p => {
                tabela.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nome || '—'}</td>
                        <td>${p.sobrenome || '—'}</td>
                        <td>${p.email || '—'}</td>
                        <td>${p.idade || '—'}</td>
                        <td>${p.telefone || '—'}</td>
                        <td>${p.rg || '—'}</td>
                        <td>${p.rua || '—'}</td>
                        <td>${p.bairro || '—'}</td>
                        <td>${p.cidade || '—'}</td>
                        <td>${p.estado || '—'}</td>
                    </tr>`;
            });

            document.getElementById('total').textContent = `Total de registros: ${data.length}`;
        })
        .catch(() => {
            tabela.innerHTML = '<tr><td colspan="11" class="td-vazio" style="color:red">Erro ao carregar dados.</td></tr>';
        });
}

carregarPessoas();
