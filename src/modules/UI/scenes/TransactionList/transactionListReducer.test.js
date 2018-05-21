/* eslint-disable flowtype/require-valid-file-annotation */

/* globals test expect */

import { transactionList as transactionListReducer } from './reducer.js'

test('initialState', () => {
  const expected = {
    searchVisible: false,
    transactions: [],
    transactionsWalletListModalVisibility: false,
    updatingBalance: true,
    loadingTransactions: false,
    currentCurrencyCode: '',
    currentEndIndex: 0,
    numTransactions: 0,
    currentWalletId: ''
  }
  const actual = transactionListReducer(undefined, {})

  expect(actual).toEqual(expected)
})
