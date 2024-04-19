export default {
    props: {
        cercas: Array
    },
    setup(props, {emit}) {
        const route = VueRouter.useRoute();
        let id = route.params.id;
        const cerca = props.cercas.value.filter(e => { return e.id == id; })[0];
        return {
            cerca
        }
    },
    template: `
    <h2>Detalhes</h2>
    {{cerca.id}}
    {{cerca.nome}}
    `
}