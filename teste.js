/*const index = require('./index')
const api = require('./api')
const { precoAlto15, precoBaixo15 } = require('./index')
const symbol = process.env.SYMBOL
var FR = (Number(precoAlto15) / Number(precoBaixo15))
var IFR = 100 - (100 / ( 1 + FR))


setInterval(async function interva(){
    const carteira = await api.accountInfo();
    const coins = carteira.balances.filter(b => symbol.indexOf(b.asset) !== -1);
    console.log(coins);
    console.log(IFR)

    
   
    
},60000)*/
//let soma = 0

//var numeros = ["30" , "55" , "usdt" ,  "btcusdt", "xusdtx"  ]
/*numeros.forEach((current,index,array) => {
soma += current
})*/
    //var numeros2 =( Object.values(numeros))
  
//console.log(numeros3)

/*numeros2.forEach( (item)=>{
    if(item.endsWith("usdt"))
    console.log(item)
})*/
  
//var res = numeros.filter((item=> item.startsWith('b')))
//console.log(res)

//const res2=numeros.findIndex((item=>item.endsWith('t')))
//console.log(res2)



 
