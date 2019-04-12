const Countly = require('countly-sdk-nodejs');
import { EventLogStorage } from "./types";

export class CountlyEventLogStorage implements EventLogStorage {
    constructor(options : { countlyUrl : string, countlyAppKey : string }) {
        Countly.init({
            app_key: options.countlyAppKey,
            url: options.countlyUrl,
        })
    }

    async storeEvents(events: any) {
        if (events.data.length !== 1 || events.data[0].type !== 'uninstall') {
            return true
        }
        
        const userId = events.id
        const event = events.data[0]
        const time = event.time

        await Countly.add_event({
            key: 'uninstall',
            segmentation: {
                userId,
                time
            }
        })

        return true
    }
}