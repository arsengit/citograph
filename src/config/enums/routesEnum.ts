/**
 * RoutesEnum is an enum that contains the routes of the application
 * @enum {string}
 * @example
 * import { RoutesEnum } from "config/enums/routesEnum";
 * const route = RoutesEnum.Projects;
 * console.log(route); // "/projects"
 */
enum RoutesEnum {
  HOME = '/',
  Projects = '/projects',
  PAPER = '/paper',
  AUTHORS = '/authors',
}

export { RoutesEnum };
