import * as THREE from 'three';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Zap, 
  Mail, 
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUpRight,
  BarChart3,
  Layers,
  Search,
  Code2,
  TrendingUp,
  Heart
} from 'lucide-react';

// --- THREE.JS ATMOSPHERIC BACKGROUND ---
const ThreeBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let script;
    const initThree = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const particlesGeometry = new THREE.BufferGeometry();
      const count = 1500;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: '#a78bfa', 
        transparent: true,
        opacity: 0.2
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 5;

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x += 0.0001;
        particlesMesh.position.x += (mouseX * 0.2 - particlesMesh.position.x) * 0.02;
        particlesMesh.position.y += (-mouseY * 0.2 - particlesMesh.position.y) * 0.02;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
    };

    if (!window.THREE) {
      script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThree;
      document.head.appendChild(script);
    } else {
      initThree();
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden" />;
};

// --- ANIMATION VARIANTS ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// --- REUSABLE UI COMPONENTS ---

const SectionTag = ({ text }) => (
  <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6 md:mb-8">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 48 }}
      transition={{ duration: 1, ease: "circOut" }}
      className="h-[1px] bg-purple-600" 
    />
    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-purple-500">
      {text}
    </span>
  </motion.div>
);

const NavLink = ({ label, active, onClick }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ y: -2 }}
    className={`relative text-[11px] uppercase tracking-[0.2em] font-bold transition-all group py-2 ${active ? 'text-white' : 'text-gray-500 hover:text-white'}`}
  >
    <span className="relative z-10">{label}</span>
    <motion.span 
      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-purple-600 origin-left"
      initial={false}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  </motion.button>
);

