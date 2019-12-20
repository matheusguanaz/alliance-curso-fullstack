<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            description="Informe o código do Ativo"
            :disabled="!content.isNew"
        >
        <b-form-input
            id="txtCodigo"
            v-model="content.codigo"
            type="text"
            required
            placeholder="código do Ativo"
            @input="handleInput"
            :disabled="!content.isNew"/>
        </b-form-group>
        <b-form-group
        id="input-quantidade"
        label="Quantidade"
        label-for="txtQuantidade"
        description="Informe a quantidade a ser comprada">
        <b-form-input
            id="txtQuantidade"
            v-model="content.quantidade"
            type="text"
            required
            placeholder="Quantidade"
            @input="handleInput"
            />
        </b-form-group>
        <b-form-group
        id="input-preco"
        label="Preço"
        label-for="txtPreco"
        description="Informe o preco">
        <b-form-input
            id="txtPreco"
            v-model="content.preco"
            type="text"
            required
            placeholder="Preco"
            @input="handleInput"
            />
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    props: ['value'],
    data (){
        return{
            content:{
                codigo: this.value.codigo,
                quantidade: this.value.quantidade,
                preco: this.value.preco,
                isNew: this.value.isNew
            }
            
        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
                quantidade: this.content.quantidade,
                preco: this.content.preco,
                isNew: this.content.isNew
            }
            this.$emit('input',  retorno);
        }
        
    }
}
</script>