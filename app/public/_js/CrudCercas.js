export default {
    props: {
        cercas: Array,
        nome2: String
    },
    setup(props, { emit }) {
        const nome = Vue.ref('');
        const cercas = Vue.ref(props.cercas);

        function inserir() {
            const pi = Math.PI;
            const area = (7 / 4) * Math.pow(Number(document.getElementById('lado').value), 2) * (1 / Math.tan(pi / 7));
            cercas.value.push({ id: cercas.value.length + 1, nome: nome.value, area: area.toFixed(2) });
            nome.value = ''; // Limpa o campo de nome após a inserção
            document.getElementById('lado').value = ''; // Limpa o campo de lado após a inserção
        }

        function selecionar(nome) {
            emit('selecionado', nome);
        }

        return {
            nome,
            cercas,
            inserir,
            selecionar
        };
    },
    template: `
    <div>
        <h2>Digite abaixo os dados:</h2>
        <form @submit.prevent="inserir">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="nome">
            <label for="lado">Lado:</label>
            <input type="number" id="lado">
            <button type="submit">Adicionar Cerca</button>
        </form>
    </div>
    `
};