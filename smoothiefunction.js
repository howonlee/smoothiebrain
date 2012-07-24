
function anonymous(inputs) {
      var net = {"layers":[{"0":{},"1":{},"2":{}},{"0":{"bias":8.977426968268293,"weights":{"0":-6.345603789911082,"1":-9.870405129014337,"2":-3.2491209862678674}},"1":{"bias":-3.236165503510096,"weights":{"0":-2.000309596460457,"1":4.186172630827461,"2":1.735695209032886}},"2":{"bias":-11.199194842171051,"weights":{"0":14.48758915252661,"1":2.6745081205639893,"2":-4.206717934116241}},"3":{"bias":11.38301122962528,"weights":{"0":-13.97807181665644,"1":-7.607106043256651,"2":0.8500880061215578}}},{"0":{"bias":-2.6361224265313683,"weights":{"0":-10.570036432088795,"1":-12.343254606829422,"2":8.531171676904712,"3":14.889713607573233}}}]};

        for(var i = 1; i < net.layers.length; i++) {
                var layer = net.layers[i];
                    var outputs = {};
                        for(var id in layer) {
                                  var node = layer[id];
                                        var sum = node.bias;
                                              for(var iid in node.weights)
                                                          sum += node.weights[iid] * inputs[iid];
                                                                outputs[id] = (1/(1 + Math.exp(-sum)));
                                                                    }
                                                                        inputs = outputs;
                                                                          }
                                                                            return outputs;
}
