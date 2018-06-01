import { ExpressReqRes } from '../'

export function generateToken() {
    console.log('Here in the generate token')
    return async function handleGeneateTokenRequest({req, res} : ExpressReqRes) {
        res.json({id: 'test'})
      }
}