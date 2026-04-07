import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MonitorCheck, Award, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hotel Banner"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in transition duration-500">Welcome to HotelEase</h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">Experience ultimate comfort with our smart booking system. Find the perfect room for your perfect stay.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/rooms" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 shadow-lg">Browse Rooms</Link>
            <Link to="/register" className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold transition duration-300 shadow-lg">Join us</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We provide the best services to make your stay memorable and comfortable.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FeatureCard 
            icon={<ShieldCheck className="text-primary-600" size={40} />}
            title="Safe & Secure"
            description="Your privacy and security are our top priority with encrypted booking systems."
          />
          <FeatureCard 
            icon={<MonitorCheck className="text-primary-600" size={40} />}
            title="Instant Confirmation"
            description="No more waiting for calls. Get immediate booking confirmation within seconds."
          />
          <FeatureCard 
            icon={<Award className="text-primary-600" size={40} />}
            title="Best Price"
            description="We guarantee the most competitive rates for high-quality rooms and suites."
          />
          <FeatureCard 
            icon={<Zap className="text-primary-600" size={40} />}
            title="Smart Experience"
            description="Modern amenities and digital tools to enhance every step of your journey."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition duration-300 hover:-translate-y-2 flex flex-col items-center">
    <div className="mb-6 p-4 bg-primary-50 rounded-full">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default Home;
