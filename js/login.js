const formLogin = document.getElementById("login_form")

const formValues = {}


formLogin.addEventListener("submit", (event) =>{
    event.preventDefault();
    resposta = validarCampos();
    if(resposta == "Ok"){
        validarLogin()
    } else {
        alert(resposta)
    }
})

function validarCampos(){
    campoEmail = document.getElementById("email_inp")
    campoSenha = document.getElementById("senha_inp")

    formValues.email = campoEmail.value.trim()
    formValues.senha = campoSenha.value.trim()

    if(
        campoNaoEstaPreenchido(formValues.email) ||
        campoNaoEstaPreenchido(formValues.senha)
    ) return "Preencha todos os campos necessarios"

    return "Ok"
}

function campoNaoEstaPreenchido(dado){
    if(dado == null || dado == NaN || dado == ''){
        return true
    }
    return false
}

function validarLogin(){
    console.log("Tentou validar Login")
    const requestBody = {}
    requestBody.email = formValues.email;
    requestBody.password = formValues.senha;

    fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        mode: "cors"
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        }
        if(response.status = 404){
            alert("Email ou Senha Invalidos")
        }
    })
    .then((data) => {
        if(data){
            alert("Login Realizado com Sucesso")
            window.location.href= 'http://localhost:8080/h2-console'
        }
    })
    .catch(error => console.error("Erro:", error));
}

const imagem = document.getElementById("return_img")

imagem.addEventListener("click", (event) => {
    window.location.href = "../html/index.html"
})