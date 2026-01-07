import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Target, 
  MousePointer2, 
  XCircle,
  ArrowRight,
  PlayCircle,
  Share2,
  PieChart,
  TrendingUp,
  CheckCircle2,
  Phone,
  Mail,
  Zap,
  ArrowUpRight
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const textReveal = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", y: 20 },
  visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

// --- PRELOADER ---
const Preloader = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Vivek, 1: SOCIA

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div 
              key="vivek"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs font-black uppercase tracking-[0.6em] text-black/40 mb-2">Designed & Built By</span>
              <span className="text-4xl md:text-6xl font-black tracking-tighter text-black">VIVEK PATEL</span>
            </motion.div>
          ) : (
            <motion.div 
              key="socia"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="overflow-hidden mb-4"
              >
                <span className="text-8xl font-black tracking-tighter text-black block">SOCIA</span>
              </motion.div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="w-1 h-8 bg-black origin-bottom"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Global Progress Line */}
      <motion.div 
        onAnimationComplete={() => {
          if (step === 1) onComplete();
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 4, ease: "linear" }}
        className="fixed bottom-0 left-0 w-full h-1 bg-black origin-left"
      />
    </motion.div>
  );
};

// --- SCROLL PROGRESS BAR ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[300] origin-left" />;
};

// --- BACKGROUND ---
const ThreeBackground = () => {
  const canvasRef = useRef();
  useEffect(() => {
    let script;
    const initThree = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 300; 
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 15;
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: '#ffffff', transparent: true, opacity: 0.2 });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 5;
      const animate = () => {
        particlesMesh.rotation.y += 0.0003;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    };
    if (!window.THREE) {
      script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThree;
      document.head.appendChild(script);
    } else initThree();
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

// --- REUSABLE UI ---
const SectionTag = ({ text, dark = false }) => (
  <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
    <div className={`h-[1px] w-8 ${dark ? 'bg-black/30' : 'bg-white/30'}`} />
    <span className={`text-[10px] uppercase tracking-[0.5em] font-black italic ${dark ? 'text-black/40' : 'text-white/40'}`}>{text}</span>
  </motion.div>
);

const AnimatedTitle = ({ children, className = "" }) => (
  <div className="overflow-hidden">
    <motion.h2 variants={textReveal} className={className}>{children}</motion.h2>
  </div>
);

const MagneticButton = ({ children, primary, onClick, className = "" }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`relative overflow-hidden px-8 py-5 transition-all duration-500 group border flex items-center justify-center gap-3 ${className} ${
      primary ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'
    }`}
  >
    <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
      {children}
    </span>
  </motion.button>
);

// --- PAGES ---

