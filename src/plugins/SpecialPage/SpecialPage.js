import React, { useState, useEffect } from 'react'
import KontentPluginSDK from '../../services/kontentPluginSDK'

const KontentSDK = new KontentPluginSDK()

function SpecialPage() {
  const [loaded, setLoaded] = useState(false)

  KontentSDK.init(setLoaded)
  KontentSDK.setHeight(500)

  useEffect(() => {
    if (loaded) {
    }
  }, [loaded])

  return <div>{!loaded ? 'Loading ..' : 'Special Page'}</div>
}

export default SpecialPage
