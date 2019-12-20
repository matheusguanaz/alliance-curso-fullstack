<template>
  <div class="bicicletas">
    <h1>Bicicletas</h1>
    <hr />
    <b-button v-b-modal.criaBicicleta>
      <font-awesome-icon icon="plus"/><span>Adicionar</span>
    </b-button>
    <b-table hover :items="bicicletas" :fields="fields">
      <template slot="cell(ativo)" slot-scope="{ item: {ativo}}">
        <font-awesome-icon :icon="ativo === 'S' ? 'check' : 'times'"/>
      </template>
       <template slot="cell(actionEdit)" slot-scope="{ item}">
        <b-button  v-on:click="beforeEditaBicicleta(item)">
          <font-awesome-icon icon="pen"/>
        </b-button>
      </template>
      <template slot="cell(actionDelete)" slot-scope="{ item: {codigo}}">
        <b-button v-on:click="excluirBicicleta(codigo)">
          <font-awesome-icon icon="trash"/>
        </b-button>
      </template>
     
    </b-table>
    <b-modal id="criaBicicleta" 
      title="Nova Bicicleta"
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="beforeNovaBicicleta"
      @ok="saveNovaBicicleta">
      <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>
    <b-modal id="editarBicicleta" 
      title="Alterar Bicicleta"
      ok-title="Alterar"
      cancel-title="Cancelar"
      @ok="editarBicicleta">
      <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>
  </div>
  
</template>

<script>
import FormBicicleta from '../components/FormBicicleta';
import axios from 'axios';



export default {
  components:{FormBicicleta},
  data : ()=>{
    return{
      bicicletaAtual:{
        codigo:'',
        ativo: '',
        isNew: true
      },
      fields: [
          {
            key: 'ativo',
            //sortable: false,
            label: '',
            
          },
          {
            key: 'codigo',
            //sortable: true,
            label: 'Código'
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
      bicicletas : [
        {"codigo":"xp1","ativo":"N"},
        {"codigo":"asd3","ativo":"N"},
        {"codigo":"as2d3","ativo":"S"}
      ]
    }
  },
  methods: {
    excluirBicicleta(codigo){
      return codigo;
    },
    async beforeEditaBicicleta(bicicleta){
      this.bicicletaAtual = {
        codigo: bicicleta.codigo,
        ativo: bicicleta.ativo,
        isNew: false
      }
      this.$root.$emit('bv::show::modal', 'editarBicicleta');
      
    },
    async editarBicicleta(){
      let payload = {
        codigo: this.bicicletaAtual.codigo,
        ativo: this.bicicletaAtual.ativo
        
      };
      try {
              await axios.put(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`, payload);
              await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao atualizar a bicicleta');
            }
    },
    async carregaBicicletas(){
      this.bicicletas.splice(0,this.bicicletas.length);
      let dados = await axios.get('http://localhost:3000/bicicletas');
      this.bicicletas.push(...dados.data.resultado);
    },
    beforeNovaBicicleta(){
      this.bicicletaAtual.codigo = '';
      this.bicicletaAtual.ativo  = 'S';
      this.bicicletaAtual.isNew = true;
    },
    async saveNovaBicicleta(){
      let payload = {
        codigo: this.bicicletaAtual.codigo,
        ativo: this.bicicletaAtual.ativo
      };
      try{
        await axios.post('http://localhost:3000/bicicletas', payload);
        await this.carregaBicicletas();
      }catch(err){
        alert('Erro');
      }
          
    }
  },
  async mounted(){
    await this.carregaBicicletas();
  }
}
</script>
