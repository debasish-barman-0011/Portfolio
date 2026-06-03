import { useEffect } from 'react';
import Typed from 'typed.js';
import ProjectCarousel from '../components/ProjectCarousel';
import ContactSection from '../components/ContactSection';
import QuickNavCards from '../components/QuickNavCards';

const Home = () => {
  // useEffect(() => {
  //   console.log('[Home] mounted');
  //   new Typed('.autoType', {
  //     strings: ['an Associate @TCS.', 'a Graduate @BWU.', 'Ex-DC @Schoolnet.'],
  //     typeSpeed: 80, backSpeed: 100, loop: true
  //   });
  useEffect(() => {
  console.log('[Home] mounted');

  const typed = new Typed('.autoType', {
    strings: [
      'an Associate @TCS.',
      'a Software Developer.',
      'Ex-DC @Schoolnet.'
    ],
    typeSpeed: 50,      
    backSpeed: 30,      
    backDelay: 1800,    
    startDelay: 500,    
    loop: true,
    smartBackspace: true,
    showCursor: true,
    cursorChar: '|'
  });

  return () => typed.destroy();

    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good Morning' : hour < 16 ? 'Good Afternoon' : hour < 20 ? 'Good Evening' : 'Welcome Again';
    document.getElementById('greeting') && (document.getElementById('greeting').innerText = greet);
  }, []);
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
        <div className="md:w-1/2"><img src="/assets/profile.jpg" alt="Debasish" className="rounded-2xl shadow-2xl" onError={(e)=>e.target.src='/assets/profile.jpg'} /></div>
        <div className="md:w-1/2 text-center md:text-left md:pl-4">
          <p className="text-3xl bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] bg-clip-text text-transparent">Hello,</p>
          <div id="greeting" className="text-3xl"></div>
          <span className="text-3xl bg-gradient-to-r from-[#36d1dc] to-[#5b86e5] bg-clip-text text-transparent">This is</span>
          <h3 className="text-5xl bg-gradient-to-r from-[#fdbb2d] to-[#22c1c3] bg-clip-text text-transparent">Debasish Barman.</h3>
          <div className="text-2xl mt-2">I am <span className="autoType"></span></div>
          <a href="/download-resume" className="inline-block mt-6 bg-[#04aa6d] px-6 py-2 rounded-md">Download Resume</a>
        </div>
      </section>
      <div id="about" className="p-8 md:p-16 bg-[#080808]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3"><h2 className="text-4xl font-bold">About Me</h2><p className="mt-4">Hii 👋 I'm Debasish currently working as a Quality Assurance Test Engineer at Tata Consultancy Services under BFSI Bαncs Domain. In the past I have worked as an IT Consultant at Schoolnet India Limited, where I actively contributed to the West Bengal ICT School Projects. Also made a significant contribution to the transformation of digital education infrastructure at 6300+ government schools. I usually spend my spare time building impactful solutions that combine innovation, functionality, and user-centric design. I believe in " Eternal Learning is the only solution to succeed ". Open to reply to your queries at mail4barman@gmail.com 
or 
Visit : https://debasishbarman.in/contact </p></div>
          <div className="md:w-1/3"><img src="/assets/Userr.jpg" className="rounded-xl" onError={(e)=>e.target.src='/assets/about.jpg'} /></div>
        </div>
      </div>
      <ProjectCarousel />
      <ContactSection />
      <QuickNavCards />
    </>
  );
};
export default Home;