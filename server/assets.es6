const { version: panelsVersion, vendorVersion } = require('../package.json');
const URI = process.env.NODE_ENV === 'production' ? 'https://cdn.usepanels.com/' : '/';
const EXT = process.env.NODE_ENV === 'production' ? '.min.js' : '.js';

export const panels = process.env.PANELS_RUNTIME_URI || `${URI}panels-${panelsVersion}${EXT}`;
export const vendor = process.env.PANELS_VENDOR_URI || `${URI}vendor-${vendorVersion}${EXT}`;
