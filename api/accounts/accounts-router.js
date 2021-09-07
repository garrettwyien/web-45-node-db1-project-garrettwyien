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
  req.body.name.trim();
  Accounts.create(req.body)
  .then(newAccount=>{
    res.status(201).json(newAccount)
  })
  .catch(err =>{
    next(err)
  })
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
