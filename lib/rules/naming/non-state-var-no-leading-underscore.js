const BaseChecker = require('./../base-checker')
const naming = require('./../../common/identifier-naming')

const ruleId = 'non-state-var-no-leading-underscore'
const meta = {
  type: 'naming',

  docs: {
    description: `State variable name not start with underscore.`,
    category: 'Style Guide Rules'
  },

  isDefault: false,
  recommended: true,
  defaultSetup: 'warn',

  schema: null
}

class NonStateVarNoLeadingUnderscoreChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  VariableDeclaration(node) {
    if (!node.isStateVar && naming.hasLeadingUnderscore(node.name)) {
      this.error(node, 'Non-State variable name must not start with underscore ')
    }
  }
}

module.exports = NonStateVarNoLeadingUnderscoreChecker
