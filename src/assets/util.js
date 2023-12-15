export const calAge = ($birth) => ~~((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));
