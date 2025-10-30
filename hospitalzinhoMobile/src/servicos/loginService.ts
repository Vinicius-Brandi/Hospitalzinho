type LoginParams = {
  email: string;
  senha: string;
};

const fakeUser = {
  id: '1',
  nome: 'Usuário de Teste',
  email: 'teste@exemplo.com',
};

const loginService = {
  login: async ({email, senha}: LoginParams) => {
    // Simula uma chamada de rede curta
    await new Promise(resolve => setTimeout(resolve, 700));

    // Lógica stub simples: aceita qualquer senha com mínimo de 3 caracteres
    if (email === fakeUser.email && senha.length >= 3) {
      return {success: true, user: fakeUser};
    }

    return {success: false, message: 'E-mail ou senha inválidos'};
  },
};

export default loginService;
