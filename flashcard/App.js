import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import MainStatusBar from './src/components/MainStatusBar';
import MainNavigation from './src/components/MainNavigation';
import { colors } from './src/utils/constants';

const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    
    return (
      <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
          <MainStatusBar backgroundColor={colors.charcoal} barStyle='light-content' />
          <MainNavigation />
        </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.charcoal
  }
})
