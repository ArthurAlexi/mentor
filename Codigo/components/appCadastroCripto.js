function exibeCriptos() {
    // Remove todas as linhas do corpo da tabela
    $("#table-criptos").html("");

    // Popula a tabela com os registros do banco de dados
    for (i = 0; i < db.cripto.length; i++) {
        let cripto = db.cripto[i];    
        $("#table-criptos").append(`<tr><td scope="row">${cripto.id}</td>
                                        <td>${cripto.nome}</td>
                                        <td>${cripto.valor}</td>
                                        <td>${cripto.moeda}</td>
                                        <td>${cripto.data}</td>
                                        <td>${cripto.exchange}</td>
                                    </tr>`);
    }
}

function init() {
    // Adiciona funções para tratar os eventos 
    $("#btnInsert").click(function () {
        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-cripto')[0].checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = $("#inputNome").val();
        let campoValor = $("#inputValor").val();
        let campoCambio = document.getElementById('cambio').value;
        let campoData = $('#inputData').val();
        let campoExchange = $("#inputExchange").val();
        let cripto = { nome: campoNome, 
            valor: campoValor,
            moeda: campoCambio, 
            data: campoData, 
            exchange: campoExchange };

        insertCripto(cripto);

        // Reexibe os criptos
        exibeCriptos();

        // Limpa o formulario
        $("#form-cripto")[0].reset();
    });

    // Intercepta o click do botão Alterar
    $("#btnUpdate").click(function () {
        // Obtem os valores dos campos do formulário
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione uma criptomoeda para ser alterado.");
            return;
        }

        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-cripto')[0].checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        let campoNome = $("#inputNome").val();
        let campoValor = $("#inputValor").val();
        let campoCambio = document.getElementById('cambio').value;
        let campoData = $("#inputData").val();
        let campoExchange = $("#inputExchange").val();
        let cripto = { nome: campoNome, 
            valor: campoValor,
            moeda: campoCambio, 
            data: campoData, 
            exchange: campoExchange };

        updateCripto(parseInt(campoId), cripto);

        // Reexibe os criptos
        exibeCriptos();

        // Limpa o formulario
        $("#form-cripto")[0].reset();
    });

    // Intercepta o click do botão Excluir
    $("#btnDelete").click(function () {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            displayMessage("Selecione uma criptomoeda a ser excluído.");
            return;
        }
        deleteCripto(parseInt(campoId));

        // Reexibe os criptos
        exibeCriptos();

        // Limpa o formulario
        $("#form-cripto")[0].reset();
    });

    // Intercepta o click do botão Listar Criptos
    $("#btnClear").click(function () {
        $("#form-cripto")[0].reset();
    });

    // Oculta a mensagem de aviso após alguns segundos
    $('#msg').bind("DOMSubtreeModified", function () {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);
    });

    // Preenche o formulário quando o usuario clicar em uma linha da tabela 
    $("#grid-criptos").on("click", "tr", function (e) {
        let linhaCripto = this;
        colunas = linhaCripto.querySelectorAll("td");

        $("#inputId").val(colunas[0].innerText);
        $("#inputNome").val(colunas[1].innerText);
        $("#inputValor").val(colunas[2].innerText);
        
        $("#inputData").val(colunas[4].innerText);
        $("#inputExchange").val(colunas[5].innerText);
    });

    exibeCriptos();
}