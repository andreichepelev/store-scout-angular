export interface Job {
    os: String
    storedAppID: String
    appNameText: String
    type: String
    addedToQueue: Boolean
    zeroSubscribers: String
    backendResult: String
    puppeteerChromeResult: String
    puppeteerFirefoxResult: String
    newNotes: Boolean
    reportSent: Boolean
    dbUpdated: String
    invalid: Boolean
    scrapingError: String
    scheduled: Boolean
    sentToWS: Boolean
}