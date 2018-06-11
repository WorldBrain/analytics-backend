import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function uninstall(appControllers: AppControllers) {
    return async function handleUninstallRequest({req, res} : ExpressReqRes) {
        const unInstallTime = _extractUninstallFromRequest(req)
        const id = _extractIdFromRequest(req)

        const event = {
            id: id,
            data: [{
                type: 'uninstall',
                other: [],
                time: unInstallTime
            }]
        }

        const result = await appControllers.eventLog({event})
        res.redirect('https://example.com/')
      }
}

export function _extractUninstallFromRequest(req) : string {
    return req.param('uninstall_time')
}

export function _extractIdFromRequest(req) : string {
    return req.param('id')
}