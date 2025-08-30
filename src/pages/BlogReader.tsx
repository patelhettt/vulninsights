import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  content: string;
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
        const foundPost = allPosts.find(p => 
          createSlug(p.title) === slug || 
          p.guid === slug ||
          p.link.includes(slug || '')
        );
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
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

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const processContent = (content: string) => {
    // Clean up HTML content and make it readable
    let processedContent = content
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<figure[^>]*>/gi, '<div class="figure">')
      .replace(/<\/figure>/gi, '</div>')
      .replace(/<img([^>]*)>/gi, '<img$1 class="blog-image" />')
      .replace(/<h1([^>]*)>/gi, '<h1$1 class="blog-h1">')
      .replace(/<h2([^>]*)>/gi, '<h2$1 class="blog-h2">')
      .replace(/<h3([^>]*)>/gi, '<h3$1 class="blog-h3">')
      .replace(/<p([^>]*)>/gi, '<p$1 class="blog-paragraph">')
      .replace(/<blockquote([^>]*)>/gi, '<blockquote$1 class="blog-quote">')
      .replace(/<pre([^>]*)>/gi, '<pre$1 class="blog-code">')
      .replace(/<code([^>]*)>/gi, '<code$1 class="blog-inline-code">');
    
    return processedContent;
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
            <h1 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist or couldn't be loaded.</p>
            <Link to="/blogs">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>
            </Link>
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
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "description": "${post.description.substring(0, 160)}",
            "author": {
              "@type": "Person",
              "name": "${post.author}"
            },
            "datePublished": "${post.pubDate}",
            "publisher": {
              "@type": "Organization",
              "name": "VulnInsights",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vulninsights.com/logo.png"
              }
            }
          }
          </script>
        </Helmet>
      )}
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blogs')}
            className="text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>

        {/* Article Header */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 mb-8">
          <CardHeader className="space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.pubDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{estimateReadTime(post.content)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
{/* 
Hey Cursor, No need to show the description
            Description
            {post.description && (
              <p className="text-lg text-slate-300 leading-relaxed">
                {post.description}
              </p>
            )} */}

            {/* Tags */}
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

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                className="border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(post.link, '_blank')}
                className="border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Medium
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-8">
            <div 
              className="prose prose-invert prose-slate max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-cyan-400 prose-code:bg-slate-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
                prose-ul:text-slate-300 prose-ol:text-slate-300
                prose-li:mb-2
                prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ 
                __html: processContent(post.content) 
              }}
            />
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <Separator className="mb-8 bg-slate-700/50" />
          <div className="space-y-4">
            <p className="text-slate-400">
              Enjoyed this article? Follow {post.author} on Medium for more cybersecurity insights.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={() => window.open(post.link, '_blank')}
              >
                Read More from {post.author}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/blogs">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogReader;