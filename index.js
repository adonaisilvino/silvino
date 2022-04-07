//index.js
const axios = require('axios');
const { timeLog } = require('console');
const fs = require('fs')
const ichimoku = require('ichimoku');
const candles = require('ichimoku');
const { stopCoverage } = require('v8');
const WebSocket = require('ws');
const api = require('./api');
const creating_websocket = require('./creating_websocket');
const teste = require('./teste');
const app = require('./app');
const { set } = require('express/lib/response');
const profitability = parseFloat(process.env.PROFITABILITY);
const profitabilitySTOP = parseFloat(process.env.PROFITABILITYSTOP);
const profitabilityTAKE = parseFloat(process.env.PROFITABILITYTAKE)
const symbolstream = process.env.SYMBOLSTREAM;
const symbol = process.env.SYMBOL;
const interval = process.env.INTERVAL;
const startTime = process.env.STARTTIME;
const endTime = process.env.ENDTIME;
const limit = process.env.LIMIT;
/*setInterval(async () => {
   //const DELETAR = await api.DELETE('BTCUSDT');
                    //console.log(DELETAR);//descomente para investigar problemas
                   //console.log(`status: ${DELETAR.status}`, '(DELETADO)'); 
                       const ListenKey = await api.listenKey();
                       console.log(ListenKey) 
                       //const sellOrder3 = await api.ordemOco(symbol,0.4850, 47282.0, 47280.0, 47257.0 , 'SELL', 'GTC' )  
                       //console.log(sellOrder3)
                                        

},300000);*/
var ws15 = new WebSocket(`wss://stream.binance.com:9443/stream?streams=btcusdt@kline_15m/btcusdt@kline_1d`);
ws15.onopen = () => {
    ws15.send(JSON.stringify({
        
        "method": "GET_PROPERTY",
        "params":
        [
        "combined"
        ],
        "id": 2
            
    }))
}



// Adonai eu que criei
const porcentagemDeCompra = process.env.PORCENTAGEMDECOMPRA;

console.log('Iniciando monitoramento!');

