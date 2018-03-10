import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { loadingDecks } from '../actions';
import { getDecks } from '../utils/storage';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';
import { colors } from '../utils/constants';
import AppButton from './AppButton'

class DeckList extends Component {
  state = {
    ready: false,
  };

  componentDidMount(){
    getDecks()
      .then(decks => {
        this.props.dispatch(loadingDecks(decks))
      })
      .then(() => this.setState(() => ({ready: true})))
      .then(clearLocalNotification)
      .then(setLocalNotification)
  };

  render() {
    const { decks, deckList } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        { deckList.length ?
            deckList.map(deck => (
              <TouchableOpacity
                key={deck.title}
                onPress={() => this.props.navigation.navigate('DeckMain', {deckName: deck.title})}
                style={styles.touch}
              >
                  <View style={styles.viewInfo}>
                    <View>
                      <Text style={styles.titleCard}>{`${deck.title}`.toUpperCase()}</Text>
                      <Text style={styles.infoCard}>{deck.questions.length} CARDS</Text>
                    </View>
                    {Platform.OS === 'ios' ?
                      <MaterialCommunityIcons name="chevron-right" size={30} color={colors.charlestonGreen} />
                      :
                      <FontAwesome name="chevron-right" size={20} color={colors.charlestonGreen} />
                    }
                  </View>
              </TouchableOpacity>
            )) :
            <View style={[styles.container, {margin: 20, alignSelf: 'center'} ]}>
              <Text style={styles.titleCard}>
                  Nenhum deck cadastrado ainda!!!
              </Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: 1
  },
  touch: {
    backgroundColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: colors.white,
    borderWidth: 1
  },
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCard: {
    color: colors.charlestonGreen,
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoCard: {
    color: colors.white,
    fontSize: 10,
  }
});

const mapStateToProps = (decks) => ({
  decks,
  deckList: (typeof decks == 'object' ? Object.keys(decks).map(deckName => decks[deckName]) : []),
});

export default connect(mapStateToProps,)(DeckList);
