'use client';

import Image from 'next/image';
import { Akshar } from 'next/font/google';
import { useEffect, useState } from 'react';
import NameTag from './components/name-tag';
import NavBar from './components/nav-bar';
import HealthItem from './components/health-item';
import fetcher from './util/fetcher';

const akshar = Akshar({ subsets: ['latin'] });

const healthImage = [
  { name: '심박수', img: '/heart-rate.png' },
  { name: '체온', img: '/temperature.png' },
  { name: '산소포화도', img: '/oxygen-saturation.png' },
  { name: '스트레스', img: '/stress.png' },
];

export default function Home() {
  const [user, setUser] = useState<{
    name: string;
    height: number;
    weight: number;
  } | null>(null);

  const [health, setHealth] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher('/authenticate');
      return await response?.json();
    };

    const initializeData = async () => {
      try {
        const user = await fetchData();
        let response = await fetcher('/user/detail/' + user.id);
        const detail: any = await response?.json();
        setUser({
          name: detail?.name,
          height: detail?.height,
          weight: detail?.weight,
        });

        response = await fetcher('/health/' + user.id);
        const healthData: any = await response?.json();

        setHealth(Object.values(healthData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <div className='min-h-screen bg-slate-200'>
      <NavBar />
      <div className='mx-auto mt-5 h-screen w-[1200px] rounded-lg bg-white'>
        <div className='p-10'>
          <div>
            <NameTag
              name={user?.name}
              height={user?.height}
              weight={user?.weight}
            />
            <div className='mt-4 flex h-[560px] w-full rounded-3xl bg-gray-100 py-3'>
              <div className='flex h-full w-full flex-col gap-1'>
                <div className='flex h-full w-full py-1'>
                  {healthImage.slice(0, 2).map((o, index) => (
                    <HealthItem
                      key={index}
                      name={o.name}
                      img={o.img}
                      data={health[index]}
                    />
                  ))}
                </div>
                <div className='flex h-full w-full py-1'>
                  {healthImage.slice(2, 4).map((o, index) => (
                    <HealthItem
                      key={index}
                      name={o.name}
                      img={o.img}
                      data={health[index + 2]}
                    />
                  ))}
                </div>
              </div>
              <div className='h-full w-full'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
