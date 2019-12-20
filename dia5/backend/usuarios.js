import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/',async (req,res)=>{
    let resultado = [];
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query("select CODIGO,NOME,TELEFONE,EMAIL,SALDO_CREDITOS from USUARIOS");
    for(let row of queryResult.rows){
        resultado.push({
            codigo: row.codigo,
            nome: row.nome,
            telefone: row.telefone,
            email: row.email,
            saldoCreditos: row.saldo_creditos
        });    
    }
    await client.end();

    res.send(JSON.stringify({resultado}));
});
router.post('/',async (req,res)=>{
    const client = criaClient();
    let payload = req.body;
    let sql = `insert into usuarios(codigo,nome,telefone,email,saldo_creditos) values
    (nextval('usuários_sequence'),'${payload.nome}', '${payload.telefone}', '${payload.email}', ${payload.saldoCreditos})`;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo', async (req,res)=>{
    const client = criaClient();
    let codigo = req.params.codigo;
    let payload = req.body;
    let sql = `update usuarios set 
    nome = '${payload.nome}',
    telefone = '${payload.telefone}' ,
    email = '${payload.email}',
    saldo_creditos = ${payload.saldoCreditos}
    where codigo = ${codigo} `;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

router.delete('/:codigo', async (req,res) =>{
    const client = criaClient();
    let codigo = req.params.codigo;
    let sql = `delete from usuarios where codigo=${codigo}`;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

function criaClient(){
    return new Client({
        user: 'dia3',
        host: 'localhost',
        database: 'db_dia3',
        password: '123',
        port: 5432
    });
}

export default router;