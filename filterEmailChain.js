module.exports = async function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }
  
  const core = require("@actions/core");

  const filterReply = async (issueComment) => {
    /**
     * Remove email chains from an issue comment
     * Handles Outlook and Gmail
     * @type {RegExp}
     */
    const EMAIL_REGEX = core.getInput("REGEX_TOKEN");

    if (issueComment.match(EMAIL_REGEX) !== null) {
      console.log('Filtering issue comment for outlook remenants');
      const filteredComment = async () => {
        return issueComment.replace(EMAIL_REGEX, '');
      };
      return await filteredComment();
    } else {
      console.log('No email reply detected');
      return false;
    }
  };

  const filterBoss = async (updatedComment) => {
    /**
     * Remove any previous BossBot annotations
     * @type {RegExp}
     */
    const BOSS_COPY_REGEX = /^ *(Edited by .*🤖)\s*$/gm;
    if (updatedComment.match(BOSS_COPY_REGEX) !== null) {
      return updatedComment.replace(BOSS_COPY_REGEX, '');
    } else {
      return updatedComment;
    }
  };
  const updatedComment = await filterReply(issueComment);

  if (updatedComment !== false) {
    return await filterBoss(updatedComment);
  } else {
    return updatedComment;
  }
};
