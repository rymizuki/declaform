/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoreRouteFiles: ['**/.*', '**/components/**/*'],
  watchPaths: ['../../packages/**/*'],
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: ['@declaform/core', '@declaform/react']
}
