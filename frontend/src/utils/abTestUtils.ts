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

export const getVariantForUser = (
  userId: string | null,
  sessionId: string,
  testId: string,
  variantA: string,
  variantB: string
): string => {
  const hash = generateConsistentHash(userId, sessionId, testId);
  return hash % 2 === 0 ? variantA : variantB;
};
