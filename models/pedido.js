function make(Schema, mongoose, Job) {
	var PedidoSchema = new Schema({
        usuario_id: String,
        transportadora_id: String,
        status: String,
        numero: Number,
        total: Number,
        forma_pagamento: String,
        produtos: [],
        data_emissao: Date,
        data_criacao: { type: Date, default: Date.now },
        data_ultima_atualizacao: { type: Date, default: Date.now },
	});

    return mongoose.model('Pedido', PedidoSchema);
}

module.exports.make = make;