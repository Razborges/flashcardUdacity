import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import DeckMain from './DeckMain';
import Quiz from './Quiz';
import NewCard from './NewCard';
import { colors } from '../utils/constants';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Entypo name='documents' size={25} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NOVO DECK',
      tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
    }
  },
},
{
  navigationOptions: {
    // header: null,
    title: 'FLASHCARDS',
    headerStyle:
      Platform.OS === 'ios' ? {
        maxHeight: 40,
        paddingBottom: 20,
        backgroundColor: colors.charcoal,
      }
      :
      {
        backgroundColor: colors.charcoal
    },
    headerTintColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 14
    },
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
    style: {
      height: 60,
      backgroundColor: colors.charcoal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckMain: {
    screen: DeckMain,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deckName}`.toUpperCase(),
      headerTintColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
      headerStyle:
        Platform.OS === 'ios' ? {
          maxHeight: 40,
          paddingBottom: 20,
          backgroundColor: colors.charcoal,
        }
        :
        {
          backgroundColor: colors.charcoal
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14
      },
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'QUIZ',
      headerTintColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
      headerStyle:
        Platform.OS === 'ios' ? {
          maxHeight: 40,
          paddingBottom: 20,
          backgroundColor: colors.charcoal,
        }
        :
        {
          backgroundColor: colors.charcoal
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14
      },
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({navigation}) => ({
      title: 'NOVO CARD',
      headerTintColor: Platform.OS === 'ios' ? colors.tangerine : colors.androidGreen,
      headerStyle:
        Platform.OS === 'ios' ? {
          maxHeight: 40,
          paddingBottom: 20,
          backgroundColor: colors.charcoal,
        }
        :
        {
          backgroundColor: colors.charcoal
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 14
      },
    })
  }
})

export default MainNavigation;
