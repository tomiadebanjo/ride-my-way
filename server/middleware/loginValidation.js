const login = (req, res, next) => {
  const charTest = /[a-zA-Z]/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordTest = /[^\S]/g;

  if (req.body.email === '' || !emailRegex.test(req.body.email)) {
    return res.status(400).send({
      success: 'false',
      message: 'Please enter a valid email address',
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
  if (req.body.password.length < 6 || passwordTest.test(typeof req.body.password)) {
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
  next();
};

export default {
  login,
};
