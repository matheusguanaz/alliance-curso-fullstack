<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            :disabled="!content.isNew"
        >
        <b-form-input
            id="txtCodigo"
            v-model="content.codigo"
            type="text"
            required
            placeholder="Código do Ativo"
            @input="handleInput"
            :disabled="!content.isNew"
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
                isNew: false
            }
            
        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
                descricao: this.content.descricao,
                isNew: false
            }
            this.$emit('input',  retorno);
        }
        
    }
}
</script>