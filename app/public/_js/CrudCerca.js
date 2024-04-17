export default {
    props: {
        cercas: Array,
        nome2: String
    },
    setup(props, { emit }) {
        const cerca = Vue.ref({ nome: '', lado: '' });
        const cercas = Vue.ref(props.cercas || []);

        async function inserir() {
            let id;
            const existingIndex = cercas.value.findIndex(item => item.nome === cerca.value.nome && item.lado === cerca.value.lado);
            if (existingIndex !== -1) {
                id = cercas.value[existingIndex].id;
                await editar(id); 
                alert('Registro #' + id + ' editado!');
            } else {
                id = await adicionar({ nome: cerca.value.nome, lado: cerca.value.lado });
                alert('Registro #' + id + ' adicionado!');
                cercas.value.push({ id, ...cerca.value }); 
            }
            cerca.value = { nome: '', lado: '' };
        }
        

        function selecionar(cerca) {
            emit('selecionado', cerca);
        }

        async function editar(cerca1) {
            cerca.value = cerca1;
        }

        async function apagar(id) {
            if (confirm('Quer apagar o #' + id + '?')) {
                await deletar(id);
                cercas.value = cercas.value.filter(item => item.id !== id);
                alert('Registro #' + id + ' apagado!');
            }
        }

        return {
            cerca,
            cercas,
            inserir,
            selecionar,
            editar,
            apagar,
        };
    },
    template: `
    <div class="card-container">
        <form @submit.prevent="inserir">
            <label>
                <span>Nome</span>
                <input name="nome" v-model="cerca.nome">
            </label>
            <label>
                <span>Lado</span>
                <input name="lado" v-model="cerca.lado">
            </label>
            <button type="submit">Ok</button>
        </form>

        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Lado</th>
                <th></th>
            </tr>
            <tbody>
                <tr v-for="cerca in cercas" :key="cerca.id">
                    <td>{{ cerca.id }}</td>
                    <td>{{ cerca.nome }}</td>
                    <td>{{ cerca.lado }}</td>
                    <td>
                        <button @click="editar(cerca)">Editar</button>
                        <button @click="apagar(cerca.id)">Apagar</button>
                        <button @click="selecionar(cerca)">Selecionar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
};