ws15.onmessage = (event) => {
    
     
    const obj = JSON.parse(event.data)
    
    process.stdout.write('\033c');
    

   //console.log(obj)
    
    if (obj.data === undefined ) {
        
        console.log('Aguardando Leitura')  
        
    }

    else {
        
        if(obj.data.k.i==='15m'){
            
        var Símbolo_15m = obj.data.s;
        var intervalo_15m = obj.data.k.i;
        var precoDeAbertura_15m = parseFloat(obj.data.k.o).toFixed(2);
        var precoDeFechamento_15m = parseFloat(obj.data.k.c).toFixed(2);
        var precoDeFechamento_15m = parseFloat(obj.data.k.c).toFixed(2);
        var precoAlto_15m = parseFloat(obj.data.k.h).toFixed(2);
        var precoBaixo_15m = parseFloat(obj.data.k.l).toFixed(2); 
        var volumeBase_15m = parseFloat(obj.data.k.v).toFixed(2); 
        var numeroDeNegocios_15m = parseFloat(obj.data.k.n).toFixed(2);
        var cotacaoDoVolume_15m = parseFloat(obj.data.k.q).toFixed(2); 
        var volumeCotacaoDeCompra_15m = parseFloat(obj.data.k.Q).toFixed(2);
        var vendeu = obj.S
    
        }
        if (obj.data.k.i==='1d'){
           
        var Símbolo_1d = obj.data.s;
        var intervalo_1d = obj.data.k.i;
        var precoDeAbertura_1d = parseFloat(obj.data.k.o).toFixed(2);
        var precoDeFechamento_1d = parseFloat(obj.data.k.c).toFixed(2);
        var precoDeFechamento_1d = parseFloat(obj.data.k.c).toFixed(2);
        var precoAlto_1d = parseFloat(obj.data.k.h).toFixed(2);
        var precoBaixo_1d = parseFloat(obj.data.k.l).toFixed(2); 
        var volumeBase_1d = parseFloat(obj.data.k.v).toFixed(2); 
        var numeroDeNegocios_1d = parseFloat(obj.data.k.n).toFixed(2);
        var cotacaoDoVolume_1d = parseFloat(obj.data.k.q).toFixed(2); 
        var volumeCotacaoDeCompra_1d = parseFloat(obj.data.k.Q).toFixed(2);
        var vendeu = obj.S
    
        }

        /*if (obj.data.P >= 10 && obj.data.a > obj.data.w){
            var variacao = obj.data.P
            var symboltiker = obj.data.s
        } */ 
        function calcRSI(closes){
            let gains = 0;
            let losses = 0;
            for(let i = closes.length - 14; i < closes.length; i++){
                const diff = closes[i] - closes[i-1];
            if(diff>=0)
            gains+=diff;
            else
            losses-=diff;
            }
            const strength = gains / losses;
            return 100-(100/(1 + strength));

        }
        function calcVWAP(close,volumes){
             let closes = 0;
             let volumess = 0;
             let closesvolumess = 0;
            for(let i = close.length-35; i < close.length; i++ ){
                for (let i = volumes.length - 35; i < volumes.length; i++){
                    closes += close[i]
                    volumess+=volumes[i]
                    closesvolumess += close[i]*volumes[i]
                    return (closesvolumess)/volumess
                }
            }
        }

        
        setInterval(async function process(){
            
            
             //const candle = response.data[499]
             if( (await api.kline('BTCUSDT','5m'))!==undefined){
            
                const response = await api.kline('BTCUSDT','5m')
             const volumes = response.map(item => parseFloat(item[5]))
             const close = response.map(candle => parseFloat(candle[4]))
             

             const rsi = calcRSI(close)
             
             const VWAPi= calcVWAP(close,volumes)
             //console.log(candle[4]);
             console.log(rsi)
             console.log(VWAPi)
             
             //console.log(closes)
            //console.log(await api.time());
            const ordemList = await api.LISTADEORDENS(symbol)
                   
                
                if ( precoDeFechamento_1d > precoMedio_1d && volumeCotacaoDeCompra_1d > (cotacaoDoVolume_1d/2)) {
                   //process.stdout.write('\033c');

                    
                         console.log('Preço de fechamento > Preço Médio , Têndecia de Alta !!!')
                    
                   
                    console.log('Preço Barato para comprar')
                        console.log(`Mercado para ${symbol}`);
                        const mercado = await api.depth(symbol);
                         //console.log(mercado.bids.length ? `Melhor Compra: ${mercado.bids[0][0]}` : 'Sem Compras');
                         console.log(mercado.asks.length ? `Melhor Venda: ${mercado.asks[0][0]}` : 'Sem Vendas');
    
                        //console.log('Carteira');
                        const carteira = await api.accountInfo();
                        const coins = carteira.balances.filter(b => symbol.indexOf(b.asset) !== -1);
                        //console.log(coins.free);
        
                        const sellPrice = parseFloat(mercado.asks[0][0]);
                        const carteiraUSD = parseFloat(coins.find(c => c.asset.endsWith('USDT')).free);
                        // Adonai eu que criei
                        const Pcompra = parseFloat(((carteiraUSD )* (porcentagemDeCompra))/`${mercado.bids[0][0]}`).toFixed(5);
                                             
                        //const precoMedio = await api.precoMedioAtual(symbol)
                
                        //console.log(precoMedio)*/

                    const profitability1 = Number((precoMedio_1d/precoDeFechamento_1d)/100)
                    const stopPrice = parseFloat(precoMedio_1d).toFixed(2)//parseFloat(sellPrice-(sellPrice * profitabilitySTOP)).toFixed(2)
                    const pricelucro = parseFloat(sellPrice + (sellPrice * profitability1 * 2)).toFixed(2)
                    const takeprice = parseFloat(0,95*precoMedio_1d).toFixed(2)//parseFloat((sellPrice) - (profitabilityTAKE * sellPrice)).toFixed(0)               
                    const price = parseFloat(sellPrice * profitability).toFixed(2)
                    console.log('Trabalhando por lucro de :' ,pricelucro - sellPrice  , '%')
                    
                     if (VWAP < coef) { 

                                if (ordemList.length < 3){//rsi === 25){                                    
                                   
                                             console.log('Estratégia da VWAP')         
                                    console.log('DA PARA COMPRAR!!!')
                                    console.log('Posicionando compra e venda!!!')
                                    console.log('comprando ',Pcompra ,'dollar de',Símbolo_15m)                                
                                    const buyOrder = await api.newOrder(symbol, Pcompra);
                                    console.log(`orderId: ${buyOrder.orderId}`);
                                    console.log(`status: ${buyOrder.status}`) ;
                                    if(buyOrder.status==='FILLED')
                                    
                                        

                                    console.log('Vendendo á',(profitability-1)*100,'%')                               
                                    const sellOrder3 = await api.ordemOco(symbol,Pcompra, pricelucro, stopPrice, takeprice , 'SELL', 'GTC' )
                                    console.log(sellOrder3);//descomente para investigar problemas
                                    console.log(`orderId: ${sellOrder3.orderId}`);
                                    console.log(`status: ${sellOrder3.status}`, 'Luccro de : ', (profitability-1) *100, '%');
                                    
                             
                                }
                            
                    } 
                    if(precoDeFechamento_1d = 1.01*precoMedio_1d){
                        if (ordemList.length < 3 ){
                                  
                                   console.log('estratégia da Média de 1d')
                            console.log('DA PARA COMPRAR!!!')
                            console.log('Posicionando compra e venda!!!')
                            console.log('comprando ',Pcompra ,'dollar de',Símbolo_15m)                                
                            const buyOrder = await api.newOrder(symbol, Pcompra);
                            console.log(`orderId: ${buyOrder.orderId}`);
                            console.log(`status: ${buyOrder.status}`) ;
                            if(buyOrder.status==='FILLED')
                            
                                

                            console.log('Vendendo com Lucro de : ',(profitability-1)*100,'%')                               
                            const sellOrder3 = await api.ordemOco(symbol,Pcompra, pricelucro, stopPrice, takeprice , 'SELL', 'GTC' )
                            console.log(sellOrder3);//descomente para investigar problemas
                            console.log(`orderId: ${sellOrder3.orderId}`);
                            console.log(`status: ${sellOrder3.status}`, 'Luccro de : ', (profitability-1) *100, '%');
                            
    
                        }

                    }
                            
                 }           
             }             
        },300000)   
        
                          process.stdout.write('\033c');
                        //console.log(Símbolo15)
                          //console.log(interval15)
                          var HAclose = (Number(precoDeAbertura_15m) +Number(precoAlto_15m) + Number(precoBaixo_15m) + Number(precoDeFechamento_15m))/4
                          //console.log(HAclose)
                          var HAopen = (HAclose - 0.5 + HAclose) / 2
                          //console.log(HAopen)
                          var coef = (precoDeFechamento_15m/5)
                            var VWAP = precoDeFechamento_15m * volumeCotacaoDeCompra_15m / cotacaoDoVolume_15m
                            var precoMedio_15m = (Number(precoAlto_15m) + Number(precoBaixo_15m))/2
                            var precoMedio_1d = (Number(precoAlto_1d) + Number(precoBaixo_1d))/2
                            console.log(obj.data.s)
                            //console.log(coef)
                         //console.log(`moeda: ${symboltiker} na variação de ${variacao} % `)
                         //console.log(' VWAP : ',VWAP)
                         //console.log('coeficente:',coef)
                         //document.getElementById("vwap").innerHTML=VWAP
                        

                        // console.log( ((cotacaoDoVolume_15m/2) < volumeCotacaoDeCompra_15m), (cotacaoDoVolume_15m/2) , 'E',volumeCotacaoDeCompra_15m)
                         
                         //console.log('Preco de Fechamento 15m :',precoDeFechamento_15m,'Preco de Fechamento 1d :',precoDeFechamento_1d)
                         //console.log('Preco medio 15m:',precoMedio_15m, 'Preco medio 1d:',precoMedio_1d)
                        
                         //console.log('Preco Baixo 15m:',precoBaixo_15m,'Preco Baixo 1d :',precoBaixo_1d)
                         //console.log(precoDeFechamento_1d > precoMedio_1d)
                        
    }
    
}    
