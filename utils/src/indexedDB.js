class IndexedDB_util {
	/**
	 * 打开数据库
	 * @param {数据库名称} dbName
	 * @param {表名} storeName
	 * @param {版本号} version
	 * @returns
	 */
	openDB(dbName, storeName, version = 1) {
		return new Promise((resolve, reject) => {
			let indexedDB = window.indexedDB;
			let db;
			const request = indexedDB.open(dbName, version);
			request.onsuccess = function (event) {
				db = event.target.result; // 数据库对象
				resolve(db);
			};

			request.onerror = function (event) {
				reject(event);
			};

			request.onupgradeneeded = function (event) {
				// 数据库创建或升级的时候会触发
				console.log("onupgradeneeded");
				db = event.target.result; // 数据库对象
				let objectStore;
				if (!db.objectStoreNames.contains(storeName)) {
					objectStore = db.createObjectStore(storeName, { keyPath: "id" }); // 创建表
				}
			};
		});
	}

	/**
	 * 添加数据
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {数据} data
	 * @returns
	 */
	addData(db, storeName, data) {
		return new Promise((resolve, reject) => {
			let request = db
				.transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
				.objectStore(storeName) // 仓库对象
				.add(data);

			request.onsuccess = function (event) {
				resolve(event);
			};

			request.onerror = function (event) {
				throw new Error(event.target.error);
				reject(event);
			};
		});
	}

	/**
	 * 通过主键查询记录
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {主键} key
	 * @returns
	 */
	getDataByKey(db, storeName, key) {
		return new Promise((resolve, reject) => {
			let transaction = db.transaction([storeName]); // 事务
			let objectStore = transaction.objectStore(storeName); // 仓库对象
			let request = objectStore.get(key);

			request.onerror = function (event) {
				reject(event);
			};

			request.onsuccess = function (event) {
				resolve(request.result);
			};
		});
	}

	/**
	 * 通过游标查询记录
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @returns
	 */
	getDataByCursor(db, storeName) {
		let list = [];
		let store = db
			.transaction(storeName, "readwrite") // 事务
			.objectStore(storeName); // 仓库对象
		let request = store.openCursor(); // 指针对象
		return new Promise((resolve, reject) => {
			request.onsuccess = function (e) {
				let cursor = e.target.result;
				if (cursor) {
					// 必须要检查
					list.push(cursor.value);
					cursor.continue(); // 遍历了存储对象中的所有内容
				} else {
					resolve(list);
				}
			};
			request.onerror = function (e) {
				reject(e);
			};
		});
	}

	/**
	 * 通过索引查询记录
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {*} indexName
	 * @param {*} indexValue
	 * @returns
	 */
	getDataByIndex(db, storeName, indexName, indexValue) {
		let store = db.transaction(storeName, "readwrite").objectStore(storeName);
		let request = store.index(indexName).get(indexValue);
		return new Promise((resolve, reject) => {
			request.onerror = function (e) {
				reject(e);
			};
			request.onsuccess = function (e) {
				resolve(e.target.result);
			};
		});
	}

	/**
	 * 通过索引和游标查询记录
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {*} indexName
	 * @param {*} indexValue
	 * @returns
	 */
	getDataByIndexAndCursor(db, storeName, indexName, indexValue) {
		let list = [];
		let store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
		let request = store
			.index(indexName) // 索引对象
			.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
		return new Promise((resolve, reject) => {
			request.onsuccess = function (e) {
				let cursor = e.target.result;
				if (cursor) {
					list.push(cursor.value);
					cursor.continue(); // 遍历了存储对象中的所有内容
				} else {
					resolve(list);
				}
			};
			request.onerror = function (ev) {
				reject(ev);
			};
		});
	}

	/**
	 * 更新记录
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {数据} data
	 * @returns
	 */
	updateDB(db, storeName, data) {
		let request = db
			.transaction([storeName], "readwrite") // 事务对象
			.objectStore(storeName) // 仓库对象
			.put(data);

		return new Promise((resolve, reject) => {
			request.onsuccess = function (ev) {
				resolve(ev);
			};

			request.onerror = function (ev) {
				resolve(ev);
			};
		});
	}

	/**
	 * 删除数据
	 * @param {数据库} db
	 * @param {表名} storeName
	 * @param {*} id
	 * @returns
	 */
	deleteDB(db, storeName, id) {
		let request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(id);

		return new Promise((resolve, reject) => {
			request.onsuccess = function (ev) {
				resolve(ev);
			};

			request.onerror = function (ev) {
				resolve(ev);
			};
		});
	}

	/**
	 * 删除数据库
	 * @param {数据库名} dbName
	 * @returns
	 */
	deleteDBAll(dbName) {
		console.log(dbName);
		let deleteRequest = window.indexedDB.deleteDatabase(dbName);
		return new Promise((resolve, reject) => {
			deleteRequest.onerror = function (event) {
				console.log("删除失败", event);
			};
			deleteRequest.onsuccess = function (event) {
				console.log("删除成功", event);
			};
		});
	}

	/**
	 * 关闭数据库
	 * @param {数据库} db
	 */
	closeDB(db) {
		db.close();
		console.log("数据库已关闭");
	}
}

export default new IndexedDB_util();
