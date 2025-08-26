import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, ExternalLink, Users, BookOpen } from "lucide-react";

function Index() {
  const blogData = [
    {
      id: 1,
      author: "Het Patel",
      title: "Advanced Penetration Testing Techniques",
      summary: "Exploring cutting-edge methodologies for ethical hacking and vulnerability assessment in modern enterprise environments.",
      tags: ["Penetration Testing", "Ethical Hacking", "Security"],
      readTime: "8 min read",
      publishDate: "Dec 15, 2024",
      mediumUrl: "#"
    },
    {
      id: 2,
      author: "Your Friend",
      title: "Zero-Day Vulnerabilities: Detection & Response",
      summary: "A comprehensive guide to identifying, analyzing, and mitigating zero-day exploits before they compromise your infrastructure.",
      tags: ["Zero-Day", "Incident Response", "Threat Intelligence"],
      readTime: "12 min read",
      publishDate: "Dec 12, 2024",
      mediumUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-4">
                    <Shield className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  CyberCanvas
                </span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                Exploring the frontiers of cybersecurity through expert insights, advanced techniques, and real-world case studies.
              </p>

              {/* Stats */}
              <div className="mt-10 flex items-center justify-center gap-x-8 text-sm text-slate-400">
                <div className="flex items-center gap-x-2">
                  <Users className="h-4 w-4" />
                  <span>2 Security Experts</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Latest Insights</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Industry Focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Security Insights</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deep dives into cybersecurity challenges, solutions, and emerging threats from our security research team.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {blogData.map((blog) => (
              <Card key={blog.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      {blog.author}
                    </Badge>
                    <span className="text-xs text-slate-500">{blog.publishDate}</span>
                  </div>
                  
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {blog.title}
                  </CardTitle>
                  
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {blog.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
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
                      {blog.readTime}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                      onClick={() => window.open(blog.mediumUrl, '_blank')}
                    >
                      Read on Medium
                      <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-slate-300 mb-6 max-w-md mx-auto">
                Follow our Medium publications for the latest cybersecurity insights and research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => window.open('https://medium.com', '_blank')}
                >
                  Follow on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                >
                  Subscribe to Updates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;