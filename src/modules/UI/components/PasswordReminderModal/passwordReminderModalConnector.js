// @flow

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { checkPassword, requestChangePassword, setPasswordReminder } from './indexPasswordReminderModal.js'
import { PasswordReminderModal } from './PasswordReminderModal.ui.js'
import { postponePasswordReminder } from '../../../../reducers/passwordReminder/indexPasswordReminder.js'
import { CHANGE_PASSWORD } from '../../../../constants/indexConstants.js'

import type { State, Dispatch } from '../../../ReduxTypes.js'
import type { PasswordReminder } from '../../../../types.js'

export const mapStateToProps = (state: State) => ({
  loginStatus: state.ui.settings.loginStatus,
  status: state.ui.scenes.passwordReminderModal.status,
  isVisible: state.ui.passwordReminder.needsPasswordCheck,
  passwordReminder: state.ui.passwordReminder
})
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (password: string) => dispatch(checkPassword(password)),
  onRequestChangePassword: () => {
    Actions[CHANGE_PASSWORD]()
    dispatch(requestChangePassword())
  },
  onPostpone: () => dispatch(postponePasswordReminder()),
  setPasswordReminder: (passwordReminder: PasswordReminder) => dispatch(setPasswordReminder(passwordReminder))
})

export const passwordReminderModalConnector = connect(mapStateToProps, mapDispatchToProps)(PasswordReminderModal)
