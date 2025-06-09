/*
Save the code in memory for s short check (with no expiration date)
*/
const codeMap = new Map<string, string>();

export function saveCode(email: string, code: string) {
  codeMap.set(email, code);
}

export function validateCode(email: string, inputCode: string): boolean {
  const storedCode = codeMap.get(email);
  return storedCode === inputCode;
}

export function removeCode(email: string) {
  codeMap.delete(email);
}
