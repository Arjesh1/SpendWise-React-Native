import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { useSelector } from 'react-redux'

const LoadingComponent = () => {
    const {showLoader} = useSelector(state=> state.system)
  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={showLoader}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <View style={{ backgroundColor: GlobalStyles.colors.gray200, padding: 25, borderRadius:5 }}>
                  <ActivityIndicator size="large" color={GlobalStyles.colors.primary700} />
                </View>
            </View>
      </Modal>
  )
}

export default LoadingComponent
