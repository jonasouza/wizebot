const startKeyboard = {

    inline_keyboard: [
        [
          {
            text: '• Gerar Número',
            callback_data: 'servicos'
          },
          {
            text: '• Nosso FAQ',
            callback_data: 'faq'
          }
        ],
        [
          {
            text: '• Recarregar',
            callback_data: 'recarregar'
          }
        ]
      ]

};

const configKeyboard = {

    inline_keyboard: [
        [
          {
            text: '📞 Selecionar operadora',
            callback_data: 'operadora'
          },
        ],
        [
          {
            text: '💸 Transferir saldo',
            callback_data: 'transferir'
          }
        ]
      ]

};

const rechargeKeyboard = {

  inline_keyboard: [
      [
        {
          text: 'Digitar o valor da recarga',
          callback_data: 'enterValue'
        }
      ],
      [
        {
          text: '+ R$0.10',
          callback_data: 'more01'
        },
        {
          text: '- R$0.10',
          callback_data: 'less01'
        }
      ],
      [
        {
          text: '+ R$1',
          callback_data: 'more1'
        },
        {
          text: '- R$1',
          callback_data: 'less1'
        }
      ],
      [
        {
          text: '+ R$5',
          callback_data: 'more5'
        },
        {
          text: '- R$5',
          callback_data: 'less5'
        }
      ],
      [
        {
          text: '+ R$10',
          callback_data: 'more10'
        },
        {
          text: '- R$10',
          callback_data: 'less10'
        }
      ],
      [
        {
          text: '• Pix',
          callback_data: 'payPix'
        }
      ],
    ]

};

const cancelPaymentKeyboard = {

  inline_keyboard: [
      [
        {
          text: '❌ Cancelar',
          callback_data: 'cancelPayment'
        }
      ]
    ]

};

export { startKeyboard, configKeyboard, rechargeKeyboard, cancelPaymentKeyboard };