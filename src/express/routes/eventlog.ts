import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function eventLog(appControllers: AppControllers) {
    return async function handleEventlogPutRequest({req, res} : ExpressReqRes) {        
        let event = _extractDataFromPostRequest(req)

        if(!event["id"]) {
            res.json({success: false, message: "id is not present with events"})
        }

        let result
        try {
            result = await appControllers.eventLog({event})
        } catch(err) {
            res.json({success: false, message: err})
        }
        
        res.json({success: true})
      }
}

function _extractDataFromPostRequest(req) : string {
    return req.body
}