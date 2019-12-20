import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/',async (req,res)=>{
    let resultado = [];
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query("select * from OPERACOES");
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