const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

const existingAccountsFile = fs.readFileSync(__dirname+'/existing-accounts.csv', 'utf8');
const samAccountsFile = fs.readFileSync(__dirname+'/sam-accounts.csv', 'utf8');
let outputFileName;

if (require.main === module) {
  outputFileName = 'missing-accounts.txt'
  findMissingAccounts(existingAccountsFile, samAccountsFile);
} else {
  outputFileName = 'test-missing-accounts.txt'
}

function findMissingAccounts(existingAccountsFile, samAccountsFile) {
  const existingAccounts = parse(existingAccountsFile, { columns: true });
  const samAccounts = parse(samAccountsFile, { columns: true });
  const shortIdLength = 15; // could determine programmatically if needed

  const memo = {};
  const unmatched = [];

  existingAccounts.forEach(function(account) {
    memo[account.hooliId.slice(0, shortIdLength)] = null;
  });

  samAccounts.forEach(function(account) {
    if (!memo.hasOwnProperty(account.accountHooliId)) {
      unmatched.push(account.accountHooliId);
    }
  });

  const fileContents = "Unlinked Account Ids:\n" + unmatched.join('\n')
  writeToFile(outputFileName, fileContents);

  console.log(unmatched);
  return unmatched;
}

function writeToFile(fileName, contents) {
  fs.writeFile(fileName, contents, 'utf8', (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
}

module.exports = findMissingAccounts;