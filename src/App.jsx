import React from 'react'
import Quiz from './Quiz.jsx'
import blobYellow from './assets/blobYellow.png'
import blobBlue from './assets/blobBlue.png'
import './App.css'

function App() {
  const [flipper, setFlipper] = React.useState(false)

  function flip(){
    setFlipper((oldFlipper)=> !oldFlipper)
  }

  function starter(){
    return (
      <div className='container'>
        <h1 className='heading'>Quizzical</h1>
        <button onClick={flip} className='start-btn'>Start quiz</button>
      </div>
    )
  }

  return (
    <div className="App">
      <div className='background'>
        <img className={!flipper? 'blob-yellow-a': 'blob-yellow-b'} src={blobYellow} alt=''/>
        <img className={!flipper? 'blob-blue-a': 'blob-blue-b'} src={blobBlue} alt=''/>
      </div>
      {!flipper && starter()}
      {flipper && <Quiz />}
    </div>
  )
}

export default App
