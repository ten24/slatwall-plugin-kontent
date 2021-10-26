import * as SlatwalSDK from '@slatwall/slatwall-sdk'

const SlatwalApiService = SlatwalSDK.init({
  host: process.env.REACT_APP_SLATWALL_URL,
})

export { SlatwalApiService }
