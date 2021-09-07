const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(req.body.name === undefined || req.body.budget === undefined) {
    next({status:400,message:"name and budget are required"})
  }else if(typeof req.body.name !== 'string') {
    next({status:400,message:"name of account must be a string"})
  }else if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    next({status:400,message:"name of account must be between 3 and 100"})
  }else if(typeof req.body.budget !== 'number'){
    next({status:400,message:"budget of account must be a number"})
  }else if(req.body.budget < 0 || req.body.budget > 1000000){
    next({status:400,message:"budget of account is too large or too small"})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await Accounts.getByName(req.body.name.trim())
    if (existing) {
      next({ status: 400, message: "that name is taken" })
      // res.status(400).json({message: "that name is taken"})
    } else {
      next()
    }
  } catch (err) {
  next (err)
}
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const possibleAccount = await Accounts.getById(req.params.id)
    if (!possibleAccount){
      res.status(404).json({message: "account not found"})
    } else {
      req.account = possibleAccount
      next()
    }
  } catch (err){
    next(err)
  }
}
