import { bot } from './src/utils/config.js';
import { startMessage, faqMessage, idMessage, instrMessage, configMessage, rechargeMessage, balanceMessage, myOperatorMessage, servicesMessage } from './src/functions/message.js';
import { faqCallback, rechargeCallback, paymentCallback, cancelPaymentCallback, updateOperatorCallback, getNumberCallback, backServiceMenu } from './src/functions/callback.js';
import { rechargeValue, createPayment, getAllServices } from './src/functions/query.js';
import { paymentMP } from './src/services/mercadopago.js';
import { webhook } from './routes/route.js';
import express from 'express';
var app = express();

// Mensagens Diretas
bot.on('message', (msg) => {

  if (msg.text.startsWith('/start')) {
    startMessage(bot, msg);
  } else if(msg.text.startsWith('/faq')) {
    faqMessage(bot, msg);
  } else if(msg.text.startsWith('/id')) {
    idMessage(bot, msg);
  } else if(msg.text.startsWith('/instrucoes')) {
    instrMessage(bot, msg);
  } else if(msg.text.startsWith('/config')) {
    configMessage(bot, msg);
  } else if(msg.text.startsWith('/recarregar')) {
    rechargeMessage(bot, msg.chat.id);
  } else if(msg.text.startsWith('/saldo')) {
    balanceMessage(bot, msg);
  } else if(msg.text.startsWith('/servicos')) {
    servicesMessage(bot, msg.chat.id);
  }
    
});

// Mensagens CallBack
bot.on('callback_query', (callbackQuery) => {

    const action = callbackQuery.data;
    
    if (action === 'faq') {

      faqCallback(bot, callbackQuery);

    } else if (action === 'recarregar') {

      rechargeMessage(bot, callbackQuery.message.chat.id);

    } else if (action === 'less01' || action === 'less1' || action === 'less5' || action === 'less10') {

      rechargeValue(callbackQuery).then(value => {

      let less = (action != 'less01' && action != 'less1') ? ((action === 'less5') ? 5 : 10) : ((action === 'less01') ? 0.10 : 1);
      let total = value - less;
      rechargeCallback(bot, callbackQuery, total);    /// Modularizar depois

      }).catch(error => {
        console.log(error);
      });

    } else if (action === 'more1' || action === 'more5' || action === 'more10') {
      
      rechargeValue(callbackQuery).then(value => {

        let less = (action != 'more1') ? ((action === 'more5') ? 5 : 10) : (1);
        let total = value + less;
        rechargeCallback(bot, callbackQuery, total); /// Modularizar depois
  
        }).catch(error => {
          console.log(error);
        });

    } else if (action === 'payPix') {
      
      rechargeValue(callbackQuery).then(value => {

        if(value >= 5){

          paymentMP(value).then(data => {

          createPayment(callbackQuery, data.response.id, value);
          paymentCallback(bot, callbackQuery, data.response.point_of_interaction.transaction_data.qr_code); /// Modularizar depois
    
          }).catch(error => {
            console.log(error);
          });
        } else {
          bot.answerCallbackQuery(callbackQuery.id, '⚠ Atenção | A recarga mínima é R$ 5,00');
        }
  
        }).catch(error => {
          console.log(error);
        });

    } else if(action === 'cancelPayment'){

      cancelPaymentCallback(bot, callbackQuery);

    } else if(action === 'operadora'){

      myOperatorMessage(bot, callbackQuery);

    } else if(action === 'aleatoria' || action === 'vivo' || action === 'oi' || action === 'claro' || action === 'tim'){

      updateOperatorCallback(bot, action, callbackQuery);

    } else if(action === 'servicos'){

      servicesMessage(bot, callbackQuery.message.chat.id);

    } else if(action === 'backServices'){

      backServiceMenu(bot, callbackQuery);

    }

    getAllServices().then(result => {

      for (let i = 0; i < result.length; i++) {
        if(action === `${result[i].service_callback}`){
          getNumberCallback(bot, callbackQuery, result[i]);
        }
      }

    });

});

webhook(app, express, bot);
var porta = process.env.PORT || 8080;
app.listen(porta);