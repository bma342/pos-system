const NodeCache = require 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes default TTL

const getOrSetCache = async <T>(
  key,
  cb: () => Promise<T>
) => {
  const value = cache.get<T>(key);
  if (value) {
    return value;
  }

  const result = await cb();
  cache.set(key, result);
  return result;
};