const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = async (id) => {
  // DO YOUR MAGIC
  return db('posts').where('id', id).first()
}

const create = async (account) => {
  // DO YOUR MAGIC
  return 'create'
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
