/**
 * Действие Redux - объект с типом и полезной нагрузкой или функция (thunk).
 */
export type Action = { type: string; payload?: any } | Function;

/**
 * Функция для диспетчеризации действий.
 */
export type Dispatch = (action: Action) => any;
