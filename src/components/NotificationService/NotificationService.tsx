import React from 'react';

import { ToastProvider, Toast } from '../kit/Toast';
import { IToastProps } from '../kit/Toast/Toast.d';

import useNotificationService from './useNotificationService';

function NotificationService(): React.FunctionComponentElement<React.ReactNode> {
  const { notifications, removeNotification } = useNotificationService();

  return (
    <ToastProvider>
      {notifications.map((notification: IToastProps) => (
        <Toast
          key={notification.id}
          onOpenChange={(open) => {
            if (!open) {
              removeNotification(notification.id);
            }
          }}
          {...notification}
        />
      ))}
    </ToastProvider>
  );
}

export default NotificationService;
