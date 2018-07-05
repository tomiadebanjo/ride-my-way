const signUp = (req, res, next) => {
  const nonCharTest = /[^a-zA-Z/\s/-]/g;
  const charTest = /[a-zA-Z]/g;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

  if (
    req.body.fullName === ''
    || typeof req.body.fullName === 'undefined'
    || req.body.fullName === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'fullName is required',
    });
  }
  if (!charTest.test(req.body.fullName)) {
    return res.status(400).send({
      success: 'false',
      message: 'fullName must contain at least one alphabet',
    });
  }
  if (nonCharTest.test(req.body.fullName)) {
    return res.status(400).send({
      success: 'false',
      message: 'fullName must be alphabetic, the use of spaces and - are allowed',
    });
  }
  if (
    req.body.password === ''
    || typeof req.body.password === 'undefined'
    || req.body.password === null
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'password is required',
    });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({
      success: 'false',
      message: 'Minimum password length is 6',
    });
  }
  if (!charTest.test(req.body.password)) {
    return res.status(400).send({
      success: 'false',
      message: 'password must contain at least 1 alphabet',
    });
  }
  if (req.body.email === '' || !emailRegex.test(req.body.email)) {
    return res.status(400).send({
      success: 'false',
      message: 'Please enter a valid email address',
    });
  }
  next();
};

export default {
  signUp,
};
