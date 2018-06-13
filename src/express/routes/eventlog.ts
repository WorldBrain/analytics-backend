import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function eventLog(appControllers: AppControllers) {
    return async function handleEventlogPutRequest({req, res} : ExpressReqRes) {        
        const event = _extractDataFromPostRequest(req) 

        const result = await appControllers.eventLog({event})
        
        res.json({id: result.success})
      }
}

function _extractDataFromPostRequest(req) : string {
    return req.body
}