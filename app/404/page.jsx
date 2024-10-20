"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";

const Custom404 = () => {
  const router = useRouter();

  const goHome = () => {
      router.push('/');
  };

  return (
    <div className="container flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center mb-3">
        <h1 className="text-9xl">4</h1>
        <Image
          src="assets/404.svg"
          width={200}
          height={200}
        />
        <h1 className="text-9xl">4</h1>
      </div>
      <h2 className="text-3xl mb-6">Буу! Сторінку не знайдено!</h2>

      <button
        onClick={goHome}
        className='text-xl py-4 px-12 bg-minibg rounded-full'
      >
        На головну
      </button>
    </div>
  )
}

export default Custom404;
