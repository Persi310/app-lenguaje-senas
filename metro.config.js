// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agrega soporte para archivos .cjs
config.resolver.sourceExts.push('cjs');

// Desactiva la resolución de exports inestables
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
