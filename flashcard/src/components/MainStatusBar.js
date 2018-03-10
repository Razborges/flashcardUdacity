import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

function MainStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default MainStatusBar;
