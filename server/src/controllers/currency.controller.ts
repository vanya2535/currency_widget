import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Currency} from '../models';
import {CurrencyRepository} from '../repositories';

export class CurrencyController {
  constructor(
    @repository(CurrencyRepository)
    public currencyRepository : CurrencyRepository,
  ) {}

  @post('/currencies')
  @response(200, {
    description: 'Currency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Currency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrency',
            
          }),
        },
      },
    })
    currency: Currency,
  ): Promise<Currency> {
    return this.currencyRepository.create(currency);
  }

  @get('/currencies/{id}')
  @response(200, {
    description: 'Currency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Currency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Currency, {exclude: 'where'}) filter?: FilterExcludingWhere<Currency>
  ): Promise<Currency> {
    return this.currencyRepository.findById(id, filter);
  }
}
