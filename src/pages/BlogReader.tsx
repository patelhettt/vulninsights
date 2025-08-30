import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, ExternalLink, Clock, Share2 } from "lucide-react";
import { Helmet } from 'react-helmet-async';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  author: string;
  categories: string[];
  thumbnail?: string;
  guid: string;
}

function BlogReader() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<MediumPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch posts from both authors to find the matching post
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
              description: item.description?.replace(/<[^>]*>/g, ''),
              content: item.content || item.description || '',
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
              description: item.description?.replace(/<[^>]*>/g, ''),
              content: item.content || item.description || '',
              author: 'Het',
              categories: item.categories || [],
              thumbnail: item.thumbnail,
              guid: item.guid
            });
          });
        }
        
        // Find the post by slug (using title as slug)
        const foundPost = allPosts.find(post => {
          const postSlug = post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return postSlug === slug;
        });
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const sharePost = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-slate-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-slate-400 mb-8">The post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blogs')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      {post && (
        <Helmet>
          <title>{post.title} | VulnInsights</title>
          <meta name="description" content={post.description.substring(0, 160)} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description.substring(0, 160)} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://vulninsights.com/blogs/${createSlug(post.title)}`} />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description.substring(0, 160)} />
          <meta name="article:author" content={post.author} />
          <meta name="article:published_time" content={post.pubDate} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description.substring(0, 160),
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.pubDate,
              "publisher": {
                "@type": "Organization",
                "name": "VulnInsights",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vulninsights.com/logo.png"
                }
              }
            })}
          </script>
        </Helmet>
      )}
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blogs')}
          className="mb-8 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        {/* Article Header */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                {post.author}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.pubDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getReadingTime(post.content || post.description)} min read
                </div>
              </div>
            </div>
            
            <CardTitle className="text-3xl text-white leading-tight">
              {post.title}
            </CardTitle>
            
            <CardDescription className="text-lg text-slate-300 leading-relaxed">
              {post.description}
            </CardDescription>

            {/* Tags */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 mb-8">
          <CardContent className="pt-8">
            <div 
              className="prose prose-invert prose-cyan max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content || post.description }}
            />
          </CardContent>
        </Card>

        {/* Article Footer */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => window.open(post.link, '_blank')}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Read on Medium
                </Button>
              </div>
              
              <Button 
                variant="ghost"
                onClick={sharePost}
                className="text-slate-400 hover:text-white"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BlogReader;