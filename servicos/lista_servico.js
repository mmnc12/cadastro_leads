import pool from "./conexao.js"

export const listaServico = async () => {
  const conexao = await pool.getConnection();

  const resultado_qury = await conexao.query("SELECT nome, email from leads");

  const listar = resultado_qury[0];

  conexao.release();

  return listar;
}