import { IconClipboardList, IconHome } from '@tabler/icons-react';

import { RoutesEnum } from '@/config/enums/routesEnum';

import { IRoute } from './routes.d';

/**
 * The routes of the application.
 * @type {Record<string, IRoute>}
 * @constant
 * @readonly
 * @usage
 * import { routes } from "@/routes/routes";
 * const { HOME, PROJECTS } = routes;
 * <Link to={HOME.path}>HOME</Link>
 */
const routes: Record<string, IRoute> = {
  DASHBOARD: {
    path: RoutesEnum.HOME,
    showInSidebar: false,
    displayName: 'Home',
    icon: <IconHome size={20} />,
    isExact: true,
  },
};

export { routes };
