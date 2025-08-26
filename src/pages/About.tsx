import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, Award, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

function About() {
  const teamMembers = [
    {
      name: "Het Patel",
      role: "Security Researcher & Penetration Tester",
      bio: "Specialized in advanced penetration testing, ethical hacking, and vulnerability assessment. Passionate about discovering and responsibly disclosing security flaws in modern applications and infrastructure.",
      expertise: ["Penetration Testing", "Web Security", "Network Security", "Ethical Hacking", "OWASP"],
      mediumUrl: "https://medium.com/@hettt",
      achievements: [
        "Certified Ethical Hacker (CEH)",
        "OSCP Certified",
        "Bug Bounty Hunter",
        "Security Conference Speaker"
      ]
    },
    {
      name: "Kaif",
      role: "Cybersecurity Analyst & Threat Researcher",
      bio: "Expert in threat intelligence, incident response, and zero-day vulnerability research. Focuses on emerging threats and developing innovative defense strategies for enterprise environments.",
      expertise: ["Threat Intelligence", "Incident Response", "Malware Analysis", "SOC Operations", "Zero-Day Research"],
      mediumUrl: "https://medium.com/@SKaif009",
      achievements: [
        "GCIH Certified",
        "Threat Hunter",
        "Malware Researcher",
        "CTF Champion"
      ]
    }
  ];

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
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
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
          <div className="grid gap-12 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/30 transition-colors" />
                      <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                        <span className="text-2xl font-bold text-cyan-400">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
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

                  {/* Achievements */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Achievements</h4>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-slate-300 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                      onClick={() => window.open(member.mediumUrl, '_blank')}
                    >
                      Follow on Medium
                      <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-white mb-4">Our Values</CardTitle>
              <CardDescription className="text-slate-300 text-lg max-w-3xl mx-auto">
                The principles that guide our research and content creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Responsible Disclosure</h3>
                  <p className="text-slate-300">
                    We believe in ethical vulnerability research and responsible disclosure practices that help improve security for everyone.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Knowledge Sharing</h3>
                  <p className="text-slate-300">
                    Sharing knowledge and experiences to help the cybersecurity community grow and learn from real-world scenarios.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Continuous Learning</h3>
                  <p className="text-slate-300">
                    Staying updated with the latest threats, techniques, and technologies to provide relevant and timely insights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact/Follow Section */}
        <div className="text-center">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white mb-4">Connect With Us</CardTitle>
              <CardDescription className="text-slate-300">
                Follow our research, engage with our content, and join the conversation about cybersecurity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => window.open('https://medium.com/@hettt', '_blank')}
                >
                  Follow Het on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => window.open('https://medium.com/@SKaif009', '_blank')}
                >
                  Follow Kaif on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-slate-400 text-sm">
                Have questions or collaboration ideas? Reach out to us through our Medium profiles or social media.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;