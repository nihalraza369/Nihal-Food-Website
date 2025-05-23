
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; 
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Send, UtensilsCrossed } from 'lucide-react';

const FoodContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message should be at least 10 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Contact form submitted:", formData);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
        className: 'bg-green-500 text-white border-green-600',
      });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } else {
       toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
    }
  };
  
  const contactInfo = [
    { icon: <Phone size={24} className="text-primary"/>, title: "Call Us", text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: <Mail size={24} className="text-primary"/>, title: "Email Us", text: "support@nihalfood.com", href: "mailto:support@nihalfood.com" },
    { icon: <MapPin size={24} className="text-primary"/>, title: "Our Location", text: "123 Foodie Street, Flavor Town, FT 54321", href: "#" },
  ];

  const InputField = ({ id, name, label, error, type = "text", ...props }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-medium text-sm">{label}</Label>
      {type === "textarea" ? (
        <Textarea id={id} name={name} onChange={handleChange} value={formData[name]} {...props} className={`search-input-food min-h-[120px] ${error ? 'border-destructive focus:border-destructive' : ''}`} />
      ) : (
        <Input id={id} name={name} type={type} onChange={handleChange} value={formData[name]} {...props} className={`search-input-food ${error ? 'border-destructive focus:border-destructive' : ''}`} />
      )}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );

  return (
    <motion.div 
      className="section-padding-food pt-24 md:pt-32"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
    >
      <div className="container-food">
        <div className="text-center mb-12 md:mb-16">
          <UtensilsCrossed size={48} className="mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-6xl font-black gradient-text-food">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hi? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div 
            className="bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-border/50"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-8">Send Us A Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField id="name" name="name" label="Your Name" placeholder="nihal raza" error={errors.name} />
              <InputField id="email" name="email" type="email" label="Your Email" placeholder="nihal.raza@example.com" error={errors.email} />
              <InputField id="subject" name="subject" label="Subject" placeholder="E.g., Feedback, Inquiry" error={errors.subject} />
              <InputField id="message" name="message" label="Your Message" type="textarea" placeholder="Write your message here..." error={errors.message} />
              <Button type="submit" size="lg" className="w-full button-food-primary !text-base">
                <Send size={18} className="mr-2.5" /> Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
            <p className="text-muted-foreground mb-8">
              Reach out to us through any of the following channels. We're always happy to help!
            </p>
            {contactInfo.map((info, index) => (
              <motion.div 
                key={info.title} 
                className="flex items-start gap-5 p-5 bg-card rounded-xl shadow-lg border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex-shrink-0 mt-1">{info.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{info.title}</h3>
                  <a href={info.href} className={`text-muted-foreground hover:text-primary transition-colors ${info.href === "#" ? "cursor-default" : ""}`}>{info.text}</a>
                </div>
              </motion.div>
            ))}
             <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Business Hours:</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 10:00 PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodContactPage;
