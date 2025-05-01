import express from 'express';
import cors from 'cors';
import pool from './servicos/conexao.js';
import { cadastraLeads } from './servicos/cadastro_servico.js';
import { validaUsuario } from './validacao/valida.js';
import { listaServico } from './servicos/lista_servico.js';
import { ValidaDadosAutenticacao, validaToken } from './servicos/valida_autenticacao.js';
import { GerarToken } from './servicos/servico_autenticacao.js';


const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  const autenticacaoValida = ValidaDadosAutenticacao(usuario, senha);

  if (!autenticacaoValida) {
    res.status(401).send({ mensagem: 'Usuário não autorizado'});
    return;
  }

  const token = GerarToken();

  res.status(200).send({ token: token })
});

app.get('/usuarios', async (req, res) => {
  // Recebe o token enviado na requisição e usa o split para remover o texto 'Bearer'
  let token;

  if(typeof req.headers.authorization !== 'undefined') {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = -1;
  }

  const tokenValido = validaToken(token);

  if(!tokenValido.status) {
    res.status(tokenValido.codigo).end();
    return;
  }

  const listar = await listaServico();
  
  res.status(tokenValido.codigo).send(listar);
});

app.post('/usuarios', async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;

  const usuarioValido = validaUsuario(nome, email);

  if (usuarioValido.status) {
    await cadastraLeads(nome, email);
    res.status(204).end();
  } else {
    res.status(400).send({ mensagem: usuarioValido.mensagem });
  }
});


app.listen(3001, async () => {
  console.log("Serviço iniciado!");
});