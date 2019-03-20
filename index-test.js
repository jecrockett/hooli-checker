const assert = require('assert');
const findMissingAccounts = require('./index.js');

const samAccountsSample = `
accountHooliId,samUid
0013600001sq7Ys,rJgV_bOJ4
0013600001ms5al,rJgV_bOJ4
`.trim()

const existingAccountsSample = `
id,hooliId
2196,0013600001oVvosAAC
6769,0013600001sq7YsQAC
`.trim()

const expectedUnmatched = ['0013600001ms5al']

function testFindMissingAccounts() {
  assert.deepEqual(findMissingAccounts(existingAccountsSample, samAccountsSample), expectedUnmatched)
}

testFindMissingAccounts();