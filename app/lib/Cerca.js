class Cerca {
    constructor(nome, lado, id) {
        this.nome = nome;
        this.lado = lado;
        this.id = id;
    }

    area() {
        const pi = Math.PI;
        const area = (7/4) * Math.pow(this.lado, 2) * (1 / Math.tan(pi/7));
        return area.toFixed(2);
    }
}

module.exports = Cerca;