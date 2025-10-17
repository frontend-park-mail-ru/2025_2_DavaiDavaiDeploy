import type { State } from '@/modules/redux/ReduxTypes'

export const selectUser = (state: State) => state.user.users
export const selectUserError = (state: State) => state.user.users.error
export const selectError = (state: State) => state.user.error
