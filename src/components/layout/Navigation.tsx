import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, Menu, X, Search, ExternalLink, Home, BookOpen, Users } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Our Blogs", href: "/blogs", icon: BookOpen },
    { name: "About Us", href: "/about", icon: Users },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5" 
        : "bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
    }`}>
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                scrolled 
                  ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-lg" 
                  : "bg-cyan-500/20 blur-md"
              } group-hover:bg-gradient-to-r group-hover:from-cyan-500/40 group-hover:to-blue-500/40 group-hover:blur-xl`} />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-2.5 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                <Shield className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-purple-500 transition-all duration-300">
                VulnInsights
              </span>
              <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                Security Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group flex items-center space-x-2 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 hover:shadow-md"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side actions - removed search and external links */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Empty space for balance */}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`relative text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 ${
                    isOpen ? "bg-slate-800/50" : ""
                  }`}
                >
                  <Menu className="h-6 w-6" />
                  {isOpen && (
                    <div className="absolute inset-0 bg-cyan-500/10 rounded-md animate-pulse" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-lg rounded-full" />
                      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-2.5">
                        <Shield className="h-5 w-5 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        VulnInsights
                      </span>
                      <span className="text-xs text-slate-400">
                        Security Research
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                            : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                        }`}
                      >
                        <IconComponent className="h-5 w-5 transition-all duration-300" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile external links - removed */}
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="flex items-center justify-center space-x-4">
                    {/* External links removed */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}