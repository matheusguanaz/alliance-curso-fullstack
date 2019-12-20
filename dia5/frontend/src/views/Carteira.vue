<template>
    <div>
        <h1>Carteira</h1>
        <hr/>
        <b-table hover :items="carteiras" :fields="fields">
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
     <template slot="cell(actionComprar)" slot-scope="{item}">
        <b-button v-on:click="beforeComprarMais(item)"  >
            <span>Comprar</span><font-awesome-icon icon="plus"/>
        </b-button>
      </template>
      <template slot="cell(actionVender)" slot-scope="{item}" >
        <b-button v-on:click="beforeVenderAtivo(item)">
          <span>Vender</span>
        </b-button>
      </template>
    </b-table>
    <b-button v-b-modal.criarAtivo>
      <font-awesome-icon icon="plus"/><span>Adicionar</span>
    </b-button>
    <b-modal id="criarAtivo" 
      title="Adicionar Ativo a minha carteira"
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="beforeNovoAtivo"
      @ok="saveNovoAtivo">
      <FormCarteiras v-model="carteiraAtual"/>
    </b-modal>
    <b-modal id="comprarMais" 
      title="Comprar Mais"
      ok-title="Comprar"
      cancel-title="Cancelar"
      @ok="comprarMais">
      <FormCarteiras v-model="carteiraAtual"/>
      </b-modal>
      <b-modal id="venderAtivo" 
      title="Vender Ativos"
      ok-title="Vender"
      cancel-title="Cancelar"
      @ok="venderAtivo">
      <FormCarteiras v-model="carteiraAtual"/>
    </b-modal>
    </div>
</template>

<script>
import FormCarteiras from'../components/FormCarteiras';
import axios from 'axios';



export default {
  components:{FormCarteiras},
  data : ()=>{
    return{
      carteiraAtual:{
        codigo:'',
        quantidade: '',
        preco: '',
        isNew: true
      },
      fields: [
          {
            key: 'codigo',
            //sortable: false,
            label: 'Código',
            
          },
          {
            key: 'quantidade',
            //sortable: true,
            label: 'Quantidade'
          },
          {
            key: 'preco',
            label: 'Preço'
          },
          {
            key: 'actionComprar',
            label: ''
          },
          {
            key: 'actionVender',
            label: ''
          }
        ],
        carteiras : [
            {"codigo":"ddd1","quantidade":3,"preco":20}
      ]
    }
  },
  methods: {
    beforeVenderAtivo(carteira){
      this.carteiraAtual = {
        codigo: carteira.codigo,
            quantidade: '',
            preco: '',
            isNew: false
      }

      this.$root.$emit('bv::show::modal', 'venderAtivo');
    },
    async venderAtivo(){
        let payload = {
        codigo: this.carteiraAtual.codigo,
        quantidade: this.carteiraAtual.quantidade,
        preco: this.carteiraAtual.preco,
        action: "S"
      };
      try {
            await axios.put(`http://localhost:3000/carteira/${this.carteiraAtual.codigo}`, payload);
            await this.carregaCarteira();
          }catch(err) {
              alert('erro ao editar o ativo');
            }
    },
    async carregaCarteira(){
      this.carteiras.splice(0,this.carteiras.length);
      let dados = await axios.get('http://localhost:3000/carteira');
      this.carteiras.push(...dados.data);
    }, 
    beforeNovoAtivo(){
      this.carteiraAtual.codigo = '';
      this.carteiraAtual.quantidade  = '';
      this.carteiraAtual.preco = '';
      this.carteiraAtual.isNew = true;
    },
    async saveNovoAtivo(){
      let payload = {
        codigo: this.carteiraAtual.codigo,
        quantidade: Number(this.carteiraAtual.quantidade),
        preco: Number(this.carteiraAtual.preco)
      };
      try{
        await axios.post('http://localhost:3000/carteira', payload);
        await this.carregaCarteira();
      }catch(err){
        alert('Erro');
      }
          
    },
    async beforeComprarMais(carteira){
          this.carteiraAtual = {
            codigo: carteira.codigo,
            quantidade: '',
            preco: '',
            isNew: false
          }
      this.$root.$emit('bv::show::modal', 'comprarMais');
    },
    async comprarMais(){
      let payload = {
        codigo: this.carteiraAtual.codigo,
        quantidade: this.carteiraAtual.quantidade,
        preco: this.carteiraAtual.preco,
        action: "B"
      };
      try {
            await axios.put(`http://localhost:3000/carteira/${this.carteiraAtual.codigo}`, payload);
            await this.carregaCarteira();
          }catch(err) {
              alert('erro ao editar o ativo');
            }
    }
    

    
  },
  async mounted(){
    await this.carregaCarteira();
  }
}
</script>