import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function eventLog(appControllers: AppControllers) {
    return async function handleEventlogPutRequest({req, res} : ExpressReqRes) {
        const data = _extractDataFromPostRequest(req)
        
        res.json({id: 'test', data: data})
      }
}

export function _extractDataFromPostRequest(req) : string {
    return req.body
}