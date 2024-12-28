'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { RotatingGoals } from '@/components/RotatingGoals'
import { useState } from 'react'
import { getReferrerInfo } from '@/lib/utils'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const referrer = getReferrerInfo();
      
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          referrer 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const emailForm = (
    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-10"
          required
          disabled={isLoading}
          aria-label="Email address"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      <Button 
        type="submit"
        size="lg"
        disabled={isLoading}
        className="bg-[#86d5b7] hover:bg-[#76c5a7] text-pierce-dark whitespace-nowrap"
      >
        {isLoading ? 'Submitting...' : 'Join the early access list'}
      </Button>
    </form>
  );

  const successMessage = (
    <div className="text-center p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Thank you for signing up!
      </h3>
      <p className="text-green-700">
        We'll notify you when early access becomes available.
      </p>
    </div>
  );

  const centeredEmailForm = (
    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-10 w-full"
          required
          disabled={isLoading}
          aria-label="Email address"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      <Button 
        type="submit"
        size="lg"
        disabled={isLoading}
        className="bg-[#86d5b7] hover:bg-[#76c5a7] text-pierce-dark whitespace-nowrap"
      >
        {isLoading ? 'Submitting...' : 'Join the early access list'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center min-h-[calc(100vh-96px)]">
            <motion.div 
              className="flex flex-col gap-4"
              {...fadeIn}
            >
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Pierce Logo"
                  width={150}
                  height={150}
                  priority
                />
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Achieve your goals with Pierce: Your AI-Powered companion
              </h1>
              <p className="text-xl text-muted-foreground">
                Turn dreams into reality with personalised guidance and support
              </p>
              {isSubmitted ? successMessage : emailForm}
            </motion.div>
            <motion.div 
              className="relative aspect-[3/4] w-[90%] mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/hero-image.jpg"
                alt="Confident young adult achieving goals"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Struggling to <RotatingGoals />?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Many young adults face common challenges when pursuing their dreams. Here's what we help you overcome:
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: 'motivation', title: 'Lack of motivation', description: 'Stay driven with AI-powered encouragement' },
              { icon: 'procrastination', title: 'Procrastination', description: 'Turn intention into action with timely nudges' },
              { icon: 'direction', title: 'Unclear direction', description: 'Get clarity with structured goal planning' },
              { icon: 'anxiety', title: 'Goal-setting anxiety', description: 'Build confidence with expert guidance' },
            ].map((item) => (
              <motion.div 
                key={item.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {Icons[item.icon as keyof typeof Icons]({ className: "w-12 h-12 mb-4 text-[#86d5b7]" })}
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Pierce: Your personal AI goal assistant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI, Pierce helps you break down your goals into actionable steps, and motivates you to stay on track.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: 'target',
                    title: 'Plan your goals with clarity and precision',
                    description: 'Get a clear roadmap to achieve your ambitions'
                  },
                  {
                    icon: 'steps',
                    title: 'Break down your goals into daily actions',
                    description: 'Transform big dreams into manageable daily tasks'
                  },
                  {
                    icon: 'sparkles',
                    title: 'Stay motivated with daily check-ins',
                    description: 'Build momentum with personalized encouragement'
                  },
                  {
                    icon: 'book',
                    title: 'Access curated resources and guides',
                    description: 'Learn from expert-crafted content tailored to your goals'
                  },
                  {
                    icon: 'users',
                    title: 'Have instant access to an accountability buddy',
                    description: 'Never feel alone on your journey to success'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#86d5b7]/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-[#86d5b7]/20 flex items-center justify-center">
                      {Icons[feature.icon as keyof typeof Icons]({ 
                        className: "h-6 w-6 text-[#86d5b7]" 
                      })}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="relative w-full h-auto"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/app-mockup.gif"
                  alt="Person using Pierce AI assistant"
                  width={309}
                  height={625}
                  className="object-contain rounded-lg mx-auto"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-[#86d5b7]/30">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            {...fadeIn}
          >
            {/* Add the goal types image */}
            <motion.div 
              className="mb-2 relative h-[60px] w-full max-w-[300px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/goal-types.png"
                alt="Different types of goals Pierce can help you achieve"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to achieve your next goal?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the waitlist for early access. We'll be in touch when we launch.
            </p>
            {isSubmitted ? successMessage : centeredEmailForm}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Pierce Logo"
                width={80}
                height={80}
              />
            </div>
            <p className="text-muted-foreground text-center">
              Your AI companion for achieving goals
            </p>
            <div className="flex gap-6">
              {/* Add social media links here */}
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pierce. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 