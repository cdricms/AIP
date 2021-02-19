export default interface Settings {
  project_path: string;
  applications: Array<Application>;
  gh_unauthorized: Array<string>;
  editor: string;
}

export interface Application {
  application: string;
  commands: Array<string>;
  path: string;
  package_origin: string;
  packages: Array<string>;
}
