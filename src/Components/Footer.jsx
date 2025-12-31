const Footer = () => {
  return (
    <footer className="bg-[#d5d6cbe6] text-black py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">EcoTrack</h3>
          <p className="text-sm">
            EcoTrack helps you participate in environmental challenges, track your progress, and contribute to a sustainable future.
          </p>
          <p className="text-xs mt-2">Accessible and privacy-friendly platform</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#about" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
            <li><a href="#challenges" className="hover:text-yellow-400 transition">Challenges</a></li>
            <li><a href="#events" className="hover:text-yellow-400 transition">Events</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-bold text-lg mb-2">Connect With Us</h3>
          <p className="text-sm mb-2">Email: support@ecotrack.com</p>
          <p className="text-sm mb-4">Phone: +880 123 456 789</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22,12A10,10,0,1,0,12,22,10,10,0,0,0,22,12Zm-11,4V8l6,4Z" />
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22,4.01H2A2,2,0,0,0,0,6v12a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A2,2,0,0,0,22,4.01ZM20,8l-8,5L4,8V6l8,5,8-5Z" />
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.14 6.84 9.48.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.74 0 .27.18.58.69.48A9.961 9.961 0 0 0 22 12c0-5.5-4.46-9.96-9.96-9.96z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-xs">
        Designed and maintained by EcoTrack Team
      </div>
    </footer>
  );
};

export default Footer;
