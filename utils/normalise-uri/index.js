import normalisePath from './normalise-path.js'
import withTrailingSlash from './with-trailing-slash.js'

const decodeSchema = s => s.replace(/<<HTTP>>/g, 'http://').replace(/<<HTTPS>>/g, 'https://')
const encodeSchema = s => s.replace(/http:\/\//g, '<<HTTP>>').replace(/https:\/\//g, '<<HTTPS>>')

export default uri => (
  decodeSchema(
    normalisePath(
      withTrailingSlash(
        encodeSchema(uri)
      )
    )
  )
)
