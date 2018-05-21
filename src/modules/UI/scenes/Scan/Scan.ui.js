// @flow

import slowlog from 'react-native-slowlog'
import React, { Component } from 'react'
import { ActivityIndicator, Text, TouchableHighlight, View } from 'react-native'
import Camera from 'react-native-camera'

// $FlowFixMe
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'

import * as Constants from '../../../../constants/indexConstants'
import s from '../../../../locales/strings.js'
import type { PermissionStatus } from '../../../ReduxTypes'
import WalletListModal from '../../../UI/components/WalletListModal/WalletListModalConnector'
import ABAlert from '../../components/ABAlert/indexABAlert'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import AddressModal from './components/AddressModalConnector'
import styles, { styles as styleRaw } from './style'
import LegacyAddressModal from './LegacyAddressModal/LegacyAddressModalConnector.js'

type Props = {
  cameraPermission: PermissionStatus,
  torchEnabled: boolean,
  scanEnabled: boolean,
  showToWalletModal: boolean,
  qrCodeScanned: (data: string) => void,
  toggleEnableTorch: () => void,
  toggleAddressModal: () => void,
  toggleScanToWalletListModal: () => void,
  addressModalDoneButtonPressed: () => void,
  legacyAddressModalContinueButtonPressed: () => void,
  legacyAddressModalCancelButtonPressed: () => void
}

const HEADER_TEXT = s.strings.send_scan_header_text

const DENIED_PERMISSION_TEXT = '' // blank string because way off-centered (not sure reason why)
// const TRANSFER_TEXT = s.strings.fragment_send_transfer
const ADDRESS_TEXT = s.strings.fragment_send_address
// const PHOTOS_TEXT   = s.strings.fragment_send_photos
const FLASH_TEXT = s.strings.fragment_send_flash

export default class Scan extends Component<Props> {
  constructor (props: Props) {
    super(props)
    slowlog(this, /.*/, global.slowlogOptions)
  }

  render () {
    const { addressModalDoneButtonPressed, legacyAddressModalContinueButtonPressed, legacyAddressModalCancelButtonPressed } = this.props

    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <Gradient style={styles.gradient} />
          <View style={styles.topSpacer} />

          <View style={styles.container}>
            {this.renderCamera()}

            <View style={[styles.overlay]}>
              <AddressModal onExitButtonFxn={this._onToggleAddressModal} doneButtonPressed={addressModalDoneButtonPressed} />

              <View style={[styles.overlayTop]}>
                <T style={[styles.overlayTopText]}>{HEADER_TEXT}</T>
              </View>

              <View style={[styles.overlayBlank]} />

              <Gradient style={[styles.overlayButtonAreaWrap]}>
                <TouchableHighlight style={styles.bottomButton} onPress={this._onToggleAddressModal} underlayColor={styleRaw.underlay.color}>
                  <View style={styles.bottomButtonTextWrap}>
                    <FAIcon style={[styles.addressBookIcon]} name="address-book-o" size={18} />
                    <T style={[styles.addressButtonText, styles.bottomButtonText]}>{ADDRESS_TEXT}</T>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.bottomButton} onPress={this._onToggleTorch} underlayColor={styleRaw.underlay.color}>
                  <View style={styles.bottomButtonTextWrap}>
                    <Ionicon style={[styles.flashIcon]} name="ios-flash-outline" size={24} />
                    <T style={[styles.flashButtonText, styles.bottomButtonText]}>{FLASH_TEXT}</T>
                  </View>
                </TouchableHighlight>
              </Gradient>
            </View>
            <ABAlert />
          </View>
          {this.props.showToWalletModal && <WalletListModal topDisplacement={Constants.SCAN_WALLET_DIALOG_TOP} type={Constants.FROM} />}
        </View>

        <LegacyAddressModal continueButtonPressed={legacyAddressModalContinueButtonPressed} cancelButtonPressed={legacyAddressModalCancelButtonPressed} />
      </SafeAreaView>
    )
  }

  _onToggleTorch = () => {
    this.props.toggleEnableTorch()
  }

  _onToggleAddressModal = () => {
    this.props.toggleAddressModal()
  }

  _onToggleWalletListModal = () => {
    this.props.toggleScanToWalletListModal()
  }

  selectPhotoTapped = () => {
    const options = { takePhotoButtonTitle: null }

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error && !response.customButton) {
        // this.refs.cameraCapture.capture({})
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // TODO: make edgelogin work with image picker -paulvp
        /* if (/^airbitz:\/\/edge\//.test(uri)) {
          return
        } */
        Actions.sendConfirmation()
      }
    })
  }

  renderCamera = () => {
    if (this.props.cameraPermission === AUTHORIZED) {
      const torchMode = this.props.torchEnabled ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off

      return <Camera style={styles.preview} ref="cameraCapture" torchMode={torchMode} onBarCodeRead={({ data }) => this.props.qrCodeScanned(data)} />
    } else if (this.props.cameraPermission === DENIED) {
      return (
        <View style={[styles.preview, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>{DENIED_PERMISSION_TEXT}</Text>
        </View>
      )
    } else {
      return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    }
  }
}
