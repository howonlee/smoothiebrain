 var ann = function anonymous(inputs) {
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
     };
      var chart = new SmoothieChart({ grid: {strokeStyle:'rgb(200,200,200)', fillStyle:'rgb(60,60,60)', lineWidth:1}, labels:{ fillStyle:'rgb(20,20,20)'}});
      var net = new brain.NeuralNetwork({hiddenLayers: [4], learningRate: 0.2});
      var istrained = true;
      // Randomly add a data point every 500ms
      var random = new TimeSeries();
      var trained = new TimeSeries();
      setInterval(function() {
        random.append(new Date().getTime(), Math.random());
        if (istrained) {
            var inputData = random.data;
            var lengthData = random.data.length;
            trained.append(new Date().getTime(), ann([inputData[lengthData-3][1], inputData[lengthData-2][1], inputData[lengthData-1][1]])[0]);
        } else {
            trained.append(new Date().getTime(), 0);
        }
      }, 500);
     
      //wrapper for brain.js's spiffy stuff
      function trainANN(series){
        //create the training set
        //there had better be more than 4 points...
        var trainingdata = [];
        for (var i = 3; i < series.length; i++){
           var tempin =  [series[i-3][1], series[i-2][1], series[i-1][1]];
           var tempout = [series[i][1]];
           var pattern = {
               input : tempin,
               output : tempout
           };
           trainingdata.push(pattern);
        }
        console.log(trainingdata);
        net.train(trainingdata);
        istrained = true;
        
      }
       
      function createTimeline() {
        chart.addTimeSeries(random, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
        chart.addTimeSeries(trained, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth : 4});
        chart.streamTo(document.getElementById("chart"), 2000);
      }
