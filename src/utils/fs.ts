import * as fs from 'fs'

export function mkdirSyncIfNotExists(path : string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}
