import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket: any

const HomeTest = () => {
  const [input, setInput] = useState('')

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io('http://localhost:8000')

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg) => {
      handleNewMessage(data)
      setInput(msg)
    })
  }

  const onChangeHandler = (e) => {

    e.preventDefault();
    console.log(e)
    setInput(e.target.value)
    socket.emit('sendMessage', e.target.value)
  }

  return (
    <div className="">
      <div>
        <ul id="messages"></ul>
      </div>

      <form onSubmit={onChangeHandler}>
        <input id="message" type="text" />
        <button>Submit</button>
      </form>
    </div>
  )
  // <input placeholder="Type something" value={input} onChange={onChangeHandler} />
}

export default HomeTest
