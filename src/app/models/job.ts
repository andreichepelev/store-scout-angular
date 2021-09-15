export interface Job {
    os: {type: String },
    storedAppID: {type: String, index: true, required: true},
    type: {type: String, enum: ['manual', 'scheduled']},
    addedToQueue: {type: Boolean},
    zeroSubscribers: {type: String},
    backendResult: {type: String},
    puppeteerChromeResult: {type: String},
    puppeteerFirefoxResult: {type: String},
    newNotes: {type: Boolean},
    reportSent: {type: Boolean},
    dbUpdated: {type: String},
    invalid: {type: Boolean},
    scheduled: {type: Boolean},
    sentToWS: {type: Boolean}
}