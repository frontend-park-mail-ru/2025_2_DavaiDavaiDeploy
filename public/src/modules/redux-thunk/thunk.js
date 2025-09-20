import { createThunkMiddleware } from './createThunkMiddleware'

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
