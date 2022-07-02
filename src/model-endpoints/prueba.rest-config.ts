import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Prueba} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Prueba,
  pattern: 'CrudRest',
  dataSource: 'Prueba',
  basePath: '/pruebas',
  readonly: false,
};
module.exports = config;
