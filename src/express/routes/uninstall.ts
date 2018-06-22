import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function uninstall(appControllers: AppControllers) {
    return async function handleUninstallRequest({req, res} : ExpressReqRes) {
        let uninstallTime = _extractUninstallFromRequest(req)
        const id = _extractIdFromRequest(req)

        if(!id) {
            res.json({success: false, message: 'Id is not provided'})
        }

        if(!uninstallTime) {
            uninstallTime = Date.now()
        }

        const event = {
            id: id,
            data: [{
                type: 'uninstall',
                other: [],
                time: uninstallTime
            }]
        }

        let result
        try {
            result = await appControllers.eventLog({event})
        } catch(err) {
            res.json({success: false, message: err})
        }
        
        res.redirect('https://example.com/')
      }
}

function _extractUninstallFromRequest(req) : number {
    return req.param('uninstallTime')
}

function _extractIdFromRequest(req) : string {
    return req.param('user')
}