/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

define(["./impl/pouchDBPersistenceStore"],
       function(PouchDBPersistenceStore) {
  'use strict';

  /**
   * @export
   * @class PouchDBPersistenceStoreFactory
   * @classdesc PersistenceStoreFactory that creates PouchDB backed 
   *            PersisteneStore instance.
   */
  var PouchDBPersistenceStoreFactory = (function () {

    /**
     * @method
     * @name createPersistenceStore
     * @memberof! PouchDBPersistenceStoreFactory
     * @export
     * @instance
     * @return {Promise} returns a Promise that is resolved to a PouchDB backed
     * PersistenceStore instance.
     */
     
    function _createPersistenceStore (name, options) {
      return new Promise(function (resolve, reject) {
        var store = new PouchDBPersistenceStore(name);
        store.Init(options).then(function () {
          resolve(store);
        }, function (err) {
          reject(err);
        });
      });
    };

    return {
      'createPersistenceStore' : function (name, options) {
        return _createPersistenceStore(name, options);
      }
    };
  }());

  return PouchDBPersistenceStoreFactory;
});