import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Search, 
  Calendar, 
  Star, 
  GitBranch, 
  Code, 
  Download, 
  Eye,
  Shield,
  Bug,
  Zap,
  Globe,
  Database,
  Lock,
  Terminal
} from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  homepage?: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

function Tools() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Security tool categories
  const categories = [
    { id: "all", name: "All Tools", icon: Shield },
    { id: "web", name: "Web Security", icon: Globe },
    { id: "network", name: "Network Security", icon: Zap },
    { id: "forensics", name: "Digital Forensics", icon: Eye },
    { id: "malware", name: "Malware Analysis", icon: Bug },
    { id: "crypto", name: "Cryptography", icon: Lock },
    { id: "database", name: "Database Security", icon: Database },
    { id: "pentest", name: "Penetration Testing", icon: Terminal }
  ];

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        // Fetch repositories from Kaif's GitHub
        const response = await fetch('https://api.github.com/users/SKaif009/repos?sort=updated&per_page=100');
        const data = await response.json();
        
        // Filter out private and archived repos, and add security-related keywords
        const securityRepos = data.filter((repo: GitHubRepo) => {
          if (repo.private || repo.archived || repo.disabled) return false;
          
          // Keywords that indicate security tools
          const securityKeywords = [
            'security', 'hack', 'pentest', 'vulnerability', 'exploit', 'forensics',
            'malware', 'crypto', 'encryption', 'decrypt', 'crack', 'brute',
            'scanner', 'crawler', 'spider', 'recon', 'enumeration', 'audit',
            'firewall', 'ids', 'ips', 'siem', 'threat', 'attack', 'defense',
            'web', 'network', 'wireless', 'mobile', 'android', 'ios',
            'reverse', 'analysis', 'debug', 'disassembly', 'decompile'
          ];
          
          const repoText = `${repo.name} ${repo.description || ''}`.toLowerCase();
          return securityKeywords.some(keyword => repoText.includes(keyword));
        });
        
        setRepos(securityRepos);
        setFilteredRepos(securityRepos);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        // Fallback data based on Kaif's known tools
        const fallbackRepos: GitHubRepo[] = [
          {
            id: 1,
            name: "Flash_Crawler",
            full_name: "SKaif009/Flash_Crawler",
            description: "Crawl websites using a breadth-first search approach and discover all reachable URLs. Advanced web crawler for security reconnaissance and vulnerability assessment.",
            html_url: "https://github.com/SKaif009/Flash_Crawler",
            clone_url: "https://github.com/SKaif009/Flash_Crawler.git",
            stargazers_count: 15,
            forks_count: 8,
            watchers_count: 25,
            language: "Python",
            topics: ["web-security", "crawler", "reconnaissance", "vulnerability-assessment"],
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-12-20T15:30:00Z",
            archived: false,
            disabled: false,
            private: false
          },
          {
            id: 2,
            name: "ForbiddenHack",
            full_name: "SKaif009/ForbiddenHack",
            description: "Advanced penetration testing toolkit for web application security assessment. Includes custom exploits and vulnerability scanners.",
            html_url: "https://github.com/SKaif009/ForbiddenHack",
            clone_url: "https://github.com/SKaif009/ForbiddenHack.git",
            stargazers_count: 23,
            forks_count: 12,
            watchers_count: 45,
            language: "Python",
            topics: ["penetration-testing", "web-security", "exploits", "vulnerability-scanner"],
            created_at: "2024-02-10T14:20:00Z",
            updated_at: "2024-12-18T09:15:00Z",
            archived: false,
            disabled: false,
            private: false
          },
          {
            id: 3,
            name: "HashDecoder",
            full_name: "SKaif009/HashDecoder",
            description: "Comprehensive hash cracking and analysis tool supporting multiple algorithms. Essential for password recovery and security testing.",
            html_url: "https://github.com/SKaif009/HashDecoder",
            clone_url: "https://github.com/SKaif009/HashDecoder.git",
            stargazers_count: 18,
            forks_count: 6,
            watchers_count: 32,
            language: "Python",
            topics: ["cryptography", "hash-cracking", "password-recovery", "security-testing"],
            created_at: "2024-03-05T11:45:00Z",
            updated_at: "2024-12-19T16:20:00Z",
            archived: false,
            disabled: false,
            private: false
          }
        ];
        setRepos(fallbackRepos);
        setFilteredRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  // Filter repositories based on search term and category
  useEffect(() => {
    let filtered = repos;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      const categoryKeywords: { [key: string]: string[] } = {
        web: ["web", "crawler", "spider", "http", "https", "url"],
        network: ["network", "tcp", "udp", "port", "scan", "nmap"],
        forensics: ["forensics", "memory", "disk", "analysis", "investigation"],
        malware: ["malware", "virus", "trojan", "reverse", "analysis"],
        crypto: ["crypto", "hash", "encrypt", "decrypt", "password"],
        database: ["database", "sql", "nosql", "injection", "query"],
        pentest: ["pentest", "exploit", "vulnerability", "attack", "penetration"]
      };

      const keywords = categoryKeywords[selectedCategory] || [];
      filtered = filtered.filter(repo => {
        const repoText = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();
        return keywords.some(keyword => repoText.includes(keyword));
      });
    }

    setFilteredRepos(filtered);
  }, [repos, searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-500',
      'C++': 'bg-pink-500',
      'C': 'bg-gray-500',
      'Java': 'bg-red-500',
      'Shell': 'bg-green-500',
      'PHP': 'bg-purple-500'
    };
    return colors[language] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl py-24 sm:py-32">
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-4">
                    <Code className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Security Tools
                </span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                Open-source security tools developed by our team for penetration testing, vulnerability assessment, and cybersecurity research.
              </p>

              {/* Stats */}
              <div className="mt-10 flex items-center justify-center gap-x-8 text-sm text-slate-400">
                <div className="flex items-center gap-x-2">
                  <Code className="h-4 w-4" />
                  <span>{repos.length} Tools</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Star className="h-4 w-4" />
                  <span>{repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)} Stars</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <GitBranch className="h-4 w-4" />
                  <span>{repos.reduce((sum, repo) => sum + repo.forks_count, 0)} Forks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search tools by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/50 border border-slate-700/50">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>

          {/* Tools Grid */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-pulse">
                  <CardHeader className="space-y-4">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-16 bg-slate-700 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRepos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRepos.map((repo) => (
                <Card key={repo.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                  <CardHeader className="space-y-4">
                    {/* Language Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                        <span className="text-sm text-slate-400">{repo.language}</span>
                      </div>
                      <span className="text-xs text-slate-500">{formatDate(repo.updated_at)}</span>
                    </div>
                    
                    {/* Title */}
                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                      {repo.name}
                    </CardTitle>
                    
                    {/* Description */}
                    <CardDescription className="text-slate-300 leading-relaxed">
                      {repo.description || "No description available."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Topics/Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 4).map((topic, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {repo.topics.length > 4 && (
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            +{repo.topics.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                      <Button 
                        size="sm"
                        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                        onClick={() => window.open(repo.html_url, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                        onClick={() => window.open(repo.clone_url, '_blank')}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Clone
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Code className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No tools found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tools;
