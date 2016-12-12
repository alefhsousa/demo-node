module.exports = function(app) {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');
  Schema = mongoose.Schema;
  var Pedido = require('./../models/pedido.js').make(Schema, mongoose);  

    app.get("/pedidos", function(req, res){
        Pedido.find({}, function(err, pedidos) {
            if (err){ 
              console.log('Ocorreu um erro na consulta: '+ err) ;
            }
            console.log("tamanho:  " + pedidos.length )
              if(pedidos.length != 0){
                 res.status(200).send(pedidos);
              }else{
                res.status(204).send();
              }
        });
    });

    app.post('/pedidos/pedido', function(req, res){
        var pedido = req.body;
        console.log(pedido);
        
        var novoPedido = new Pedido({
            usuario_id: pedido.usuario_id,
            tranportadora_id: pedido.tranportadora_id,
            status: 'CRIADO',
            numero: pedido.numero,
            total: pedido.total,
            forma_pagamento: pedido.forma_pagamento,
            produtos: pedido.produtos,
            data_emissao: pedido.data_emissao
        })

        novoPedido.save(function (err) {
          if (err) {
            console.log("Ocorreu um erro ao salvar o pedido: " + err);
          } else {
            console.log('pedido salvo no banco de dados');
          }
        });
        
        res.location('/pedidos/pedido/' + novoPedido._id);
        res.status(201).send(novoPedido);
    })

    app.get('/pedidos/pedido/:id', function(req, res){
      var id = req.params.id;
      Pedido.findOne({ '_id': id }, function (err, pedido) {
      if (err){
        console.log('Ocorreu um erro na consulta.');
         res.status(404).send('pedido não encontrado')
      }
       res.json(pedido);  
      })
    })

    app.delete('/pedidos/pedido/:id', function(req, res){
      var id = req.params.id;
      
      Pedido.remove({ '_id': id }, function (err) {
      if (err){
        console.log('Ocorreu um erro na consulta.');
         res.status(400).send('não foi possível deletar o pedido')
      }
       res.status(200).send('pedido deletado com sucesso')
      })
    })

    app.put('/pedidos/pedido/:id/pago', function(req, res){
      var id = req.params.id;
      
      Pedido.findOneAndUpdate({'_id': id}, {$set:{status:"PAGO"}}, {new: true}, function(err, pedido){
          if(err){
              console.log("Ocorreu um erro ao atualizar o pedido!");
          }

          console.log(pedido);
          res.status(200).send('pagamento do pedido efetuado com sucesso');
      });
    });

    app.put('/pedidos/pedido/:id/cancelado', function(req, res){
      var id = req.params.id;
      
      Pedido.findOneAndUpdate({'_id': id}, {$set:{status:"CANCELADO"}}, {new: true}, function(err, pedido){
          if(err){
              console.log("Ocorreu um erro ao atualizar o pedido!");
              res.status(400).send('pedido inexistente');
          }

          console.log(pedido);
          res.status(200).send('cancelamento do pedido efetuado com sucesso');
      });
    });
}

