const fs = require("fs");

const lerArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const cadastroUsuario = (dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[];
  bd.push(dados);
  escreverArquivo(bd);
  return dados;
};

const listarUsuario = (filtro?: string): Usuario[] => {
  const bd = lerArquivo() as Usuario[];

  const usuarios = bd.filter((usuario) => {
    if (filtro) {
      return usuario.profissao === filtro;
    }

    return usuario;
  });

  return usuarios;
};

const detalharUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  return usuario;
};

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  Object.assign(usuario, dados);

  escreverArquivo(bd);

  return dados;
};

const excluirUsuari = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  const exclusao = bd.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivo(exclusao);

  return usuario;
};

// cadastroUsuario({
//   nome: "Van",
//   email: "van@email.com",
//   cpf: "11122233346",
//   profissao: "super adm",
//   endereco: {
//     cep: "41205-200",
//     rua: "Alegria A",
//     bairro: "Centro",
//     cidade: "Salvador",
//   },
// });

const bd = listarUsuario("call");
console.log(bd);
