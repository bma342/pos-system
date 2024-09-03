import { SHA256 } from 'crypto-js';

export const generateConsistentHash = (
  userId: string | null,
  sessionId: string,
  testId: string
): number => {
  const input = `${userId || sessionId}-${testId}`;
  const hash = SHA256(input);
  return parseInt(hash.toString().slice(0, 8), 16);
};

export function getVariantForUser(
  userId: string,
  sessionId: string,
  testId: string,
  variantA: string,
  variantB: string
): string {
  // Implement your A/B test variant selection logic here
  // This is a simple example, you might want to use a more sophisticated method
  const hash = hashString(`${userId}${sessionId}${testId}`);
  return hash % 2 === 0 ? variantA : variantB;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
