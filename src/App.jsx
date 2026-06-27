import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, LogIn, LogOut, 
  Package, ShoppingCart, BarChart3, X, CheckCircle, Tag, 
  Menu, Info, DollarSign, Sun, Moon, ArrowRight,
  Download, AlertTriangle
} from 'lucide-react';

const initialData = [
  {
    id: '1',
    nama: 'Nike Aeroswift Singlet',
    size: 'M',
    kondisi: 'new',
    jenis: 'jersey',
    stock: 2,
    harga: 850000,
    status: 'ready',
    keterangan: '',
    harga_terjual: 0,
    terjual_di: '',
    qty_sold: 0
  },
  {
    id: '2',
    nama: '2XU Compression Shorts',
    size: 'S',
    kondisi: 'preloved',
    jenis: 'aksessoris',
    stock: 1,
    harga: 350000,
    status: 'ready',
    keterangan: '',
    harga_terjual: 0,
    terjual_di: '',
    qty_sold: 0
  },
  {
    id: '3',
    nama: 'Asics Metaspeed Sky+',
    size: '42',
    kondisi: 'preloved',
    jenis: 'sepatu',
    stock: 0,
    harga: 2500000,
    status: 'sold',
    keterangan: 'Box agak penyok',
    harga_terjual: 2400000,
    terjual_di: 'Tokopedia',
    qty_sold: 1
  }
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

const Logo = () => (
  <div className="flex flex-col items-center justify-center group cursor-pointer">
    <div className="flex items-center text-3xl font-black italic tracking-tighter transform group-hover:scale-105 transition-transform duration-300">
      <span className="text-[var(--text-strong)]">N</span>
      <span className="text-[var(--brand-gold)] -ml-1">P</span>
    </div>
    <div className="text-[var(--text-strong)] font-bold tracking-widest text-[9px] mt-1 uppercase flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
      MARKETPACE<span className="text-[var(--brand-gold)]">.SOC</span>
    </div>
  </div>
);

const ProductCard = ({ product, index = 0, role, setSellModal, setProductModal, handleDeleteProduct }) => (
  <div 
    className={`modern-card rounded-2xl overflow-hidden animate-fade-in-up group flex flex-col relative ${product.status === 'sold' ? 'opacity-90 grayscale-[40%]' : ''}`}
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {/* Subtle Ambient Glow replacing the harsh yellow */}
    <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-bl from-[var(--ambient-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="p-6 border-b border-[var(--border-color)] flex flex-col gap-4 relative z-10">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-extrabold text-[var(--text-strong)] uppercase tracking-wide leading-tight">{product.nama}</h3>
        
        {/* Status Badge */}
        <div className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${
          product.status === 'ready' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
        }`}>
          {product.status}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Jenis */}
        <span className="text-[10px] px-3 py-1 bg-[var(--hover-bg)] text-[var(--text-base)] rounded-full uppercase font-bold tracking-wider border border-[var(--border-color)]">
          {product.jenis}
        </span>
        
        {/* Kondisi Badge */}
        <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-wider shadow-sm ${
          product.kondisi === 'new' 
          ? 'bg-[var(--brand-gold)] text-black' 
          : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
        }`}>
          {product.kondisi}
        </span>
        
        {/* Size */}
        <span className="text-[10px] px-3 py-1 bg-[var(--hover-bg)] text-[var(--text-base)] rounded-full uppercase font-bold tracking-wider border border-[var(--border-color)]">
          Size: <span className="text-[var(--text-strong)]">{product.size}</span>
        </span>
      </div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-[var(--hover-bg)]/30">
      {product.status === 'ready' ? (
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xs text-[var(--text-base)] mb-1 font-semibold uppercase tracking-wider">Harga Retail</p>
            <p className="text-[var(--brand-gold)] font-extrabold text-2xl tracking-tight">{formatRupiah(product.harga)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-base)] mb-1 font-semibold uppercase tracking-wider">Stock</p>
            <p className="text-[var(--text-strong)] font-extrabold text-lg bg-[var(--panel-bg)] px-3 py-1 rounded-xl shadow-sm border border-[var(--border-color)]">
              {product.stock} <span className="text-xs font-medium text-[var(--text-base)]">pcs</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="flex justify-between items-center bg-[var(--panel-bg)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm">
              <div>
                <p className="text-[10px] text-[var(--text-base)] mb-1 uppercase tracking-wider font-extrabold flex items-center gap-1">
                  Terjual Di <span className="bg-[var(--border-color)] text-[var(--text-strong)] px-1.5 py-0.5 rounded ml-1 text-[8px]">QTY: {product.qty_sold || 1}</span>
                </p>
                <p className="text-[var(--text-strong)] font-bold flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--brand-gold)]" />
                  {product.terjual_di}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[var(--text-base)] mb-1 uppercase tracking-wider font-extrabold">Total Deal</p>
                <p className="text-[var(--brand-gold)] font-extrabold text-lg">{formatRupiah(product.harga_terjual)}</p>
              </div>
           </div>
           {product.keterangan && (
             <div className="text-sm text-[var(--text-strong)] bg-[var(--hover-bg)] p-3 rounded-xl border border-[var(--border-color)] flex gap-3 items-start">
               <Info size={16} className="text-[var(--brand-gold)] shrink-0 mt-0.5" />
               <span className="font-medium text-[13px] leading-relaxed">{product.keterangan}</span>
             </div>
           )}
        </div>
      )}

      {/* ADMIN ACTIONS: Now shown for BOTH ready and sold */}
      {role === 'admin' && (
        <div className="mt-6 flex gap-2">
          {product.status === 'ready' && (
            <button 
              onClick={() => setSellModal({ isOpen: true, data: product })}
              className="flex-1 bg-[var(--brand-gold)] text-black font-extrabold uppercase tracking-wider py-3 rounded-xl text-xs shadow-md hover:bg-[var(--brand-gold-dark)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Tandai Terjual
            </button>
          )}
          
          <button 
            onClick={() => setProductModal({ isOpen: true, data: product })}
            className={`px-4 bg-[var(--panel-bg)] text-[var(--text-strong)] rounded-xl hover:bg-[var(--hover-bg)] transition-colors border border-[var(--border-color)] flex items-center justify-center gap-2 ${product.status === 'sold' ? 'flex-1 py-3 text-xs uppercase font-extrabold tracking-wider' : ''}`}
          >
            <Edit size={18} /> {product.status === 'sold' ? 'Edit / Restock' : ''}
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.id)}
            className="px-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors border border-red-500/20 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  </div>
);

const FilterSection = ({ searchQuery, setSearchQuery, filters, setFilters, role }) => (
  <div className="print-hidden glass-panel p-3 rounded-[2rem] mb-10 flex flex-col md:flex-row gap-3 items-center animate-fade-in-up shadow-sm" style={{ animationDelay: '100ms' }}>
    <div className="relative flex-1 w-full group">
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--text-base)] group-focus-within:text-[var(--brand-gold)] transition-colors duration-300" size={20} />
      <input 
        type="text" 
        placeholder="Cari perlengkapan lari..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] font-medium rounded-full pl-14 pr-6 py-3.5 focus:outline-none focus:border-[var(--brand-gold)]/50 focus:ring-2 focus:ring-[var(--brand-gold)]/20 transition-all duration-300 placeholder-[var(--text-base)]/70"
      />
    </div>
    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0 px-2 md:px-0">
      <select 
        value={filters.jenis} 
        onChange={(e) => setFilters({...filters, jenis: e.target.value})}
        className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] font-semibold rounded-full px-5 py-3.5 focus:outline-none focus:border-[var(--brand-gold)]/50 hover:bg-[var(--hover-bg)] transition-all duration-300 cursor-pointer text-sm"
      >
        <option value="">Semua Jenis</option>
        <option value="jersey">Jersey</option>
        <option value="sepatu">Sepatu</option>
        <option value="aksessoris">Aksesoris</option>
        <option value="other">Lainnya</option>
      </select>
      <select 
        value={filters.kondisi} 
        onChange={(e) => setFilters({...filters, kondisi: e.target.value})}
        className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] font-semibold rounded-full px-5 py-3.5 focus:outline-none focus:border-[var(--brand-gold)]/50 hover:bg-[var(--hover-bg)] transition-all duration-300 cursor-pointer text-sm"
      >
        <option value="">Semua Kondisi</option>
        <option value="new">New</option>
        <option value="preloved">Preloved</option>
      </select>
      {role === 'admin' && (
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] font-semibold rounded-full px-5 py-3.5 focus:outline-none focus:border-[var(--brand-gold)]/50 hover:bg-[var(--hover-bg)] transition-all duration-300 cursor-pointer text-sm"
        >
          <option value="">Semua Status</option>
          <option value="ready">Ready</option>
          <option value="sold">Sold</option>
        </select>
      )}
    </div>
  </div>
);

