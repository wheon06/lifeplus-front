import React, { useState } from 'react';

const UserDetailModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    email: '',
    mobile: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded bg-white p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='mb-2 block'>이름</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mb-4 w-full rounded border p-2'
              required
            />
          </div>
          <div>
            <label className='mb-2 block'>키</label>
            <input
              type='number'
              name='height'
              value={formData.height}
              onChange={handleChange}
              className='mb-4 w-full rounded border p-2'
              required
            />
          </div>
          <div>
            <label className='mb-2 block'>몸무게</label>
            <input
              type='number'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              className='mb-4 w-full rounded border p-2'
              required
            />
          </div>
          <div>
            <label className='mb-2 block'>이메일</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mb-4 w-full rounded border p-2'
              required
            />
          </div>
          <div>
            <label className='mb-2 block'>전화번호</label>
            <input
              type='number'
              name='mobile'
              value={formData.mobile}
              onChange={handleChange}
              className='mb-4 w-full rounded border p-2'
              required
            />
          </div>
          <button
            type='submit'
            className='mb-4 w-full rounded bg-blue-500 p-2 text-white'
          >
            제출
          </button>
        </form>
        <button
          onClick={onClose}
          className='w-full rounded bg-red-500 p-2 text-white'
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default UserDetailModal;
