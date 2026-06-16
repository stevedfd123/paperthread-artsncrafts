import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeType, Ticket } from './types';
import { THEMES } from './constants/themes';
import { ARTWORKS, CRAFTWORKS, MEMORY_LANE_EVENTS, ME_AND_MYSELF_GALLERY, CRAFT_CATEGORIES_WITH_TAGLINES } from './data';
import ParticleOverlay from './components/ParticleOverlay';
import InteractiveCalendar from './components/InteractiveCalendar';
import Chatbot from './components/Chatbot';
import InquiryModal from './components/InquiryModal';
import { 
  Palette, 
  Sparkles, 
  BookOpen, 
  Image as ImageIcon, 
  Scissors, 
  Calendar as CalendarIcon, 
  Layers, 
  Send, 
  Map, 
  Heart, 
  ExternalLink, 
  Compass, 
  Clock, 
  ArrowRight,
  Info,
  PhoneCall,
  Menu,
  X,
  Lock,
  Ticket as TicketIcon,
  Filter,
  Trash2,
  Check
} from 'lucide-react';

export default function App() {
  // Navigation & Splash gate
  const [isEntered, setIsEntered] = useState<boolean>(() => {
    return localStorage.getItem('paperthreads_entered') === 'true';
  });
  const [doorOpening, setDoorOpening] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(true);

  // Theme state
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('paperthreads_theme');
    return (savedTheme as ThemeType) || 'mystic-orchid';
  });

  // Particle animation state
  const [particleType, setParticleType] = useState<'droplets' | 'letters' | 'feathers' | 'none'>(() => {
    const savedParticles = localStorage.getItem('paperthreads_particles');
    return (savedParticles as any) || 'droplets';
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'home' | 'arts' | 'crafts' | 'story' | 'memory' | 'contact' | 'tickets'>('home');

  // Sub-filters for Arts/Crafts
  const [artFilter, setArtFilter] = useState<'all' | 'line' | 'abstract' | 'fusion'>('all');
  const [craftFilter, setCraftFilter] = useState<'all' | 'handicraft' | 'card'>('all');

  // Interactive burn-dissolve & glassy expertise views
  const [artsExpertiseState, setArtsExpertiseState] = useState<'idle' | 'burning' | 'glassy'>('idle');
  const [craftsExpertiseState, setCraftsExpertiseState] = useState<'idle' | 'burning' | 'glassy'>('idle');

  // Inquiry Modal state
  const [inquiryProduct, setInquiryProduct] = useState<{ title: string; category: string; type: 'Art' | 'Craft' } | null>(null);

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states on Contact tab
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Ticket / Order System state
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('paperthreads_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 'PT-1082',
        customerName: 'Asha Peiris',
        customerEmail: 'asha.peiris@gmail.com',
        customerPhone: '+94 71 884 9283',
        specialtyType: 'shadowbox',
        message: 'A 10x10 quilled shadowbox for my parents golden anniversary. Please quill a design with yellow lilies and gold vines. Delivery needed in Kandy.',
        priority: 'high',
        status: 'threading',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        estimatedDays: 12
      },
      {
        id: 'PT-1083',
        customerName: 'Dineth Jayasekara',
        customerEmail: 'dineth.j@outlook.com',
        customerPhone: '+94 77 412 0928',
        specialtyType: 'circular-fusion',
        message: 'Looking for a custom fine-line fusion mandala featuring a silhouette of Adams Peak. Size should be 12 inches circular framed.',
        priority: 'medium',
        status: 'in-design',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        estimatedDays: 14
      },
      {
        id: 'PT-1084',
        customerName: 'Shalini de Silva',
        customerEmail: 'shalini.ds@yahoo.com',
        customerPhone: '+94 75 330 4561',
        specialtyType: 'popup-card',
        message: 'Need 5 units of 3D layered laser-cut replica cards for our studio opening invitations. Delicate quilled orchids on the front.',
        priority: 'urgent',
        status: 'crafting',
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        estimatedDays: 5
      }
    ];
  });

  // Ticket creation form state
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketSpecialty, setTicketSpecialty] = useState<'fine-line' | 'circular-fusion' | 'popup-card' | 'shadowbox' | 'custom'>('shadowbox');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  
  // Ticket management state
  const [ticketStatusFilter, setTicketStatusFilter] = useState<'all' | 'pending' | 'in-design' | 'crafting' | 'threading' | 'ready'>('all');
  const [ticketSortBy, setTicketSortBy] = useState<'date' | 'priority' | 'status'>('date');
  const [ticketFormSuccess, setTicketFormSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('paperthreads_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const colors = THEMES[theme];

  // Save selection states to local storage
  const handleEnterWorld = () => {
    setShowSmoke(true);
    setDoorOpening(true);
    setTimeout(() => {
      setIsEntered(true);
      localStorage.setItem('paperthreads_entered', 'true');
      setShowSmoke(false);
    }, 1800); // Gives majestic smoke particles and sparks ample time to billow and fade out!
  };

  const handleLeaveWorld = () => {
    setIsEntered(false);
    setDoorOpening(false);
    localStorage.removeItem('paperthreads_entered');
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('paperthreads_theme', newTheme);
  };

  const handleParticleChange = (type: 'droplets' | 'letters' | 'feathers' | 'none') => {
    setParticleType(type);
    localStorage.setItem('paperthreads_particles', type);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          type: 'General Contact',
          interest: contactSubject || 'General Inquiry',
          notes: contactMsg
        }),
      });
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMsg('');
    } catch (err) {
      console.error(err);
      setContactSuccess(true); // Graceful mock fallback
    }
  };

  // Art filter list
  const filteredArtworks = ARTWORKS.filter(
    (art) => artFilter === 'all' || art.category === artFilter
  );

  // Craft filter list
  const filteredCraftworks = CRAFTWORKS.filter(
    (craft) => craftFilter === 'all' || craft.category === craftFilter
  );

  return (
    <div className={`min-h-screen ${colors.bgOuter} transition-all duration-700 relative overflow-hidden font-sans`}>
      
      {/* Background Ambience particles */}
      <ParticleOverlay type={particleType} />

      {/* 1. MYSTICAL ENTRANCE SPLASH GATE */}
      {!isEntered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050309] font-serif">
          
          {/* Continuous Ambient Fog/Mist Layers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
            {/* Soft rolling mist clouds */}
            <motion.div 
              className="absolute w-[140%] h-[120%] -left-[20%] -top-[10%] rounded-full mix-blend-screen"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.02) 60%, rgba(0,0,0,0) 100%)',
                filter: 'blur(80px)'
              }}
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -30, 30, 0],
                rotate: [0, 360],
              }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-[130%] h-[130%] -right-[15%] -bottom-[15%] rounded-full mix-blend-screen"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(245, 158, 11, 0.03) 70%, rgba(0,0,0,0) 100%)',
                filter: 'blur(90px)'
              }}
              animate={{
                x: [0, -50, 50, 0],
                y: [0, 40, -40, 0],
                rotate: [360, 0],
              }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            />
            {/* Extra central rolling white mist */}
            <motion.div 
              className="absolute w-[100%] h-[100%] left-0 top-0 rounded-full mix-blend-screen opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(235, 196, 255, 0.05) 0%, rgba(236, 72, 153, 0.01) 50%, rgba(0,0,0,0) 80%)',
                filter: 'blur(100px)'
              }}
              animate={{
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.35, 0.55, 0.35]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Left Door */}
          <div 
            className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#030107] via-[#0b0515] to-[#16062a] border-r border-pink-500/10 flex items-center justify-end z-20 transition-all duration-[1500ms] ease-in-out ${
              doorOpening ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{
              filter: doorOpening ? 'blur(35px)' : 'blur(0px)',
            }}
          >
            <div className="text-right pr-6 md:pr-12 max-w-sm hidden sm:block">
              <span className="text-pink-500/80 font-mono tracking-widest text-xs uppercase">Est. 2018</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2 leading-none">Paper</h1>
              <p className="text-purple-300 text-sm mt-2 italic">Turn ordinary paper sheets into timeless keepsakes</p>
            </div>
          </div>

          {/* Right Door */}
          <div 
            className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#030107] via-[#0b0515] to-[#16062a] border-l border-pink-500/10 flex items-center justify-start z-20 transition-all duration-[1500ms] ease-in-out ${
              doorOpening ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{
              filter: doorOpening ? 'blur(35px)' : 'blur(0px)',
            }}
          >
            <div className="text-left pl-6 md:pl-12 max-w-sm hidden sm:block">
              <span className="text-purple-400 font-mono tracking-widest text-xs uppercase">Handcrafted</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-pink-500 mt-2 leading-none">Threads</h1>
              <p className="text-purple-300 text-sm mt-2 italic">Drawn and quilled personally with patience and heart</p>
            </div>
          </div>

          {/* Central Portal Gate Column */}
          <motion.div 
            animate={doorOpening ? { 
              scale: 2.6, 
              opacity: 0, 
              filter: "blur(18px)" 
            } : { 
              scale: 1, 
              opacity: 1, 
              filter: "blur(0px)" 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="z-30 text-center px-4 max-w-md mx-auto flex flex-col items-center justify-center"
          >
            {/* Pulsating glowing outer ring */}
            <div className="relative group cursor-pointer mb-8" onClick={handleEnterWorld}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-800 opacity-60 blur-2xl group-hover:opacity-100 group-hover:scale-110 transition duration-700 animate-pulse"></div>
              
              {/* Actual Imgur portal logo image */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-pink-500/40 p-2 bg-black/40 glow-hover">
                <img
                  src="https://i.imgur.com/WCJbwHM.jpeg"
                  alt="PaperThreads Mystical Gate Entrance Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback visual design if Imgur breaks
                    e.currentTarget.style.display = 'none';
                    const fallbackPr = e.currentTarget.parentElement;
                    if (fallbackPr) {
                      fallbackPr.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-tr', 'from-purple-950', 'to-pink-950');
                      const icon = document.createElement('div');
                      icon.className = "text-center text-pink-500 text-sm font-mono uppercase tracking-widest";
                      icon.innerHTML = "<span class='text-4xl block animate-spin mb-1'>🌀</span>PORTAL";
                      fallbackPr.appendChild(icon);
                    }
                  }}
                />
              </div>
              
              {/* Glow overlay */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[9px] font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full shadow-lg border border-pink-400/50">
                Unlock Portal
              </div>
            </div>

            <div className="sm:hidden mb-4">
              <h2 className="text-3xl font-bold text-white tracking-wide">PaperThreads</h2>
              <p className="text-pink-400 text-xs font-mono tracking-widest mt-1">BY KAVINDI SAMUDIKA</p>
            </div>

            {/* Loop Transitioning Portal Prompt with floating appearance and complete fade transitions */}
            <motion.p 
              className="text-xs text-purple-200 leading-relaxed max-w-xs mx-auto text-center font-mono mb-6 font-medium tracking-wide px-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.96, 1, 1, 0.96],
                y: [12, 0, 0, -12]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6.0, 
                times: [0, 0.15, 0.85, 1.0],
                ease: "easeInOut" 
              }}
            >
              " Hand-drawn lines, interactive three-dimensional greeting cards, and meticulous thread alignments waiting inside "
            </motion.p>

            {/* High-Tech Swooshing Action Button */}
            <button
              id="enter-portal-button"
              onClick={handleEnterWorld}
              className="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-[11px] tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(236,72,153,0.55)] border border-pink-400/30 cursor-pointer group"
            >
              {/* High-tech targeting grids */}
              <span className="absolute inset-x-0 h-[1px] bg-white/10 top-1/2 -translate-y-1/2 pointer-events-none" />
              <span className="absolute top-1 left-4 text-[5px] font-mono opacity-40 text-pink-200">PT:00.26</span>
              <span className="absolute bottom-1 right-4 text-[5px] font-mono opacity-40 text-purple-200">SYS:ONLINE</span>

              {/* Holographic Glowing Sweep (Swoosh Glare) */}
              <motion.span 
                className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none"
                animate={{
                  left: ['-30%', '130%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.0,
                  ease: "easeInOut"
                }}
              />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-50"></span>
                </span>
                Enter PaperThreads
              </span>
            </button>
          </motion.div>

          {/* Magical Volumetric Smoke & Thread Sparks Overlay */}
          <AnimatePresence>
            {showSmoke && (
              <div className="absolute inset-0 z-40 bg-transparent flex items-center justify-center pointer-events-none overflow-hidden">
                
                {/* 48 Multi-colored billowy vortex smoke puffs */}
                {Array.from({ length: 48 }).map((_, i) => {
                  const angle = (i * 360) / 48;
                  const randomSpeed = 100 + Math.random() * 320;
                  const radian = (angle * Math.PI) / 180;
                  const tx = Math.cos(radian) * randomSpeed;
                  const ty = Math.sin(radian) * randomSpeed - (160 + Math.random() * 200); // spiral and lift upwards
                  const size = 80 + Math.random() * 150;
                  const swirlAngle = (i % 2 === 0 ? 360 : -360) + (Math.random() * 90);

                  // Distribute beautiful, vibrant colors representing our core design profiles
                  let gradientColor = 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)'; // Cherry Pink
                  if (i % 4 === 1) {
                    gradientColor = 'radial-gradient(circle, rgba(139,92,246,0.85) 0%, rgba(139,92,246,0) 70%)'; // Royal Violet
                  } else if (i % 4 === 2) {
                    gradientColor = 'radial-gradient(circle, rgba(16,185,129,0.75) 0%, rgba(16,185,129,0) 70%)'; // Mint Emerald
                  } else if (i % 4 === 3) {
                    gradientColor = 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(245,158,11,0) 70%)'; // Peach Gold Accord
                  }

                  return (
                    <motion.div
                      key={`smoke-${i}`}
                      className="absolute rounded-full mix-blend-screen"
                      initial={{ 
                        opacity: 0.95, 
                        scale: 0.1, 
                        x: 0, 
                        y: 0, 
                        rotate: 0,
                        filter: 'blur(10px)',
                        background: gradientColor
                      }}
                      animate={{ 
                        opacity: [0.95, 0.75, 0.4, 0], 
                        scale: [0.1, 2.5, 5.5], 
                        x: tx, 
                        y: ty,
                        rotate: swirlAngle,
                        filter: ['blur(10px)', 'blur(28px)', 'blur(55px)'],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 1.8, 
                        ease: "easeOut"
                      }}
                      style={{
                        width: size,
                        height: size,
                      }}
                    />
                  );
                })}

                {/* 50 Spectacular Shooting Thread Sparks representing hand-woven threads */}
                {Array.from({ length: 50 }).map((_, j) => {
                  const angle = Math.random() * 360;
                  const speed = 180 + Math.random() * 450;
                  const radian = (angle * Math.PI) / 180;
                  const sx = Math.cos(radian) * speed;
                  const sy = Math.sin(radian) * speed - (50 + Math.random() * 100);
                  const delay = Math.random() * 0.35;
                  const sparkSize = 3 + Math.random() * 6;

                  // Glowing color pool for our spark threads
                  const sparkColors = [
                    'bg-pink-300 shadow-[0_0_8px_#ec7299]',
                    'bg-purple-300 shadow-[0_0_8px_#ba68c8]',
                    'bg-emerald-300 shadow-[0_0_8px_#34d399]',
                    'bg-amber-300 shadow-[0_0_8px_#fbbf24]',
                    'bg-white shadow-[0_0_12px_#ffffff]'
                  ];
                  const chosenColor = sparkColors[j % sparkColors.length];

                  return (
                    <motion.div
                      key={`spark-${j}`}
                      className={`absolute rounded-full ${chosenColor}`}
                      initial={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        opacity: [1, 1, 0.7, 0],
                        scale: [1, 1.4, 0.2],
                        x: sx,
                        y: sy
                      }}
                      transition={{
                        duration: 1.1 + Math.random() * 0.7,
                        delay: delay,
                        ease: "easeOut"
                      }}
                      style={{
                        width: sparkSize,
                        height: sparkSize,
                      }}
                    />
                  );
                })}

                {/* Double Concentric expanding shockwave circles */}
                <motion.div 
                  className="absolute w-28 h-28 rounded-full border-2 border-pink-500/40 z-30 mix-blend-screen"
                  initial={{ scale: 0.1, opacity: 1, filter: 'blur(2px)' }}
                  animate={{ scale: 18, opacity: 0, filter: 'blur(20px)' }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute w-24 h-24 rounded-full border border-purple-500/30 z-20 mix-blend-screen"
                  initial={{ scale: 0.05, opacity: 0.8, filter: 'blur(1px)' }}
                  animate={{ scale: 12, opacity: 0, filter: 'blur(30px)' }}
                  transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
                />

                {/* Magical ambient backdrop screen flash */}
                <motion.div 
                  className="absolute inset-0 bg-[#07010e]/40 min-w-full min-h-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Floating copyright */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-purple-500 font-mono tracking-wide z-10">
            © 2026 PaperThreads Sri Lanka. Designed with ambient magenta droplets.
          </div>
        </div>
      )}

      {/* 2. MAIN APPLICATION CONTENT VIEW */}
      {isEntered && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-24 relative z-20">
          


          {/* MAIN HEADER & NAVIGATION NAVIGATION */}
          <header className={`p-4 sm:p-6 mb-8 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300`}>
            {/* Branding */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('home')}
                className="w-14 h-14 rounded-full overflow-hidden border border-pink-500/30 bg-black/30 p-0.5"
              >
                <img
                  src="https://i.imgur.com/WCJbwHM.jpeg"
                  alt="PaperThreads Mini Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = "<span class='text-lg font-bold text-pink-500'>PT</span>";
                    }
                  }}
                />
              </button>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${colors.textPrimary} tracking-tight`}>
                  PaperThreads
                </h1>
                <p className="text-[10px] font-mono tracking-widest text-pink-400 uppercase mt-0.5">
                  Turning Imagination into Handmade Treasures
                </p>
              </div>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-purple-300 hover:text-white rounded-lg bg-black/20"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-wrap items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
              <button
                id="nav-tab-home"
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'home' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Home
              </button>
              <button
                id="nav-tab-arts"
                onClick={() => setActiveTab('arts')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'arts' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Arts
              </button>
              <button
                id="nav-tab-crafts"
                onClick={() => setActiveTab('crafts')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'crafts' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Crafts
              </button>
              <button
                id="nav-tab-story"
                onClick={() => { setActiveTab('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'story' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Our Story
              </button>
              <button
                id="nav-tab-memory"
                onClick={() => setActiveTab('memory')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'memory' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Memory Lane
              </button>
              <button
                id="nav-tab-tickets"
                onClick={() => setActiveTab('tickets')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'tickets' ? 'bg-pink-600 text-white shadow-md' : 'text-purple-300 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Order Tracker
              </button>
              <button
                id="nav-tab-contact"
                onClick={() => setActiveTab('contact')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'contact' ? 'bg-pink-600 text-white shadow-md animate-pulse' : 'text-pink-400 hover:text-pink-300 hover:bg-pink-500/5'
                }`}
              >
                Calendar & Inquiry
              </button>
            </nav>
          </header>

          {/* Mobile Overlay Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden p-4 rounded-xl mb-6 ${colors.bgCard} border border-pink-500/20 font-mono text-xs uppercase tracking-wider flex flex-col gap-2`}>
              {(['home', 'arts', 'crafts', 'story', 'memory', 'tickets', 'contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left p-3 rounded-lg transition ${
                    activeTab === tab ? 'bg-pink-600 text-white' : 'text-purple-300 hover:bg-pink-500/5'
                  }`}
                >
                  {tab === 'contact' ? 'Calendar & Contact' : tab === 'tickets' ? 'Order Tracker' : tab}
                </button>
              ))}
            </div>
          )}

          {/* TAB 1: HOME PANEL */}
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12"
              >
                
                {/* Grand Banner */}
                <section className={`p-8 sm:p-12 rounded-3xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} relative overflow-hidden flex flex-col lg:flex-row items-center gap-10`}>
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none"></div>
                  
                  <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      Specialist in paper quilling & silhouettes
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
                      Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-400">Keepsake Gifts</span> out of love.
                    </h2>
                    <p className={`text-sm ${colors.textSecondary} leading-relaxed max-w-xl`}>
                      Welcome to PaperThreads! Kavindi Samudika designs fine-line custom illustrations, circular fusion art, pop-up greeting cards, and deep-set quilled shadowboxes. Every order is crafted slowly, turning your special memories into durable physical treasures.
                    </p>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                      <button
                        id="home-btn-explore-arts"
                        onClick={() => setActiveTab('arts')}
                        className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs uppercase tracking-wider transition shadow-md shadow-pink-950/30 flex items-center gap-2 cursor-pointer"
                      >
                        Explore Arts
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        id="home-btn-book-calendar"
                        onClick={() => setActiveTab('contact')}
                        className="px-6 py-3 rounded-xl bg-purple-950/50 hover:bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:border-pink-500/40 font-semibold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                      >
                        Book Milestone Calendar
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-purple-500/20 group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=700&auto=format&fit=crop"
                      alt="Paper Crafting table showcase"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                    />
                    {/* Glass sheen flash */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-20">
                      <span className="text-[10px] font-mono uppercase text-pink-400 tracking-widest font-bold">Studio Glimpse</span>
                      <h4 className="text-base font-serif font-semibold text-white mt-1">Intricate quilling and thread weaving workspace</h4>
                    </div>
                  </div>
                </section>

                {/* TWO CORE COLUMNS: ARTS & CRAFTS SHOWCASE BANNER */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Arts Showcase Intro */}
                  <div className={`p-6 rounded-3xl ${colors.bgCard} border ${colors.border} flex flex-col justify-between gap-6 group cursor-pointer`}>
                    <div className="space-y-4">
                      <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-purple-500/10 shadow-lg">
                        {/* Given imgur link for arts: https://imgur.com/cNHB2fe */}
                        <img
                          src="https://i.imgur.com/cNHB2fe.jpeg"
                          alt="PaperThreads Fine Art Collection"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                          onError={(e) => {
                            // Fallback to beautiful default unsplash minimal art
                            e.currentTarget.src = "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop";
                          }}
                        />
                        {/* Glass sheen flash */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                        <div className="absolute top-3 left-3 bg-pink-600 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded z-20">
                          Gallery Showroom
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-white mt-2 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-pink-500" />
                        Fine Arts Collection
                      </h3>
                      <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                        Explore our hand-drawn line illustrations, rich heavy-acrylic abstract panels, and award-winning "Fusion Art" that marries watercolor paint textures with layered hollow paper carvings.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-between items-center bg-black/20 p-4 rounded-xl border border-purple-500/5 z-20">
                      <p className="text-[10px] font-mono text-purple-300">Minimum Order custom draft: <strong>$55+</strong></p>
                      <button
                        id="home-btn-view-arts-cat"
                        onClick={() => { setActiveTab('arts'); setArtFilter('all'); }}
                        className="text-xs font-semibold font-mono uppercase tracking-wider text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
                      >
                        Browse Arts <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Crafts Showcase Intro */}
                  <div className={`p-6 rounded-3xl ${colors.bgCard} border ${colors.border} flex flex-col justify-between gap-6 group cursor-pointer`}>
                    <div className="space-y-4">
                      <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-purple-500/10 shadow-lg">
                        {/* Given imgur link for crafts: https://imgur.com/zfWXhVb */}
                        <img
                          src="https://i.imgur.com/zfWXhVb.jpeg"
                          alt="PaperThreads Bespoke Crafts Collection"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop";
                          }}
                        />
                        {/* Glass sheen flash */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                        <div className="absolute top-3 left-3 bg-pink-600 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded z-20">
                          Paper Crafts
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-white mt-2 flex items-center gap-2">
                        <Scissors className="w-5 h-5 text-pink-500" />
                        Bespoke Crafts Showroom
                      </h3>
                      <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                        Elegant 3D Pop-Up cards that unfold into breathtaking paper sculptures, three-dimensional quilled shadowboxes, customized explosion box treasures, and gorgeous geometric woven thread wall decor.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-between items-center bg-black/20 p-4 rounded-xl border border-purple-500/5 z-20">
                      <p className="text-[10px] font-mono text-purple-300">Custom pop-up cards start from: <strong>$15+</strong></p>
                      <button
                        id="home-btn-view-crafts-cat"
                        onClick={() => { setActiveTab('crafts'); setCraftFilter('all'); }}
                        className="text-xs font-semibold font-mono uppercase tracking-wider text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
                      >
                        Browse Crafts <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </section>

                {/* SMALL STATS & PROMISE */}
                <section className="p-8 rounded-2xl bg-black/30 border border-pink-500/5 flex flex-col md:flex-row justify-around gap-6 text-center">
                  <div className="space-y-1.5">
                    <span className="text-3xl font-serif font-bold text-pink-500">100%</span>
                    <h4 className="text-xs text-white font-mono uppercase tracking-widest">Handmade with Heart</h4>
                    <p className="text-[10px] text-purple-400">Zero template cutting printers. Each design is individually sliced and shaped</p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-x border-purple-500/10 pt-4 md:pt-0 md:px-8">
                    <span className="text-3xl font-serif font-bold text-pink-500">2018</span>
                    <h4 className="text-xs text-white font-mono uppercase tracking-widest">Founded</h4>
                    <p className="text-[10px] text-purple-400">Starting as a passionate university hobby, now delivering order packages worldwide</p>
                  </div>
                  <div className="space-y-1.5 pt-4 md:pt-0">
                    <span className="text-3xl font-serif font-bold text-pink-500">4.9★</span>
                    <h4 className="text-xs text-white font-mono uppercase tracking-widest">Client Satisfaction</h4>
                    <p className="text-[10px] text-purple-400">Loved by art collectors, wedding couples, and event managers across Sri Lanka & abroad</p>
                  </div>
                </section>

                {/* CALENDAR SNEAKPEEK QUICK TICKET */}
                <section className={`p-8 rounded-3xl ${colors.bgCard} border ${colors.border} flex flex-col md:flex-row items-center justify-between gap-6`}>
                  <div className="space-y-2 text-center md:text-left">
                    <div className="text-pink-500 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> INTERACTIVE EXPERIENCE
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">Interactive Order Reminder Calendar</h3>
                    <p className={`text-xs ${colors.textSecondary} max-w-xl`}>
                      Don't miss a loved one's anniversary or an upcoming custom-order milestone! Try our custom interactive calendar. Set up color-coded alerts and download direct commission instructions prefilled for your dates.
                    </p>
                  </div>
                  <button
                    id="home-btn-calendar"
                    onClick={() => setActiveTab('contact')}
                    className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap cursor-pointer"
                  >
                    Manage My Reminders
                  </button>
                </section>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 2: FINE ARTS DISPLAY */}
          <AnimatePresence mode="wait">
            {activeTab === 'arts' && (
              <motion.div
                key="arts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-8"
              >
                
                {/* 1. INTERACTIVE FINE ARTS EXPERTISE CARD: BURN, DISSOLVE, GLASSY */}
                <div className="relative overflow-hidden rounded-2xl">
                  {artsExpertiseState === 'idle' && (
                    <motion.div
                      id="arts-expertise-idle-card"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setArtsExpertiseState('burning');
                        setTimeout(() => {
                          setArtsExpertiseState('glassy');
                        }, 900);
                      }}
                      className={`p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#120420] to-pink-950/85 border border-pink-500/25 ${colors.glowColor} cursor-pointer relative text-center group`}
                    >
                      {/* Glow effects */}
                      <div className="absolute inset-0 bg-amber-500/[0.04] opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl" />
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-all duration-700" />
                      
                      <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping block"></span>
                          Secret Unveil
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                          🔥 Click to Reveal Fine Arts Expertise Secrets
                        </h3>
                        <p className={`text-xs text-purple-300 max-w-lg mx-auto leading-relaxed`}>
                          Understand the core manual artistry, tools used, and continuous ink procedures behind Kavindi's line, abstract, and circular sunset silhouettes.
                        </p>
                        <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-bold group-hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                          Ignite & Ignite Showcase <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {artsExpertiseState === 'burning' && (
                    <motion.div
                      id="arts-expertise-burning-screen"
                      initial={{ scale: 0.98, filter: 'blur(0px)' }}
                      animate={{ 
                        scale: [1, 1.05, 0.96],
                        filter: ['blur(0px)', 'blur(8px)', 'blur(12px)', 'blur(3px)'],
                      }}
                      className="p-8 rounded-2xl h-56 flex flex-col items-center justify-center relative overflow-hidden bg-[#2d0f36] border border-orange-500/40 text-center"
                    >
                      {/* Fire heat distortion overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-rose-600 to-yellow-500 mix-blend-screen opacity-90 animate-pulse" />
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#ff8c00] via-[#dc143c] to-transparent animate-bounce" style={{ animationDuration: '400ms' }} />
                      
                      {/* Embers overlay particles */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <span className="text-white font-serif font-bold text-3xl animate-ping opacity-60">🔥 DISSOLVING...</span>
                      </div>
                    </motion.div>
                  )}

                  {artsExpertiseState === 'glassy' && (
                    <motion.div
                      id="arts-expertise-glass-panel"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 sm:p-8 rounded-2xl backdrop-blur-3xl bg-white/[0.04] border border-white/20 shadow-[0_15px_40px_rgba(236,72,153,0.15),inset_0_1px_3px_rgba(255,255,255,0.15)] relative group"
                    >
                      {/* Glow accents */}
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

                      <div className="relative z-10 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold block mb-1">
                              Artisan Expertise Profile
                            </span>
                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                              Continuous Line Drafting & Golden Abstract Texturing
                            </h3>
                          </div>
                          <button
                            onClick={() => setArtsExpertiseState('idle')}
                            className="text-[10px] font-mono uppercase tracking-wider text-purple-300 hover:text-pink-400 bg-white/5 hover:bg-white/10 p-1 px-3 rounded-full border border-white/10 transition"
                          >
                            Reset Effect
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-purple-200">
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-pink-400 font-serif font-bold text-base block">01. Single-Line Ink</span>
                            <p className="leading-relaxed opacity-90">
                              Kavindi drafts raw human silhouettes with one uninterrupted ink strip, utilizing premium archival pens to guarantee clean margins without trace lifts.
                            </p>
                          </div>
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-fuchsia-400 font-serif font-bold text-base block">02. Acrylic fields</span>
                            <p className="leading-relaxed opacity-90">
                              Each abstract art canvas uses heavy-body pigments textured with a metallic finish, integrating fine golden leaf layers that bounce ambient light across rooms.
                            </p>
                          </div>
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-purple-400 font-serif font-bold text-base block">03. Watercolor Fusion</span>
                            <p className="leading-relaxed opacity-90">
                              Combining fluid water pigment stains with layered hollow paper silhouettes, embedding multi-depth shadows within a single glass box structure.
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-center text-xs text-pink-300">
                          🌿 <strong>Pinterest Inspired Origin:</strong> Kavindi started with small continuous sketches during university degree courses, evolving now into a recognized design.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Category Filter Action header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-black/20 border border-pink-500/5">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Fine Arts Gallery</h2>
                    <p className="text-xs text-purple-400 font-mono mt-0.5">Separate pages for line, abstract, and fusion styles</p>
                  </div>

                  <div className="flex flex-wrap gap-1 bg-purple-950/45 p-1 rounded-xl border border-pink-500/10 font-mono text-xs font-medium">
                    <button
                      id="art-filter-all-btn"
                      onClick={() => setArtFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        artFilter === 'all' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      All Styles
                    </button>
                    <button
                      id="art-filter-line-btn"
                      onClick={() => setArtFilter('line')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        artFilter === 'line' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Line Art
                    </button>
                    <button
                      id="art-filter-abstract-btn"
                      onClick={() => setArtFilter('abstract')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        artFilter === 'abstract' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Abstract Art
                    </button>
                    <button
                      id="art-filter-fusion-btn"
                      onClick={() => setArtFilter('fusion')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        artFilter === 'fusion' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Fusion Art
                    </button>
                  </div>
                </div>

                {/* Arts Grid items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArtworks.map((art) => (
                    <div
                      key={art.id}
                      className={`rounded-2xl overflow-hidden ${colors.bgCard} border ${colors.border} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group h-full cursor-pointer`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden border-b border-purple-500/10">
                        <img
                          src={art.image}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                        />
                        {/* Glass sheen flash */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#10061e] border border-pink-400/20 text-[9px] font-mono uppercase tracking-widest font-bold text-pink-400 z-20">
                          {art.category} art
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                            {art.title}
                          </h4>
                          <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                            {art.description}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between items-center text-[11px] font-mono text-purple-400 border-t border-purple-500/10 pt-2.5">
                            <span>Canvas Sizing:</span>
                            <span className="text-white font-semibold">{art.size}</span>
                          </div>
                          {art.priceEstimate && (
                            <div className="flex justify-between items-center text-[11px] font-mono text-purple-400">
                              <span>Base Estimate:</span>
                              <span className="text-pink-400 font-bold">{art.priceEstimate}</span>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2 pt-1.5">
                            <button
                              id={`btn-inquire-${art.id}`}
                              onClick={() => setInquiryProduct({ title: art.title, category: art.category, type: 'Art' })}
                              className="py-2 px-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-[10px] uppercase tracking-wider transition cursor-pointer"
                            >
                              Custom Order
                            </button>
                            <a
                              id={`btn-wa-${art.id}`}
                              href={`https://wa.me/94771234567?text=Hi%20Kavindi!%20🌸%20I'am%20interested%20in%20inquiring%20about%20your%20beautiful%20Art:%20%22${encodeURIComponent(art.title)}%22%20(${art.category}).%20Is%20it%20available%20for%20order?`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-500/20 text-[10px] uppercase font-mono tracking-wide font-bold transition"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Informational warning */}
                <div className="p-6 rounded-xl bg-purple-950/20 border border-purple-500/10 text-center max-w-xl mx-auto space-y-2">
                  <Info className="w-5 h-5 text-pink-400 mx-auto" />
                  <h5 className="text-xs uppercase font-mono font-bold tracking-widest text-purple-300">Need specific dimension alignment?</h5>
                  <p className="text-[11px] text-purple-200">
                    Every hand-drawn abstract and line illustration can be adapted to matches your apartment walls or office desks. Mention customizations in the form or WhatsApp link.
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 3: CRAFTS DISPLAY */}
          <AnimatePresence mode="wait">
            {activeTab === 'crafts' && (
              <motion.div
                key="crafts"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-8"
              >
                
                {/* 1. INTERACTIVE HAND CRAFTS EXPERTISE CARD: BURN, DISSOLVE, GLASSY */}
                <div className="relative overflow-hidden rounded-2xl">
                  {craftsExpertiseState === 'idle' && (
                    <motion.div
                      id="crafts-expertise-idle-card"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setCraftsExpertiseState('burning');
                        setTimeout(() => {
                          setCraftsExpertiseState('glassy');
                        }, 900);
                      }}
                      className={`p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#120420] to-pink-950/85 border border-pink-500/25 ${colors.glowColor} cursor-pointer relative text-center group`}
                    >
                      {/* Glow effects */}
                      <div className="absolute inset-0 bg-amber-500/[0.04] opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl" />
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-all duration-700" />
                      
                      <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping block"></span>
                          Craftsman Secret
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                          🔥 Click to Reveal Hand Crafts Expertise Secrets
                        </h3>
                        <p className={`text-xs text-purple-300 max-w-lg mx-auto leading-relaxed`}>
                          Learn about the meticulous paper quilling processes, ribbon densities, and interactive structural kinematics practiced by Kavindi.
                        </p>
                        <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-bold group-hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                          Ignite & Ignite Showcase <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {craftsExpertiseState === 'burning' && (
                    <motion.div
                      id="crafts-expertise-burning-screen"
                      initial={{ scale: 0.98, filter: 'blur(0px)' }}
                      animate={{ 
                        scale: [1, 1.05, 0.96],
                        filter: ['blur(0px)', 'blur(8px)', 'blur(12px)', 'blur(3px)'],
                      }}
                      className="p-8 rounded-2xl h-56 flex flex-col items-center justify-center relative overflow-hidden bg-[#2d0f36] border border-orange-500/40 text-center"
                    >
                      {/* Fire heat distortion overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-rose-600 to-yellow-500 mix-blend-screen opacity-90 animate-pulse" />
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#ff8c00] via-[#dc143c] to-transparent animate-bounce" style={{ animationDuration: '400ms' }} />
                      
                      {/* Embers overlay particles */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <span className="text-white font-serif font-bold text-3xl animate-ping opacity-60">🔥 IGNITING...</span>
                      </div>
                    </motion.div>
                  )}

                  {craftsExpertiseState === 'glassy' && (
                    <motion.div
                      id="crafts-expertise-glass-panel"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 sm:p-8 rounded-2xl backdrop-blur-3xl bg-white/[0.04] border border-white/20 shadow-[0_15px_40px_rgba(236,72,153,0.15),inset_0_1px_3px_rgba(255,255,255,0.15)] relative group"
                    >
                      {/* Glow accents */}
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

                      <div className="relative z-10 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold block mb-1">
                              Master Handcraft Expertise Profile
                            </span>
                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                              Precision Quilling Density & Kinematic Popup Ribbons
                            </h3>
                          </div>
                          <button
                            onClick={() => setCraftsExpertiseState('idle')}
                            className="text-[10px] font-mono uppercase tracking-wider text-purple-300 hover:text-pink-400 bg-white/5 hover:bg-white/10 p-1 px-3 rounded-full border border-white/10 transition"
                          >
                            Reset Effect
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-purple-200">
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-pink-400 font-serif font-bold text-base block">01. 1mm Ribbon Coils</span>
                            <p className="leading-relaxed opacity-90">
                              Individually coiling pristine 1-2mm wide paper ribbons into tight spiraled leaves. No computer stamps are ever used; each coil requires up to 2-3 minutes of manual shaping.
                            </p>
                          </div>
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-fuchsia-400 font-serif font-bold text-base block">02. Paper Kinematics</span>
                            <p className="leading-relaxed opacity-90">
                              Designing internal friction joints and physical paper hinges. When our customized greeting cards unfold, they lift gorgeous 3D architecture smoothly without jamming.
                            </p>
                          </div>
                          <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-purple-400 font-serif font-bold text-base block">03. Woven Geometrics</span>
                            <p className="leading-relaxed opacity-90">
                              Using absolute mathematical symmetry to pull colored threads through exact coordinates. The physical thread tensions create deep Moire canvas patterns.
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center text-xs text-purple-300">
                          🏵️ <strong>Material Integrity:</strong> We import high-density acid-resistant papers to guarantee your custom greeting card maintains its dynamic popup structure for years.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 2. HANDCRAFTS OCCASIONS & TAGLINES SECTION */}
                <div className={`p-6 rounded-2xl ${colors.bgCard} border ${colors.border}`}>
                  <div className="space-y-2 text-center md:text-left mb-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">Occasion Specialties</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Specialized Greeting Card & Craft Directories</h3>
                    <p className="text-xs text-purple-300">
                      We offer bespoke handcrafts, pop-ups, and souvenirs customized for these specific life moments:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CRAFT_CATEGORIES_WITH_TAGLINES.map((item, index) => (
                      <div
                        key={index}
                        id={`craft-tagline-${index}`}
                        onClick={() => setInquiryProduct({ title: `Customized ${item.category} Request`, category: 'card', type: 'Craft' })}
                        className="p-4 rounded-xl bg-black/30 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 cursor-pointer hover:scale-[1.01] flex flex-col justify-between group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px] font-mono flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            <h4 className="text-sm font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                              {item.category}
                            </h4>
                          </div>
                          <p className="text-[11px] text-purple-300/90 leading-relaxed font-sans italic">
                            "{item.tagline}"
                          </p>
                        </div>
                        <div className="pt-3 border-t border-purple-950/20 mt-3 flex justify-between items-center">
                          <span className="text-[9px] font-mono text-purple-400">Click to Custom Order</span>
                          <span className="text-[9px] font-mono text-pink-400 font-bold group-hover:translate-x-1 transition-transform">🌸 Customize →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Crafts filter actions header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-black/20 border border-pink-500/5">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Bespoke Crafts Showroom</h2>
                    <p className="text-xs text-purple-400 font-mono mt-0.5">Meticulous handicrafts and customized greeting cards</p>
                  </div>

                  <div className="flex flex-wrap gap-1 bg-purple-950/45 p-1 rounded-xl border border-pink-500/10 font-mono text-xs font-medium">
                    <button
                      id="craft-filter-all-btn"
                      onClick={() => setCraftFilter('all')}
                      className="px-3 py-1.5 rounded-lg transition text-purple-300 hover:text-white"
                    >
                      All Crafts
                    </button>
                    <button
                      id="craft-filter-handicrafts-btn"
                      onClick={() => setCraftFilter('handicraft')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        craftFilter === 'handicraft' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Handicrafts
                    </button>
                    <button
                      id="craft-filter-cards-btn"
                      onClick={() => setCraftFilter('card')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        craftFilter === 'card' ? 'bg-pink-600 text-white' : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Greeting Cards
                    </button>
                  </div>
                </div>

                {/* Crafts Grid items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCraftworks.map((craft) => (
                    <div
                      key={craft.id}
                      className={`rounded-2xl overflow-hidden ${colors.bgCard} border ${colors.border} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group h-full cursor-pointer`}
                    >
                      <div className="relative aspect-square overflow-hidden border-b border-purple-500/10">
                        <img
                          src={craft.image}
                          alt={craft.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                        />
                        {/* Glass sheen flash */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#10061e] border border-pink-400/20 text-[9px] font-mono uppercase tracking-widest font-bold text-pink-400 z-20">
                          {craft.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                            {craft.title}
                          </h4>
                          <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                            {craft.description}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between items-center text-[11px] font-mono text-purple-400 border-t border-purple-500/10 pt-2.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> Labor Time:
                            </span>
                            <span className="text-white font-semibold">{craft.timeToMake}</span>
                          </div>
                          {craft.priceEstimate && (
                            <div className="flex justify-between items-center text-[11px] font-mono text-purple-400">
                              <span>Order Estimate:</span>
                              <span className="text-pink-400 font-bold">{craft.priceEstimate}</span>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2 pt-1.5">
                            <button
                              id={`btn-inquire-craft-${craft.id}`}
                              onClick={() => setInquiryProduct({ title: craft.title, category: craft.category, type: 'Craft' })}
                              className="py-2 px-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-[10px] uppercase tracking-wider transition cursor-pointer"
                            >
                              Inquire Now
                            </button>
                            <a
                              id={`btn-wa-craft-${craft.id}`}
                              href={`https://wa.me/94771234567?text=Hi%20Kavindi!%20🌸%20I'am%20interested%20in%20inquiring%20about%20your%20amazing%20handmade%20Craft:%20%22${encodeURIComponent(craft.title)}%22%20(${craft.category}).%20Can%20we%20configure%20it?`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-500/20 text-[10px] uppercase font-mono tracking-wide font-bold transition"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 4: OUR STORY / FOUNDER */}
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12 max-w-4xl mx-auto"
              >
                
                {/* Grand Banner header */}
                <section className="text-center space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">PASSION • HOBBY • LIFESTYLE</span>
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                    Why Arts and Crafts Are...
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
                </section>

                {/* Creator Card */}
                <div className={`p-6 sm:p-10 rounded-3xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} flex flex-col md:flex-row gap-10 items-center`}>
                  
                  {/* Founder Image */}
                  <div className="w-full md:w-80 flex-shrink-0 flex flex-col items-center">
                    <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-pink-500/30 p-2 bg-purple-950/40 shadow-xl relative group cursor-pointer">
                      <img
                        src="https://i.imgur.com/OoDImIl.jpeg"
                        alt="Kavindi Samudika, the creator behind PaperThreads"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-xl group-hover:scale-[1.08] transition-all duration-[800ms]"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      {/* Glass sheen flash */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                    </div>
                    
                    {/* Absolute Caption */}
                    <span className="text-[11px] font-mono uppercase font-bold text-pink-400 text-center tracking-wider mt-4 leading-relaxed">
                      Kavindi Samudika,<br/>
                      <span className="text-purple-300 font-medium">the creator behind PaperThreads</span>
                    </span>
                  </div>

                  {/* Narrative prose */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <span className="text-purple-400 text-xs font-mono uppercase tracking-widest">ARTIST PROFILE</span>
                      <h3 className="text-2xl font-serif font-bold text-white leading-tight mt-1">
                        Our Story
                      </h3>
                    </div>

                    <div className={`text-sm ${colors.textSecondary} space-y-4 leading-relaxed`}>
                      <p>
                        Welcome to <strong className="text-white">PaperThreads</strong>, where creativity, passion, and craftsmanship come together to create something truly special.
                      </p>
                      <p>
                        Arts and crafts are more than just creative activities—they are a way of expressing emotions, preserving memories, and transforming simple ideas into meaningful creations. Handmade pieces carry a personal touch that no machine can replicate, making every item unique and filled with character.
                      </p>
                      <p>
                        My name is <strong className="text-white">Kavindi Samudika</strong>, and I am the creator behind PaperThreads. My journey began in 2018 as a simple hobby while I was pursuing my degree. In my free time, I explored creative ideas, experimented with paper crafting techniques, and found endless inspiration through Pinterest. What started as a way to relax and express my creativity soon grew into a true passion.
                      </p>
                      <p>
                        During the COVID-19 period, I also discovered a love for hand-drawn art, opening new opportunities to express creativity and bring imagination to life. As my skills developed, so did my dream of sharing handmade creations with others.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Extended prose */}
                <div className={`p-6 sm:p-10 rounded-2xl bg-black/20 border border-purple-500/5 leading-relaxed text-sm ${colors.textSecondary} space-y-4`}>
                  <p>
                    Today, PaperThreads is a reflection of that journey—a place where art, creativity, and attention to detail come together. Every handmade gift, paper craft, and artwork is created with love, patience, and dedication, transforming ordinary materials into treasured keepsakes that bring joy to others.
                  </p>
                  <p>
                    At PaperThreads, we believe that creativity has the power to inspire, connect people, and make life's special moments even more memorable. Whether it's a personalized gift, a handcrafted decoration, or a unique piece of artwork, every creation tells a story and is made with heart.
                  </p>
                  <p className="text-center font-serif text-white italic text-lg pt-4">
                    "PaperThreads – Turning Imagination into Handmade Treasures."
                  </p>
                </div>

                {/* ME & MYSELF GALLERY SECTION */}
                <section className="space-y-6 pt-4">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">Personal Artisan Moments</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Me & Myself</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className={`text-xs ${colors.textSecondary} max-w-md mx-auto leading-relaxed`}>
                      A raw glimpse behind the scissors and threads — capturing Kavindi Samudika at work in her creative sanctuary.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ME_AND_MYSELF_GALLERY.map((p) => (
                      <div
                        key={p.id}
                        id={`me-myself-img-${p.id}`}
                        className={`p-4 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} group cursor-pointer transition-all duration-300 hover:scale-[1.03] space-y-4`}
                      >
                        <div className="aspect-square rounded-xl overflow-hidden relative border border-purple-500/10 shadow-md">
                          <img
                            src={p.image}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                            onError={(e) => {
                              // If Imgur holds hotlink blocks, gracefully ensure an elegant custom frame is shown
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'bg-pink-950/20');
                                parent.innerHTML = "<span class='text-xs font-mono text-pink-500 font-bold block mb-1'>🎨 PaperThreads</span><span class='text-[10px] text-purple-300'>Kavindi's Creative Studio</span>";
                              }
                            }}
                          />
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />
                        </div>
                        <div className="space-y-1 text-center">
                          <h4 className="text-sm font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-purple-300 leading-relaxed font-mono">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Creative Callout banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 to-pink-950/60 border border-pink-500/20">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-semibold text-white">Inspired by Kavindi's Journey?</h4>
                    <p className="text-xs text-purple-300">Inquire for custom commissions or wedding package schedules.</p>
                  </div>
                  <button
                    id="story-btn-contact-tab"
                    onClick={() => setActiveTab('contact')}
                    className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Schedule Inquiry
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 5: MEMORY LANE / EVENTS */}
          <AnimatePresence mode="wait">
            {activeTab === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12"
              >
                
                <section className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">EXHIBITIONS & REVIEWS</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    Memory Lane
                  </h2>
                  <p className="text-xs text-purple-400 max-w-sm mx-auto">Milestone exhibitions and large-scale order occasions we have catered.</p>
                </section>

                {/* Timeline blocks */}
                <div className="space-y-10 max-w-4xl mx-auto relative pt-4">
                  {/* Center line decorator */}
                  <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-pink-500/20 pointer-events-none"></div>

                  {MEMORY_LANE_EVENTS.map((evt, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div
                        key={evt.id}
                        className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
                          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Timeline Glowing Dot */}
                        <div className="absolute top-4 left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#0a0514] z-10 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>

                        {/* Content panel */}
                        <div className="w-full md:w-[45%] pl-10 md:pl-0">
                          <div className={`p-6 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} space-y-4 hover:scale-[1.01] transition-transform duration-300`}>
                            <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-bold bg-pink-500/10 py-1 px-2.5 rounded-full inline-block">
                              {evt.tag}
                            </span>
                            
                            <div>
                              <span className="text-[10px] text-purple-400 font-mono block mb-1">{evt.date}</span>
                              <h4 className="text-lg font-serif font-bold text-white">
                                {evt.title}
                              </h4>
                            </div>

                            <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                              {evt.description}
                            </p>
                          </div>
                        </div>

                        {/* Photo illustration panel */}
                        <div className="w-full md:w-[45%] pl-10 md:pl-0">
                          <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-purple-500/20 relative group cursor-pointer animate-reveal-item">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-[800ms]"
                            />
                            {/* Glass sheen flash */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 6: CALENDAR AND CONTACT */}
          <AnimatePresence mode="wait">
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12"
              >
                
                <section className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">Milestone Booking & Contact</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    Book Reminder & Send Message
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
                </section>

                {/* Interactive Calendar widget */}
                <section>
                  <div className="mb-4 text-center md:text-left">
                    <h3 className="text-xl font-serif font-bold text-white mb-1">Creative Alerts Engine</h3>
                    <p className="text-xs text-purple-300">Set personalized custom-order countdowns or gift-giving alerts directly on our local calendar.</p>
                  </div>
                  <InteractiveCalendar colors={colors} />
                </section>

                {/* Standard contact form and info */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                  
                  {/* Contact information details */}
                  <div className={`p-6 sm:p-8 rounded-2xl ${colors.bgCard} border ${colors.border} lg:col-span-4 space-y-6 flex flex-col justify-between`}>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-pink-400 font-bold block mb-1">
                          Connect Directly
                        </span>
                        <h4 className="text-xl font-serif font-bold text-white">PaperThreads Office</h4>
                      </div>

                      <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
                        Kavindi Samudika answers inquirers personally. Reach us to discuss card budgets, wholesale wedding cards, or abstract painting framing preferences.
                      </p>

                      <div className="space-y-4 text-xs font-mono text-purple-300">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] text-purple-400 uppercase tracking-widest">WhatsApp Hotline</p>
                            <a
                              id="contact-phone-link"
                              href="https://wa.me/94771234567?text=Hi%20Kavindi!%20🌸%20Saw%20your%20PaperThreads%20page%20and%20would%20love%20to%20discuss%20a%20custom%20order!"
                              target="_blank"
                              className="font-bold hover:text-pink-300 text-green-400 transition"
                            >
                              +94 77 123 4567
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                            <Send className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] text-purple-400 uppercase tracking-widest">Email Contact</p>
                            <p className="font-semibold text-white">kavindi@paperthreads.com</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                            <Map className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] text-purple-400 uppercase tracking-widest">Location Studio</p>
                            <p className="font-semibold text-white">Colombo, Sri Lanka</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-500/10">
                      <p className="text-[10px] text-purple-400 italic">"Turning your imagination and threads into beloved treasures."</p>
                    </div>
                  </div>

                  {/* Form submit */}
                  <div className={`p-6 sm:p-8 rounded-2xl ${colors.bgCard} border ${colors.border} lg:col-span-8`}>
                    {contactSuccess ? (
                      <div className="text-center py-12 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto border border-pink-500/20">
                          <Heart className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="text-lg font-serif font-bold text-white">Message Dispatched!</h4>
                        <p className="text-xs text-purple-300 max-w-sm mx-auto">
                          Your custom details has been logged in Kavindi's workshop list. She will respond to you via email or phone within 24 hours.
                        </p>
                        <button
                          id="btn-contact-reset"
                          onClick={() => setContactSuccess(false)}
                          className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400 hover:text-white transition"
                        >
                          Submit another inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                        <div>
                          <h4 className="text-lg font-serif font-bold text-white mb-1">Send a Direct Message</h4>
                          <p className="text-xs text-purple-400">Ask general details or inquire about massive occasions.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              value={contactName}
                              onChange={e => setContactName(e.target.value)}
                              className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Email</label>
                            <input
                              type="email"
                              required
                              placeholder="email@domain.com"
                              value={contactEmail}
                              onChange={e => setContactEmail(e.target.value)}
                              className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Subject</label>
                          <input
                            type="text"
                            placeholder="e.g. Wedding Greeting Card Package Inquiry"
                            value={contactSubject}
                            onChange={e => setContactSubject(e.target.value)}
                            className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">Message Notes</label>
                          <textarea
                            required
                            placeholder="Write about sizing preferences, frame options, delivery dates or custom labels..."
                            rows={4}
                            value={contactMsg}
                            onChange={e => setContactMsg(e.target.value)}
                            className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                          />
                        </div>

                        <button
                          id="btn-contact-form-submit"
                          type="submit"
                          className="w-full sm:w-auto py-3 px-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-pink-950/30 flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send message
                        </button>
                      </form>
                    )}
                  </div>

                </section>

              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 7: ORDER & INQUIRY TICKETS SYSTEM */}
          <AnimatePresence mode="wait">
            {activeTab === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-12"
              >
                {/* Header Banner */}
                <section className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400">
                    Workshop Ticket Dispatcher
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    Order Tracker & Ticket Queue
                  </h2>
                  <p className="text-xs text-purple-400 max-w-lg mx-auto">
                    Submit custom commissions or request a ticket. Update status stages to monitor Kavindi's thread progress in real time.
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Submit New Ticket Slips */}
                  <div className={`p-6 sm:p-8 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} lg:col-span-5 space-y-6`}>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white mb-1">Issue Order Card</h3>
                      <p className="text-xs text-purple-300">
                        Fill your specifications to dispatch a new ticket into our live crafting database.
                      </p>
                    </div>

                    {ticketFormSuccess ? (
                      <div className="text-center py-8 space-y-4 bg-pink-500/5 p-4 rounded-xl border border-pink-500/20">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto border border-pink-500/20">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-sans font-bold text-white">Ticket Swapped Successfully!</h4>
                        <p className="text-xs text-purple-300 leading-relaxed">
                          Your ticket slip has been compiled and pinned directly to the active workshop board.
                        </p>
                        <button
                          onClick={() => setTicketFormSuccess(false)}
                          className="px-4 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-mono text-[10px] uppercase font-bold transition"
                        >
                          + Draw Another Ticket
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!ticketName.trim() || !ticketMessage.trim() || !ticketEmail.trim()) return;

                          // Formulate premium ticket details
                          const newTicket: Ticket = {
                            id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
                            customerName: ticketName,
                            customerEmail: ticketEmail,
                            customerPhone: ticketPhone || 'Not provided',
                            specialtyType: ticketSpecialty,
                            message: ticketMessage,
                            priority: ticketPriority,
                            status: 'pending',
                            createdAt: new Date().toISOString(),
                            estimatedDays: ticketSpecialty === 'shadowbox' ? 12 : ticketSpecialty === 'circular-fusion' ? 14 : ticketSpecialty === 'popup-card' ? 5 : 10
                          };

                          setTickets([newTicket, ...tickets]);
                          
                          // Reset form
                          setTicketName('');
                          setTicketEmail('');
                          setTicketPhone('');
                          setTicketMessage('');
                          setTicketPriority('medium');
                          setTicketFormSuccess(true);
                        }}
                        className="space-y-4 text-left"
                      >
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Asha Peiris"
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                            className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Email</label>
                            <input
                              type="email"
                              required
                              placeholder="you@domain.com"
                              value={ticketEmail}
                              onChange={(e) => e && setTicketEmail(e.target.value)}
                              className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Phone</label>
                            <input
                              type="text"
                              placeholder="+94 77 XXXXXXX"
                              value={ticketPhone}
                              onChange={(e) => setTicketPhone(e.target.value)}
                              className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Specialty Selection</label>
                            <select
                              value={ticketSpecialty}
                              onChange={(e) => setTicketSpecialty(e.target.value as any)}
                              className={`w-full text-xs p-2.5 rounded-xl text-white select-indigo outline-none border focus:border-pink-500/60 transition bg-[#0d071a]/90 cursor-pointer ${colors.border}`}
                            >
                              <option value="shadowbox">🖼️ Quilled Shadowbox</option>
                              <option value="circular-fusion">⭕ Circular Mandala</option>
                              <option value="popup-card">💌 3D Popup Card</option>
                              <option value="fine-line">✍️ Fine Line Portraiture</option>
                              <option value="custom">🧵 Custom Thread Art</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Priority Level</label>
                            <div className="flex gap-1.5 p-1 rounded-xl bg-black/35 border border-pink-500/10">
                              {(['low', 'medium', 'high', 'urgent'] as const).map((pr) => (
                                <button
                                  key={pr}
                                  type="button"
                                  onClick={() => setTicketPriority(pr)}
                                  className={`flex-1 text-[9px] uppercase font-mono py-1 rounded transition-all font-bold ${
                                    ticketPriority === pr
                                      ? pr === 'urgent'
                                        ? 'bg-red-600 text-white'
                                        : pr === 'high'
                                        ? 'bg-amber-500 text-black'
                                        : pr === 'medium'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-zinc-600 text-white'
                                      : 'text-purple-400 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  {pr}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-300">Craft Message / Specs</label>
                          <textarea
                            required
                            placeholder="Describe custom size limits, color schemes, occasion wording..."
                            rows={3}
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                            className={`w-full text-xs p-3 rounded-xl text-white placeholder-purple-400 outline-none border focus:border-pink-500/60 transition bg-black/40 ${colors.border}`}
                          />
                        </div>

                        <button
                          id="btn-issue-ticket"
                          type="submit"
                          className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-pink-950/30 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          <TicketIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
                          <span>Dispatch Order Ticket</span>
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Right Column: Live Workboard List */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Filter Utilities */}
                    <div className={`p-4 rounded-2xl bg-black/30 border ${colors.border} flex flex-col sm:flex-row gap-4 items-center justify-between`}>
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                        <Filter className="w-4 h-4 text-pink-500" />
                        <span>Filter Workshop Tickets:</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(['all', 'pending', 'in-design', 'crafting', 'threading', 'ready'] as const).map((st) => (
                          <button
                            key={st}
                            id={`filter-${st}`}
                            onClick={() => setTicketStatusFilter(st)}
                            className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition ${
                              ticketStatusFilter === st
                                ? 'bg-pink-600 text-white shadow'
                                : 'bg-black/40 text-purple-300 border border-pink-500/10 hover:bg-purple-950/40 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Tickets Deck */}
                    <div className="space-y-4">
                      {tickets
                        .filter((t) => ticketStatusFilter === 'all' || t.status === ticketStatusFilter)
                        .map((t) => {
                          // Badge color config
                          let statColor = 'bg-stone-500/10 text-stone-400 border border-stone-500/20';
                          if (t.status === 'pending') statColor = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
                          if (t.status === 'in-design') statColor = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
                          if (t.status === 'crafting') statColor = 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
                          if (t.status === 'threading') statColor = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
                          if (t.status === 'ready') statColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

                          let prioColor = 'text-zinc-400';
                          if (t.priority === 'urgent') prioColor = 'text-red-400 font-extrabold';
                          if (t.priority === 'high') prioColor = 'text-amber-400 font-bold';
                          if (t.priority === 'medium') prioColor = 'text-purple-300 font-medium';

                          // Next status stepper
                          const handleStatusStep = (ticketId: string, current: string) => {
                            const stages = ['pending', 'in-design', 'crafting', 'threading', 'ready'];
                            const nextIdx = (stages.indexOf(current) + 1) % stages.length;
                            const nextStage = stages[nextIdx] as any;
                            
                            setTickets(prev =>
                              prev.map(tk => (tk.id === ticketId ? { ...tk, status: nextStage } : tk))
                            );
                          };

                          return (
                            <motion.div
                              layout
                              key={t.id}
                              className={`p-6 rounded-2xl bg-gradient-to-br from-[#0c0514]/90 to-purple-950/20 border border-pink-500/15 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 hover:border-pink-500/35 transition duration-300`}
                            >
                              {/* Slit ticket styling overlays */}
                              <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#030107] border-r border-pink-500/15 z-10 hidden sm:block"></div>
                              <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#030107] border-l border-pink-500/15 z-10 hidden sm:block"></div>

                              <div className="space-y-4 flex-1">
                                {/* Ticket details top bar */}
                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="font-mono text-purple-300 font-bold bg-purple-950 px-2.5 py-1 rounded-xl text-xs border border-purple-500/20">
                                    🎫 {t.id}
                                  </span>
                                  
                                  <span className={`text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded-full ${statColor}`}>
                                    {t.status}
                                  </span>

                                  <span className="text-[10px] text-purple-400 font-mono">
                                    Spec: <span className="text-white capitalize">{t.specialtyType.replace('-', ' ')}</span>
                                  </span>
                                </div>

                                {/* Message */}
                                <p className="text-xs text-purple-100 leading-relaxed italic bg-black/20 p-3 rounded-xl border border-pink-500/5">
                                  "{t.message}"
                                </p>

                                {/* Customer contacts */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-purple-300">
                                  <div>
                                    Customer: <span className="text-white font-sans">{t.customerName}</span>
                                  </div>
                                  <div>
                                    Email: <span className="text-pink-300 font-sans">{t.customerEmail}</span>
                                  </div>
                                  <div>
                                    Phone: <span className="text-emerald-400">{t.customerPhone}</span>
                                  </div>
                                  <div>
                                    Placed: <span className="text-zinc-400">{new Date(t.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions / Interactive progresses */}
                              <div className="flex flex-col justify-between items-end gap-4 min-w-[120px] border-t md:border-t-0 md:border-l border-pink-500/10 pt-4 md:pt-0 md:pl-6">
                                <div className="text-right space-y-1">
                                  <p className="text-[10px] uppercase font-mono tracking-wider text-purple-400">Priority:</p>
                                  <p className={`text-xs uppercase font-mono tracking-widest ${prioColor}`}>
                                    ● {t.priority}
                                  </p>
                                </div>

                                <div className="text-right space-y-1">
                                  <p className="text-[10px] font-mono text-purple-400">Schedule Estimate:</p>
                                  <p className="text-xs text-white font-mono font-bold">~ {t.estimatedDays} Days Left</p>
                                </div>

                                <div className="flex flex-wrap gap-2 w-full justify-end animate-fade-in">
                                  <button
                                    onClick={() => handleStatusStep(t.id, t.status)}
                                    title="Progress the ticket stage"
                                    className="px-2.5 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-[10px] uppercase font-mono font-bold border border-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Clock className="w-3" />
                                    <span>Advance Stage</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setTickets(prev => prev.filter(ticket => ticket.id !== t.id));
                                    }}
                                    title="Cancel Inquiry Ticket"
                                    className="p-1.5 rounded-lg bg-red-950/20 hover:bg-rose-500/15 border border-red-950 text-rose-400 transition cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}

                      {tickets.filter((t) => ticketStatusFilter === 'all' || t.status === ticketStatusFilter).length === 0 && (
                        <div className="text-center p-12 bg-black/20 rounded-2xl border border-pink-500/10 text-purple-400 text-xs font-mono">
                          No active tickets currently match the "{ticketStatusFilter}" phase.
                        </div>
                      )}
                    </div>

                    {/* Creative Tip alert */}
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/10 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-xs font-bold font-serif">
                        i
                      </div>
                      <p className="text-[11px] text-purple-300 leading-relaxed font-sans">
                        <strong>Simulation Board:</strong> You can click <span className="text-pink-400">"Advance Stage"</span> on any ticket card to test-drive status transformations (Pending → In Design → Crafting → Threading → Ready).
                      </p>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM COLLAPSIBLE PANEL: Atmosphere & Theme Controls */}
          <div className="mt-16 pt-6 border-t border-purple-500/10">
            <div className={`p-5 rounded-2xl ${colors.bgCard} border ${colors.border} ${colors.glowColor} transition-all duration-300`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                  <span className={`text-xs font-mono uppercase tracking-wider font-bold ${colors.textPrimary}`}>
                    🎨 Atmosphere & Theme Controls
                  </span>
                </div>
                
                <button
                  id="bottom-panel-toggle-btn"
                  onClick={() => setPanelCollapsed(!panelCollapsed)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 font-mono text-[10px] uppercase font-bold border border-pink-500/20 transition duration-300 cursor-pointer shadow-sm shadow-pink-500/5 hover:scale-[1.02]"
                >
                  {panelCollapsed ? '✦ Expand Controls' : '▲ Collapse'}
                </button>
              </div>

              <AnimatePresence>
                {!panelCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-pink-500/10">
                      
                      {/* Artistry Themes Section */}
                      <div className="space-y-3">
                        <span className={`block text-[11px] font-mono uppercase tracking-wider font-bold ${colors.textSecondary}`}>
                          Artistry Color Themes:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            id="theme-mystic-btn"
                            onClick={() => handleThemeChange('mystic-orchid')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'mystic-orchid' ? 'bg-pink-600 text-white shadow-md' : 'bg-black/20 hover:bg-pink-500/10 text-pink-300 border border-pink-500/10'
                            }`}
                            title="Deep Purple and Magenta Dark Theme"
                          >
                            Orchid
                          </button>
                          <button
                            id="theme-cherry-btn"
                            onClick={() => handleThemeChange('cherry-blossom')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'cherry-blossom' ? 'bg-[#f43f5e] text-white shadow-md' : 'bg-black/20 hover:bg-pink-500/10 text-pink-300 border border-pink-500/10'
                            }`}
                            title="Warm Fuchsia Cherry Blossom Theme"
                          >
                            Cherry
                          </button>
                          <button
                            id="theme-royal-btn"
                            onClick={() => handleThemeChange('royal-violet')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'royal-violet' ? 'bg-amber-500 text-black shadow-md' : 'bg-black/20 hover:bg-pink-500/10 text-pink-300 border border-pink-500/10'
                            }`}
                            title="Royal Purple and Gold Theme"
                          >
                            Royal
                          </button>
                          <button
                            id="theme-pastel-btn"
                            onClick={() => handleThemeChange('pastel-pink-purple')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'pastel-pink-purple' ? 'bg-pink-300 text-purple-950 shadow-md border hover:bg-pink-300/80' : 'bg-black/20 hover:bg-pink-500/10 text-pink-300 border border-pink-500/10'
                            }`}
                            title="Pastel Pink and Purple Theme"
                          >
                            Pink/Purple Pastel
                          </button>
                          <button
                            id="theme-mint-btn"
                            onClick={() => handleThemeChange('pastel-mint-gold')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'pastel-mint-gold' ? 'bg-emerald-200 text-emerald-950 shadow-md border border-emerald-300 hover:bg-emerald-300' : 'bg-black/20 hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                            }`}
                            title="Pastel Mint and Gold Theme (High contrast)"
                          >
                            Mint Gold Pastel
                          </button>
                          <button
                            id="theme-peach-btn"
                            onClick={() => handleThemeChange('pastel-peach-rose')}
                            className={`px-3 py-1.5 rounded-xl transition text-[10px] uppercase font-mono font-bold ${
                              theme === 'pastel-peach-rose' ? 'bg-amber-100 text-amber-950 shadow-md border border-amber-300 hover:bg-amber-200' : 'bg-black/20 hover:bg-emerald-500/10 text-orange-400 border border-amber-500/10'
                            }`}
                            title="Pastel Peach and Rose Theme (High contrast)"
                          >
                            Peach Rose Pastel
                          </button>
                        </div>
                      </div>

                      {/* Atmosphere flow */}
                      <div className="space-y-3">
                        <span className={`block text-[11px] font-mono uppercase tracking-wider font-bold ${colors.textSecondary}`}>
                          Atmosphere Particle Flow:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(['droplets', 'letters', 'feathers', 'none'] as const).map((opt) => (
                            <button
                              key={opt}
                              id={`bottom-atmosphere-${opt}-btn`}
                              onClick={() => handleParticleChange(opt)}
                              className={`px-3 py-1.5 rounded-xl text-[10px] uppercase font-mono transition font-bold ${
                                particleType === opt 
                                  ? 'bg-purple-900/80 text-pink-300 border border-pink-500/40 shadow-sm' 
                                  : 'bg-black/20 hover:bg-purple-950/40 text-purple-400 border border-purple-500/10'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Exit portal utility */}
                    <div className="mt-5 pt-4 border-t border-pink-500/10 flex justify-end">
                      <button
                        id="btn-bottom-close-portal"
                        onClick={handleLeaveWorld}
                        className="flex items-center gap-2 hover:text-rose-400 p-2 px-4 rounded-xl bg-red-950/20 hover:bg-rose-500/10 border border-rose-950/40 text-[10px] tracking-wider uppercase font-mono transition duration-300 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5 text-rose-500" />
                        Exit Portal To Splash
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Core Footer */}
          <footer className="mt-20 pt-8 border-t border-purple-500/10 text-center space-y-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-pink-500 font-serif font-bold text-lg">PaperThreads</span>
              <span className="text-purple-500 text-xs font-mono">•</span>
              <span className="text-xs text-purple-300 font-mono">By Kavindi Samudika</span>
            </div>
            
            <p className="text-[10px] text-purple-400 font-mono tracking-wider">
              ESTABLISHED IN 2018 WITH PINTEREST COILS • STYLED WITH MAGENTA AND PURPLE RAIN OVERLAYS
            </p>

            <div className="flex justify-center gap-4 text-xs font-mono">
              <a
                id="footer-wa"
                href="https://wa.me/94771234567"
                target="_blank"
                className="text-pink-400 hover:text-pink-300 transition"
              >
                WhatsApp
              </a>
              <span className="text-purple-600">|</span>
              <a
                id="footer-ig"
                href="https://instagram.com"
                target="_blank"
                className="text-pink-400 hover:text-pink-300 transition"
              >
                Instagram
              </a>
              <span className="text-purple-600">|</span>
              <a
                id="footer-pinterest"
                href="https://pinterest.com"
                target="_blank"
                className="text-pink-400 hover:text-pink-300 transition"
              >
                Pinterest
              </a>
            </div>

            <p className="text-[9px] text-purple-600">
              © 2026 PaperThreads Sri Lanka. All Rights Reserved. Turn imagination into handmade treasures.
            </p>
          </footer>

          {/* FLOATING CHATBOT AI WIDGET */}
          <Chatbot colors={colors} />

          {/* PRODUCT INQUIRY POPUP FORM MODAL */}
          {inquiryProduct && (
            <InquiryModal
              colors={colors}
              isOpen={!!inquiryProduct}
              onClose={() => setInquiryProduct(null)}
              productTitle={inquiryProduct.title}
              productCategory={inquiryProduct.category}
              productType={inquiryProduct.type}
            />
          )}

        </div>
      )}
    </div>
  );
}
