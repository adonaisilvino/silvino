const express = require('express');
const ejs = require('ejs');


const app = express();
const path = require('path');
const WebSocket = require('ws')

const api = require('./api');
const { VWAP,coef,ordemList,Pcompra, pricelucro, stopPrice, takeprice,precoAlto15, precoBaixo15 } = require('./index')
const profitability = parseFloat(process.env.PROFITABILITY);
const symbol = process.env.SYMBOL;
const coin = process.env.COIN

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/data', async (req, res) => {
    var ws01 = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/etcusdt@ticker/axsusdt@ticker/slpusdt@ticker/solusdt@ticker/yfiiusdt@ticker/axsusdt@ticker/plausdt@ticker');
ws01.onopen = () => {
    ws01.send(JSON.stringify({
        
        "method": "GET_PROPERTY",
        "params":
        [
        "combined"
        ],
        "id": 2
            
    }))
}

ws01.onmessage = (event) => {    
     
    const obj = JSON.parse(event.data)
    
    process.stdout.write('\033c');
    
    //console.log(obj)
    
    
    if (obj.data === undefined) {
        
        console.log('')  
        
    }
    else {
       
        var Símbolo = obj.data.s;
      
        var porcentagemDeVariacao = parseFloat(obj.data.P).toFixed(2);
        
         
           var objp = Object.values(obj)
        
          
    
          
        const variacao0 = objp.forEach(item0 => {
           
            if(item0.P > 20 && item0.w < item0.h && item0.a>item0.w && item0.w < item0.b) {//console.log( item2.s , 'Porcentagem de variação' , item2.P) 
                console.log(`Te aconselho colocar essa moeda para o bot:${item0.s}`)
                console.log(item0.s,'Porcentagem de variação',item0.P)  
                var VWAP = item0.s                                                             
                                            
            }
          

        })
            
       
    
          
            //console.log(item.s,'Porcentagem de variação', item.P) 
       
    }
    

       
      

}

    const data = {};

    const mercado = await api.depth(symbol);
   // console.log(mercado)
    //data.buy = mercado.bids.length ? `Melhor Compra: ${mercado.bids[0][0]}` : 'Sem Compras';
   // data.sell = mercado.asks.length ? `Melhor Venda: ${mercado.asks[0][0]}` : 'Sem Vendas';

    const carteira = await api.accountInfo();
    const coins = carteira.balances.filter(b => symbol.indexOf(b.asset) !== -1);
    data.coins = coins;

    const sellPrice = parseFloat(mercado.asks[0][0]);
    const carteiraUSD = parseFloat(coins.find(c => c.asset.endsWith(coin)).free);;
    //console.log(Number(VWAP),Number(coef),Number(ordemList),Number(Pcompra), Number(pricelucro), Number(stopPrice), Number(takeprice))

   /* if (VWAP < 1) {
        console.log('Estratégia da VWAP');
        

        if (ordemList.length < 5){
            console.log('Posicionando compra e venda!!!')

            
            const buyOrder = await api.newOrder(symbol, Pcompra);
            data.buyOrder = { id: buyOrder.orderId, status: buyOrder.status };

          // console.log(coins);
            const sellOrder3 = await api.ordemOco(symbol,Pcompra, pricelucro, stopPrice, takeprice , 'SELL', 'GTC' )
            console.log(sellOrder3);//descomente para investigar problemas
            console.log(`orderId: ${sellOrder3.orderId}`);
            console.log(`status: ${sellOrder3.status}`, 'Luccro de : ', (profitability-1) *100, '%');
           
           
            
          
        }
        if (sellPrice <= carteiraUSD) {

           

           console.log(`Posicionando venda. Ganho de ${profitability}`);
            const sellOrder = await api.newOrder(symbol, 1, sellPrice * profitability, 'SELL', 'LIMIT');
            data.sellOrder = { id: sellOrder.orderId, status: sellOrder.status };
        }
    }*/

    res.json(data);
})

app.use('/', (req, res) => {
    res.render('app', { symbol, profitability, lastUpdate: new Date(), interval: process.env.CRAWLER_INTERVAL });
})

app.listen(3737, () => {
    console.log(`Aplicação rodando!`);
});