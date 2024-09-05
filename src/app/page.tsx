'use client';

import { Akshar } from 'next/font/google';
import { useEffect, useState } from 'react';
import NameTag from './components/name-tag';
import NavBar from './components/nav-bar';
import HealthItem from './components/health-item';
import fetcher from './util/fetcher';
import Chart from './components/chart';

const akshar = Akshar({ subsets: ['latin'] });

const healthImage = [
  { name: '심박수', img: '/heart-rate.png', type: 'bpm' },
  { name: '체온', img: '/temperature.png', type: 'ºC' },
  { name: '산소포화도', img: '/oxygen-saturation.png', type: '%' },
  { name: '스트레스', img: '/stress.png', type: '' },
];

export default function Home() {
  const [user, setUser] = useState<{
    name: string;
    height: number;
    weight: number;
  } | null>(null);

  const [health, setHealth] = useState<number[]>([]);
  const [heartRateList, setHeartRateList] = useState<number[]>([]);
  const [temperatureList, setTemperatureList] = useState<number[]>([]);
  const [oxygenSaturationList, setOxygenSaturationList] = useState<number[]>(
    [],
  );
  const [stressList, setStressList] = useState<number[]>([]);
  const [dateList, setDateList] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

    const initializeHistory = async () => {
      try {
        const user = await fetchData();
        let response = await fetcher('/health/history/' + user.id);
        const historyData: any = await response?.json();

        setHeartRateList(historyData.map((item: any) => item.heartRate));
        setTemperatureList(historyData.map((item: any) => item.temperature));
        setOxygenSaturationList(
          historyData.map((item: any) => item.oxygenSaturation),
        );
        setStressList(historyData.map((item: any) => item.stress));
        setDateList(historyData.map((item: any) => new Date(item.updatedAt)));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
    initializeHistory();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-200'>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-200'>
      <NavBar />
      <div className='mx-auto mt-5 h-screen w-[1200px] rounded-lg bg-white'>
        <div className='p-10'>
          <div>
            <NameTag
              name={user?.name ?? ''}
              height={user?.height ?? 0}
              weight={user?.weight ?? 0}
            />
            <div className='mt-4 flex h-[560px] w-full rounded-3xl bg-gray-100 py-3'>
              <div className='flex h-full w-full flex-col gap-1'>
                <div className='flex h-full w-full py-1'>
                  {healthImage.slice(2, 4).map((o, index) => (
                    <HealthItem
                      key={index}
                      name={o.name}
                      img={o.img}
                      type={o.type}
                      data={
                        health[index + 2] ? health[index + 2].toString() : 'N/A'
                      }
                    />
                  ))}
                </div>
                <div className='flex h-full w-full py-1'>
                  {healthImage.slice(2, 4).map((o, index) => (
                    <HealthItem
                      key={index}
                      name={o.name}
                      img={o.img}
                      type={o.type}
                      data={health[index + 2].toString()}
                    />
                  ))}
                </div>
              </div>
              <div className='flex h-full w-full flex-col'>
                <div className='w-[540px] flex-1 p-1'>
                  <div className='h-full w-full rounded-lg bg-gray-200'></div>
                </div>
                <div className='h-fit w-[540px]'>
                  <Chart
                    heartRateList={heartRateList}
                    temperatureList={temperatureList}
                    oxygenSaturationList={oxygenSaturationList}
                    stressList={stressList}
                    dateList={dateList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
