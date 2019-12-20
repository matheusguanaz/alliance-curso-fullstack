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
    ('${payload.codigo}', ${payload.quantidade},${payload.preco})`;
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo', async (req,res)=>{
    let resultado1 = [];
    let resultado = [];
    const client = criaClient();
    let codigo = req.params.codigo;
    let payload = req.body;
    await client.connect();
    let sql1 = `select quantidade,preco_medio from CARTEIRA where codigo_ativo = '${codigo}'`

   let query_result = await client.query(sql1);
   for(let row of query_result.rows){
    resultado1.push({
        codigo: row.codigo_ativo,
        quantidade: row.quantidade,
        preco: row.preco_medio
    });
}
if(payload.action==='B'){
    let preco_anterior = Number(query_result.rows[0].preco_medio);
     let quantidade_anterior = Number(query_result.rows[0].quantidade);
     let nova_quantidade = quantidade_anterior + Number(payload.quantidade);
     let novo_preco = ((preco_anterior*quantidade_anterior) + Number((payload.quantidade*payload.preco)))/(nova_quantidade);
     let sql = `update carteira set 
        quantidade = ${nova_quantidade},
        preco_medio = ${novo_preco}
        where codigo_ativo = '${codigo}' `;
    await client.query(sql);
    await client.end();
}else{
    let nova_quantidade = Number(query_result.rows[0].quantidade) - Number(payload.quantidade);
    let lucro_prejuizo =Number(query_result.rows[0].quantidade)*Number(query_result.rows[0].preco) - (Number(payload.quantidade) * Number(payload.preco));
    let sql = `update carteira set 
    quantidade = ${nova_quantidade}
    where codigo_ativo = '${codigo}' `;
    await client.query(sql);
    await client.end();
}
     

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