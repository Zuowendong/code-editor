// 组件数据标准model
export const compTemplateData = (...args) => {
	return {
		...args[0],
		uuid: `${args[0].type}_${Date.now()}`,
	};
};
