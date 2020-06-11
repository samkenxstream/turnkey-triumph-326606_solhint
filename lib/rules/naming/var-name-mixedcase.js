const BaseChecker = require('./../base-checker')
const naming = require('./../../common/identifier-naming')
const { severityDescription } = require('../../doc/utils')

const DEFAULT_SEVERITY = 'warn'
const DEFAULT_OPTION = {
  forbidLeadingUnderscore: false
}
const ruleId = 'var-name-mixedcase'
const meta = {
  type: 'naming',

  docs: {
    description: `Variable name must be in mixedCase.`,
    category: 'Style Guide Rules',
    options: [
      {
        description: severityDescription,
        default: DEFAULT_SEVERITY
      },
      {
        description: 'A JSON object with options: forbidLeadingUnderscore(default: false)',
        default: JSON.stringify(DEFAULT_OPTION)
      }
    ]
  },

  isDefault: false,
  recommended: true,
  defaultSetup: [DEFAULT_SEVERITY, DEFAULT_OPTION],

  schema: {
    type: 'object',
    properties: {
      forbidLeadingUnderscore: {
        type: 'boolean'
      }
    }
  }
}

class VarNameMixedcaseChecker extends BaseChecker {
  constructor(reporter, config) {
    super(reporter, ruleId, meta)

    this.forbidLeadingUnderscore =
      config && config.getObjectPropertyBoolean(ruleId, 'forbidLeadingUnderscore', false)
  }

  VariableDeclaration(node) {
    if (!node.isDeclaredConst) {
      this.validateVariablesName(node)
    }
  }

  validateVariablesName(node) {
    if (naming.isNotMixedCase(node.name)) {
      this.error(node, 'Variable name must be in mixedCase')
    }
    if (this.forbidLeadingUnderscore && naming.hasLeadingUnderscore(node.name)) {
      this.error(node, 'Variable name must not start with underscore ')
    }
  }
}

module.exports = VarNameMixedcaseChecker
