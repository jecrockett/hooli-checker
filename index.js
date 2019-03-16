const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

function linkBuyerToFacility() {
  const shortIdLength = 15;

  const existingAccountsContents = fs.readFileSync(__dirname+'/existing-accounts.csv', 'utf8');
  const samAccountsContents = fs.readFileSync( __dirname+'/sam-accounts.csv', 'utf8');

  const existingAccounts = parse(existingAccountsContents, { columns: true });
  const samAccounts = parse(samAccountsContents, { columns: true });

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
  fs.writeFile('missing-accounts.txt', fileContents, 'utf8', (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  console.log(unmatched);
}

linkBuyerToFacility();