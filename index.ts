import {  BlueboxResponse, IBlueboxService, MailCallback, MailData } from '~/types/Mail'
import { BlueboxError } from './src/errors'
import api, { ApiConnection } from './src/api'
import { buildEmailData, checkConnection, checkContent, checkKey } from './src/service/utils'

class BlueboxService implements IBlueboxService {
  private apiKey: string
  private connection: ApiConnection | null

  constructor (apiKey: string) {
    this.apiKey = apiKey
    this.connection = api(this.apiKey)
  }

  toString() {
    return ''
  }

  async send(data: MailData, callback?: MailCallback): Promise<BlueboxResponse | void> {
    checkKey(this.apiKey)
    checkConnection(this.connection)
    checkContent(data);

    const body = buildEmailData(data)

    const response = await this.connection!.post(
      '/smtp/email',
      body,
    )
    .then(response => {
			if(response.status === 401) {
				throw new BlueboxError('UNAUTHORIZED')
			}
      else if (response.status === 201 || response.status === 200) {
        if (callback !== undefined && typeof callback === 'function') {
          callback(response.data);
        }

        return  {
          status: response.status,
          date: response.headers.date,
          body: response.data,
        }
      }
      return {
        status: response.status,
        date: response.headers.date,
        body: `An error occurs: ${response.data.message}`
      }
    })
    .catch(err => {
      console.error('err',err)
      throw new BlueboxError('GENERIC_ERROR')
    })

    return response
  }

}

export default BlueboxService
