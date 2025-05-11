 function generateTestEmail(prefix: string = 'aqa', domain: string = 'test.com'): string {
  const timestamp = Date.now();
  return `${prefix}-${timestamp}@${domain}`;
}

export default generateTestEmail;