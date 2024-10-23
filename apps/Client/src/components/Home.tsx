'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Users, Video, Globe, Zap, Shield, Sparkles } from "lucide-react"

const FeatureCard = ({ icon: Icon, title, description } : { icon: any, title: string, description: string }) => (
  <Card className="bg-gray-800 border-gray-700">
    <CardHeader>
      <Icon className="h-8 w-8 text-indigo-400" />
      <CardTitle className="text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-gray-300">{description}</CardDescription>
    </CardContent>
  </Card>
)

const AnimatedAvatar = ({ delay } : { delay: number }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
  >
    <Avatar className="h-12 w-12 border-2 border-indigo-500">
      <AvatarImage src={`https://api.dicebear.com/6.x/personas/svg?seed=${Math.random()}`} />
      <AvatarFallback>GT</AvatarFallback>
    </Avatar>
  </motion.div>
)

const features = [
  { icon: Globe, title: "Virtual Spaces", description: "Create and customize your own virtual rooms for any occasion." },
  { icon: Users, title: "Social Interaction", description: "Connect with friends and colleagues in immersive environments." },
  { icon: Video, title: "Video Conferencing", description: "High-quality video calls with spatial audio for natural conversations." },
  { icon: Zap, title: "Real-time Collaboration", description: "Work together on documents, whiteboards, and more in real-time." },
  { icon: Shield, title: "Secure Spaces", description: "End-to-end encryption for all your virtual interactions and data." },
  { icon: Sparkles, title: "Custom Avatars", description: "Express yourself with unique, customizable avatars and emotes." }
]

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => (prev + Math.floor(Math.random() * 10)) % 10000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    })
  }, [activeFeature, controls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <span className="text-indigo-400">GatherClone</span>
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience a new dimension of virtual interaction. Create, explore, and connect like never before.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            <Button size="lg" variant="outline" className=" border-white bg-white text-gray-900">Learn More</Button>
          </motion.div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Join Our Growing Community</h2>
          <div className="flex justify-center flex-wrap gap-4">
            {[...Array(15)].map((_, i) => (
              <AnimatedAvatar key={i} delay={i * 0.1} />
            ))}
          </div>
          <p className="text-center mt-4 text-xl">
            <motion.span
              key={userCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {userCount.toLocaleString()}
            </motion.span> users and counting!
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Discover Our Features</h2>
          <Tabs defaultValue="0" className="w-full" onValueChange={(value) => setActiveFeature(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {features.map((feature, index) => (
                <TabsTrigger key={index} value={index.toString()} className="data-[state=active]:bg-indigo-600">
                  <feature.icon className="h-5 w-5" />
                  <span className="sr-only">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {features.map((feature, index) => (
              <TabsContent key={index} value={index.toString()}>
                <motion.div animate={controls}>
                  <FeatureCard {...feature} />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8 text-xl">Join GatherClone today and experience the future of virtual interaction.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input className="bg-gray-800 text-white border-gray-700" placeholder="Enter your email" type="email" />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
          </form>
        </section>
      </main>
    </div>
  )
}