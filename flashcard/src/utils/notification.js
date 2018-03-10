import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { keys } from './constants';


export function clearLocalNotification () {
  return AsyncStorage.removeItem(keys.NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Hora de estudar!',
    body: "Vamos estudar seus cards?",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(keys.NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let dayNotification = new Date()
              dayNotification.setDate(dayNotification.getDate() + 1)
              dayNotification.setHours(20)
              dayNotification.setMinutes(0)
              
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: dayNotification,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(keys.NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
