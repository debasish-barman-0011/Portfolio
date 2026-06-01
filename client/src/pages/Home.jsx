import { useEffect } from 'react';
import Typed from 'typed.js';
import ProjectCarousel from '../components/ProjectCarousel';
import ContactSection from '../components/ContactSection';
import QuickNavCards from '../components/QuickNavCards';

const Home = () => {
  useEffect(() => {
    console.log('[Home] mounted');
    new Typed('.autoType', {
      strings: ['an Associate @TCS.', 'BCA Graduate @BWU.', 'Ex - DC @Schoolnet.'],
      typeSpeed: 50, backSpeed: 50, loop: true
    });
    // Greeting based on time
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    document.getElementById('greeting') && (document.getElementById('greeting').innerText = greet);
  }, []);
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
        <div className="md:w-1/2"><img src="/assets/profile.jpg" alt="Debasish" className="rounded-2xl shadow-2xl" onError={(e)=>e.target.src='/assets/profile.jpg'} /></div>
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-3xl bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] bg-clip-text text-transparent">Hello,</p>
          <div id="greeting" className="text-3xl"></div>
          <span className="text-3xl bg-gradient-to-r from-[#36d1dc] to-[#5b86e5] bg-clip-text text-transparent">This is</span>
          <h3 className="text-5xl bg-gradient-to-r from-[#fdbb2d] to-[#22c1c3] bg-clip-text text-transparent">Debasish Barman.</h3>
          <div className="text-2xl mt-2">I am <span className="autoType"></span></div>
          <a href="/download-resume" className="inline-block mt-6 bg-[#3f51b5] px-6 py-2 rounded-md">Download Resume</a>
        </div>
      </section>
      <div id="about" className="p-8 md:p-16 bg-[#080808]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3"><h2 className="text-4xl font-bold">About Me</h2><p className="mt-4">BCA graduate from Brainware University, working as an Associate at TCS...</p></div>
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