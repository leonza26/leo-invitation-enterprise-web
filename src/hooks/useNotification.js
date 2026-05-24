import { useNotificationStore } from '../stores/notificationStore'

export const useNotification = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications, addNotification } = useNotificationStore()
  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead,
    markAllAsRead,
    clearAll: clearNotifications,
    notify: (msg) => addNotification(msg)
  }
}
