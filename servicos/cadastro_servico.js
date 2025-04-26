import pool from "./conexao.js"

export const cadastraLeads = async (nome, email) => {
  const conexao = await pool.getConnection();

  const resposta = await conexao.query(`INSERT INTO leads(nome, email) VALUES(?, ?)`, [nome, email]);

  conexao.release();
}