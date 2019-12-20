import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/',async (req,res)=>{
    let resultado = [];
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query("select codigo_ativo, quantidade, preco_medio from CARTEIRA");
    for(let row of queryResult.rows){
        resultado.push({
            codigo: row.codigo_ativo,
            quantidade: row.quantidade,
            preco: row.preco_medio
        });    
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});
router.post('/',async (req,res)=>{
    const client = criaClient();
    let payload = req.body;
    let sql = `insert into CARTEIRA(codigo_ativo, quantidade, preco_medio) values
    ('${payload.codigoAtivo}', ${payload.quantidade},${payload.preco})`;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
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