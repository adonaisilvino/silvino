//Monitoramento WEBSOKET
//const readlineSync = require('readline-Sync')
//onst symbol = readlineSync.question('Qual par de moedas deseja monitorar?')
//const interval = readlineSync.question('Qual o intervalo ?')
const WebSocket = require('ws');
const axios = require('axios')

//WEBSOKET 'LIVRO DE ORDENS'
/*var ws = new WebSocket('wss://stream.binance.com:9443/ws/@bookTicker');
ws.onopen = () => {
    ws.send(JSON.stringify({
        
            "method": "SUBSCRIBE",
            "params":S
            [
            `${symbol}@bookTicker`
            ],
            "id": 1
            
    }))
}
ws.onmessage = (event) => {
    const obj = JSON.parse(event.data)
    process.stdout.write('\033c');
    //console.log(obj)
    console.log(`Symbol: ${obj.s}`);
    console.log(`Melhor oferta de Venda: ${obj.a}`);
    console.log(`Quantidade ofertada de venda: ${obj.A}`);
    console.log(`Melhor Oferta de compra: ${obj.b}`);
    console.log(`Quantidade ofertada de compra' ${obj.B}`);

}*/

//WEBSOKET 'CANDILESTICK'
/*var ws = new WebSocket('wss://stream.binance.com:9443/ws/@kline');
ws.onopen = () => {
    ws.send(JSON.stringify({
        
            "method": "SUBSCRIBE",
            "params":
            [
            `ltcusdt@kline_5m`
            ],
            "id": 1
            
    }))
}

ws.onmessage = (event) => {
    const obj = JSON.parse(event.data)
    process.stdout.write('\033c');
    //console.log(obj)
    const Símbolo = console.log(`Símbolo: ${obj.s}`);
    
    if (obj.k=== undefined) {
        console.log('')   
    }
    else {
        var precoDeAbertura = parseFloat(obj.k.o).toFixed(2)
        var precoDeFechamento = parseFloat(obj.k.c).toFixed(2)
        var precoAlto = parseFloat(obj.k.h).toFixed(2)
        var precoBaixo = parseFloat(obj.k.l).toFixed(2) 
        var volumeBase = parseFloat(obj.k.v).toFixed(2)  
        var numeroDeNegocios = parseFloat(obj.k.n).toFixed(2)
        var cotacaoDoVolume = parseFloat(obj.k.q).toFixed(2) 
        var volumeCotacaoDeCompra = parseFloat(obj.k.Q).toFixed(2)

    }

    console.log('Preco De Abertura: ', precoDeAbertura);  
    console.log('Preco De Fechamento: ', precoDeFechamento);
    console.log('Preco Alto: ', precoAlto);
    console.log('Preco Baixo: ', precoBaixo);
    console.log('Volume Base: ', volumeBase);
    console.log('Numero De Negocios: ', numeroDeNegocios);
    console.log('Cotacao Do Volume: ', cotacaoDoVolume);
    console.log('Volume Cotacao De Compra: ', volumeCotacaoDeCompra);// se volume cotacao de compra for diferente 0
    const VWAP = precoDeFechamento * volumeCotacaoDeCompra / cotacaoDoVolume
    console.log(VWAP)
    const HAclose = (Number(precoDeAbertura) +Number(precoAlto) + Number(precoBaixo) + Number(precoDeFechamento))/4
    console.log(HAclose)
    
    
}*/


/*const HAopen = (HAopen- 1 + HAclose) / 2
const HAhigh = máx(MAX0, HAopen0, HAclose0)
const HAlow = mín(MIN0, HAopen0, HAclose0)
HAclose>HAopen // kenk ashi é verde(compra)*/

/*var ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@kline_1M');
ws.onopen = () => {
    ws.send(JSON.stringify({
        
        "method": "GET_PROPERTY",
        "params":
        [
        "combined"
        ],
        "id": 2
            
    }))
}

ws.onmessage = (event) => {
    const obj = JSON.parse(event.data)
    
    //process.stdout.write('\033c');
    

    //console.log('')
    
   
   
    if (obj.data=== undefined) {
        console.log('')   
    }
    else {
        var Símbolo = obj.data.s;
        var interval = obj.data.k.i;
        var precoDeAbertura = parseFloat(obj.data.k.o).toFixed(2);
        var precoDeFechamento = parseFloat(obj.data.k.c).toFixed(2);
        var precoAlto = parseFloat(obj.data.k.h).toFixed(2);
        var precoBaixo = parseFloat(obj.data.k.l).toFixed(2); 
        var volumeBase = parseFloat(obj.data.k.v).toFixed(2); 
        var numeroDeNegocios = parseFloat(obj.data.k.n).toFixed(2);
        var cotacaoDoVolume = parseFloat(obj.data.k.q).toFixed(2); 
        var volumeCotacaoDeCompra = parseFloat(obj.data.k.Q).toFixed(2);
        

    }
    /*console.log(Símbolo)
    console.log(interval)
    const HAclose = (Number(precoDeAbertura) +Number(precoAlto) + Number(precoBaixo) + Number(precoDeFechamento))/4
    console.log(HAclose)
    const HAopen = (HAclose - 0.5 + HAclose) / 2
    console.log(HAopen)
    const VWAP = precoDeFechamento * volumeCotacaoDeCompra / cotacaoDoVolume
    console.log(VWAP)*/
    
