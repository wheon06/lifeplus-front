import { Akshar } from 'next/font/google';
import Image from 'next/image';

const akshar = Akshar({ subsets: ['latin'] });

const NavBar = () => {
  return (
    <nav className='bg-[#dde7fe]'>
      <div className='flex h-24 w-screen items-center justify-between px-3'>
        <a href='#'>
          <Image src='/logo-small.png' alt='logo' width={50} height={50} />
        </a>
        <span className={`${akshar.className} text-[40px]`}>LIFEPLUS+</span>
        <div className='h-[50px] w-[50px]'></div>
      </div>
    </nav>
  );
};

export default NavBar;
