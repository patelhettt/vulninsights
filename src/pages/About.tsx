import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, Award, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

interface AuthorData {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  mediumUrl: string;
  linkedinUrl: string;
  tryhackmeUrl: string;
  portfolioUrl?: string;
  certifications: string[];
  imageUrl?: string;
}

function About() {
  const [authorsData, setAuthorsData] = useState<AuthorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        // Fetch RSS feeds to get author images
        const kaifResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@SKaif009');
        const hetResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hettt');
        
        const kaifData = await kaifResponse.json();
        const hetData = await hetResponse.json();
        
        // Extract author images from RSS feed
        const kaifImage = kaifData.feed?.image || kaifData.items?.[0]?.thumbnail;
        const hetImage = hetData.feed?.image || hetData.items?.[0]?.thumbnail;
        
        const authors: AuthorData[] = [
          {
            name: "Shah Kaif",
            role: "Cybersecurity Researcher",
            bio: "Cybersecurity Researcher, VAPT Intern, Bug Bounty Hunter, CTF Player. Specialized in vulnerability assessment, penetration testing, and ethical hacking with a passion for discovering and responsibly disclosing security flaws.",
            expertise: ["Penetration Testing", "Bug Bounty Hunting", "CTF", "VAPT", "Ethical Hacking", "Red Team Operations"],
            mediumUrl: "https://medium.com/@SKaif009",
            linkedinUrl: "https://www.linkedin.com/in/skaif009/",
            tryhackmeUrl: "https://tryhackme.com/p/SKaif009",
            certifications: ["Certified Red Team Analyst", "Certified Ethical Hacker v11"],
            imageUrl: kaifImage
          },
          {
            name: "Het Patel",
            role: "Cybersecurity Researcher", 
            bio: "Cybersecurity Researcher, VAPT Intern, Bug Bounty Hunter, CTF Player. Expert in security research, vulnerability assessment, and developing innovative defense strategies for modern applications and infrastructure.",
            expertise: ["Cybersecurity Research", "VAPT", "Bug Bounty Hunting", "CTF", "Security Analysis", "Threat Intelligence"],
            mediumUrl: "https://medium.com/@hettt",
            linkedinUrl: "https://www.linkedin.com/in/hetpatel9/",
            tryhackmeUrl: "https://tryhackme.com/p/hettt",
            portfolioUrl: "https://hett-patell.onrender.com/",
            certifications: ["Certified Red Team Analyst", "Cybersecurity by Google"],
            imageUrl: hetImage
          }
        ];
        
        setAuthorsData(authors);
      } catch (error) {
        console.error('Error fetching author data:', error);
        // Fallback data without images
        const fallbackAuthors: AuthorData[] = [
          {
            name: "Shah Kaif",
            role: "Cybersecurity Researcher",
            bio: "Cybersecurity Researcher, VAPT Intern, Bug Bounty Hunter, CTF Player. Specialized in vulnerability assessment, penetration testing, and ethical hacking with a passion for discovering and responsibly disclosing security flaws.",
            expertise: ["Penetration Testing", "Bug Bounty Hunting", "CTF", "VAPT", "Ethical Hacking", "Red Team Operations"],
            mediumUrl: "https://medium.com/@SKaif009",
            linkedinUrl: "https://www.linkedin.com/in/skaif009/",
            tryhackmeUrl: "https://tryhackme.com/p/SKaif009",
            certifications: ["Certified Red Team Analyst", "Certified Ethical Hacker v11"]
          },
          {
            name: "Het Patel",
            role: "Cybersecurity Researcher",
            bio: "Cybersecurity Researcher, VAPT Intern, Bug Bounty Hunter, CTF Player. Expert in security research, vulnerability assessment, and developing innovative defense strategies for modern applications and infrastructure.",
            expertise: ["Cybersecurity Research", "VAPT", "Bug Bounty Hunting", "CTF", "Security Analysis", "Threat Intelligence"],
            mediumUrl: "https://medium.com/@hettt",
            linkedinUrl: "https://www.linkedin.com/in/hetpatel9/",
            tryhackmeUrl: "https://tryhackme.com/p/hettt",
            portfolioUrl: "https://hett-patell.onrender.com/",
            certifications: ["Certified Red Team Analyst", "Cybersecurity by Google"]
          }
        ];
        setAuthorsData(fallbackAuthors);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorsData();
  }, []);

  const missionPoints = [
    {
      icon: Shield,
      title: "Security Research",
      description: "Conducting cutting-edge research into emerging cybersecurity threats and vulnerabilities."
    },
    {
      icon: Target,
      title: "Knowledge Sharing",
      description: "Sharing practical insights and real-world experiences through detailed technical articles."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Building a community of security professionals and enthusiasts passionate about cybersecurity."
    },
    {
      icon: Award,
      title: "Industry Impact",
      description: "Contributing to the cybersecurity industry through responsible disclosure and best practices."
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About VulnInsights
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            We are cybersecurity researchers dedicated to advancing the field through vulnerability research, 
            security analysis, and knowledge sharing. Our mission is to make the digital world more secure 
            through education and responsible disclosure.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Mission</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {missionPoints.map((point, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/30 transition-colors" />
                      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-3 group-hover:border-cyan-500/50 transition-colors">
                        <point.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                    {point.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {point.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          {loading ? (
            <div className="grid gap-12 lg:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-pulse">
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                      <div className="w-32 h-32 bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="h-6 bg-slate-700 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/3 mx-auto"></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-20 bg-slate-700 rounded"></div>
                    <div className="h-16 bg-slate-700 rounded"></div>
                    <div className="h-12 bg-slate-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-2">
              {authorsData.map((member, index) => (
                <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/30 transition-colors" />
                        <div className="relative w-42 h-42 rounded-full overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                          {member.imageUrl ? (
                            <img 
                              src={member.imageUrl} 
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ${member.imageUrl ? 'hidden' : 'flex'} items-center justify-center`}
                            style={{ display: member.imageUrl ? 'none' : 'flex' }}
                          >
                            <span className="text-2xl font-bold text-cyan-400">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-cyan-400 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-slate-300 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="outline" 
                            className="border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Certifications</h4>
                      <ul className="space-y-2">
                        {member.certifications.map((cert, certIndex) => (
                          <li key={certIndex} className="text-slate-300 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                          onClick={() => window.open(member.mediumUrl, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          Medium
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                          onClick={() => window.open(member.linkedinUrl, '_blank')}
                        >
                          <Linkedin className="mr-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          LinkedIn
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                          onClick={() => window.open(member.tryhackmeUrl, '_blank')}
                        >
                          <Target className="mr-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          TryHackMe
                        </Button>
                        {member.portfolioUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                            onClick={() => window.open(member.portfolioUrl, '_blank')}
                          >
                            <Github className="mr-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            Portfolio
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* TryHackMe Badges Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            TryHackMe Achievements
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Het's THM Badge */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Het Patel
                </CardTitle>
                <CardDescription className="text-slate-300">
                  TryHackMe Profile & Achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-xs">
                    <iframe
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1265676"
                      style={{
                        border: "none",
                        width: "100%",
                        height: "80px",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                      }}
                      title="Het Patel's TryHackMe Badge"
                      className="rounded-lg"
                      frameBorder="0"
                      scrolling="no"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-300 transition-all duration-300"
                    onClick={() => window.open("https://tryhackme.com/p/hettt", "_blank")}
                  >
                    <Target className="mr-2 h-3 w-3" />
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Kaif's THM Badge */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Shah Kaif
                </CardTitle>
                <CardDescription className="text-slate-300">
                  TryHackMe Profile & Achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-xs">
                    <iframe
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=2704774"
                      style={{
                        border: "none",
                        width: "100%",
                        height: "80px",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                      }}
                      title="Shah Kaif's TryHackMe Badge"
                      className="rounded-lg"
                      frameBorder="0"
                      scrolling="no"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-300 transition-all duration-300"
                    onClick={() =>
                      window.open("https://tryhackme.com/p/SKaif009", "_blank")
                    }
                  >
                    <Target className="mr-2 h-3 w-3" />
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/30 transition-colors" />
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full p-3 group-hover:border-cyan-500/50 transition-colors">
                      <Shield className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                  Responsible Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 leading-relaxed">
                  We believe in ethical vulnerability research and responsible disclosure practices that help improve security for everyone.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-center group hover:border-purple-500/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full group-hover:bg-purple-500/30 transition-colors" />
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full p-3 group-hover:border-purple-500/50 transition-colors">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                  Knowledge Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 leading-relaxed">
                  Sharing knowledge and experiences to help the cybersecurity community grow and learn from real-world scenarios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-center group hover:border-emerald-500/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full group-hover:bg-emerald-500/30 transition-colors" />
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-full p-3 group-hover:border-emerald-500/50 transition-colors">
                      <Award className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg text-white group-hover:text-emerald-500 transition-colors">
                  Continuous Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 leading-relaxed">
                  Staying updated with the latest threats, techniques, and technologies to provide relevant and timely insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>        
        
        {/* Contact/Follow Section */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Follow our research, engage with our content, and join the conversation about cybersecurity
            </p>
          </div>
          <div className="bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-emerald-900/20 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Het's Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Het Patel</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300"
                    onClick={() => window.open('https://medium.com/@hettt', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Medium
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                    onClick={() => window.open('https://www.linkedin.com/in/hetpatel9/', '_blank')}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300"
                    onClick={() => window.open('https://tryhackme.com/p/hettt', '_blank')}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    TryHackMe
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
                    onClick={() => window.open('https://hett-patell.onrender.com/', '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                </div>
              </div>

              {/* Kaif's Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Shah Kaif</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                    onClick={() => window.open('https://medium.com/@SKaif009', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Medium
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                    onClick={() => window.open('https://www.linkedin.com/in/skaif009/', '_blank')}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300"
                    onClick={() => window.open('https://tryhackme.com/p/SKaif009', '_blank')}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    TryHackMe
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
                <p className="text-slate-300 text-sm">
                  Have questions or collaboration ideas? Reach out to us through our social media profiles or portfolios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;