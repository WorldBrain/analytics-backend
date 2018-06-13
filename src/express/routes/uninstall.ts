import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function uninstall(appControllers: AppControllers) {
    return async function handleUninstallRequest({req, res} : ExpressReqRes) {
        const uninstallTime = _extractUninstallFromRequest(req)
        const id = _extractIdFromRequest(req)

        const event = {
            id: id,
            data: [{
                type: 'uninstall',
                other: [],
                time: uninstallTime
            }]
        }

        const result = await appControllers.eventLog({event})
        res.redirect('https://example.com/')
      }
}

function _extractUninstallFromRequest(req) : string {
    return req.param('uninstallTime')
}

function _extractIdFromRequest(req) : string {
    return req.param('user')
}