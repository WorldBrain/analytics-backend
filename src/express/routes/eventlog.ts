import { ExpressReqRes } from '../'

export function eventLog() {
    console.log('Here in the generate token')
    return async function handleEventlogPutRequest({req, res} : ExpressReqRes) {
        res.json({id: 'test'})
      }
}