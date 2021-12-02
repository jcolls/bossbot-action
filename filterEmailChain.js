  const core = require("@actions/core");
module.exports = async function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }
  
  const filterReply = async (issueComment) => {
    /**
     * Remove email chains from an issue comment
     * @type {RegExp}
     */

  /**   const EMAIL_REGEX = core.getInput("regex_token");    not working if passed in as parameter*/
     const EMAIL_REGEX = /\[ABC logo\]([\s\S]*?)Number 259647/gm;  
            
     console.log(EMAIL_REGEX);
   
    if (issueComment.match(EMAIL_REGEX) !== null) {
      console.log('Filtering issue comment for outlook remenants');
      const filteredComment = async () => {
        return issueComment.replace(EMAIL_REGEX, '[Email Signature Auto Removed]');
      };
      return await filteredComment();
    } else {
      console.log('No email reply detected');
      return false;
    }
  };

  const updatedComment = await filterReply(issueComment);
  return updatedComment;
 };
