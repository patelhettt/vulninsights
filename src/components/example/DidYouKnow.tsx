import { TextRotate } from "./TextRotate";

const didYouKnowTips = [
  "Did you know? VulnInsights aggregates real-time cybersecurity research from leading security experts through Medium RSS feeds.",
  "Did you know? The platform features advanced content filtering and search capabilities to help you discover relevant security insights.",
  "Did you know? Zero-day vulnerabilities are security flaws that are unknown to the vendor and have no available patch.",
  "Did you know? Penetration testing is a simulated cyber attack to identify security vulnerabilities in systems and networks.",
  "Did you know? OWASP Top 10 is a standard awareness document for developers and web application security.",
  "Did you know? Social engineering attacks rely on human interaction and often involve tricking people into breaking security procedures.",
  "Did you know? Multi-factor authentication (MFA) adds an extra layer of security beyond just passwords.",
  "Did you know? Encryption converts readable data into an unreadable format to protect sensitive information.",
  "Did you know? A firewall acts as a barrier between a trusted network and untrusted networks.",
  "Did you know? Incident response is the systematic approach to handling security breaches and cyber attacks.",
  "Did you know? Threat intelligence involves collecting and analyzing information about potential security threats.",
  "Did you know? Vulnerability assessment is the process of identifying, quantifying, and prioritizing security vulnerabilities.",
  "Did you know? Security operations centers (SOCs) monitor and analyze security events in real-time.",
  "Did you know? Bug bounty programs reward security researchers for finding and reporting vulnerabilities.",
  "Did you know? Responsible disclosure ensures vulnerabilities are reported to vendors before public disclosure.",
  "Did you know? Security researchers often use specialized tools like Wireshark, Metasploit, and Burp Suite.",
  "Did you know? The cybersecurity industry faces a significant skills gap with high demand for qualified professionals.",
  "Did you know? Regular security audits help organizations identify and address potential security weaknesses.",
  "Did you know? Security awareness training is crucial for preventing social engineering attacks.",
  "Did you know? The principle of least privilege limits user access to only what's necessary for their role.",
  "Did you know? Security by design integrates security measures into the development process from the start.",
  "Did you know? Continuous monitoring helps detect security threats and vulnerabilities in real-time.",
  "Did you know? Security frameworks like NIST and ISO 27001 provide guidelines for cybersecurity best practices.",
  "Did you know? The cybersecurity landscape is constantly evolving with new threats and attack vectors emerging daily.",
].sort(() => Math.random() - 0.5);

export function DidYouKnow() {
  return (
    <div className="w-full flex justify-center">
      <TextRotate
        texts={didYouKnowTips}
        rotationInterval={7000}
        staggerFrom="first"
        staggerDuration={0.01}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        splitBy="words"
        mainClassName="text-[#333333] text-sm text-center w-full"
        splitLevelClassName="justify-center"
        elementLevelClassName="text-center"
      />
    </div>
  );
}