const HomeView = ({ onNavigate }) => (
  <div className="relative">
    {/* HERO SECTION */}
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <SectionTag text="Predictable Business Growth" />
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter mb-12 uppercase"
        >
          <motion.span variants={textReveal} className="block mb-4">SOCIA — Performance</motion.span>
          <motion.span variants={textReveal} className="block text-transparent mb-4" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Marketing for</motion.span>
          <motion.span variants={textReveal} className="block">Growth Systems.</motion.span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid lg:grid-cols-12 gap-12 items-end pt-12 border-t border-white/5"
        >
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl font-light">
              Digital marketing built to generate leads, customers, and revenue — <span className="text-white font-medium italic underline decoration-white/20">not just clicks and followers.</span>
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <MagneticButton primary onClick={() => onNavigate('contact')}>
              Free Growth Audit <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton onClick={() => onNavigate('contact')}>
              Book Strategy Call
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>

    {/* THE PROBLEM */}
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-40 px-6 bg-white text-black overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionTag dark text="The Reality" />
          <AnimatedTitle className="text-5xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">Most businesses <br />waste money.</AnimatedTitle>
          <div className="space-y-6">
            {[
              "Chasing traffic instead of buyers",
              "Running ads without a funnel",
              "Posting content without strategy",
              "Measuring likes instead of profit"
            ].map((p, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex gap-4 items-center group">
                <XCircle size={20} className="text-black/20 group-hover:text-red-500 transition-colors" />
                <span className="text-lg font-bold uppercase tracking-tight text-black/60">{p}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-black/40 font-medium italic">That’s why marketing feels expensive and unreliable.</p>
        </div>
        <motion.div 
          variants={fadeInUp}
          className="bg-black text-white p-12 md:p-20 relative"
        >
          <div className="absolute top-0 right-0 p-8">
            <TrendingUp size={48} className="text-white/10" />
          </div>
          <SectionTag text="Our Solution" />
          <h3 className="text-3xl font-black uppercase mb-8">We design growth engines.</h3>
          <div className="space-y-6">
            {[
              {t: "Attract", d: "Targeting the right audience with precision."},
              {t: "Convert", d: "Turning cold traffic into qualified leads."},
              {t: "Retain", d: "Transforming leads into paying customers."},
              {t: "Optimize", d: "Continuously improving using real data."}
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 border-b border-white/10 pb-4"
              >
                <span className="text-white/20 font-black italic">0{i+1}</span>
                <div>
                  <p className="font-bold uppercase tracking-tight">{s.t}</p>
                  <p className="text-xs text-white/40">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>

    {/* SERVICES OVERVIEW */}
    <section className="py-40 px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-[1400px] mx-auto">
        <SectionTag text="What We Do" />
        <AnimatedTitle className="text-6xl font-black uppercase tracking-tighter mb-20">Growth Arsenal.</AnimatedTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            { title: "SEO", icon: Search, desc: "Rank for high-intent keywords and generate long-term inbound leads." },
            { title: "Paid Advertising", icon: Target, desc: "Scale revenue using Google Ads, Meta Ads, and retargeting funnels." },
            { title: "Video & Reels", icon: PlayCircle, desc: "Build authority, trust, and attention across Instagram, YouTube, and LinkedIn." },
            { title: "Social Media", icon: Share2, desc: "Position your brand as a trusted voice in your industry." },
            { title: "CRO", icon: MousePointer2, desc: "Turn visitors into paying customers. Maximize ROI." },
            { title: "Analytics", icon: PieChart, desc: "Measure what matters. Optimize what works." },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeInUp} className="p-12 bg-[#050506] hover:bg-white/5 transition-all group cursor-default">
              <s.icon size={28} className="text-white/20 mb-8 group-hover:text-white transition-colors" />
              <h4 className="text-xl font-bold uppercase mb-4 tracking-tight">{s.title}</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* WHO WE WORK WITH */}
    <section className="py-40 px-6 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionTag text="Ideal Partners" />
          <AnimatedTitle className="text-5xl font-black uppercase mb-8">Who We Fit.</AnimatedTitle>
          <div className="grid grid-cols-2 gap-4">
            {["Founders & Startups", "SMBs", "E-commerce Brands", "Service Businesses", "Coaches & Consultants"].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 p-4 bg-white/5 rounded">
                <CheckCircle2 size={16} className="text-white/40" />
                <span className="text-xs uppercase font-bold tracking-widest">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="flex flex-col justify-center">
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            "Marketing is not magic. It only works if the offer is real, the funnel is logical, and the execution is disciplined."
          </p>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="py-40 px-6">
      <div className="max-w-[1000px] mx-auto text-center">
        <SectionTag text="Final Call" />
        <AnimatedTitle className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">Get Your Free <br />Growth Audit.</AnimatedTitle>
        <motion.p variants={fadeInUp} className="text-xl text-gray-400 font-light mb-16 max-w-2xl mx-auto">We’ll review your website, ads, SEO, and funnel — and show you exactly where growth is being lost.</motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
          <MagneticButton primary onClick={() => onNavigate('contact')}>Request Free Audit</MagneticButton>
          <MagneticButton onClick={() => onNavigate('contact')}>Book Call</MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  </div>
);

const AboutView = () => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
    <SectionTag text="About SOCIA" />
    <AnimatedTitle className="text-5xl md:text-[6.5rem] font-black tracking-tighter uppercase mb-20 leading-[0.85]">
      Growth, Not <br /><span className="text-white/20">Vanity.</span>
    </AnimatedTitle>

    <div className="grid lg:grid-cols-2 gap-20 mb-32">
      <div>
        <motion.p variants={fadeInUp} className="text-2xl font-light text-gray-300 leading-relaxed mb-8">
          SOCIA is a performance-driven digital marketing agency built to help businesses grow revenue using data, strategy, and execution — <span className="text-white font-bold">not guesswork.</span>
        </motion.p>
        <motion.p variants={fadeInUp} className="text-gray-500 leading-relaxed">
          We exist because most digital marketing today is broken. Businesses spend money on ads that don’t convert, SEO that doesn’t rank, and social media that looks busy but delivers nothing measurable. We build systems that Attract, Convert, and Scale.
        </motion.p>
      </div>
      <div className="space-y-12">
        <motion.div variants={fadeInUp} className="border-l border-white/10 pl-8">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 italic">Our Mission</h4>
          <p className="text-xl font-bold">To help businesses grow predictably using ethical, transparent, and performance-focused digital marketing.</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="border-l border-white/10 pl-8">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 italic">Our Vision</h4>
          <p className="text-xl font-bold">To become a trusted long-term growth partner by delivering consistent, measurable results.</p>
        </motion.div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        { t: "Strategy First", d: "Strategy comes before services. We don't just 'do' things; we plan for outcomes." },
        { t: "Data Guided", d: "Data guides every decision. We measure leads, sales, CAC, ROAS, and profit." },
        { t: "ROI Focused", d: "We don't try to look busy. We try to make you profitable." },
        { t: "No Contracts", d: "No long-term contracts or lock-ins. We keep our clients through results." },
        { t: "Full Transparency", d: "Transparent reporting with no fake metrics or vanity numbers." },
        { t: "Continuous Improvement", d: "We follow a cycle of weekly testing and refinement to boost performance." }
      ].map((item, i) => (
        <motion.div key={i} variants={fadeInUp} className="p-10 border border-white/5 bg-white/5">
          <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{item.t}</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">{item.d}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ServicesView = () => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
    <SectionTag text="Our Services" />
    <AnimatedTitle className="text-5xl md:text-[6.5rem] font-black tracking-tighter uppercase mb-20 leading-[0.85]">
      Outcome <br /><span className="text-white/20">Systems.</span>
    </AnimatedTitle>

    <div className="space-y-32">
      {[
        { 
          t: "Search Engine Optimization (SEO)", 
          d: "Rank higher. Attract buyers. Build long-term growth. We focus on ranking for high-intent keywords that bring customers—not just traffic.",
          features: ["Technical SEO audits", "Keyword intent mapping", "Internal linking strategy", "Backlink acquisition", "Local SEO & Citations"]
        },
        { 
          t: "Paid Advertising", 
          d: "Scale faster with predictable revenue. We build advertising systems on Google and Meta that focus on profitability, not just impressions.",
          features: ["Funnel & Offer strategy", "Campaign setup", "Conversion & event tracking", "ROAS-based scaling", "Creative A/B testing"]
        },
        { 
          t: "Short-Form Video & Reels", 
          d: "Create attention, build trust, and drive action. The fastest way to influence buying decisions strategically on IG, YouTube, and LinkedIn.",
          features: ["Content strategy & Scripting", "On-site or Remote shoot guidance", "Retention-based editing", "Founder authority videos", "Offer reels"]
        },
        { 
          t: "Website & CRO", 
          d: "Turn visitors into customers. Traffic without conversion is wasted money. We optimize landing pages for maximum profit.",
          features: ["Funnel design", "UX flow optimization", "Heatmap analysis", "A/B testing", "Form optimization"]
        }
      ].map((s, i) => (
        <motion.div key={i} variants={fadeInUp} className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-6 block italic">0{i+1} — System</span>
            <h3 className="text-4xl font-black uppercase tracking-tight mb-8 leading-tight">{s.t}</h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">{s.d}</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {s.features.map((f, fi) => (
              <div key={fi} className="flex items-center gap-4 py-4 border-b border-white/5">
                <div className="w-1.5 h-1.5 bg-white/20 rotate-45" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/60">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ContactView = () => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
    <SectionTag text="Get in touch" />
    <AnimatedTitle className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-16 leading-[0.85]">
      Start Your <br /><span className="text-white/20">Audit.</span>
    </AnimatedTitle>
    <div className="grid lg:grid-cols-2 gap-20">
      <div>
        <motion.p variants={fadeInUp} className="text-xl text-gray-400 font-light mb-12">
          If you’re serious about growing your business with digital marketing that delivers measurable results, you’re in the right place. 
          Our team responds within 24 hours.
        </motion.p>
        
        <div className="space-y-8 mb-20">
          <motion.div variants={fadeInUp} className="flex items-center gap-6 group">
            <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white transition-colors">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-white/20 tracking-widest">Email</p>
              <p className="text-lg font-bold">hello@socia.com</p>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-6 group">
            <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white transition-colors">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-white/20 tracking-widest">Direct / WhatsApp</p>
              <p className="text-lg font-bold">+91-XXXXXXXXXX</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div variants={fadeInUp} className="bg-white/5 p-10 md:p-16">
        <h4 className="text-2xl font-black uppercase mb-10">Request Free Audit</h4>
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold text-sm" />
          <input type="text" placeholder="Business Name" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold text-sm" />
          <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold text-sm" />
          <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors uppercase font-bold text-sm" />
          <MagneticButton primary className="w-full">Submit Request</MagneticButton>
        </form>
        <p className="mt-8 text-[10px] text-white/20 font-medium uppercase tracking-[0.2em]">Next: 30-min strategy call if it's a fit.</p>
      </motion.div>
    </div>
  </motion.div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (target) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
      
      <AnimatePresence>{isLoading && <Preloader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <ThreeBackground />
      <ScrollProgress />

      <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 ${isScrolled ? 'py-5 bg-[#050506]/95 backdrop-blur-xl border-b border-white/5' : 'py-10'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigate('home')} 
            className="text-2xl font-black tracking-tighter cursor-pointer border-2 border-white px-2"
          >
            SOCIA
          </motion.div>
          <div className="hidden lg:flex items-center gap-12">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavigate(item.toLowerCase())} 
                className={`text-[9px] uppercase tracking-[0.4em] font-black transition-all relative py-2 ${page === item.toLowerCase() ? 'text-white' : 'text-white/40 hover:text-white'}`}
              >
                {item}
                {page === item.toLowerCase() && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />}
              </button>
            ))}
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} 
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[150] bg-white text-black flex flex-col justify-center items-center gap-10"
          >
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavigate(item.toLowerCase())} 
                className="text-6xl font-black uppercase tracking-tighter hover:italic transition-all"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {page === 'home' && <HomeView onNavigate={handleNavigate} />}
              {page === 'about' && <AboutView />}
              {page === 'services' && <ServicesView />}
              {page === 'contact' && <ContactView />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-[#050506] border-t border-white/5 py-32 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-3xl font-black tracking-tighter mb-4 inline-block border-2 border-white px-4 py-2">SOCIA</div>
          <div className="mb-12">
             <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 block mb-2">Developed By</span>
             <span className="text-sm font-bold uppercase tracking-widest">Vivek Patel</span>
          </div>
          <p className="text-xl text-gray-500 font-light max-w-xl mx-auto leading-tight mb-12 italic">"Marketing is not magic. It’s an investment in a system."</p>
          <div className="text-[8px] uppercase tracking-[0.5em] font-black text-white/10">© 2026 SOCIA — PERFORMANCE GROWTH.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
