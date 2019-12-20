import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/',async (req,res)=>{
    let resultado = [];
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query("select codigo, descricao from ATIVOS");
    for(let row of queryResult.rows){
        resultado.push({
            codigo: row.codigo,
            descricao: row.descricao,
        });    
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});

router.post('/',async (req,res)=>{
    const client = criaClient();
    let payload = req.body;
    let sql = `insert into ativos(codigo,descricao) values
    ('${payload.codigo}', '${payload.descricao}')`;
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
    let sql = `update ativos set 
    descricao = '${payload.descricao}'
    where codigo = '${codigo}' `;
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