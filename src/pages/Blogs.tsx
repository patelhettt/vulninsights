import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Search, Calendar, User, Filter, BookOpen } from "lucide-react";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author: string;
  categories: string[];
  thumbnail?: string;
  guid: string;
}

function Blogs() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        // Fetch posts from both authors
        const kaifResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@SKaif009');
        const hetResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hettt');
        
        const kaifData = await kaifResponse.json();
        const hetData = await hetResponse.json();
        
        const allPosts: MediumPost[] = [];
        
        // Add Kaif's posts
        if (kaifData.items) {
          kaifData.items.forEach((item: any) => {
            allPosts.push({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
              author: 'Kaif',
              categories: item.categories || [],
              thumbnail: item.thumbnail,
              guid: item.guid
            });
          });
        }
        
        // Add Het's posts
        if (hetData.items) {
          hetData.items.forEach((item: any) => {
            allPosts.push({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
              author: 'Het',
              categories: item.categories || [],
              thumbnail: item.thumbnail,
              guid: item.guid
            });
          });
        }
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
        // Fallback to placeholder data
        const placeholderPosts = [
          {
            title: "Advanced Penetration Testing Techniques",
            link: "https://medium.com/@hettt",
            pubDate: new Date().toISOString(),
            description: "Exploring cutting-edge methodologies for ethical hacking and vulnerability assessment in modern enterprise environments. This comprehensive guide covers advanced techniques used by security professionals...",
            author: "Het",
            categories: ["Penetration Testing", "Security", "Ethical Hacking"],
            guid: "advanced-penetration-testing-techniques"
          },
          {
            title: "Zero-Day Vulnerabilities: Detection & Response",
            link: "https://medium.com/@SKaif009",
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            description: "A comprehensive guide to identifying, analyzing, and mitigating zero-day exploits before they compromise your infrastructure. Learn about the latest detection methods and response strategies...",
            author: "Kaif",
            categories: ["Zero-Day", "Incident Response", "Threat Intelligence"],
            guid: "zero-day-vulnerabilities-detection-response"
          },
          {
            title: "Web Application Security Best Practices",
            link: "https://medium.com/@hettt",
            pubDate: new Date(Date.now() - 172800000).toISOString(),
            description: "Essential security practices for modern web applications, covering OWASP Top 10, secure coding practices, and implementation strategies for robust application security...",
            author: "Het",
            categories: ["Web Security", "OWASP", "Secure Coding"],
            guid: "web-application-security-best-practices"
          },
          {
            title: "Network Security Monitoring Strategies",
            link: "https://medium.com/@SKaif009",
            pubDate: new Date(Date.now() - 259200000).toISOString(),
            description: "Implementing effective network security monitoring to detect and respond to threats in real-time. Covers tools, techniques, and best practices for network defense...",
            author: "Kaif",
            categories: ["Network Security", "Monitoring", "SOC"],
            guid: "network-security-monitoring-strategies"
          }
        ];
        setPosts(placeholderPosts);
        setFilteredPosts(placeholderPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by author
    if (selectedAuthor !== "all") {
      filtered = filtered.filter(post => post.author.toLowerCase() === selectedAuthor);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedAuthor, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorPosts = (author: string) => {
    return posts.filter(post => post.author.toLowerCase() === author.toLowerCase());
  };

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Security Research
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Comprehensive cybersecurity insights, vulnerability research, and security best practices from our team of experts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>

          <Tabs value={selectedAuthor} onValueChange={setSelectedAuthor} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                All Posts ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="het" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                Het ({getAuthorPosts('Het').length})
              </TabsTrigger>
              <TabsTrigger value="kaif" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                Kaif ({getAuthorPosts('Kaif').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter className="h-4 w-4" />
            <span>{filteredPosts.length} articles found</span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-20 bg-slate-700 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-lg mb-4">No articles found</div>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.pubDate)}
                    </span>
                  </div>
                  
                  <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="text-slate-300 leading-relaxed line-clamp-4 flex-1">
                    {post.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 3).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline" 
                        className="text-xs border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.categories.length > 3 && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-500">
                        +{post.categories.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      to={`/blogs/${createSlug(post.title)}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white group/btn"
                      >
                        <BookOpen className="mr-2 h-3 w-3" />
                        Read Article
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                      onClick={() => window.open(post.link, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More / Pagination could go here */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-400">
              Follow us on Medium for more cybersecurity insights and research
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => window.open('https://medium.com/@hettt', '_blank')}
              >
                Follow Het
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => window.open('https://medium.com/@SKaif009', '_blank')}
              >
                Follow Kaif
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;