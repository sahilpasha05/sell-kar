import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const whatsappClick = () => {
    const message = "Hi! I'm interested in selling my gadget and would like to know more.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Contact <span className="text-[#4169E1]">& Support</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Have questions? Need assistance? Our dedicated support team is here to help you 24/7. 
            Get in touch through your preferred channeel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-in-up">
            <div className="card-premium">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-premium">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-none text-foreground placeholder:text-black"
                    />
                  </div>
                  
                  <div className="form-premium">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-none text-foreground placeholder:text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-premium">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-none text-foreground placeholder:text-black"
                    />
                  </div>
                  
                  <div className="form-premium">
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-none text-foreground placeholder:text-black"
                    />
                  </div>
                </div>

                <div className="form-premium">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border-none text-foreground placeholder:text-black resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#4169E1] text-black hover:bg-[#315bb5] font-semibold">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            {/* Quick Contact Options */}
            <div className="card-premium">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <button 
                  onClick={whatsappClick}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">WhatsApp Chat</div>
                    <div className="text-sm opacity-90">Get instant support</div>
                  </div>
                </button>

                <div className="flex items-center p-4 bg-secondary/50 rounded-xl">
                  <Phone className="w-6 h-6 text-[#4169E1] mr-3" />
                  <div>
                    <div className="font-semibold text-foreground">Call Us</div>
                    <div className="text-[#4169E1]">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-secondary/50 rounded-xl">
                  <Mail className="w-6 h-6 text-[#4169E1] mr-3" />
                  <div>
                    <div className="font-semibold text-foreground">Email Support</div>
                    <div className="text-[#4169E1]">support@sellkar india.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="card-premium">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Business Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#4169E1] mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Headquarters</div>
                    <div className="text-black">
                      Tech Hub, Koramangala<br />
                      Bangalore, Karnataka 560034
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-[#4169E1] mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Business Hours</div>
                    <div className="text-black">
                      Monday - Sunday: 9:00 AM - 9:00 PM<br />
                      Emergency Support: 24/7
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-[#4169E1] mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground">Service Coverage</div>
                    <div className="text-black">
                      25+ Cities across India<br />
                      Free pickup & delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Features */}
            <div className="card-premium">
              <h4 className="text-lg font-semibold text-foreground mb-4">Why Choose Our Support?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-black">
                  <div className="w-2 h-2 bg-[#4169E1] rounded-full mr-3"></div>
                  24/7 Customer Support Available
                </div>
                <div className="flex items-center text-black">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Average Response Time: Under 30 minutes
                </div>
                <div className="flex items-center text-black">
                  <div className="w-2 h-2 bg-[#4169E1] rounded-full mr-3"></div>
                  Multilingual Support (Hindi, English, Tamil)
                </div>
                <div className="flex items-center text-black">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  Dedicated Account Managers for High-Value Sales
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
