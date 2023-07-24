interface Result {
  code: number;
  message: string;
}

const messageRegex = /SERVICE_ERROR\[([\d]+?)\]:(.+?)$/;

export const checkServiceError = (message?: string): null | Result => {
  const matchedMessage = message?.match(messageRegex);
  if (!matchedMessage) {
    return null;
  }

  const [, code, errorMessage] = matchedMessage;

  return {
    code: parseInt(code, 10),
    message: errorMessage,
  };
};
