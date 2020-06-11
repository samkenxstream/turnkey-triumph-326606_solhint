const assert = require('assert')
const linter = require('./../../../lib/index')
const contractWith = require('./../../common/contract-builder').contractWith
const funcWith = require('./../../common/contract-builder').funcWith

describe('Linter - non-state-var-no-leading-underscore', () => {
  it('should pass by default', () => {
    const code = funcWith('uint _b = 1;')

    const report = linter.processStr(code, {
      rules: {}
    })
    assert.equal(report.errorCount, 0)
  })

  it('should raise error if configured', () => {
    const code = funcWith('uint _b = 1;')
    const report = linter.processStr(code, {
      rules: { 'non-state-var-no-leading-underscore': 'error' }
    })
    assert.equal(report.errorCount, 1)
  })

  it('should not raise error for non state variable ', () => {
    const code = contractWith('uint _b = 1;')
    const report = linter.processStr(code, {
      rules: { 'non-state-var-no-leading-underscore': 'error' }
    })
    assert.equal(report.errorCount, 0)
  })

  it('should not raise error for non state mapping variable', () => {
    const code = contractWith('mapping (address => uint256) internal _balances;')
    const report = linter.processStr(code, {
      rules: { 'non-state-var-no-leading-underscore': 'error' }
    })
    assert.equal(report.errorCount, 0)
  })
})
