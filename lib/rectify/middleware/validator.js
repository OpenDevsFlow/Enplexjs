
function validator(schema) {
  return (req, res, next) => {
    const { error } = validate(req.body, schema);
    
    if (error) {
      res.setStatus(400);
      res.json({ error: error.details.map(x => x.message) });
      return;
    }
    
    next();
  };
}

function validate(data, schema) {
  const errors = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !data[field]) {
      errors.push({ field, message: `${field} is required` });
      continue;
    }
    
    if (rules.type && data[field] && typeof data[field] !== rules.type) {
      errors.push({ field, message: `${field} must be of type ${rules.type}` });
    }
    
    if (rules.min && data[field] && data[field].length < rules.min) {
      errors.push({ field, message: `${field} must be at least ${rules.min} characters` });
    }
    
    if (rules.max && data[field] && data[field].length > rules.max) {
      errors.push({ field, message: `${field} must be at most ${rules.max} characters` });
    }
  }
  
  return { error: errors.length ? { details: errors } : null };
}

module.exports = validator;
