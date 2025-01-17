import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/',async (req,res)=>{
    let resultado = [];
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query("select codigo, ativo from BICICLETAS");
    for(let row of queryResult.rows){
        resultado.push({
            codigo: row.codigo.trim(),
            ativo: row.ativo,
        });    
    }
    await client.end();

    res.send(JSON.stringify({resultado}));
});
router.post('/',async (req,res)=>{
    const client = criaClient();
    let payload = req.body;
    let sql = `insert into bicicletas(codigo,ativo) values
    ('${payload.codigo}', '${payload.ativo}')`;
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
    let sql = `update bicicletas set 
    ativo = '${payload.ativo}',
    codigo = '${payload.codigo}'
    where codigo = '${codigo}' `;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

router.delete('/:codigo', async (req,res) =>{
    const client = criaClient();
    let codigo = req.params.codigo;
    let sql = `delete from bicicletas where codigo='${codigo}'`;
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