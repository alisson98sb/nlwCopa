import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import nlwLogo from '../assets/logo.svg';
import avatar from '../assets/avatares.png';
import iconCheck from '../assets/icon-check-green.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCont: number,
  guessCont: number,
  usersCount: number
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');


  async function createPool(event: FormEvent){
    event.preventDefault()

    try{
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert("O bolão foi criado com sucesso, o código foi copiado para a área de transferência!")
      setPoolTitle('');
    } catch (err) {
      console.log(err);
      alert('Falha ao criar o bolão, tente novamente');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image 
          src={nlwLogo} 
          alt=""
          quality={100}  
        />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe ente amigos!</h1>

        <div className="mt-10 flex items-center gat-2">

          <Image
            src={avatar}
            alt="Rosto dos usuários que participam do bolão" 
            quality={100}    
            />

          <strong className='text-gray-100 text-xl'>
            <span className='text-igniteGreen-500'>+{props.usersCount}</span> pessoas já estão participando
          </strong>
        </div>

          <form onSubmit={createPool} action="" className='mt-10 flex gap-2'>
            <input
              className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
              type="text"
              placeholder="Qual é o nome do seu bolão? " 
              onChange={event => setPoolTitle(event.target.value)}
              value={poolTitle}
            />

            <button
              className='bg-igniteYellow-500 px-6 py-4 rounded text-gray-800 font-bold text-sm uppercase hover:bg-igniteYellow-700'
              type="submit"
            >Criar meu bolão</button>
          </form>

          <p className='text-gray-300 mt-4 text-sm leading-relaxed' >Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

          <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>

            <div  className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.poolCont}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className='w-px h-14 bg-gray-600'></div>

            <div  className="flex items-center gap-6">
              <Image src={iconCheck} alt=""/>
              <div  className="flex flex-col">
                <span className="font-bold text-2xl">+{props.guessCont}</span>
                <span>Palpites enviados</span>
              </div>
            </div>

          </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do nlw copa"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    poolContResponse,
    guessContResponse,
    usersCountResponse,
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCont: poolContResponse.data.count,
      guessCont: guessContResponse.data.count,
      usersCount: usersCountResponse.data.count,

    }
  }
}