export default function MarketpaceApp() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState('public');
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productModal, setProductModal] = useState({ isOpen: false, data: null });
  const [sellModal, setSellModal] = useState({ isOpen: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ jenis: '', kondisi: '', status: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('marketpace_data_v3');
    if (savedData) setProducts(JSON.parse(savedData));
    else {
      setProducts(initialData);
      localStorage.setItem('marketpace_data_v3', JSON.stringify(initialData));
    }

    const savedTheme = localStorage.getItem('marketpace_theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const saveToLocalStorage = (newData) => {
    setProducts(newData);
    localStorage.setItem('marketpace_data_v3', JSON.stringify(newData));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('marketpace_theme', newTheme);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setRole('admin');
    setActiveTab('stock');
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setRole('public');
    setActiveTab('home');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStock = parseInt(formData.get('stock'));
    const isRestock = productModal.data && productModal.data.status === 'sold' && newStock > 0;

    const newProduct = {
      id: productModal.data ? productModal.data.id : Date.now().toString(),
      nama: formData.get('nama'),
      size: formData.get('size'),
      kondisi: formData.get('kondisi'),
      jenis: formData.get('jenis'),
      stock: newStock,
      harga: parseInt(formData.get('harga')),
      
      // Update logic: Jika awalnya sold dan diisi stock > 0, otomatis kembali 'ready'
      status: isRestock ? 'ready' : (productModal.data ? productModal.data.status : 'ready'),
      keterangan: isRestock ? '' : (productModal.data ? productModal.data.keterangan : ''),
      harga_terjual: isRestock ? 0 : (productModal.data ? productModal.data.harga_terjual : 0),
      terjual_di: isRestock ? '' : (productModal.data ? productModal.data.terjual_di : ''),
      qty_sold: isRestock ? 0 : (productModal.data ? (productModal.data.qty_sold || 0) : 0)
    };

    let newData = productModal.data 
      ? products.map(p => p.id === newProduct.id ? newProduct : p)
      : [newProduct, ...products];
    
    saveToLocalStorage(newData);
    setProductModal({ isOpen: false, data: null });
  };

  const handleDeleteProduct = (id) => {
    setDeleteModal({ isOpen: true, id: id });
  };

  const confirmDelete = () => {
    const newData = products.filter(p => p.id !== deleteModal.id);
    saveToLocalStorage(newData);
    setDeleteModal({ isOpen: false, id: null });
  };

  const handleMarkAsSold = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = sellModal.data.id;
    
    const jumlah_terjual = parseInt(formData.get('jumlah_terjual'));
    const harga_terjual = parseInt(formData.get('harga_terjual'));
    const terjual_di = formData.get('terjual_di');
    const keterangan = formData.get('keterangan');
    
    const originalProduct = products.find(p => p.id === id);

    // Logic Parsial Sold (Terjual Sebagian)
    if (jumlah_terjual < originalProduct.stock) {
      // 1. Kurangi stock barang yang lama
      const updatedOriginal = { ...originalProduct, stock: originalProduct.stock - jumlah_terjual };
      
      // 2. Buat entri baru sebagai "Rekam Penjualan" (Split Data)
      const soldEntry = {
        ...originalProduct,
        id: Date.now().toString(),
        status: 'sold',
        stock: 0,
        qty_sold: jumlah_terjual,
        harga_terjual: harga_terjual,
        terjual_di: terjual_di,
        keterangan: keterangan
      };
      
      const newData = products.map(p => p.id === id ? updatedOriginal : p);
      // Tambahkan history sold ke index paling atas
      saveToLocalStorage([soldEntry, ...newData]);

    } else {
      // Logic Terjual Habis (Semua stock laku)
      const newData = products.map(p => {
        if (p.id === id) {
          return {
            ...p, 
            status: 'sold', 
            stock: 0, 
            qty_sold: jumlah_terjual,
            harga_terjual: harga_terjual,
            terjual_di: terjual_di,
            keterangan: keterangan
          };
        }
        return p;
      });
      saveToLocalStorage(newData);
    }

    setSellModal({ isOpen: false, data: null });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchJenis = filters.jenis ? p.jenis === filters.jenis : true;
      const matchKondisi = filters.kondisi ? p.kondisi === filters.kondisi : true;
      const matchStatus = filters.status ? p.status === filters.status : true;
      if (role === 'public' && activeTab === 'sold') {
        return matchSearch && matchJenis && matchKondisi && p.status === 'sold';
      }
      return matchSearch && matchJenis && matchKondisi && matchStatus;
    });
  }, [products, searchQuery, filters, role, activeTab]);

  const totalSales = useMemo(() => {
    return products.filter(p => p.status === 'sold').reduce((sum, p) => sum + p.harga_terjual, 0);
  }, [products]);

  const totalSoldItemsCount = useMemo(() => {
    return products.filter(p => p.status === 'sold').reduce((sum, p) => sum + (p.qty_sold || 1), 0);
  }, [products]);

  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap');

    :root {
      --brand-gold: #ffc300;
      --brand-gold-dark: #dca800;
    }

    /* THEME: DARK */
    .theme-dark {
      --bg-base: #1c1c1c;
      --text-base: #9ca3af;
      --text-strong: #ffffff;
      --glass-bg: rgba(40, 40, 40, 0.4);
      --glass-border: rgba(255, 255, 255, 0.06);
      --panel-bg: rgba(30, 30, 30, 0.85);
      --card-bg: rgba(28, 28, 28, 0.95);
      --input-bg: rgba(20, 20, 20, 0.8);
      --border-color: rgba(255, 255, 255, 0.08);
      --hover-bg: rgba(255, 255, 255, 0.04);
      --shadow-color: rgba(0, 0, 0, 0.4);
      --ambient-glow: rgba(255, 255, 255, 0.02);
      --solid-nav: #232323;
    }

    /* THEME: LIGHT */
    .theme-light {
      --bg-base: #f4f5f7;
      --text-base: #64748b;
      --text-strong: #0f172a;
      --glass-bg: rgba(255, 255, 255, 0.7);
      --glass-border: rgba(0, 0, 0, 0.05);
      --panel-bg: rgba(255, 255, 255, 0.95);
      --card-bg: rgba(255, 255, 255, 1);
      --input-bg: rgba(248, 250, 252, 1);
      --border-color: rgba(0, 0, 0, 0.08);
      --hover-bg: rgba(0, 0, 0, 0.02);
      --shadow-color: rgba(15, 23, 42, 0.08);
      --ambient-glow: rgba(0, 0, 0, 0.01);
      --solid-nav: #ffffff;
    }

    /* ANIMATIONS & UTILITIES */
    .font-jakarta {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }
    
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.95) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    .animate-pop-in {
      animation: popIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
    }
    
    .text-gradient {
      background: linear-gradient(135deg, var(--text-strong) 0%, var(--brand-gold) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Modern Card Hover */
    .modern-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    .modern-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -10px var(--shadow-color);
      border-color: var(--brand-gold);
    }

    @media print {
      body { background: white !important; color: black !important; }
      .print-hidden, header, nav { display: none !important; }
      .modern-card { border: 1px solid #ccc !important; box-shadow: none !important; break-inside: avoid; }
      .text-gradient { background: none; -webkit-text-fill-color: black; color: black; }
      * { text-shadow: none !important; box-shadow: none !important; }
      .text-\\[var\\(--text-strong\\)\\] { color: black !important; }
      .text-\\[var\\(--text-base\\)\\] { color: #444 !important; }
    }
  `;

  return (
    <div className={`min-h-screen font-jakarta pb-24 md:pb-10 relative overflow-hidden transition-colors duration-500 theme-${theme} bg-[var(--bg-base)] text-[var(--text-base)]`}>
      <style>{customStyles}</style>

      <div className="relative z-10">
        {/* HEADER / TOP NAVIGATION */}
        <header className="print-hidden sticky top-0 z-40 bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-color)] transition-all duration-300 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-[4.5rem] flex items-center justify-between">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {role === 'public' && (
                <div className="flex gap-2 bg-[var(--input-bg)] p-1.5 rounded-full border border-[var(--border-color)]">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`uppercase font-bold tracking-wider text-xs px-6 py-2.5 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-[var(--text-strong)] text-[var(--bg-base)] shadow-md' : 'text-[var(--text-base)] hover:text-[var(--text-strong)]'}`}
                  >
                    Semua Produk
                  </button>
                  <button 
                    onClick={() => setActiveTab('sold')}
                    className={`uppercase font-bold tracking-wider text-xs px-6 py-2.5 rounded-full transition-all duration-300 ${activeTab === 'sold' ? 'bg-[var(--text-strong)] text-[var(--bg-base)] shadow-md' : 'text-[var(--text-base)] hover:text-[var(--text-strong)]'}`}
                  >
                    Barang Terjual
                  </button>
                </div>
              )}
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-3 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] hover:bg-[var(--hover-bg)] transition-colors shadow-sm"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {role === 'public' ? (
                 <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-strong)] px-6 py-2.5 rounded-full font-bold hover:bg-[var(--hover-bg)] transition-all duration-300 group shadow-sm"
                 >
                   <LogIn size={18} className="group-hover:text-[var(--brand-gold)] transition-colors" /> <span className="text-sm">Admin Login</span>
                 </button>
              ) : (
                <div className="flex items-center gap-6 bg-[var(--input-bg)] px-6 py-2.5 rounded-full border border-[var(--border-color)] shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[var(--brand-gold)] font-extrabold text-xs uppercase tracking-widest">Mode Admin</span>
                  </div>
                  <div className="w-px h-5 bg-[var(--border-color)]"></div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[var(--text-base)] hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider"
                  >
                    <LogOut size={16} /> Keluar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Actions (Theme + Menu) */}
            <div className="flex md:hidden items-center gap-3">
              <button onClick={toggleTheme} className="p-2.5 text-[var(--text-strong)] bg-[var(--input-bg)] rounded-xl border border-[var(--border-color)]">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-[var(--text-strong)] bg-[var(--input-bg)] p-2.5 rounded-xl border border-[var(--border-color)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && role === 'public' && (
            <div className="md:hidden bg-[var(--bg-base)]/95 backdrop-blur-2xl border-b border-[var(--border-color)] p-4 flex flex-col gap-2 absolute w-full z-50 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <button 
                onClick={() => {setActiveTab('home'); setIsMobileMenuOpen(false);}}
                className={`text-left uppercase font-extrabold text-sm p-4 rounded-xl transition-all ${activeTab === 'home' ? 'bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]' : 'text-[var(--text-base)] hover:bg-[var(--hover-bg)]'}`}
              >
                Semua Produk
              </button>
              <button 
                onClick={() => {setActiveTab('sold'); setIsMobileMenuOpen(false);}}
                className={`text-left uppercase font-extrabold text-sm p-4 rounded-xl transition-all ${activeTab === 'sold' ? 'bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]' : 'text-[var(--text-base)] hover:bg-[var(--hover-bg)]'}`}
              >
                Barang Terjual
              </button>
              <div className="h-px bg-[var(--border-color)] my-2"></div>
              <button 
                onClick={() => {setIsLoginModalOpen(true); setIsMobileMenuOpen(false);}}
                className="flex items-center justify-center gap-3 text-[var(--bg-base)] font-bold p-4 bg-[var(--text-strong)] rounded-xl"
              >
                <LogIn size={18} /> Login Sebagai Admin
              </button>
            </div>
          )}
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          
          {/* PUBLIC VIEW */}
          {role === 'public' && (
            <div className="animate-fade-in-up">
              {activeTab === 'sold' && (
                <div className="glass-panel p-8 rounded-3xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group border-[var(--brand-gold)]/20 shadow-md">
                  <div className="absolute inset-0 bg-[var(--brand-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-3xl font-black text-[var(--text-strong)] uppercase italic tracking-widest mb-2 text-gradient">Hall of Fame</h2>
                    <p className="text-[var(--text-base)] font-medium">Daftar perlengkapan lari yang sudah menemukan pemilik barunya.</p>
                  </div>
                  <div className="relative z-10 bg-[var(--card-bg)] px-8 py-5 rounded-2xl border border-[var(--border-color)] text-center w-full md:w-auto shadow-sm">
                <p className="text-xs text-[var(--text-base)] uppercase font-extrabold tracking-widest mb-2">Total Penjualan</p>
                <p className="text-4xl font-black text-[var(--brand-gold)] tracking-tighter">{formatRupiah(totalSales)}</p>
              </div>
            </div>
          )}

          <FilterSection 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            filters={filters} 
            setFilters={setFilters} 
            role={role} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                role={role} 
                setSellModal={setSellModal} 
                setProductModal={setProductModal} 
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-[var(--text-base)] animate-fade-in-up">
                    <div className="w-24 h-24 bg-[var(--input-bg)] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--border-color)]">
                      <Package size={40} className="text-[var(--text-base)]" />
                    </div>
                    <p className="text-xl font-bold text-[var(--text-strong)]">Tidak ada produk ditemukan.</p>
                    <p className="text-sm mt-2">Coba ubah kata kunci atau filter pencarian Anda.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADMIN VIEW */}
          {role === 'admin' && (
            <div className="pb-16 animate-fade-in-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                  <h1 className="text-3xl font-black text-[var(--text-strong)] uppercase tracking-tight text-gradient">
                    {activeTab === 'stock' && 'Kelola Stock'}
                    {activeTab === 'sales' && 'Riwayat Penjualan'}
                    {activeTab === 'report' && 'Dashboard Report'}
                  </h1>
                  <p className="text-sm text-[var(--text-base)] font-medium mt-1">Sistem Manajemen Marketpace.Soc</p>
                </div>
                {activeTab === 'stock' && (
              <button 
                onClick={() => setProductModal({ isOpen: true, data: null })}
                className="print-hidden w-full md:w-auto bg-[var(--brand-gold)] text-black px-6 py-3.5 rounded-full font-extrabold tracking-wider uppercase shadow-md hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Tambah Barang
              </button>
            )}
          </div>

          {activeTab === 'stock' && (
            <>
              <FilterSection 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                filters={filters} 
                setFilters={setFilters} 
                role={role} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    role={role} 
                    setSellModal={setSellModal} 
                    setProductModal={setProductModal} 
                    handleDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === 'sales' && (
            <div className="modern-card rounded-3xl overflow-hidden shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-[var(--hover-bg)] border-b border-[var(--border-color)] text-[var(--text-base)] text-xs uppercase tracking-widest font-bold">
                          <th className="p-6">Produk</th>
                          <th className="p-6">Detail</th>
                          <th className="p-6">Platform</th>
                          <th className="p-6 text-right">Harga Terjual</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-color)]">
                        {products.filter(p => p.status === 'sold').map((product) => (
                          <tr key={product.id} className="hover:bg-[var(--hover-bg)]/50 transition-colors group">
                            <td className="p-6">
                              <p className="font-extrabold text-[var(--text-strong)] text-lg tracking-wide group-hover:text-[var(--brand-gold)] transition-colors">{product.nama}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-[var(--panel-bg)] px-2.5 py-1 rounded-full text-[var(--text-base)] uppercase font-bold border border-[var(--border-color)]">{product.jenis}</span>
                                <span className="text-[10px] bg-[var(--panel-bg)] px-2.5 py-1 rounded-full text-[var(--text-base)] uppercase font-bold border border-[var(--border-color)]">{product.kondisi}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="bg-[var(--panel-bg)] text-[var(--text-strong)] border border-[var(--border-color)] text-xs px-3 py-1.5 rounded-lg font-bold mr-2">Size: {product.size}</span>
                              <span className="bg-[var(--brand-gold)]/10 text-[var(--brand-gold-dark)] border border-[var(--brand-gold)]/20 text-xs px-3 py-1.5 rounded-lg font-extrabold">Qty: {product.qty_sold || 1}</span>
                              {product.keterangan && (
                                <p className="text-xs text-[var(--text-base)] mt-3 flex items-start gap-1.5 bg-[var(--panel-bg)] p-2.5 rounded-lg border border-[var(--border-color)]">
                                  <Info size={14} className="mt-0.5 text-[var(--brand-gold)] flex-shrink-0"/> 
                                  <span className="line-clamp-2 text-[var(--text-strong)] font-medium">{product.keterangan}</span>
                                </p>
                              )}
                            </td>
                            <td className="p-6">
                              <span className="inline-flex items-center gap-1.5 bg-[var(--brand-gold)]/10 text-[var(--brand-gold-dark)] px-3 py-1.5 rounded-lg text-sm font-bold border border-[var(--brand-gold)]/20">
                                <CheckCircle size={14} /> {product.terjual_di}
                              </span>
                            </td>
                            <td className="p-6 text-right font-black text-[var(--text-strong)] text-lg tracking-tight">{formatRupiah(product.harga_terjual)}</td>
                          </tr>
                        ))}
                        {products.filter(p => p.status === 'sold').length === 0 && (
                          <tr><td colSpan="4" className="p-16 text-center text-[var(--text-base)] font-bold text-lg">Belum ada barang yang terjual. Semangat jualan!</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-6">
                  {/* Export Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center print-hidden mb-6 bg-[var(--panel-bg)] p-6 rounded-[2rem] border border-[var(--border-color)] shadow-sm">
                    <div>
                      <h2 className="text-2xl font-black text-[var(--text-strong)] uppercase italic tracking-tighter flex items-center gap-3">
                        <span className="w-2 h-6 bg-[var(--brand-gold)] rounded-full transform -skew-x-12"></span>
                        Export Laporan
                      </h2>
                      <p className="text-xs text-[var(--text-base)] mt-1 font-bold uppercase tracking-widest">Cetak laporan dalam bentuk PDF</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="mt-4 md:mt-0 flex items-center gap-2 bg-[var(--brand-gold)] text-black px-6 py-3.5 rounded-2xl font-extrabold uppercase tracking-widest text-xs shadow-md hover:scale-105 transition-all"
                    >
                      <Download size={18} /> Export / Print PDF
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="modern-card p-6 rounded-3xl border-l-4 border-l-[var(--brand-gold)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-[var(--brand-gold)]/10 rounded-2xl"><DollarSign className="text-[var(--brand-gold)]" size={28} /></div>
                        <div>
                          <p className="text-xs text-[var(--text-base)] font-bold uppercase tracking-widest mb-1">Pendapatan</p>
                          <p className="text-3xl font-black text-[var(--text-strong)] tracking-tighter">{formatRupiah(totalSales)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modern-card p-6 rounded-3xl border-l-4 border-l-green-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-green-500/10 rounded-2xl"><ShoppingCart className="text-green-500" size={28} /></div>
                        <div>
                          <p className="text-xs text-[var(--text-base)] font-bold uppercase tracking-widest mb-1">Total Pcs Terjual</p>
                          <p className="text-3xl font-black text-[var(--text-strong)] tracking-tighter">{totalSoldItemsCount} <span className="text-base font-medium text-[var(--text-base)]">Item</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="modern-card p-6 rounded-3xl border-l-4 border-l-blue-500 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-blue-500/10 rounded-2xl"><Package className="text-blue-500" size={28} /></div>
                        <div>
                          <p className="text-xs text-[var(--text-base)] font-bold uppercase tracking-widest mb-1">Varian Ready</p>
                          <p className="text-3xl font-black text-[var(--text-strong)] tracking-tighter">{products.filter(p=>p.status==='ready').length} <span className="text-base font-medium text-[var(--text-base)]">Model</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modern-card p-8 rounded-3xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <h3 className="text-lg font-extrabold text-[var(--text-strong)] mb-6 uppercase tracking-widest flex items-center gap-3">
                      <Tag size={20} className="text-[var(--brand-gold)]" /> Penjualan per Platform
                    </h3>
                    <div className="space-y-4">
                      {['Shopee', 'Tokopedia', 'Facebook', 'COD'].map((platform) => {
                        const platformSales = products.filter(p => p.status === 'sold' && p.terjual_di === platform).reduce((sum, p) => sum + p.harga_terjual, 0);
                        const count = products.filter(p => p.status === 'sold' && p.terjual_di === platform).reduce((sum, p) => sum + (p.qty_sold || 1), 0);
                        if (count === 0) return null;
                        const maxSales = Math.max(...['Shopee', 'Tokopedia', 'Facebook', 'COD'].map(plat => 
                            products.filter(p => p.status === 'sold' && p.terjual_di === plat).reduce((sum, p) => sum + p.harga_terjual, 0)
                        ));
                        const percentage = maxSales > 0 ? (platformSales / maxSales) * 100 : 0;

                        return (
                          <div key={platform} className="relative bg-[var(--input-bg)] p-5 rounded-2xl border border-[var(--border-color)] overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-[var(--brand-gold)]/10 transition-all duration-1000 ease-out"
                              style={{ width: `${percentage}%` }}
                            ></div>
                            <div className="relative z-10 flex justify-between items-center">
                              <div>
                                <span className="font-extrabold text-[var(--text-strong)] text-lg tracking-wide">{platform}</span>
                                <span className="bg-[var(--border-color)] text-[var(--text-strong)] text-[10px] uppercase font-bold px-2 py-1 rounded-md ml-3">
                                  {count} pcs
                                </span>
                              </div>
                              <span className="font-black text-[var(--brand-gold-dark)] text-xl tracking-tight">{formatRupiah(platformSales)}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ADMIN FLOATING BOTTOM NAVIGATION (Solid in mobile, responsive) */}
      {role === 'admin' && (
        <div className="print-hidden fixed bottom-0 md:bottom-6 left-0 md:left-1/2 transform md:-translate-x-1/2 z-50 w-full md:w-[90%] md:max-w-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <nav className="bg-[var(--solid-nav)] md:rounded-full px-2 py-2 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.15)] md:shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-t md:border border-[var(--border-color)] pb-safe">
            <button 
              onClick={() => setActiveTab('stock')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-full transition-all duration-300 ${activeTab === 'stock' ? 'bg-[var(--hover-bg)] text-[var(--brand-gold)] scale-105' : 'text-[var(--text-base)] hover:text-[var(--text-strong)]'}`}
            >
              <Package size={20} className={activeTab === 'stock' ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }} />
              <span className="text-[9px] font-extrabold uppercase tracking-widest">Stock</span>
            </button>
            <button 
              onClick={() => setActiveTab('sales')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-full transition-all duration-300 ${activeTab === 'sales' ? 'bg-[var(--hover-bg)] text-[var(--brand-gold)] scale-105' : 'text-[var(--text-base)] hover:text-[var(--text-strong)]'}`}
            >
              <ShoppingCart size={20} className={activeTab === 'sales' ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }} />
              <span className="text-[9px] font-extrabold uppercase tracking-widest">Sales</span>
            </button>
            <button 
              onClick={() => setActiveTab('report')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-full transition-all duration-300 ${activeTab === 'report' ? 'bg-[var(--hover-bg)] text-[var(--brand-gold)] scale-105' : 'text-[var(--text-base)] hover:text-[var(--text-strong)]'}`}
            >
              <BarChart3 size={20} className={activeTab === 'report' ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }} />
              <span className="text-[9px] font-extrabold uppercase tracking-widest">Report</span>
            </button>
          </nav>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsLoginModalOpen(false)}></div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 md:p-10 rounded-[2.5rem] w-full max-w-md relative shadow-2xl animate-pop-in">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 text-[var(--text-base)] hover:text-[var(--text-strong)] bg-[var(--input-bg)] p-2 rounded-full transition-colors z-10 border border-[var(--border-color)]">
              <X size={20} />
            </button>
            <div className="mb-10 flex justify-center relative z-10"><Logo /></div>
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 font-black uppercase tracking-[0.2em] group-focus-within:text-[var(--brand-gold)] transition-colors pl-2">Username</label>
                <input required type="text" defaultValue="admin" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all duration-300" />
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 font-black uppercase tracking-[0.2em] group-focus-within:text-[var(--brand-gold)] transition-colors pl-2">Password</label>
                <input required type="password" defaultValue="admin123" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all duration-300" />
              </div>
              <button type="submit" className="w-full bg-[var(--brand-gold)] text-black font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(255,195,0,0.4)] hover:scale-[1.02] transition-all duration-300 mt-8 flex justify-center items-center gap-2">
                Masuk Dashboard <ArrowRight size={18}/>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {productModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setProductModal({isOpen: false, data: null})}></div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 md:p-10 rounded-[2.5rem] w-full max-w-2xl relative my-8 shadow-2xl animate-pop-in">
            <button onClick={() => setProductModal({isOpen: false, data: null})} className="absolute top-8 right-8 text-[var(--text-base)] hover:text-[var(--text-strong)] bg-[var(--input-bg)] p-3 rounded-full transition-colors border border-[var(--border-color)] z-10">
              <X size={20} />
            </button>
            
            <div className="mb-8 border-b-2 border-[var(--border-color)] pb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-strong)] uppercase italic tracking-tighter flex items-center gap-3">
                  <span className="w-3 h-10 bg-[var(--brand-gold)] rounded-sm transform -skew-x-12"></span>
                  {productModal.data ? 'Edit Data Barang' : 'Tambah Stock Baru'}
                </h2>
                <p className="text-[var(--text-base)] text-xs mt-2 font-bold uppercase tracking-[0.15em] ml-6">Manajemen Inventori Marketpace.soc</p>
              </div>
            </div>

            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Nama Produk</label>
                <input required name="nama" defaultValue={productModal.data?.nama} placeholder="Contoh: Nike Aeroswift Singlet" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none" />
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Kategori Jenis</label>
                <select required name="jenis" defaultValue={productModal.data?.jenis || 'jersey'} className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none cursor-pointer appearance-none">
                  <option value="jersey">Jersey</option>
                  <option value="sepatu">Sepatu</option>
                  <option value="aksessoris">Aksesoris</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Kondisi Barang</label>
                <select required name="kondisi" defaultValue={productModal.data?.kondisi || 'new'} className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none cursor-pointer appearance-none">
                  <option value="new">New (Baru)</option>
                  <option value="preloved">Preloved (Bekas)</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Size / Ukuran</label>
                <input required name="size" defaultValue={productModal.data?.size} placeholder="M / 42 / All Size" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none" />
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Jumlah Stock</label>
                <input required type="number" name="stock" min="0" defaultValue={productModal.data?.stock || 1} className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none" />
                {productModal.data?.status === 'sold' && <span className="text-[10px] text-green-500 font-bold ml-2 mt-1 block">*Isi stock &gt; 0 untuk menjadikan status Ready kembali</span>}
              </div>
              <div className="md:col-span-2 group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-[var(--brand-gold)] transition-colors">Harga Retail / Modal (Rp)</label>
                <input required type="number" name="harga" defaultValue={productModal.data?.harga} className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--brand-gold-dark)] rounded-2xl px-5 py-4 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[var(--brand-gold)]/10 shadow-inner transition-all outline-none text-2xl font-black tracking-tighter" />
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-[var(--brand-gold)] text-black font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(255,195,0,0.3)] hover:-translate-y-1 transition-all duration-300">
                  Simpan Data Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mark Sold Modal */}
      {sellModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSellModal({isOpen: false, data: null})}></div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2.5rem] w-full max-w-md relative shadow-2xl animate-pop-in">
            <button onClick={() => setSellModal({isOpen: false, data: null})} className="absolute top-6 right-6 text-[var(--text-base)] hover:text-[var(--text-strong)] bg-[var(--input-bg)] p-2 rounded-full transition-colors border border-[var(--border-color)]">
              <X size={20} />
            </button>
            
            <div className="mb-8 border-b-2 border-[var(--border-color)] pb-6">
              <h2 className="text-3xl font-black text-[var(--text-strong)] uppercase italic tracking-tighter flex items-center gap-3">
                <span className="w-2.5 h-8 bg-green-500 rounded-sm transform -skew-x-12"></span>
                Konfirmasi Sold
              </h2>
              <div className="mt-4 bg-[var(--bg-base)] p-4 rounded-2xl border-2 border-[var(--border-color)] flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-[var(--brand-gold)] shrink-0"/> 
                  <span className="text-[var(--text-strong)] font-bold tracking-wide leading-tight">{sellModal.data?.nama}</span>
                </div>
                <span className="bg-[var(--input-bg)] text-[var(--text-base)] text-[10px] font-bold px-2 py-1 rounded border border-[var(--border-color)]">
                  Max: {sellModal.data?.stock} pcs
                </span>
              </div>
            </div>
            
            <form onSubmit={handleMarkAsSold} className="space-y-6">
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-green-500 transition-colors">Jumlah (Qty) Terjual</label>
                <input required type="number" name="jumlah_terjual" min="1" max={sellModal.data?.stock} defaultValue="1" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 shadow-inner transition-all outline-none" />
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-green-500 transition-colors">Terjual Di Platform</label>
                <select required name="terjual_di" className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 shadow-inner transition-all outline-none cursor-pointer appearance-none">
                  <option value="Shopee">Shopee</option>
                  <option value="Tokopedia">Tokopedia</option>
                  <option value="Facebook">Facebook / Sosmed</option>
                  <option value="COD">COD / Langsung</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-green-500 transition-colors">Harga Final / Total Deal (Rp)</label>
                <input required type="number" name="harga_terjual" defaultValue={sellModal.data?.harga} className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--brand-gold-dark)] rounded-2xl px-5 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 shadow-inner transition-all outline-none text-2xl font-black tracking-tighter" />
              </div>
              <div className="group">
                <label className="block text-[10px] text-[var(--text-base)] mb-2 uppercase font-black tracking-[0.15em] pl-2 group-focus-within:text-green-500 transition-colors">Catatan Tambahan (Opsional)</label>
                <textarea name="keterangan" rows="3" placeholder="Misal: Dikirim pakai JNE, deal nego tipis..." className="w-full bg-[var(--bg-base)] border-2 border-[var(--border-color)] text-[var(--text-strong)] font-bold rounded-2xl px-5 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 shadow-inner transition-all outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:-translate-y-1 hover:bg-green-600 transition-all duration-300 mt-2 flex justify-center items-center gap-2">
                <CheckCircle size={20} /> Tandai Laku
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal({isOpen: false, id: null})}></div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-[2.5rem] w-full max-w-sm relative shadow-2xl animate-pop-in text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text-strong)] uppercase italic tracking-tighter mb-3">Hapus Barang?</h3>
            <p className="text-[var(--text-base)] text-sm mb-8 font-medium leading-relaxed">Data produk ini akan dihapus secara permanen dari sistem. Anda yakin ingin melanjutkan?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteModal({isOpen: false, id: null})} 
                className="flex-1 bg-[var(--input-bg)] text-[var(--text-strong)] font-bold uppercase tracking-widest py-4 rounded-2xl border-2 border-[var(--border-color)] hover:bg-[var(--hover-bg)] transition-colors text-xs"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 bg-red-500 text-white font-bold uppercase tracking-widest py-4 rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 text-xs"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}