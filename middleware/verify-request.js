const crypto = require('crypto');
const safeCompare = require('safe-compare');
const createError = require('http-errors');

const verifyRequest = ({ secret }) => {
  return (req, res, next) => {
    const hmac = req.get('X-Barrel-Hmac-Sha256');
    const id = req.get('X-Barrel-Customer-Id');

    const generatedHash = crypto
      .createHmac('sha256', secret)
      .update(id)
      .digest('hex');

    if (!safeCompare(generatedHash, hmac)) {
      return next(createError(401, 'Unable to verify request HMAC'));
    }

    next();
  };
};

module.exports = verifyRequest;
