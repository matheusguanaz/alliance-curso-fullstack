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
        id="input-descricao"
        label="Descrição"
        label-for="txtDescricao"
        description="Informe a descrição do ativo">
        <b-form-input
            id="txtDescricao"
            v-model="content.descricao"
            type="text"
            required
            placeholder="Descrição do Ativo"
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
                ativo: this.value.descricao,
                isNew: this.value.isNew
            }
            
        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
                descricao: this.content.descricao,
                isNew: this.content.isNew
            }
            this.$emit('input',  retorno);
        }
        
    }
}
</script>