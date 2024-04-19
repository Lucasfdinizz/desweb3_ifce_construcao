export default {
    props: {
        cercas: Array
    },
    setup(props, {emit}) {
        const cercas = Vue.ref(props.cercas);
        
        function selecionar(cerca) {
            this.$router.push('/detalhes/' + cerca.id);
        }

        function excluir(cerca) {
            cercas.value = cercas.value.filter(c => c.id !== cerca.id);
        }

        return {
            cercas,
            selecionar,
            excluir
        };
    },
    template: `
    <div>
        <h1>Lista</h1>
        <div v-for="cerca of cercas" :key="cerca.id" class="linha">
            {{cerca.nome}} - Área: {{cerca.area}} m²
            {{ cerca.area >= 40 && cerca.area <= 60 ? 'É uma cerca média' : 'Não é uma cerca média' }}
            <button @click="selecionar(cerca);">Selecionar</button>
            <button @click="excluir(cerca);">Excluir</button>
        </div>
    </div>
    `
};