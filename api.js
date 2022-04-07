const axios = require('axios');
const queryString = require('querystring');

const crypto = require('crypto');
const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const apiUrl = process.env.API_URL;
const coin = process.env.COIN;


async function accountInfo() {
    return privateCall('/v3/account');
}
// Adonai eu coloquei
async function newOrder(symbol, quantity, price, side = 'BUY', type = 'MARKET') {
    const data = {symbol, side, type, quantity };
     //eu alterei de parseInt para parseFloat
    if (price) data.price = parseFloat(price).toFixed(4);
    //if (type === 'MARKET') data.timeInForce = 'GTC';

    return privateCall('/v3/order', data, 'POST');

}

async function ordemOco(symbol,quantity,price,stopPrice,stopLimitPrice,side = 'SELL',stopLimitTimeInForce = 'GTC',listClientOrderIdOrderId,limitClientOrderIdOrderId,limitIcebergQty,stopClientOrderIdOrderId,stopIcebergQty,newOrderRespTypeOrderRespType){
    const data = {symbol,quantity,price,stopPrice,stopLimitPrice, side, stopLimitTimeInForce}
    if (price) data.price = parseFloat(price).toFixed(4);
    //if (type === 'OCO') data.timeInForce = 'GTC'

    return privateCall('/v3/order/oco', data, 'POST');

}


async function ContingencyType(symbol, quantity, price, stopPrice, trailingDelta, side = 'SELL', orderTypes = 'OCO', type = 'STOP_LOSS_LIMIT') {
    const data = { symbol,price , stopPrice, trailingDelta, side, type, quantity };
//eu alterei de parseInt para parseFloat
    if (price) data.price = parseFloat(price).toFixed(4);
    if (type === 'STOP_LOSS_LIMIT') data.timeInForce = 'GTC'

    return privateCall('/v3/order', data, 'POST');
    
}



async function privateCall(path, data = {}, method = 'GET') {
    if (!apiKey || !apiSecret)
        throw new Error('Preencha corretamente sua API KEY e SECRET KEY');

    const timestamp = Date.now();
    const recvWindow = 60000;//máximo permitido, default 5000

    const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(`${queryString.stringify({ ...data, timestamp, recvWindow })}`)
        .digest('hex');

    const newData = { ...data, timestamp, recvWindow, signature };
    const qs = `?${queryString.stringify(newData)}`;

    try {
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qs}`,
            headers: { 'X-MBX-APIKEY': apiKey }
        });
        return result.data;
    } catch (err) {
        console.log(err);
    }
}
//Adonai eu que coloquei candlestick

async function kline(symbol,interval){
    const candles = {symbol,interval};
    return publicCall('/v3/klines',candles,'GET')

} 
 
//Adonai eu que coloquei preço Medio atual
async function precoMedioAtual(symbol){
    const data = {symbol};
    return publicCall('/v3/avgPrice',data,'GET')

}  

//Adonai eu que fiz streamCandlestick
async function aggTrade(symbol){
    const data = {symbol}
    return publicCall('ltcusdt@aggTrade',data,'GET')
}

  

async function publicCall(path, data, method = 'GET') {
    try {
        const qs = data ? `?${queryString.stringify(data)}` : '';
        const result = await axios({
            method,
            url: `${process.env.API_URL}${path}${qs}`
        });
        return result.data;
    } catch (err) {
        console.error(err);
    }
}

// Adonai Eu que fiz
/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

 const runCommand = (options, callback) => {
    const { cmd, ...rest } = options;
   
    // create an array of observables
    const combine = () =>
     cmd.map((command, idx) => {
      const runner = manager[command];
      const result$ = runner(rest, idx);
   
      return result$.pipe(catchError(error => log.error(error)));
     });
   
    // subscribe to observables in order as previous completes
    concat(...combine()).subscribe(result => callback(result));
   }
  
async function subscribe(method , params, id ){
    const data = {method, params, id}
    return privateCall('wss://stream.binance.com:9443',data,'POST')
}

// Eu que fiz DELETANDO TODAS AS ORDENS

async function DELETE(symbol) {
    const data ={symbol}
    
    return privateCall('/v3/openOrders', data, 'DELETE');

}

async function LISTADEORDENS(symbol) {
    const data ={symbol}
    
    return privateCall('/v3/openOrders', data, 'GET');

}

async function listenKey(){ 
    const path = '/v3/userDataStream';
    if (!apiKey)
    throw new Error('Preencha corretamente sua API KEY');

   try {
        const result = await axios({
           method: 'POST',
           url: `${apiUrl}${path}`,
           headers: { 'X-MBX-APIKEY': apiKey }
        
        });
       return result.data;
    }  

    catch (err) {
        console.log(err);
    } 

    
    
}



async function ping() {
    return publicCall('/v3/ping');
}

async function time() {
    return publicCall('/v3/time');
}

async function depth(symbol = coin, limit = 5) {
    return publicCall('/v3/depth', { symbol, limit });
}

async function exchangeInfo(symbol) {
    const result = await publicCall('/v3/exchangeInfo');
    return symbol ? result.symbols.find(s => s.symbol === symbol) : result.symbols;
}

async function trades(symbol, fromId = 0, limit = 1000) {
    const path = '/v3/historicalTrades';

    if (!apiKey)
        throw new Error('Preencha corretamente sua API KEY');

    try {
        const result = await axios({
            method: 'GET',
            url: `${apiUrl}${path}?symbol=${symbol}&fromId=${fromId}&limit=${limit}`,
            headers: { 'X-MBX-APIKEY': apiKey }
        });
        return result.data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { ping, time, depth, exchangeInfo, accountInfo, newOrder, ContingencyType, trades, DELETE, kline, precoMedioAtual , aggTrade,LISTADEORDENS, ordemOco,listenKey }