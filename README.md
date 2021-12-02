# Github Issue Comment Email Signature Cleanup - Github action

Github action that looks for unwanted email content in issue comments and removes it.

Instead of standard email reply text format from Outlook and Gmail which the original used, this fork requires a custom regex string.

It works when comments are posted or edited on issues.

## How to use

_If you do not have any Github actions already set up in your repo, start by creating a .github/workflows folder._

Inside your workflows folder, create a new .yml file, for example `main.yml` and copy the following lines:

Don't forget that this must be merged into your primary branch (such as `main` or `master`) for Github to see it.

```yml
on: [issue_comment]

jobs:
  bossbot_issue_comment_cleanup:
    runs-on: ubuntu-latest
    name: Issues Email Signature Cleaner
    steps:
      - uses: actions/checkout@v2
      - name: Issues Email Signature Cleaner - action step
        uses: jcolls/issue-signature-cleaner-action@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REGEX_TOKEN: (?s)(?<=[XYZC logo]|From).*?(?=2123456)
          SHOW_ANNOTATION: true
```
- `REGEX_TOKEN` is **required** this is the REGEX you want to search for in a comment in order to remove it.
 For example this reg ex finds either a logo file called XYZ LOGO or the Word From and then everything up to or a unique sequence of numbers (2123456) which might be a company vat or reg number.  (?s)(?<=[XYZC logo]|From).*?(?=2123456)
You can test regex here: https://regex101.com/

**Currently, the regex token is not being passed through to the action corectly and therefore the regex is hard coded :-( in filterEmailChain.js**

- `GITHUB_TOKEN` is **required** (note that
  Github [automatically creates this token](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow#:~:text=and%20use%20secrets.-,About%20the%20GITHUB_TOKEN%20secret,authenticate%20in%20a%20workflow%20run.&text=The%20token's%20permissions%20are%20limited,%22Permissions%20for%20the%20GITHUB_TOKEN%20.%22))
  but two other parameters are optional:
- `show_annotation` is optional and true if unset. Set to false if you do not want messages edited by BossBot to include
  an annotation
  
The action can take up to ~30 seconds to run after an issue comment is added or edited.

## Acknowledgements
This is a fork of [BossBot](https://github.com/banagale/bossbot-action) which is based originally on [safe-space](https://github.com/charliegerard/safe-space)
by [@charliegerard](https://github.com/charliegerard)
