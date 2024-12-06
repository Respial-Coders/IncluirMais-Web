
import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function POST(request){
  try {
    const { nome, matricula, turma, descricao, data_nasc } = await request.json()
    const client = await pool.connect()
    const result = await client.query(
      'INSERT INTO apoiador (nome, matricula, turma, descricao, data_nasc) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, matricula, turma, descricao, data_nasc]
    )
    client.release()
    return NextResponse.json(result.rows[1], { status: 201 })
  } catch (error) {
    console.error('Error adding aluno:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}