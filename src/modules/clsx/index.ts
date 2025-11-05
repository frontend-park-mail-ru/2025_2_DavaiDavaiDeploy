type ClassValue = string | { [key: string]: boolean } | undefined;

/**
 * Утилита для условного объединения CSS классов.
 * Принимает строки и объекты с булевыми значениями и возвращает строку классов.
 *
 * @param {...ClassValue} args - Аргументы для объединения:
 *   - string: добавляется как есть
 *   - object: ключи добавляются только если соответствующее значение truthy
 * @returns {string} Строка объединенных CSS классов, разделенных пробелами
 *
 * @example
 * // Базовое использование
 * clsx('foo', 'bar'); // 'foo bar'
 *
 * @example
 * // С условными классами
 * const isActive = true;
 * const isDisabled = false;
 * clsx('btn', {
 *   'btn-active': isActive,    // будет добавлен
 *   'btn-disabled': isDisabled // не будет добавлен
 * }); // 'btn btn-active'
 *
 * @example
 * Комбинированное использование
 * import clsx from '@/modules/clsx';
 *
 * const outlined = false;
 * const elevated = true;
 * clsx(
 * 	'foo',
 * 	{
 * 		['outlined']: outlined,
 * 		elevated: elevated,
 * 		'foozz': elevated, // все 3 варианта верны
 * 	},
 * 	'baz',
 * ); // 'foo elevated foozz baz'
 */

export default function clsx(...args: ClassValue[]): string {
	const classes: string[] = [];

	for (const arg of args) {
		if (!arg) {
			continue;
		}

		if (typeof arg === 'string') {
			classes.push(arg);
		} else if (typeof arg === 'object') {
			for (const [key, value] of Object.entries(arg)) {
				if (value) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}
