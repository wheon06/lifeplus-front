'use client';

import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        window.location.href = 'signin';
      } else if (response.status === 401) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
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
            type='password'
            name='confirmPassword'
            placeholder='비밀번호 확인'
            required
            className='rounded-lg border-2 p-2'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            type='submit'
            className='h-12 cursor-pointer rounded-full bg-blue-500 text-white'
            value={'회원가입'}
          />
        </form>
        <a
          href='/signin'
          className='mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-gray-300'
        >
          로그인
        </a>
      </div>
    </div>
  );
};

export default Page;
