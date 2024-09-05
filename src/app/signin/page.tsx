'use client';

import { useState } from 'react';
import UserDetailModal from '../components/user-detail-modal';
import fetcher from '../util/fetcher';

export default function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      'https://port-0-lifeplus-back-m0nionbm8422b973.sel4.cloudtype.app/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    const parseJSON = async (response: Response) => {
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    };

    if (response.ok) {
      const data = await parseJSON(response);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      try {
        let response = await fetcher('/authenticate');
        if (response && response.ok) {
          const user = await parseJSON(response);
          response = await fetcher('/user/detail/' + user.id);
          if (response && response.ok) {
            const detail = await parseJSON(response);
            console.log(detail);
            if (Object.keys(detail).length !== 0) {
              window.location.href = '/';
            } else {
              setIsModalOpen(true);
            }
          } else {
            console.error('Error fetching user details');
          }
        } else {
          console.error('Error: User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.error('Error: ', response.statusText);
    }
  };

  const handleModalSubmit = async (detailData: any) => {
    try {
      let response = await fetcher('/authenticate');
      const user = await response?.json();
      detailData.id = user?.id;
      await fetcher('/user/detail', 'POST', detailData);
      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-300'>
      <title>LIFEPLUS+ | SIGNIN</title>
      <div className='flex h-[500px] w-[400px] flex-col rounded-3xl bg-white p-4 shadow-2xl'>
        <h2 className='mb-14 mt-10 text-center text-[70px] font-bold'>
          LIFEPLUS+
        </h2>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='아이디'
            required
            className='rounded-lg border-2 p-2'
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            required
            className='rounded-lg border-2 p-2'
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type='submit'
            className='h-12 cursor-pointer rounded-full bg-blue-500 text-white'
            value={'로그인'}
          />
        </form>
        <a
          href='/signup'
          className='mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-gray-300'
        >
          회원가입
        </a>
      </div>
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      ></UserDetailModal>
    </div>
  );
}
