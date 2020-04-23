const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = function loadThirdPartyModule(moduleName, pluginSearchDir = '.') {
  const resolvedPluginSearchDir = path.resolve(process.cwd(), pluginSearchDir)
  const nodeModulesDir = path.resolve(resolvedPluginSearchDir, 'node_modules')

  if (!isDirectory(nodeModulesDir) && !isDirectory(resolvedPluginSearchDir)) {
    throw new Error(`${pluginSearchDir} does not exist or is not a directory`)
  }

  let module
  try {
    const requirePath = require.resolve(moduleName, {
      paths: [resolvedPluginSearchDir]
    })
    module = require(requirePath)
  } catch (e) {
    console.error(
      chalk.red(`[solhint] Error: Could not load '${moduleName}', make sure it's installed.`)
    )
    process.exit(1)
  }

  return module
}

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory()
  } catch (e) {
    return false
  }
}