//}




/*var ws15 = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@kline_15m');
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


ws15.onmessage = (event) => {
    
     
    const obj = JSON.parse(event.data)
    
    //process.stdout.write('\033c');
    

    //console.log('TrOCANDO DE INTERVALO')
    
    if (Símbolo15=== undefined) {
        
        console.log('')  
        
    }
    else {
        var Símbolo15 = obj.data.s;
        var interval15 = obj.data.k.i;
        var precoDeAbertura15 = parseFloat(obj.data.k.o).toFixed(2);
        var precoDeFechamento15 = parseFloat(obj.data.k.c).toFixed(2);
        var precoAlto15 = parseFloat(obj.data.k.h).toFixed(2);
        var precoBaixo15 = parseFloat(obj.data.k.l).toFixed(2); 
        var volumeBase15 = parseFloat(obj.data.k.v).toFixed(2); 
        var numeroDeNegocios15 = parseFloat(obj.data.k.n).toFixed(2);
        var cotacaoDoVolume15 = parseFloat(obj.data.k.q).toFixed(2); 
        var volumeCotacaoDeCompra15 = parseFloat(obj.data.k.Q).toFixed(2);
        //module.exports = { Símbolo15,interval15,precoDeAbertura15,precoDeFechamento15,precoAlto15,precoBaixo15,volumeBase15,numeroDeNegocios15,cotacaoDoVolume15,volumeCotacaoDeCompra15, obj }
        
              

    }
    
    
    //console.log(Símbolo15)
    /*console.log(interval15)
    const HAclose = (Number(precoDeAbertura15) +Number(precoAlto15) + Number(precoBaixo15) + Number(precoDeFechamento15))/4
    console.log(HAclose)
    const HAopen = (HAclose - 0.5 + HAclose) / 2
    console.log(HAopen)
    const VWAP = precoDeFechamento15 * volumeCotacaoDeCompra15 / cotacaoDoVolume15
    console.log(VWAP)*/
    
    
          
//}


//todos as criptomoedas


/*var ws01 = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker');
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
       
        
              

    }
   // console.log(Símbolo , 'Porcentagem de variação', porcentagemDeVariacao,'%')


   

}*/

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
                                            
            }
          

        })
            
       
    
          
            //console.log(item.s,'Porcentagem de variação', item.P) 
       
    }
    //console.log(Símbolo , 'Porcentagem de variação', porcentagemDeVariacao,'%')

       
      

}
    



/*var ws01 = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@kline_15m/btcusdt@kline_1d');
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
    /*else {
       
       
      
       
        
         
           var objp = Object.values(obj)
        
          
    
          
        objp.map(item0 => {
           
            if(item0.k) {//console.log( item2.s , 'Porcentagem de variação' , item2.P) 
               
                var obj2 = Object.values(item0.k)
                //console.log(obj2[3])  
                if(obj2[3]==='1d'){
                    var precoAlto_1d = item0.k.h
                    var precoBaixo_1d = item0.k.l
                   
                   
                    
                }
                                                               
                                            
            }

            if(item0.k) {//console.log( item2.s , 'Porcentagem de variação' , item2.P) 
               
                var obj3 = Object.values(item0.k)
                //console.log(obj2[3])  
                if(obj3[3]==='15m'){
                    var precoAlto_15m = item0.k.h
                    var precoBaixo_15m = item0.k.l
                   
                   
                    
                }
                                                               
                                            
            }


            console.log( precoAlto_1d , precoAlto_15m)

        })
            
       
    
          
            //console.log(item.s,'Porcentagem de variação', item.P) 
       
    }*/
    //console.log(Símbolo , 'Porcentagem de variação', porcentagemDeVariacao,'%')
    /*else {
        if(obj.data.k.i==='15m'){
            var intervalo_15m = obj.data.k.i

        }
        if (obj.data.k.i==='1d'){
            var intervalo_1d = obj.data.k.i

        }
        console.log(intervalo_1d, intervalo_15m)
    }


       
      

}*/