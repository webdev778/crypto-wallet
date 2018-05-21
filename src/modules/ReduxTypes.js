// @flow

import type {
  EdgeAccount,
  EdgeContext,
  EdgeCurrencyPlugin,
  EdgeCurrencyWallet,
  EdgeDenomination,
  EdgeLobby,
  EdgeParsedUri,
  EdgeTransaction
} from 'edge-core-js'
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'

import type { ContactsState } from '../reducers/contacts/contactsReducer.js'
import type { PermissionsState } from '../reducers/permissions/permissionsReducer.js'
import type { DeviceDimensions, GuiContact, GuiCurrencyInfo, GuiWallet, TransactionListTx } from '../types'
import type { Permission, PermissionStatus } from './UI/permissions.js'
import type { RequestState } from './UI/Request/reducer.js'
import type { RequestSceneState } from './UI/scenes/Request/reducer.js'

import type { PasswordReminderModalState } from './UI/components/PasswordReminderModal/indexPasswordReminderModal.js'
import type { PasswordReminderState } from '../reducers/passwordReminder/indexPasswordReminder.js'
export type Action = { type: string, data?: any }

export type CurrencyCode = string
export type Id = string
export type Username = string
export type { PermissionsState, PermissionStatus, Permission }

export type State = {
  core: {
    account: EdgeAccount,
    context: {
      context: EdgeContext,
      usernames: Array<Username>,
      nextUsername: Username
    },
    wallets: {
      byId: {
        [Id]: EdgeCurrencyWallet
      }
    },
    edgeLogin: {
      lobby: EdgeLobby | null,
      error: Error | null,
      isProcessing: boolean
    },
    deepLinking: {
      passwordRecoveryLink: string | null
    }
  },
  ui: {
    passwordReminder: PasswordReminderState,
    errorAlert: {
      displayAlert: boolean,
      message: string
    },
    transactionAlert: {
      displayAlert: boolean,
      edgeTransaction: EdgeTransaction
    },
    scenes: {
      passwordReminderModal: PasswordReminderModalState,
      scan: {
        parsedUri: EdgeParsedUri | null,
        torchEnabled: boolean,
        addressModalVisible: boolean,
        scanEnabled: boolean,
        selectedWalletListModalVisibility: boolean,
        scanToWalletListModalVisibility: boolean,
        legacyAddressModal: {
          isActive: boolean
        }
      },
      sendConfirmation: {
        transaction: EdgeTransaction | null,
        parsedUri: EdgeParsedUri,
        error: Error | null,
        label: string,
        networkFeeOption: 'low' | 'standard' | 'high' | 'custom',
        customNetworkFee: any,
        isKeyboardVisible: boolean,
        forceUpdateGuiCounter: number,
        pending: boolean
      },
      changeMiningFee: {
        isCustomFeeVisible: boolean
      },
      transactionList: {
        transactions: Array<TransactionListTx>,
        contactsList: Array<GuiContact>,
        updatingBalance: boolean,
        searchVisible: boolean,
        currentCurrencyCode: string,
        currentWalletId: string,
        numTransactions: number,
        currentEndIndex: number
      },
      transactionDetails: {
        subcategories: Array<any>
      },
      controlPanel: {
        usersView: boolean,
        selectedUser: Username
      },
      walletList: {
        renameWalletModalVisible: boolean,
        deleteWalletModalVisible: boolean,
        resyncWalletModalVisible: boolean,
        getSeedWalletModalVisible: boolean,
        splitWalletWalletModalVisible: boolean,
        walletArchivesVisible: boolean,
        renameWalletInput: string,
        walletId: string,
        walletName: string,
        privateSeedUnlocked: boolean,
        xPubSyntax: string,
        viewXPubWalletModalVisible: boolean
      },
      walletTransferList: {
        walletTransferList: Array<any>,
        walletListModalVisible: boolean
      },
      walletListModal: {
        walletListModalVisibility: boolean
      },
      sideMenu: {
        view: boolean
      },
      createWallet: {
        isCreatingWallet: boolean
      },
      editToken: {
        deleteTokenModalVisible: boolean,
        deleteCustomTokenProcessing: boolean,
        editCustomTokenProcessing: boolean
      },
      request: RequestSceneState,
      dimensions: DeviceDimensions,
      helpModal: boolean,
      transactionAlert: {
        displayAlert: boolean,
        edgeTransaction: EdgeTransaction
      },
      exchangeRate: {
        exchangeRates: {}
      },
      ABAlert: {
        view: boolean,
        route: string,
        syntax: {
          title: string,
          message: string,
          buttons: Array<{ title: string, message: string }>
        }
      },
      requestType: {
        useLegacyAddress: boolean,
        receiveAddress: {},
        uniqueLegacyAddress: boolean
      },
      currentScene: string
    },
    wallets: {
      byId: { [walletId: Id]: GuiWallet },
      activeWalletIds: Array<Id>,
      archivedWalletIds: Array<Id>,
      selectedWalletId: string,
      selectedCurrencyCode: string,
      addTokenPending: boolean,
      manageTokensPending: boolean,
      walletLoadingProgress: { [walletId: string]: number }
    },
    request: RequestState,
    settings: {
      autoLogoutTimeInSeconds: number,
      defaultFiat: string,
      merchantMode: boolean,
      customTokens: Array<any>,
      bluetoothMode: boolean,
      otpMode: boolean,
      pinMode: boolean,
      pinLoginEnabled: boolean,
      changesLocked: boolean,
      loginStatus: boolean,
      isTouchSupported: boolean,
      isTouchEnabled: boolean,
      isOtpEnabled: boolean,
      otpResetPending: boolean,
      otpKey: string,
      [CurrencyCode]: {
        denomination: string,
        currencyName: string,
        currencyCode: string,
        denominations: Array<EdgeDenomination>,
        symbolImage: string,
        symbolImageDarkMono: string
      },
      plugins: {
        arrayPlugins: Array<EdgeCurrencyPlugin>,
        supportedWalletTypes: Array<string>,
        [pluginName: string]: EdgeCurrencyPlugin
      }
    }
  },
  cryptoExchange: {
    exchangeRate: number,
    nativeMax: string,
    nativeMin: string,
    minerFee: string,
    reverseExchange: number,
    reverseNativeMax: string,
    reverseNativeMin: string,
    reverseMinerFee: string,
    fromWallet: GuiWallet | null,
    fromCurrencyCode: string | null,
    fromNativeAmount: string,
    fromDisplayAmount: string,
    fromWalletPrimaryInfo: GuiCurrencyInfo, // EdgeCurrencyInfo | null,
    fromCurrencyIcon: string | null,
    fromCurrencyIconDark: string | null,
    toWallet: GuiWallet | null,
    toCurrencyCode: string | null,
    toNativeAmount: string,
    toDisplayAmount: string,
    toWalletPrimaryInfo: GuiCurrencyInfo, // EdgeCurrencyInfo | null,
    toCurrencyIcon: string | null,
    toCurrencyIconDark: string | null,
    insufficientError: boolean,
    feeSetting: 'low' | 'standard' | 'high' | 'custom',
    walletListModalVisible: boolean,
    confirmTransactionModalVisible: boolean,
    forceUpdateGuiCounter: number,
    shiftTransactionError: Error | null,
    genericShapeShiftError: Error | null,
    changeWallet: 'none',
    transaction: EdgeTransaction | null,
    fee: any,
    gettingTransaction: boolean,
    availableShapeShiftTokens: Array<any>,
    shiftPendingTransaction: boolean,
    quoteExpireDate: number | null
  },
  exchangeRates: number,
  permissions: PermissionsState,
  contacts: ContactsState
}

type ThunkDispatch<A> = ((Dispatch, GetState) => Promise<void> | void) => A

export type Reducer<S, A: Action> = (S, A) => S

export type Store = ReduxStore<State, Action>
export type GetState = () => State
export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
