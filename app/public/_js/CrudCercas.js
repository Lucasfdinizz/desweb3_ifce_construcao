export default {
    props: {
        nomes: Array,
        nome2: String
    },
    setup(props, {emit}) {
        const nome = Vue.ref(props.nome2)
        const nomes = Vue.ref(props.nomes)
        function inserir() {
            nomes.value.push(nome.value);
        }
        function selecionar(nome) {
            emit('selecionado', nome);
        }
        /*Vue.watch(props.nome, function (novo) {
            nome.value = novo;
        });*/
        return {
            nome,
            nomes,
            inserir,
            selecionar
        }
    },
    data() {
        return {
            form: { nome: '', lado: 0 },
            respostas: JSON.parse(localStorage.getItem('respostas')) || [],
            ultimaResposta: JSON.parse(localStorage.getItem('ultimaResposta')) || {}
        };
    },
    methods: {
        submitForm() {
            const pi = Math.PI;
            const area = (7/4) * Math.pow(this.form.lado, 2) * (1 / Math.tan(pi/7));
            const resposta = { id: Date.now(), nome: this.form.nome, area: area.toFixed(2) };
            this.respostas.push(resposta);
            this.ultimaResposta = resposta;
            localStorage.setItem('respostas', JSON.stringify(this.respostas));
            localStorage.setItem('ultimaResposta', JSON.stringify(resposta));
            this.form.nome = '';
            this.form.lado = 0;
        }
    },
    created() {
        this.ultimaResposta = JSON.parse(localStorage.getItem('ultimaResposta')) || {};
    },
    template: `
    <h2>Digite abaixo os dados:</h2>
    <form action="/cercas" method="post">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome">
        <label for="lado">Lado:</label>
        <input type="number" id="lado" name="lado">
        <input type="submit" value="Calcular">
    </form>       
    <h2>Última resposta:</h2>
    <div v-for="resposta in respostas" :key="resposta.id" class="div-resposta" :class="{ 'É uma cerca média': resposta.area >= 40 && resposta.area <= 60, 'Não é uma cerca média': resposta.area < 40 || resposta.area > 60 }">
        {{ resposta.nome }}: {{ resposta.area }} metros quadrados
    </div>
    <div v-if="ultimaResposta" class="div-resposta" :class="{ 'É uma cerca média': ultimaResposta.area >= 40 && ultimaResposta.area <= 60, 'Não é uma cerca média': ultimaResposta.area < 40 || ultimaResposta.area > 60 }">
        Última resposta: {{ ultimaResposta.nome }}: {{ ultimaResposta.area }} metros quadrados
    </div>
    `
}