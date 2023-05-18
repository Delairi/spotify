import { useEffect, useState } from "react"

const Reproductor = ({ id }) => {

  const [Id, setId] = useState(id)

  useEffect(() => {
    setId(id)
  }, [id])

  return (
    <div className='w-full h-30  flex flex-row justify-center sm:justify-end items-center mb-5'>

      <div className='flex flex-row justify-end w-auto p-2 gap-5 bg-white rounded-lg sm:mr-5'>
        <div class="now playing" id="music">
          <span class="bar n3"></span>
          <span class="bar n4"></span>
          <span class="bar n5"></span>
          <span class="bar n6"></span>
          <span class="bar n7"></span>
          <span class="bar n8"></span>
        </div>
        <button onClick={() => {
          document.getElementById(Id).play()
        }}>PLAY</button>
        <button onClick={() => {
          document.getElementById(Id).pause()
        }}>PAUSE</button>
        <button onClick={() => {
          document.getElementById(Id).currentTime = 0
          document.getElementById(Id).pause()
        }}>STOP</button>
      </div>
    </div>
  )
}

export default Reproductor