import useNotificationStore from '@/stores/notification';

import { IToastProps } from '../kit/Toast/Toast.d';

function useNotificationService() {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );
  const setNotification = useNotificationStore(
    (state) => state.setNotification,
  );

  const addNotification = (notification: IToastProps) => {
    setNotification(notification);
  };

  return { notifications, addNotification, removeNotification };
}

export default useNotificationService;
