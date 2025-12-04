const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Map Joi details to a readable message list
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    // Replace req.body with the validated and coerced value
    req.body = value;
    next();
  };
};

module.exports = validate;
