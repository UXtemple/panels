const { version: panelsVersion, vendorVersion } = require('../package.json');

const isProduction = process.env.NODE_ENV === 'production';
const URI = isProduction ? '//cdn.uxtemple.com/' : '/';
const EXT = isProduction ? '.min.js' : '.js';

export const panels = process.env.PANELS_RUNTIME_URI || `${URI}panels-${panelsVersion}${EXT}`;
export const vendor = process.env.PANELS_VENDOR_URI || `${URI}vendor-${vendorVersion}${EXT}`;
