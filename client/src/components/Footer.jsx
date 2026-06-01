const Footer = () => {
  return (
    <footer className="bg-[#262626] text-gray-300 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-8">
        <div><h3 className="text-xl mb-3">Quick Links</h3><a href="/#about">About</a><br/><a href="/education">Education</a><br/><a href="/certificates">Certificates</a></div>
        <div><h3 className="text-xl mb-3">Useful Websites</h3><a href="https://github.com/debasish-barman-0011" target="_blank">GitHub</a><br/><a href="https://snap-safari.netlify.app" target="_blank">SnapSafari</a></div>
        <div><h3 className="text-xl mb-3">Follow Me</h3><a href="https://linkedin.com/in/exp-debasish" target="_blank">LinkedIn</a><br/><a href="https://twitter.com/exp_debasish" target="_blank">Twitter</a></div>
        <div><h3 className="text-xl mb-3">Address</h3><iframe title="map" className="w-full h-48 rounded" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1938844.153108378!2d84.85918215779066!3d21.607966940105058!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02c0fd388251f3%3A0x4d359e98db5ee1a8!2z4Kao4Ka-4Kaw4Ka_4KaV4KeH4Kay4Kam4Ka5LCDgppPgpq_gprzgp4fgprjgp43gpp8g4Kas4KeH4KaZ4KeN4KaX4KayIDcyMTY0Mg!5e0!3m2!1sbn!2sin!4v1716647588936!5m2!1sbn!2sin" loading="lazy"></iframe></div>
      </div>
      <div className="text-center py-4 border-t border-gray-700 text-sm">© 2026 Debasish Barman</div>
    </footer>
  );
};
export default Footer;