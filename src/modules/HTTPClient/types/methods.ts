import { METHODS } from '../methods'
export type Method = (typeof METHODS)[keyof typeof METHODS]
