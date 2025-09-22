import { useState } from 'react'
import './App.css'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [gachaCount, setGachaCount] = useState(0);

  const fetchGacha = async () => {
    setIsLoading(true)
    setError(null)
    setImage(null)
    
    try {
      await delay(1000); 
      const response = await fetch('/api/gacha')
      if (!response.ok) {
        const errorText = await response.text();
        console.log('API Response Error Body:', errorText);
        throw new Error(`Response not ok: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()

      if (data && data.length > 0) {
        const post = data[0]
        const imageUrl = post.sample_url
        setImage(imageUrl)
        setGachaCount(prevCount => prevCount + 1); 
      } else {
        throw new Error('Gada gambarnya')
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl p-8 text-center flex flex-col items-center">
        
        <div className="">
          <h1 className="text-5xl md:text-1xl font-black mb-1 bg-zinc-100 bg-clip-text text-transparent tracking-tight">
            GachaBit
          </h1>
          {!image && (
            <p className="text-zinc-400 text-lg mt-3 max-w-2xl mx-auto">
              Anda karbit tapi bingung mau klaim apa? cukup gacha disini saja 😛
              <br />API Sauce : Safebooru
            </p>
          )}
          
          {image && (
            <p className="text-lg text-gray-400">
              Total Gacha: {gachaCount}
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center gap-3 text-zinc-400 mt-4 mb-6">
            <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg">Mencari bahan untukmu bit</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-950/50 border border-red-800 rounded-xl p-4 mt-4 mb-6">
            <p className="text-red-400 text-lg">Error: {error}</p>
          </div>
        )}

        {image && (
          <div className="mt-4 w-full">
            <div className="grid md:grid-cols-1 gap-8 w-full">
              
              <div className="group relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-600/20 to-zinc-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <img 
                  src={image} 
                  alt="Gacha Result" 
                  className="relative block mx-auto object-contain border-2 border-zinc-700 rounded-2xl bg-zinc-800/50 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:border-zinc-600 hover:shadow-zinc-500/20"
                  style={{ maxHeight: '60vh' }}
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={fetchGacha}
          disabled={isLoading}
          className="mt-4 relative group overflow-hidden bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-2 border-zinc-600 hover:border-zinc-500 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 disabled:hover:border-zinc-600 shadow-xl hover:shadow-2xl hover:shadow-zinc-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-600/0 via-zinc-500/10 to-zinc-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="relative flex items-center gap-3">
            Gacha
          </span>
        </button>

      </div>
    </div>
  );
}

export default App
