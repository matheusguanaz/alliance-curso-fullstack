<template>
    <div class="ativos">
        <h1>Ativos</h1>
        <hr/>
         <b-table hover :items="ativos" :fields="fields">
       <template>
        <b-button >
          <font-awesome-icon icon="pen"/>
        </b-button>
      </template>
      <template >
        <b-button >
          <font-awesome-icon icon="trash"/>
        </b-button>
      </template>
     <template slot="cell(actionEdit)" slot-scope="{ item}">
        <b-button  v-on:click="beforeEditaAtivo(item)">
          <font-awesome-icon icon="pen"/>
        </b-button>
      </template>
      <template slot="cell(actionDelete)" slot-scope="{ item}">
        <b-button v-on:click="beforeExcluirAtivo(item)">
          <font-awesome-icon icon="trash"/>
        </b-button>
      </template>
    </b-table>
    <b-button v-b-modal.criarAtivo>
      <font-awesome-icon icon="plus"/><span>Adicionar</span>
    </b-button>
     <b-modal id="criarAtivo" 
      title="Novo Ativo"
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="beforeNovoAtivo"
      @ok="saveNovoAtivo">
      <FormAtivos v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="editarAtivo" 
      title="Alterar Ativo"
      ok-title="Alterar"
      cancel-title="Cancelar"
      @ok="editarAtivo">
      <FormAtivos v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="excluirAtivo" 
      title='Excluir Ativo' 
      ok-title="Excluir"
      cancel-title="Cancelar"
      @ok="excluirAtivo">
      <FormExcluirAtivos v-model="ativoAtual"/>
    </b-modal>
    </div>
</template>

<script>
import FormAtivos from '../components/FormAtivos';
import FormExcluirAtivos from '../components/FormExcluirAtivo';
import axios from 'axios';



export default {
  components:{FormAtivos,FormExcluirAtivos},
  data : ()=>{
    return{
      ativoAtual:{
        codigo:'',
        descricao: '',
        isNew: true
      },
      fields: [
          {
            key: 'codigo',
            //sortable: false,
            label: 'Código',
            
          },
          {
            key: 'descricao',
            //sortable: true,
            label: 'Descrição'
          },
          {
            key: 'actionEdit',
            label: ''
          },
          {
            key: 'actionDelete',
            label: ''
          }
        ],
        ativos : [
      ]
    }
  },
  methods: {
    async beforeExcluirAtivo(ativo){
      
       this.ativoAtual = {
            codigo: ativo.codigo,
            descricao: ativo.descricao,
            isNew: false
          }
          
      this.$root.$emit('bv::show::modal', 'excluirAtivo');
    },
    async excluirAtivo(){
      /*let payload = {
        codigo: this.ativoAtual.codigo,
        descricao: this.ativoAtual.descricao 
      };*/
      try {
            await axios.delete(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`);
            await this.carregaAtivos();
          }catch(err) {
            
              alert(this.ativoAtual.codigo);
            }
    },
       async beforeEditaAtivo(ativo){
          this.ativoAtual = {
            codigo: ativo.codigo,
            descricao: ativo.descricao,
            isNew: false
          }
      this.$root.$emit('bv::show::modal', 'editarAtivo');
    },
    async editarAtivo(){
      let payload = {
        codigo: this.ativoAtual.codigo,
        descricao: this.ativoAtual.descricao
        
      };
      try {
            await axios.put(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
            await this.carregaAtivos();
          }catch(err) {
              alert('erro ao atualizar o ativo');
            }
    },
    async carregaAtivos(){
      this.ativos.splice(0,this.ativos.length);
      let dados = await axios.get('http://localhost:3000/ativos');
      this.ativos.push(...dados.data);
    },
    beforeNovoAtivo(){
      this.ativoAtual.codigo = '';
      this.ativoAtual.descricao  = '';
      this.ativoAtual.isNew = true;
    },
    async saveNovoAtivo(){
      let payload = {
        codigo: this.ativoAtual.codigo,
        descricao: this.ativoAtual.descricao
      };
      try{
        await axios.post('http://localhost:3000/ativos', payload);
        await this.carregaAtivos();
      }catch(err){
        alert('Erro');
      }
          
    }
    
  },
  async mounted(){
    await this.carregaAtivos();
  }
}
</script>