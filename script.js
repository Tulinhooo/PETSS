// ==========================================================
// FRIENDS&MEL - SCRIPT.JS
// ==========================================================


// ==========================================================
// SELECIONA OS ELEMENTOS DO MENU
// ==========================================================

const btnSobre = document.getElementById('btn-sobre');
const menuVerticalSobre = document.getElementById('menu-sobre');

const btnContato = document.getElementById('btn-contato');
const menuVerticalContato = document.getElementById('menu-contato');


// ==========================================================
// ADICIONA OS EVENTOS DOS MENUS
// ==========================================================

// Botão "Sobre"
if (btnSobre && menuVerticalSobre) {

    btnSobre.addEventListener('click', function(event) {

        abreMenu(event, menuVerticalSobre);

    });

}


// Botão "Contato"
if (btnContato && menuVerticalContato) {

    btnContato.addEventListener('click', function(event) {

        abreMenu(event, menuVerticalContato);

    });

}


// ==========================================================
// FUNÇÃO GERAL PARA ABRIR/FECHAR OS MENUS
// ==========================================================

function abreMenu(event, menu) {

    event.preventDefault();

    menu.classList.toggle('active');

}


// ==========================================================
// FECHA O MENU QUANDO CLICAR FORA
// ==========================================================

function fechaMenu(event, menu, btn) {

    if (
        menu &&
        btn &&
        !menu.contains(event.target) &&
        event.target !== btn
    ) {

        menu.classList.remove('active');

    }

}


// ==========================================================
// FECHAR TODOS OS MENUS AO CLICAR FORA
// ==========================================================

document.addEventListener('click', function(event) {

    fechaMenu(
        event,
        menuVerticalSobre,
        btnSobre
    );

    fechaMenu(
        event,
        menuVerticalContato,
        btnContato
    );

});


// ==========================================================
// DATA ATUAL DO FOOTER
// ==========================================================

const dataAtual = document.getElementById('dataAtual');

if (dataAtual) {

    const hoje = new Date();

    dataAtual.textContent =
        hoje.toLocaleDateString('pt-BR');

}


// ==========================================================
// CADASTRO
// ==========================================================

const formularioCadastro =
    document.getElementById('formCadastro');


if (formularioCadastro) {

    formularioCadastro.addEventListener(
        'submit',
        function(event) {

            // Impede o formulário de recarregar a página
            event.preventDefault();


            // Pega os dados do cadastro
            const nome =
                document.getElementById('nome').value.trim();

            const email =
                document.getElementById('emailCadastro').value.trim();

            const senha =
                document.getElementById('senhaCadastro').value;

            const confirmarSenha =
                document.getElementById('confirmarSenha').value;


            const mensagem =
                document.getElementById('cadastroMensagem');


            // Verifica se todos os campos foram preenchidos
            if (
                nome === '' ||
                email === '' ||
                senha === '' ||
                confirmarSenha === ''
            ) {

                mensagem.textContent =
                    'Preencha todos os campos.';

                mensagem.className =
                    'auth-message error';

                return;
            }


            // Verifica tamanho da senha
            if (senha.length < 6) {

                mensagem.textContent =
                    'A senha deve ter pelo menos 6 caracteres.';

                mensagem.className =
                    'auth-message error';

                return;
            }


            // Confirma se as senhas são iguais
            if (senha !== confirmarSenha) {

                mensagem.textContent =
                    'As senhas não são iguais.';

                mensagem.className =
                    'auth-message error';

                return;
            }


            // Cria o objeto do usuário
            const usuario = {

                nome: nome,

                email: email,

                senha: senha

            };


            // Salva o usuário no navegador
            localStorage.setItem(
                'usuarioFriendsMel',
                JSON.stringify(usuario)
            );


            // Remove login antigo, caso exista
            localStorage.removeItem(
                'usuarioLogadoFriendsMel'
            );


            // Mostra mensagem
            mensagem.textContent =
                'Cadastro realizado com sucesso!';


            mensagem.className =
                'auth-message success';


            // Depois do cadastro vai para o LOGIN
            setTimeout(function() {

                window.location.href =
                    'login.html';

            }, 1000);

        }
    );

}


// ==========================================================
// LOGIN
// ==========================================================

const formularioLogin =
    document.getElementById('loginForm');


if (formularioLogin) {

    formularioLogin.addEventListener(
        'submit',
        function(event) {

            // Impede recarregar a página
            event.preventDefault();


            // Pega os dados digitados
            const email =
                document.getElementById('email').value.trim();

            const senha =
                document.getElementById('senha').value;


            const mensagem =
                document.getElementById('loginMensagem');


            // Procura o usuário cadastrado
            const usuarioSalvo =
                localStorage.getItem(
                    'usuarioFriendsMel'
                );


            // Se não existe cadastro
            if (!usuarioSalvo) {

                mensagem.textContent =
                    'Nenhum cadastro encontrado. Faça seu cadastro primeiro.';

                mensagem.className =
                    'auth-message error';

                return;
            }


            // Converte o cadastro salvo para objeto
            const usuario =
                JSON.parse(usuarioSalvo);


            // Confere email e senha
            if (
                email === usuario.email &&
                senha === usuario.senha
            ) {

                // Marca o usuário como logado
                localStorage.setItem(
                    'usuarioLogadoFriendsMel',
                    'true'
                );


                // Mensagem de sucesso
                mensagem.textContent =
                    'Login realizado com sucesso! Entrando no site...';


                mensagem.className =
                    'auth-message success';


                // ==========================================
                // VAI PARA O SITE PRINCIPAL
                // ==========================================

                setTimeout(function() {

                    window.location.href =
                        'site.html';

                }, 1000);


            } else {

                // Login incorreto
                mensagem.textContent =
                    'E-mail ou senha incorretos.';

                mensagem.className =
                    'auth-message error';

            }

        }
    );

}


// ==========================================================
// PROTEÇÃO DO SITE PRINCIPAL
// ==========================================================

// Seu site.html possui:
// <body class="site-principal">

if (
    document.body.classList.contains(
        'site-principal'
    )
) {

    const usuarioLogado =
        localStorage.getItem(
            'usuarioLogadoFriendsMel'
        );


    const usuario =
        localStorage.getItem(
            'usuarioFriendsMel'
        );


    // Se não estiver logado,
    // volta para a página de login
    if (
        usuarioLogado !== 'true' ||
        !usuario
    ) {

        alert(
            'Você precisa fazer login para acessar o site principal.'
        );


        window.location.href =
            'login.html';

    }

}


// ==========================================================
// BOTÃO SAIR
// ==========================================================

function logout() {

    // Remove o estado de login
    localStorage.removeItem(
        'usuarioLogadoFriendsMel'
    );


    // Volta para a página inicial
    window.location.href =
        'index.html';

}