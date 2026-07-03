/**
 * Safe type-narrowed error extractor to avoid unsafe type assertions in linters.
 * @param err Unknown error object.
 * @param defaultMessage Default fallback error message.
 * @returns The extracted error message or fallback.
 */
export const getAuthErrorMessage = (err: unknown, defaultMessage: string): string => {
  if (err && typeof err === 'object' && 'response' in err) {
    const { response } = err as { response: unknown };
    if (response && typeof response === 'object' && 'data' in response) {
      const { data } = response as { data: unknown };
      if (data && typeof data === 'object' && 'message' in data) {
        const { message } = data as { message: unknown };
        if (typeof message === 'string') {
          return message;
        }
      }
    }
  }
  return defaultMessage;
};
