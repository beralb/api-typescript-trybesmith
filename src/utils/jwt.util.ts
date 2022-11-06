export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function otherErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}