import '../build/precompiled.js'
import Test from './test/test.js'

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

const test = new Test(root, { text: 'Working' })
test.render()
