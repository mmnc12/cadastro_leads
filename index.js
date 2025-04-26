import express from 'express';
import cors from 'cors';
import pool from './servicos/conexao.js';
import { cadastraLeads } from './servicos/cadastro_servico.js';
import { validaUsuario } from './validacao/valida.js';
import { listaServico } from './servicos/lista_servico.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/usuarios', async (req, res) => {
  const listar = await listaServico();
  res.json(listar);
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