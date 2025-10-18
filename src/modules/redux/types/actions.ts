/**
 * Действие Redux - объект с типом и полезной нагрузкой или функция (thunk).
 * @typedef {Object|Function} Action
 */
export type Action = { type: string; payload?: any } | Function

/**
 * Функция для диспетчеризации действий.
 * @typedef {Function} Dispatch
 */
export type Dispatch = (action: Action) => any
