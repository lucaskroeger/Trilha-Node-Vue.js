class Produto {
    constructor({ id, nome, quantidade, preco, categoria_id }) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.categoria_id = categoria_id;
    }
}

module.exports = Produto;
