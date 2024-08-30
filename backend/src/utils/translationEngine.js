class TranslationEngine {
  constructor(mapping) {
    this.mapping = mapping;
  }

  translate(internalData) {
    const translatedData = {};

    for (const [internalKey, posKey] of Object.entries(this.mapping)) {
      translatedData[posKey] = internalData[internalKey];
    }

    return translatedData;
  }

  // Add methods to support complex translation scenarios (e.g., nested objects, array mappings)
  translateNestedData(internalData, nestedMappings) {
    const translatedData = {};

    for (const [internalKey, posKey] of Object.entries(nestedMappings)) {
      if (internalData[internalKey] && typeof internalData[internalKey] === 'object') {
        translatedData[posKey] = this.translate(internalData[internalKey]);
      } else {
        translatedData[posKey] = internalData[internalKey];
      }
    }

    return translatedData;
  }
}

module.exports = TranslationEngine;
