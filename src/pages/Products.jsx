import React, { useState, useMemo, useEffect } from "react";
import { categories } from "../components/ProductList";
import { ProductCard } from "../components/ProductList";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, SlidersHorizontal, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(200);
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Simulate network fetch
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Flatten products for unified display, or filter by active category
  const allProducts = useMemo(() => {
    const all = [];
    categories.forEach(cat => {
      cat.products.forEach(p => {
        all.push({ ...p, categoryName: cat.name });
      });
    });
    return all;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (activeCategory !== "All") {
      result = result.filter(p => p.categoryName === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    result = result.filter(p => p.price <= priceRange);

    if (isOrganicOnly) {
      result = result.filter(p => p.categoryName === "Fruits" || p.categoryName === "Vegetables");
    }

    return result;
  }, [activeCategory, searchQuery, allProducts, priceRange, isOrganicOnly]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (catName) => {
    setActiveCategory(catName);
    setCurrentPage(1);
    if (isMobileFiltersOpen) setIsMobileFiltersOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-10 h-full py-4 pr-6">

      {/* Search - Frosted Pill */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#00D4AA] transition-colors" />
        <input
          type="text"
          placeholder="Search aisles..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="w-full bg-white/[0.02] border border-white/10 rounded-full pl-11 pr-10 py-3.5 text-white font-light placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Categories - Editorial List */}
      <div>
        <h3 className="text-[10px] text-[#00D4AA] font-medium uppercase tracking-[0.2em] mb-5 pl-2">Aisles</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-light transition-all flex items-center justify-between group ${activeCategory === "All" ? "bg-white text-[#0A0A0F] font-medium shadow-md" : "text-white/60 hover:bg-white/[0.03] hover:text-white"
              }`}
          >
            All Products
            {activeCategory === "All" && <motion.div layoutId="activeCat" className="w-1.5 h-1.5 rounded-full bg-[#0A0A0F]" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-light transition-all flex items-center justify-between group ${activeCategory === cat.name ? "bg-white text-[#0A0A0F] font-medium shadow-md" : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                }`}
            >
              {cat.name}
              {activeCategory === cat.name && <motion.div layoutId="activeCat" className="w-1.5 h-1.5 rounded-full bg-[#0A0A0F]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Filters - Minimal Sliders & Toggles */}
      <div className="space-y-8 pl-2">
        {/* Price Range */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] text-[#00D4AA] font-medium uppercase tracking-[0.2em]">Max Price</h3>
            <span className="text-white text-sm font-serif italic">${priceRange}</span>
          </div>
          <input
            type="range"
            min="1"
            max="200"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer premium-slider"
          />
        </div>

        {/* Organic Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-white/80 font-light text-sm">Organic Only</h3>
          <button
            onClick={() => setIsOrganicOnly(!isOrganicOnly)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isOrganicOnly ? "bg-[#00D4AA]" : "bg-white/10"}`}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-1"
              animate={{ left: isOrganicOnly ? "26px" : "4px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Ambient Background Glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#6C63FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00D4AA] opacity-[0.02] blur-[150px] rounded-full pointer-events-none translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto flex gap-12 relative z-10">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar border-r border-white/5">
          <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top Bar - Cinematic Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 stroke-[1.5]" />
              </button>
              <div>
                <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter leading-none mb-3">
                  {activeCategory === "All" ? "explore." : `${activeCategory.toLowerCase()}.`}
                </h1>
                <p className="text-white/40 font-light flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00D4AA]" />
                  Displaying {filteredProducts.length} curated items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full p-1.5 backdrop-blur-sm self-start sm:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-white text-[#0A0A0F]" : "text-white/40 hover:text-white"}`}
              >
                <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-full transition-all duration-300 ${viewMode === "list" ? "bg-white text-[#0A0A0F]" : "text-white/40 hover:text-white"}`}
              >
                <List className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Product Grid / List */}
          {isLoading ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`bg-white/[0.02] border border-white/5 rounded-[2rem] animate-pulse ${viewMode === 'grid' ? 'h-[360px]' : 'h-[120px]'}`}></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center bg-white/[0.01] border border-white/5 rounded-[2.5rem] backdrop-blur-sm"
            >
              <div className="w-24 h-24 bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <Search className="w-8 h-8 text-white/30 stroke-[1.5]" />
              </div>
              <h2 className="text-3xl font-serif text-white mb-3 tracking-tight">Nothing found</h2>
              <p className="text-white/40 font-light mb-8 max-w-md">The specific criteria you entered yielded no results in our current inventory.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); setPriceRange(200); setIsOrganicOnly(false); }}
                className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white hover:text-[#0A0A0F] transition-all duration-300"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                layout
                className={`grid ${viewMode === 'grid' ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8' : 'grid-cols-1 lg:grid-cols-2 gap-4'}`}
              >
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Minimalist Pagination */}
              {totalPages > 1 && (
                <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                  <p className="text-white/40 font-light text-sm">
                    Showing <span className="text-white font-medium">{startIndex + 1}</span> to <span className="text-white font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</span> of <span className="text-white font-medium">{filteredProducts.length}</span> items
                  </p>

                  <div className="flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
                    </button>

                    <div className="flex gap-1 px-2">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (totalPages > 5) {
                          if (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1) {
                            if (pageNum === 2 || pageNum === totalPages - 1) return <span key={i} className="text-white/30 px-2 flex items-center">...</span>;
                            return null;
                          }
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-full text-sm font-light transition-all ${currentPage === pageNum ? "bg-white text-[#0A0A0F] font-medium shadow-md" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Mobile Sidebar Overlay (Frosted Glass) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#0A0A0F]/60 backdrop-blur-md z-[120] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 bottom-0 left-0 w-[85vw] max-w-[320px] bg-[#0A0A0F]/90 backdrop-blur-3xl border-r border-white/10 p-6 z-[130] overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-10 pt-4">
                <h2 className="text-2xl font-serif text-white tracking-tight">filters.</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        /* Custom Slider Styling */
        .premium-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00D4AA;
          cursor: pointer;
          border: 4px solid #0A0A0F;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.2);
          transition: transform 0.2s;
        }
        .premium-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}} />
    </div>
  );
};

export default Products;