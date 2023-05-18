
import axios from "axios";
import { auth } from "../../Firebase";
import Form from "./components/Form"
import { BASE_URL } from '../../Urls'
import { useState, useRef, useEffect, useContext } from "react";
import Reproductor from "./components/Reproductor";
import Nav from "../../components/Nav";
import { ContextLogin } from "../../components/ContextLogin";
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {

  const [SearchData, setSearchData] = useState([])
  const [Active, setActive] = useState(false)
  const [IdItem, setIdItem] = useState('')
  const [Loading, setLoading] = useState(false)
  const [ShowError, setShowError] = useState(false)
  const prevId = useRef('')
  const [isLogin, setisLogin] = useState(false)



  const Submit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      setShowError(false)
      setLoading(true)
      const user = auth.currentUser
      const data = await axios.get(`${BASE_URL}/api/v1/search?uid=${user.uid}&q=${e.target[0].value}`, {
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`,
        }
      })
      setSearchData(data.data.tracks.items)
      setLoading(false)
    } else {
      setShowError(true)
    }
  }

  const Play = (id) => {

    document.getElementById(id).play()
    prevId.current = id
  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setisLogin(true)
    })

  }, [])

  const Logout = () => {
    auth.signOut()
    setisLogin(false)
  }
  return (
    <ContextLogin.Provider value={isLogin}>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <Nav logout={() => Logout()} />


        <div className='overflow-auto'>
          <div className='flex flex-col gap-10 justify-center items-center font-mont'>
            <h1 className='text-white text-center text-5xl mt-10 m-5'>SPOTIFY APP</h1>
            <Form Submit={(e) => Submit(e)} />
            {
              !isLogin && <span className='text-[red] text-center text-2xl mt-10 m-5'>You must be logged in to use this app</span>
            }
            {
              Active && <Reproductor
                id={IdItem}
              />
            }
          </div>
          {
            Loading ?
              <div className='flex items-center justify-center mt-5'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
              :
              <div className='flex flex-row flex-wrap gap-5 items-center justify-center p-2 font-mont'>
                {
                  isLogin && SearchData.length > 0 && SearchData.map((item, index) => {
                    if (item.preview_url != null) {
                      return <div
                        key={item.id}
                        className='flex flex-col gap-2 items-center justify-center m-1 sm:m-3'>
                        <h2 className='text-white text-xl'>{item.name}</h2>
                        <img
                          className='w-32 sm:w-36 h-auto cursor-pointer'
                          src={item.album.images[0].url}
                          onClick={() => {
                            try {
                              if (prevId.current !== '') {
                                document.getElementById(prevId.current).currentTime = 0
                                document.getElementById(prevId.current).pause()
                              }
                            } catch (err) {
                              console.log(err)
                            }


                            setActive(true)
                            setIdItem(item.id)
                            Play(item.id)
                          }}
                        />
                        <a className='text-white' href={item.external_urls.spotify} target='_blank'>Play full song</a>
                        <audio
                          className='hidden'
                          id={item.id}
                          src={item.preview_url} controls />

                      </div>
                    }

                  })
                }
              </div>
          }

        </div>
      </div>
    </ContextLogin.Provider>
  )
}

export default Home