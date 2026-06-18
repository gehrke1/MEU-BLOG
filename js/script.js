document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("tema");
    if (savedTheme !== "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";

            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("tema", "light");
                themeToggle.textContent = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("tema", "dark");
                themeToggle.textContent = "☀️";
            }
        });
    }

    const fontIncrease = document.getElementById("font-increase");
    const fontDecrease = document.getElementById("font-decrease");

    const TAMANHO_MIN = 85;
    const TAMANHO_MAX = 140;
    const PASSO = 10;

    let tamanhoFonte = parseInt(localStorage.getItem("tamanhoFonte")) || 100;
    aplicarTamanhoFonte();

    function aplicarTamanhoFonte() {
        document.documentElement.style.fontSize = tamanhoFonte + "%";
        localStorage.setItem("tamanhoFonte", tamanhoFonte);
    }

    if (fontIncrease) {
        fontIncrease.addEventListener("click", function () {
            if (tamanhoFonte < TAMANHO_MAX) {
                tamanhoFonte += PASSO;
                aplicarTamanhoFonte();
            }
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener("click", function () {
            if (tamanhoFonte > TAMANHO_MIN) {
                tamanhoFonte -= PASSO;
                aplicarTamanhoFonte();
            }
        });
    }

    const form = document.getElementById("contact-form");

    if (form) {
        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");
        const sucesso = document.getElementById("form-success");

        form.addEventListener("submit", function (evento) {
            evento.preventDefault();
            let valido = true;

            limparErro(nome);
            limparErro(email);
            limparErro(mensagem);
            if (sucesso) sucesso.style.display = "none";

            if (nome.value.trim().length < 3) {
                mostrarErro(nome, "Digite seu nome (mínimo 3 letras).");
                valido = false;
            }

            const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!padraoEmail.test(email.value.trim())) {
                mostrarErro(email, "Digite um e-mail válido.");
                valido = false;
            }

            if (mensagem.value.trim().length < 10) {
                mostrarErro(mensagem, "A mensagem deve ter pelo menos 10 caracteres.");
                valido = false;
            }

            if (valido) {
                form.reset();
                if (sucesso) sucesso.style.display = "block";
            }
        });
    }

    function mostrarErro(campo, texto) {
        campo.classList.add("invalid");
        const span = campo.parentElement.querySelector(".error-message");
        if (span) span.textContent = texto;
    }

    function limparErro(campo) {
        campo.classList.remove("invalid");
        const span = campo.parentElement.querySelector(".error-message");
        if (span) span.textContent = "";
    }

});
