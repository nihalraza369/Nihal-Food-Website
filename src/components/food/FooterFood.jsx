
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, UtensilsCrossed, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FooterFood = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61553495939260", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/dev_nihal_raza/", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/nihalfood", label: "Twitter" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@nihalraza321", label: "Youtube" },
  ];

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Menu", href: "/menu" },
        { name: "Special Offers", href: "/offers" },
        { name: "Track Your Order", href: "/track-order" },
        { name: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "NihalFood",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 section-padding-food !pb-8 !pt-16 mt-16">
      <div className="container-food">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/" className="text-3xl font-black mb-4 inline-flex items-center">
              <UtensilsCrossed size={28} className="mr-2.5 text-primary" />
              <span className="gradient-text-food">NihalFood</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Your favorite dishes, delivered fast and fresh. Experience the taste of NihalFood.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-secondary/50 hover:bg-primary text-primary-foreground transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <p className="font-bold text-lg text-primary mb-5">{section.title}</p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <motion.p 
            className="text-muted-foreground text-sm mb-4 sm:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {currentYear} NihalFood. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full hover:bg-primary/20 text-primary"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFood;
