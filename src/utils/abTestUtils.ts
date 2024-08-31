import { SHA256 } from 'crypto-js';

export const generateConsistentHash = (
  userId: string | null,
  experimentId: string
): number => {
  const input = `${userId || 'anonymous'}-${experimentId}`;
  const hash = SHA256(input).toString();
  return parseInt(hash.substr(0, 8), 16) / 0xffffffff;
};

export const assignVariant = (
  userId: string | null,
  experimentId: string,
  variants: string[],
  weights: number[] = []
): string => {
  const hash = generateConsistentHash(userId, experimentId);
  
  if (weights.length === 0) {
    weights = new Array(variants.length).fill(1 / variants.length);
  }

  let cumulativeWeight = 0;
  for (let i = 0; i < variants.length; i++) {
    cumulativeWeight += weights[i];
    if (hash < cumulativeWeight) {
      return variants[i];
    }
  }

  return variants[variants.length - 1];
};

export const isInExperiment = (
  userId: string | null,
  experimentId: string,
  percentage: number
): boolean => {
  const hash = generateConsistentHash(userId, experimentId);
  return hash < percentage / 100;
};