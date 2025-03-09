const formCadastro = document.getElementById("cadastro_form")

const formValues = {}


formCadastro.addEventListener("submit", (event) =>{
    event.preventDefault();
    resposta = validarCampos();
    if(resposta == "Ok"){
        enviarDados()
    } else {
        alert(resposta)
    }
})

function validarCampos(){
    campoNome = document.getElementById("name_inp")
    campoEmail = document.getElementById("email_inp")
    campoCPF = document.getElementById("cpf_inp")
    campoDataNasc = document.getElementById("data_nasc_inp")
    campoTelefone = document.getElementById("telefone_inp")
    campoSenha = document.getElementById("senha_inp")
    campoConfirmarSenha = document.getElementById("confirm_senha_inp")

    formValues.nome = campoNome.value.trim()
    formValues.email = campoEmail.value.trim()
    formValues.cpf = campoCPF.value.trim()
    formValues.dataNasc = campoDataNasc.value.trim()
    formValues.telefone = campoTelefone.value.trim()
    formValues.senha = campoSenha.value.trim()
    formValues.confirmarSenha = campoConfirmarSenha.value.trim()

    if(
        campoNaoEstaPreenchido(formValues.nome) || campoNaoEstaPreenchido(formValues.email) || 
        campoNaoEstaPreenchido(formValues.telefone) || campoNaoEstaPreenchido(formValues.senha) || 
        campoNaoEstaPreenchido(formValues.confirmarSenha)
    ) return "Preencha todos os campos necessarios"

    if(formValues.senha != formValues.confirmarSenha) return "As senhas não podem ser diferentes"

    return "Ok"
}

function campoNaoEstaPreenchido(dado){
    if(dado == null || dado == NaN || dado == ''){
        return true
    }
    return false
}

function enviarDados(){
    const requestBody = {}
    requestBody.username = formValues.nome;
    requestBody.email = formValues.email;
    requestBody.phone = formValues.telefone;
    requestBody.password = formValues.senha;
    requestBody.roleId = 1;
    requestBody.deleted = false;
    requestBody.createdAt = new Date().toISOString();
    requestBody.modifiedAt = new Date().toISOString();

    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        mode: "cors"
      })
      .then(response => response.json())
      .then((data) => {
        alert("Cadastro Realizado com sucesso")
        window.location.href= '../html/login.html'
      })
      .catch(error => console.error("Erro:", error));
}

const imagem = document.getElementById("logo_img")

imagem.addEventListener("click", (event) => {
    window.location.href = "../html/index.html"
})

const headerBtn = document.getElementById("login_btn")

headerBtn.addEventListener("click", (event) => {
    window.location.href = "../html/login.html"
})