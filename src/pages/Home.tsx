import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, ExternalLink, Users, BookOpen, ArrowRight } from "lucide-react";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author: string;
  categories: string[];
  guid: string;
}

function Home() {
  const [latestPosts, setLatestPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        // Fetch latest posts from both authors
        const kaifResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@SKaif009');
        const hetResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hettt');

        const kaifData = await kaifResponse.json();
        const hetData = await hetResponse.json();

        const allPosts: MediumPost[] = [];

        // Add Kaif's posts
        if (kaifData.items) {
          kaifData.items.slice(0, 2).forEach((item: any) => {
            allPosts.push({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              author: 'Kaif',
              categories: item.categories || [],
              guid: item.guid
            });
          });
        }

        // Add Het's posts
        if (hetData.items) {
          hetData.items.slice(0, 2).forEach((item: any) => {
            allPosts.push({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              author: 'Het', // Explicitly set to 'Het' for Het's RSS feed
              categories: item.categories || [],
              guid: item.guid
            });
          });
        }

        // Sort by date and take latest 4
        allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setLatestPosts(allPosts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
        // Fallback to placeholder data
        setLatestPosts([
          {
            title: "Advanced Penetration Testing Techniques",
            link: "https://medium.com/@hettt",
            pubDate: new Date().toISOString(),
            description: "Exploring cutting-edge methodologies for ethical hacking and vulnerability assessment in modern enterprise environments...",
            author: "Het",
            categories: ["Penetration Testing", "Security"],
            guid: "advanced-penetration-testing-techniques"
          },
          {
            title: "Zero-Day Vulnerabilities: Detection & Response",
            link: "https://medium.com/@SKaif009",
            pubDate: new Date().toISOString(),
            description: "A comprehensive guide to identifying, analyzing, and mitigating zero-day exploits before they compromise your infrastructure...",
            author: "Kaif",
            categories: ["Zero-Day", "Incident Response"],
            guid: "zero-day-vulnerabilities-detection-response"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                  <img
                    src="/favicon/windows11/favicon.png"
                    alt="logo"
                    className="w-30 h-35"   // 👈 adjust these values
                  />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  VulnInsights
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                Exploring the frontiers of cybersecurity through expert insights, advanced techniques, and real-world vulnerability research.
              </p>

              {/* Stats */}
              <div className="mt-10 flex items-center justify-center gap-x-8 text-sm text-slate-400">
                <div className="flex items-center gap-x-2">
                  <Users className="h-4 w-4" />
                  <span>Security Researchers</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Latest Insights</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Vulnerability Focus</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/blogs">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Explore Our Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    About the Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Security Research</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Recent vulnerability discoveries, security insights, and research findings from our team.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
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
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {latestPosts.map((post, index) => (
                <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        {post.author}
                      </Badge>
                      <span className="text-xs text-slate-500">{formatDate(post.pubDate)}</span>
                    </div>

                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="text-slate-300 leading-relaxed line-clamp-3">
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
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Medium Article
                      </span>

                      <div className="flex gap-2">
                        <Link to={`/blogs/${createSlug(post.title)}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* View All Blogs CTA */}
          <div className="mt-16 text-center">
            <Link to="/blogs">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                View All Research Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;