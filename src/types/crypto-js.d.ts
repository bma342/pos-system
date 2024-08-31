declare module 'crypto-js' {
  export function SHA256(message: string): { toString(): string };
}