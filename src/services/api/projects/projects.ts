import { API } from '../api';
import ENDPOINTS from '../endpoints';

import { IProjectData, IProjectCreateData } from './projects.d';

/**
 * fetchProjects is a function that makes a GET request to the projects endpoint
 * @returns IResponse<IProjectData[]>
 * @throws Error
 */
export function fetchProjects() {
  return API.get<IProjectData[]>(`${ENDPOINTS.PROJECTS.BASE}`);
}

/**
 * createProject is a function that makes a POST request to the projects endpoint
 * @param data is the data to be sent in the request body
 * @returns IResponse<IProjectData>
 * @throws Error
 */
export function createProject(data: IProjectCreateData) {
  return API.post<IProjectData>(`${ENDPOINTS.PROJECTS.BASE}`, data);
}

/**
 * getProject is a function that makes a GET request to the projects endpoint with the project id
 * @param id is the id of the project to be fetched
 * @returns IResponse<IProjectData>
 */
export function getProject(id: string) {
  return API.get<IProjectData>(`${ENDPOINTS.PROJECTS.BASE}/${id}`);
}

/**
 * updateProject is a function that makes a PUT request to the projects endpoint with the project id
 * @param data is the data to be sent in the request body
 * @returns IResponse<IProjectData>
 * @throws Error
 */
export function updateProject(id: string, data: IProjectCreateData) {
  return API.put<any>(`${ENDPOINTS.PROJECTS.BASE}/${id}`, data);
}

/**
 * deleteProject is a function that makes a DELETE request to the projects endpoint with the project id
 * @param id is the id of the project to be deleted
 * @returns IResponse<IProjectData>
 * @throws Error
 */
export function deleteProject(id: string) {
  return API.delete<IProjectData>(`${ENDPOINTS.PROJECTS.BASE}/${id}`);
}

/**
 * startProject is a function that makes a GET request to the projects endpoint with the project id
 * @param id is the id of the project to be started
 * @returns IResponse<IProjectData>
 * @throws Error
 */
export function startProject(id: string) {
  return API.get<IProjectData>(
    `${ENDPOINTS.PROJECTS.BASE}/${id}/${ENDPOINTS.PROJECTS.START}`,
  );
}

/**
 * stopProject is a function that makes a GET request to the projects endpoint with the project id
 * @param id is the id of the project to be stopped
 * @returns IResponse<IProjectData>
 * @throws Error
 */
export function stopProject(id: string) {
  return API.get<IProjectData>(
    `${ENDPOINTS.PROJECTS.BASE}/${id}/${ENDPOINTS.PROJECTS.STOP}`,
  );
}
