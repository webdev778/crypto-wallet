// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { equals } from 'ramda'

import * as Constants from '../../../../constants/indexConstants.js'
import s from '../../../../locales/strings.js'
import { Icon } from '../Icon/Icon.ui'

import { InteractiveModal, SecondaryButton, TertiaryButton } from '../Modals'
import { PasswordInput } from './components/PasswordInput.ui.js'
import { styles } from './styles.js'
import type { PasswordReminder } from '../../../../types.js'

type Props = {
  status: 'IS_CHECKING' | 'VERIFIED' | 'INVALID' | null,
  isVisible: boolean,
  style?: Object,
  onSubmit: (password: string) => void,
  onRequestChangePassword: () => void,
  onPostpone: () => void,
  setPasswordReminder: (passwordReminder: PasswordReminder) => void,
  passwordReminder: PasswordReminder
}

type State = {
  password: string
}

export class PasswordReminderModal extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = this.initialState()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.loginStatus && !equals(this.props.passwordReminder, nextProps.passwordReminder)) {
      nextProps.setPasswordReminder(nextProps.passwordReminder)
    }
  }

  render () {
    const error = this.props.status === 'INVALID' ? s.strings.password_reminder_invalid : ''
    const isChecking = this.props.status === 'IS_CHECKING'
    return (
      <InteractiveModal isActive={this.props.isVisible} onModalHide={this.reset}>
        <InteractiveModal.Icon>
          <Icon style={styles.icon} name={Constants.LOCKED_ICON} type={Constants.ION_ICONS} />
        </InteractiveModal.Icon>

        <InteractiveModal.Title>
          <Text>{s.strings.password_reminder_remember_your_password}</Text>
        </InteractiveModal.Title>

        <InteractiveModal.Body>
          <InteractiveModal.Description>{s.strings.password_reminder_you_will_need_your_password}</InteractiveModal.Description>
          <InteractiveModal.Description>{s.strings.password_reminder_enter_password_below}</InteractiveModal.Description>

          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <PasswordInput onChangeText={this.onChangeText} error={error} />
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Body>

        <InteractiveModal.Footer>
          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <TertiaryButton onPress={this.onSubmit} disabled={isChecking}>
                {isChecking ? <ActivityIndicator /> : <TertiaryButton.Text>{s.strings.password_reminder_check_password}</TertiaryButton.Text>}
              </TertiaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>

          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <TertiaryButton onPress={this.onRequestChangePassword} disabled={isChecking}>
                <TertiaryButton.Text>{s.strings.password_reminder_forgot_password}</TertiaryButton.Text>
              </TertiaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>

          <InteractiveModal.Row>
            <InteractiveModal.Item>
              <SecondaryButton onPress={this.onPostpone} disabled={isChecking}>
                <SecondaryButton.Text>{s.strings.password_reminder_postpone}</SecondaryButton.Text>
              </SecondaryButton>
            </InteractiveModal.Item>
          </InteractiveModal.Row>
        </InteractiveModal.Footer>
      </InteractiveModal>
    )
  }

  onChangeText = (password: string) => {
    this.setState({
      password
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.password)
  }

  onRequestChangePassword = () => {
    this.props.onRequestChangePassword()
  }

  onPostpone = () => {
    this.props.onPostpone()
    this.reset()
  }

  onDone = () => {
    this.reset()
  }

  reset = () => {
    this.setState(this.initialState())
  }

  initialState = () => ({
    password: ''
  })
}
