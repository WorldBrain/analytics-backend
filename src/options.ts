export function getDeploymentTier() {
    return process.env.TIER || 'development'
}

export function getAwsBucketName({tier}) {
    return tier === 'production' ? process.env.AWS_BUCKET : null
}

export function getBaseUrl({tier, awsBucket}) {
    const bucketUrl = awsBucket && `http://${awsBucket}`
    return tier === 'development' ? bucketUrl || 'http://localhost:3000' : bucketUrl
}

export function getSettings() {
    const tier = getDeploymentTier()
    const awsBucket = getAwsBucketName({tier})
    const baseUrl = getBaseUrl({tier, awsBucket})
    return { tier, awsBucket, baseUrl }
}
