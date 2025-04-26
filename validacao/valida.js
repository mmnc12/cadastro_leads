const validaNone = (nome) => {
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;


  const isValid = nome.length >= 2 && regexNome.test(nome);
  return isValid;
}

const validaEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValid = regexEmail.test(email);
  return isValid;
}

export const validaUsuario = (nome, email) => {
  const nomeValido = validaNone(nome);
  const emailValido = validaEmail(email);

  const usuarioValido = nomeValido && emailValido;

  if (usuarioValido) {
    return { status: true, mensagem: '' };
  } else {
    return { status: false, mensagem: 'Nome ou email inválido'};
  }
}
