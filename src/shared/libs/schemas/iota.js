/**
 * Schema to define the structure of a Transaction
 * Transactions are indexed and looked up by hash
 */
const TransactionSchema = {
  name: 'Transaction',
  primaryKey: 'hash', // Index and look up transactions by their hash
  properties: {
    hash: 'string',
    address: {type: 'linkingObjects', objectType: 'Address', property: 'transactions'}, // Link transactions to addresses
    value: 'int',
    tag: 'string',
    message: 'string',
    bundle: {type: 'linkingObjects', objectType: 'Bundle', property: 'transactions'}, // Link transactions to bundles
  },
};

/**
 * Schema to define the structure of a Bundle
 * Bundles are indexed and looked up by hash
 */
const BundleSchema = {
  name: 'Bundle',
  primaryKey: 'hash', // Index and look up bundles by their hash
  properties: {
    hash: 'string',
    transactions: 'Transaction[]', // Create a "to-many" relationship (https://realm.io/docs/javascript/latest#to-many-relationships)
  },
};

/**
 * Schema to define the structure of an Address
 * Addresses are indexed and looked up by address
 */
const AddressSchema = {
  name: 'Address',
  primaryKey: 'address',
  properties: {
    address: 'string',
    index: 'int',
    transactions: 'Transaction[]', // Create a "to-many" relationship (https://realm.io/docs/javascript/latest#to-many-relationships)
  },
};