const MagneticButton = ({ children, primary, onClick, className = "", type = "button" }) => (
  <motion.button 
    type={type}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden px-10 py-5 rounded-full transition-all duration-500 group border flex items-center justify-center gap-3 ${className} ${
      primary 
      ? 'bg-white text-black border-white hover:bg-transparent hover:text-white shadow-lg shadow-white/5' 
      : 'border-white/20 text-white hover:border-white'
    }`}
  >
    <span className="relative z-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-black">
      {children}
    </span>
  </motion.button>
);

const PillarCard = ({ title, subtitle, desc, icon: Icon, features, theme }) => {
  const isDark = theme === 'dark';
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ y: -10 }}
      className={`p-10 md:p-14 rounded-[40px] border transition-all duration-700 group cursor-default h-full flex flex-col ${
        isDark 
        ? 'bg-[#0a0a0b] border-white/5 hover:border-purple-500/30' 
        : 'bg-white border-transparent text-black shadow-2xl'
      }`}
    >
      <div className="flex justify-between items-start mb-12">
        <motion.div 
          whileHover={{ rotate: 15 }}
          className={`p-5 rounded-2xl ${isDark ? 'bg-purple-600/10 text-purple-500' : 'bg-purple-600 text-white'}`}
        >
          <Icon size={32} />
        </motion.div>
        <div className={`text-[10px] uppercase tracking-[0.4em] font-black ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          Focus // 0{title === 'Strategy' ? '1' : title === 'Design' ? '2' : title === 'Execution' ? '3' : '4'}
        </div>
      </div>
      
      <p className={`text-[10px] uppercase tracking-[0.4em] font-black mb-4 ${isDark ? 'text-purple-500' : 'text-purple-600'}`}>
        {subtitle}
      </p>
      <h3 className="text-4xl font-black tracking-tighter uppercase mb-6 leading-none">
        {title}
      </h3>
      <p className={`text-lg mb-10 leading-relaxed font-medium flex-grow ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
        {desc}
      </p>
      
      <div className={`pt-10 border-t ${isDark ? 'border-white/5' : 'border-black/5'} grid grid-cols-2 gap-6`}>
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
              className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-purple-600' : 'bg-purple-500'}`} 
            />
            <span className={`text-[10px] uppercase tracking-widest font-black ${isDark ? 'text-gray-400' : 'text-black'}`}>{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- PAGE VIEWS ---

const HomeView = ({ onNavigate }) => (
  <motion.div 
    initial="initial" 
    animate="animate" 
    variants={staggerContainer}
  >
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-20">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <SectionTag text="Elite Digital Partner" />
        <motion.h1 variants={fadeIn} className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter mb-12 md:mb-16 uppercase">
          ARCHITECTS <br />
          <motion.span variants={fadeIn} className="text-outline">OF DIGITAL</motion.span> <br />
          <motion.span variants={fadeIn} className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 italic">DOMINANCE</motion.span>
        </motion.h1>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-400 leading-tight max-w-xl font-light">
            We transform standard digital footprints into authoritative market leaders. High-intent SEO, performance design, and predictive marketing strategy.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 lg:justify-end">
            <MagneticButton primary onClick={() => onNavigate('contact')}>
              Launch Your Project <ArrowUpRight size={16} />
            </MagneticButton>
            <div className="flex items-center gap-8 pl-4 border-l border-white/10">
              <motion.div whileHover={{ scale: 1.1 }}>
                <p className="text-2xl font-bold">140%</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Avg. Growth</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <p className="text-2xl font-bold">12+</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Global Awards</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Logo Ticker */}
    <motion.div variants={fadeIn} className="py-20 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap gap-20 opacity-30 grayscale items-center">
        {[1, 2].map(i => (
          <React.Fragment key={i}>
            {["MICROSOFT", "STRIPE", "AIRBNB", "UBER", "SAMSUNG", "PRADA"].map(brand => (
              <span key={`${i}-${brand}`} className="text-4xl font-black tracking-tighter">{brand}</span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </motion.div>

    <section className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
           <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
             <SectionTag text="Our Philosophy" />
             <motion.h2 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">We build for <br /><span className="text-purple-600">The 1%</span></motion.h2>
           </motion.div>
           <motion.p initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn} className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-md">
             SOCIA isn't for everyone. We partner with founders and enterprises that demand category-leading performance and pixel-perfect execution.
           </motion.p>
        </div>

        <motion.div 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8"
        >
          <PillarCard 
            theme="dark"
            icon={BarChart3}
            subtitle="Intelligence"
            title="Strategy"
            desc="We don't guess. We use predictive modeling and competitive forensics to map out a clear path to market leadership before a single line of code is written."
            features={["Market Forensics", "Predictive ROI", "Gap Analysis", "Funnel Mapping"]}
          />
          <PillarCard 
            theme="light"
            icon={Layers}
            subtitle="Aesthetics"
            title="Design"
            desc="Experience is the new currency. We craft immersive digital environments that don't just look elite—they psychologically guide users toward conversion."
            features={["UX Architecting", "Motion Physics", "High-Fidelity UI", "Asset Scaling"]}
          />
          <PillarCard 
            theme="light"
            icon={Zap}
            subtitle="Velocity"
            title="Execution"
            desc="Speed is our competitive advantage. Our engineering team builds lightning-fast platforms that load in sub-seconds and dominate Core Web Vitals."
            features={["React Engineering", "API Integration", "Lighthouse 100", "Cloud Deploy"]}
          />
          <PillarCard 
            theme="dark"
            icon={TrendingUp}
            subtitle="Dominance"
            title="Results"
            desc="Growth is binary—you either win or you don't. We provide real-time attribution tracking that proves exactly how much revenue our work generates."
            features={["Growth Attribution", "SEO Authority", "LTV Expansion", "Scale Audits"]}
          />
        </motion.div>
      </div>
    </section>
  </motion.div>
);

const ServicesView = () => (
  <motion.section 
    initial="initial" 
    animate="animate" 
    variants={staggerContainer}
    className="pt-32 md:pt-48 pb-24 px-6 max-w-7xl mx-auto"
  >
    <SectionTag text="Capabilities" />
    <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-16 md:mb-20 leading-none">Full-Service <br /> <span className="text-gray-600">Digital Engine</span></motion.h1>
    <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
      {[
        { title: "Search Authority", icon: Search, tags: ["Technical Audit", "Backlink Strategy", "Content Ops"] },
        { title: "Performance Ads", icon: Zap, tags: ["Media Buying", "LTV Tracking", "Retargeting"] },
        { title: "Digital Experience", icon: Code2, tags: ["UX Strategy", "React Development", "Conversion Lab"] },
        { title: "Growth Consulting", icon: TrendingUp, tags: ["CRM Automation", "Data Modeling", "Market Analysis"] }
      ].map((service, i) => (
        <motion.div key={i} whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
           <div className="p-8 md:p-12 border border-white/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <service.icon size={120} />
            </div>
            <div className="relative z-10">
              <div className="text-purple-500 mb-8 p-4 bg-purple-500/5 rounded-2xl w-fit group-hover:bg-purple-600 group-hover:text-white transition-all">
                <service.icon size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-tight">{service.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Data-driven approaches prioritizing business results over standard vanity metrics.</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, j) => (
                  <span key={j} className="text-[9px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-gray-400 font-bold">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

const ContactView = () => (
  <motion.section 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="pt-32 md:pt-48 pb-32 px-6 max-w-7xl mx-auto"
  >
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <SectionTag text="Get in touch" />
        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 md:mb-12 leading-[0.95]">Elevate your <br /> <span className="text-gray-600 italic">Trajectory.</span></motion.h1>
        <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-500 mb-12 md:mb-16 leading-relaxed max-w-xl">We don't work with everyone. We partner with brands that are ready to lead their category. Tell us about your goals.</motion.p>
        
        <div className="space-y-8 md:space-y-10 mb-16 lg:mb-0">
           {[
             { icon: Mail, text: "hello@socia.agency" }, 
             { icon: MapPin, text: "Vadodara, Gujarat, India" }
           ].map((item, i) => (
             <motion.div key={i} variants={fadeIn} className="flex items-center gap-5 md:gap-6 group cursor-pointer w-fit">
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all flex-shrink-0">
                 <item.icon size={20}/>
               </div>
               <p className="text-lg md:text-xl font-bold border-b border-transparent group-hover:border-white transition-all break-all">{item.text}</p>
             </motion.div>
           ))}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0a0a0b] p-8 md:p-12 rounded-[40px] md:rounded-[50px] border border-white/5 relative shadow-2xl"
      >
         <form className="space-y-8 md:space-y-10" onSubmit={e => e.preventDefault()}>
           <div className="grid md:grid-cols-2 gap-8 md:gap-10">
             <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600">Company</label>
               <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-purple-500 transition-colors text-lg" placeholder="e.g. Acme Corp" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600">Email</label>
               <input className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-purple-500 transition-colors text-lg" placeholder="name@company.com" />
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600">Primary Objective</label>
             <div className="relative group">
                <select className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-purple-500 transition-colors text-lg text-gray-400 appearance-none cursor-pointer">
                    <option className="bg-[#070809]">Scale Organic Revenue</option>
                    <option className="bg-[#070809]">Performance Advertising (PPC)</option>
                    <option className="bg-[#070809]">Brand Authority & PR</option>
                    <option className="bg-[#070809]">Web Platform Engineering</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover:text-purple-500">
                    <ArrowUpRight size={18} />
                </div>
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600">Project Overview</label>
             <textarea className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-purple-500 transition-colors text-lg min-h-[100px] resize-none" placeholder="Describe your vision..." />
           </div>
           <MagneticButton primary className="w-full py-6 mt-4" type="submit">Initiate Briefing</MagneticButton>
         </form>
      </motion.div>
    </div>
  </motion.section>
);

// --- MAIN APP ENTRY ---

const App = () => {
  const [page, setPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strict scroll locking when menu is open to prevent background blur glitches
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [menuOpen]);

  const handleNavigate = (target) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070809] text-white selection:bg-purple-600 selection:text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; cursor: default; }
        .text-outline { -webkit-text-stroke: 1.5px rgba(255,255,255,0.1); color: transparent; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
        select { background-color: transparent; }
        option { background-color: #0a0a0b; color: white; }
        .mobile-menu-bg {
          background-color: rgba(7, 8, 9, 0.98);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @supports (backdrop-filter: blur(1px)) {
          .mobile-menu-bg {
            background-color: rgba(7, 8, 9, 0.92);
            backdrop-filter: blur(40px) saturate(180%);
          }
        }
      `}</style>
      
      <ThreeBackground />

      {/* Primary Navigation Container */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled && !menuOpen
          ? 'py-4 bg-[#070809]/80 backdrop-blur-xl border-b border-white/5' 
          : 'py-8 md:py-10'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 flex justify-between items-center h-full">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer z-[120]" 
            onClick={() => handleNavigate('home')}
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter italic leading-none">
              SOCIA<span className="text-purple-600">.</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            <div className="flex items-center gap-8 xl:gap-12">
              {['Home', 'Services', 'Contact'].map((item) => (
                <NavLink 
                  key={item} 
                  label={item} 
                  active={page === item.toLowerCase()} 
                  onClick={() => handleNavigate(item.toLowerCase())} 
                />
              ))}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('contact')}
              className="px-7 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] border border-white/20 transition-all uppercase leading-none"
            >
              Consultation
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white z-[120] relative p-2 flex items-center justify-center" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Isolated Mobile Navigation Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[110] mobile-menu-bg flex flex-col pt-32 pb-12 px-8 sm:px-12"
              style={{ height: '100vh', width: '100vw' }}
            >
              <div className="max-w-4xl mx-auto w-full flex flex-col h-full overflow-y-auto no-scrollbar">
                {/* Navigation Links */}
                <div className="flex-grow flex flex-col justify-center space-y-4 sm:space-y-6">
                  {['Home', 'Services', 'Contact'].map((item, idx) => (
                    <motion.button 
                      key={item} 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                      onClick={() => handleNavigate(item.toLowerCase())}
                      className={`block text-5xl sm:text-7xl font-black tracking-tighter uppercase text-left w-full transition-all ${
                        page === item.toLowerCase() ? 'text-purple-600 pl-4' : 'text-white hover:text-purple-500'
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
                
                {/* Mobile Menu Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-10 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">Base</p>
                      <p className="text-lg font-bold">Vadodara, Gujarat</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">Contact</p>
                      <p className="text-lg font-bold italic underline decoration-purple-600 underline-offset-4">hello@socia.agency</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 flex gap-6">
                    {[<Linkedin />, <Twitter />, <Instagram />].map((icon, i) => (
                      <div key={i} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {React.cloneElement(icon, { size: 20 })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {page === 'home' && <HomeView onNavigate={handleNavigate} />}
            {page === 'services' && <ServicesView />}
            {page === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-[#070809] border-t border-white/5 pt-24 md:pt-40 pb-20">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-24 mb-20 md:mb-40">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md"
            >
              <h2 className="text-5xl font-black tracking-tighter mb-10 uppercase italic leading-none">SOCIA<span className="text-purple-600">.</span></h2>
              <p className="text-gray-400 leading-relaxed mb-6 md:mb-10 font-medium italic text-xl">Your partners in dominance.</p>
              <p className="text-gray-500 leading-relaxed mb-10 font-medium">A boutique agency with enterprise-level impact. We focus on ROI, not vanity. Based in Vadodara, Gujarat, working worldwide.</p>
              <div className="flex gap-4">
                {[<Linkedin />, <Twitter />, <Instagram />].map((icon, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.1, backgroundColor: "white", color: "black" }}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                  >
                    {React.cloneElement(icon, { size: 18 })}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] font-black text-gray-600 gap-8 text-center md:text-left">
            <p>© 2026 SOCIA® — THE ARCHITECTS OF GROWTH</p>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-all">
              <span>MADE BY</span>
              <span className="text-purple-600 flex items-center gap-1">VIVEK PATEL <Heart size={10} className="fill-purple-600" /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;