import { ExpressReqRes } from '../'
import { AppControllers } from '../../controllers'

export function generateToken(appControllers: AppControllers) {
    return async function handleGeneateTokenRequest({req, res} : ExpressReqRes) {
        const installTime = _extractInstallTimeFromRequest(req)
        const result = await appControllers.generateToken()
        res.json({id: result.id})
      }
}

export function _extractInstallTimeFromRequest(req) : string {
    return req.body.install_time
}