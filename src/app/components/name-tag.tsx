import { Akshar } from 'next/font/google';
import Image from 'next/image';

const akshar = Akshar({ subsets: ['latin'] });

const NameTag = ({
  name,
  height,
  weight,
}: {
  name: string;
  height: number;
  weight: number;
}) => {
  return (
    <div className='flex'>
      <div className='w-fit rounded-3xl bg-gray-200 p-5'>
        <Image className='' src='/user.png' alt='icon' width={70} height={70} />
      </div>
      <div className='flex flex-col p-3'>
        <span className='text-[30px]'>{name}</span>
        <span>{height + 'cm' + '/' + weight + 'kg'}</span>
      </div>
    </div>
  );
};

export default NameTag;
