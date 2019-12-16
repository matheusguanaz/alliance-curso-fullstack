import express from 'express';
import calculadora from './calculadora';// utilizar ./ para pegar da mesma pasta

const app = express();

app.use(express.json());
app.use('/calculadora', calculadora);//nome utilizado no dns da aplicação ex: localhost:3000/calculadora

app.listen(3000, () => // ouvir na porta 3000
    console.log('Servidor rodando na porta 3000!' ),
);