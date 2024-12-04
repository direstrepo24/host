export interface Module {
  name: string;
  description: string;
  path: string;
}

export const modules: Module[] = [
  {
    name: 'Module 1',
    description: 'Data management and event system demonstration',
    path: '/module1'
  },
  {
    name: 'Module 2',
    description: 'Analytics and metrics visualization',
    path: '/module2'
  }
];
