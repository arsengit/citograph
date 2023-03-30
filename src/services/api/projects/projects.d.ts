export interface IProjectData {
  /**
   * @description uuid is the unique identifier of the project
   * @example "dcbae41e-aebd-11ed-a400-0242ac120003"
   * @type {string}
   */
  uuid: string;
  /**
   * @description name is the name of the project
   * @example "Name"
   * @type {string}
   */
  name: string;
  /**
   * @description description is the description of the project
   * @example "Description"
   * @type {string}
   */
  description: string;
  /**
   * @description state is the state of the project
   * @example "pending"
   * @type {string}
   */
  state: string;
  /**
   * @description updated_at is the date when the project was updated
   * @example "2023-02-17T12:23:19.396855"
   * @type {string}
   */
  updated_at: string;
  /**
   * @description created_at is the date when the project was created
   * @example "2023-02-17T12:23:19.396836"
   * @type {string}
   */
  created_at: string;
  /**
   * @description the server url of the project
   * @example "aim://0.0.0.0:8080:53800/New project"
   * @type {string}
   */
  tracking_server_url: string;
  /**
   * @description the ui url of the project
   * @example "0.0.0.0:8080:80/New project-ui"
   * @type {string}
   */
  project_ui_url: string;
}

// interface of the sending projects data to create a new project
export interface IProjectCreateData {
  /**
   * @description name is the name of the project
   * @example "Name"
   * @type {string}
   * @required
   */
  name: string;
  /**
   * @description description is the description of the project
   * @example "Description"
   * @type {string}
   * @required
   */
  description: string;
}
