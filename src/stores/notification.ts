import { create } from 'zustand';

import { IToastProps } from '@/components/kit/Toast/Toast.d';

interface INotificationStore {
  notifications: IToastProps[];
  setNotification: (notification: IToastProps) => void;
  removeNotification: (id: string | number) => void;
}

const useNotificationStore = create<INotificationStore>((set, get) => ({
  notifications: [],
  setNotification: (notification: IToastProps) =>
    set({ notifications: [...get().notifications, notification] }),
  removeNotification: (id) =>
    set({
      notifications: get().notifications.filter(
        (notification) => notification.id !== id,
      ),
    }),
}));

export default useNotificationStore;
