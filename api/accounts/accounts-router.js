const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  Accounts.getAll()
  .then(accounts=>{
    res.status(200).json(accounts);
  })
  .catch(next);
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const newAccount = { 
    name: req.body.name.trim(),
    budget: req.body.budget, 
  }
  Accounts.create(newAccount)
  .then(obj=>{
    res.status(201).json(obj)
  })
  .catch(err =>{
    next(err)
  })
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const update = await Accounts.updateById(req.params.id, req.body)
  res.json(update)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then((req)=>{
    res.status(200).json(req.params)
  })
  .catch(err=>{
    next(err)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
