import Image from 'next/image';

const HealthItem = ({ name, img, type, data }) => {
  return (
    <div className='mx-3 h-full w-full rounded-lg bg-gray-200 p-5'>
      <div className='flex'>
        <Image src={img} alt='icon' width={50} height={50} />
        <h1 className='ml-3 text-[30px] font-bold'>{name}</h1>
      </div>
      <h1 className='mr-3 mt-10 text-right text-[60px] font-bold'>
        {data === null || data === undefined ? '-' : data}
      </h1>
      <h3 className='text-right text-[20px]'>{type}</h3>
    </div>
  );
};

export default HealthItem;
