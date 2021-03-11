module.exports = async function cleanupMessage(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('cleanupMessage expects a string');
  }

  const removeDoubleNewlines = async (issueComment) => {
    const DOUBLE_NEWLINE_REGEX = /\n{2}/g;
    if (issueComment.match(DOUBLE_NEWLINE_REGEX) !== null) {
      console.log('Filtering issue comment for outlook remenants');
      const filteredComment = async () => {
        return issueComment.replace(DOUBLE_NEWLINE_REGEX, '\n');
      };
      return await filteredComment();
    } else {
      console.log('No double-newlines detected');
      return false;
    }
  };

  const updatedComment = await removeDoubleNewlines(issueComment);
  return updatedComment;
};
