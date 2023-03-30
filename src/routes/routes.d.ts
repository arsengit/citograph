import React from 'react';

import { RoutesEnum } from '@/config/enums/routesEnum';

/**
 * @description IRoute is an interface that contains the route information
 */
export interface IRoute {
  /**
   * @description path is the path of the route
   * @example
   * RoutesEnum.Projects
   * @type {RoutesEnum}
   */
  path: RoutesEnum;
  /**
   * @description showInSidebar is a boolean that determines if the route should be shown in the sidebar
   * @example
   * true
   * @type {boolean}
   * @default true
   */
  showInSidebar: boolean;
  /**
   * @description displayName is the name of the route that will be shown in the sidebar
   * @example
   * "Projects"
   * @type {string}
   */
  displayName: string | null;
  /**
   * @description icon is the icon of the route that will be shown in the sidebar
   * @example
   * <Icon name='dashboard' />
   * @type {string | React.ReactNode | null}
   */
  icon?: string | React.ReactNode | null;
  /**
   * @description exact is a boolean that determines if the route should be exact
   * @example
   * true
   * @type {boolean}
   * @optional
   */
  isExact?: boolean;
}
