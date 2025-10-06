import { serverAddr } from '../../consts/serverAddr.js'
import { HTTPClient } from './HTTPClient.js'

export default HTTPClient.create({ baseUrl: serverAddr })
