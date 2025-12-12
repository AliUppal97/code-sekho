"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play, Users, BookOpen, Trophy, Code2 } from "lucide-react";
import { Button } from "@/components/ui";

const stats = [
  { icon: Users, value: "50,000+", label: "Active Students" },
  { icon: BookOpen, value: "200+", label: "Courses" },
  { icon: Trophy, value: "95%", label: "Success Rate" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Animated background elements with parallax depth */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="circle-decoration floating-element w-96 h-96 bg-primary-500 top-20 -left-48"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="circle-decoration floating-element w-80 h-80 bg-accent-500 bottom-20 -right-40"
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />
        <motion.div
          className="circle-decoration floating-element w-64 h-64 bg-primary-400 top-1/2 left-1/3"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.1,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container-wide relative z-10 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              Welcome to CodeSekho
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-display-md font-bold text-white mb-6 leading-tight"
            >
              Take Your First Step{" "}
              <span className="text-accent-400">Towards</span> Your Professional
              Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Master in-demand programming skills with industry experts. 
              Get comprehensive interview preparation and land your dream tech job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto px-8"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                asChild
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 border-white/30 text-white hover:bg-white/10"
                leftIcon={<Play className="h-5 w-5" />}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="text-center lg:text-left"
                  >
                    <Icon className="h-6 w-6 text-accent-400 mx-auto lg:mx-0 mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main illustration card - Base layer */}
            <div className="relative z-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative bg-gradient-to-br from-dark-800/95 via-dark-700/90 to-dark-800/95 backdrop-blur-3xl rounded-3xl p-8 border border-primary-400/50 shadow-2xl overflow-hidden"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(11, 149, 134, 0.3), inset 0 1px 0 rgba(38, 190, 175, 0.4), 0 0 40px rgba(11, 149, 134, 0.15)",
                }}
              >
                {/* Premium futuristic overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-cyan-500/8 rounded-3xl pointer-events-none" />
                {/* Subtle grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03] rounded-3xl pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(11, 149, 134, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(11, 149, 134, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Enhanced Glow effect + floating accents */}
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                  {/* Main background glow with subtle animation - Premium futuristic */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/25 via-primary-400/15 to-cyan-500/20 blur-2xl"
                    animate={{
                      opacity: [0.5, 0.7, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Additional premium neon glow layer */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/20 via-cyan-400/12 to-primary-300/18 blur-3xl" />
                  {/* Subtle edge glow for premium feel */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-400/5 to-transparent rounded-3xl" />
                  {/* Primary floating orb - top left */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      x: [0, 8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    className="floating-element absolute -top-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br from-primary-400/30 to-primary-500/25 blur-3xl"
                  />

                  {/* Secondary floating orb - bottom right */}
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      x: [0, -10, 0],
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2,
                    }}
                    className="floating-element absolute -bottom-20 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-primary-400/30 to-primary-500/25 blur-3xl"
                  />

                  {/* Floating particles with neon glow */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      x: [0, 2, 0],
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                    className="absolute top-7 right-9 w-4 h-4 rounded-full bg-cyan-400 shadow-xl shadow-cyan-400/60 ring-1.5 ring-cyan-300/50"
                    style={{
                      boxShadow: "0 0 12px rgba(34, 211, 238, 0.6), 0 0 24px rgba(34, 211, 238, 0.3)",
                    }}
                  />

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      x: [0, -3, 0],
                      opacity: [0.6, 0.9, 0.6],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    className="absolute bottom-11 left-11 w-3 h-3 rounded-full bg-primary-300 shadow-xl shadow-primary-300/60 ring-1.5 ring-primary-200/50"
                    style={{
                      boxShadow: "0 0 10px rgba(11, 149, 134, 0.5), 0 0 20px rgba(11, 149, 134, 0.3)",
                    }}
                  />
                  
                  {/* Additional subtle particle */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.2,
                    }}
                    className="absolute top-16 left-8 w-2 h-2 rounded-full bg-primary-400 shadow-lg shadow-primary-400/60"
                    style={{
                      boxShadow: "0 0 8px rgba(11, 149, 134, 0.6)",
                    }}
                  />
                </div>

                <div className="space-y-5 relative z-10">
                  {/* Code snippet preview - Clean design */}
                  <div className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 backdrop-blur-xl rounded-2xl p-5 border border-dashed border-primary-400 shadow-2xl overflow-hidden">
                    {/* Multi-color glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/25 via-cyan-500/15 to-primary-500/20 rounded-2xl blur-xl" />
                    
                    {/* Code editor header */}
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-primary-400/40 relative">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-md shadow-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-md shadow-amber-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-md shadow-primary-500/60" />
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-primary-400/50 via-cyan-400/30 to-transparent" />
                      <span className="text-cyan-300 text-[10px] font-semibold tracking-widest uppercase">index.js</span>
                    </div>
                    
                    {/* Code content */}
                    <div className="space-y-2.5 text-cyan-100 leading-relaxed font-mono text-[13px] relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                        className="flex items-center gap-1.5"
                      >
                        <span className="text-purple-400 font-semibold drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]">const</span>
                        <span className="text-cyan-300 font-medium">career</span>
                        <span className="text-cyan-200">=</span>
                        <span className="text-accent-400 font-medium drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]">&apos;successful&apos;</span>
                        <span className="text-cyan-200/80">;</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                        className="flex items-center gap-1.5"
                      >
                        <span className="text-purple-400 font-semibold drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]">const</span>
                        <span className="text-cyan-300 font-medium">skills</span>
                        <span className="text-cyan-200">=</span>
                        <span className="text-accent-400 font-medium drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]">[&apos;React&apos;, &apos;Node&apos;, &apos;Python&apos;]</span>
                        <span className="text-cyan-200/80">;</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        className="flex items-center gap-1.5"
                      >
                        <span className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]">CodeSekho</span>
                        <span className="text-cyan-200">.</span>
                        <span className="text-accent-400 font-semibold drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]">learn</span>
                        <span className="text-cyan-200">(</span>
                        <span className="text-cyan-300 font-medium">skills</span>
                        <span className="text-cyan-200">)</span>
                        <span className="text-cyan-200/80">;</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress indicator - Clean card design */}
                  <div className="relative bg-gradient-to-br from-dark-800/90 via-dark-700/85 to-dark-800/90 backdrop-blur-md rounded-2xl p-5 border border-dashed border-primary-400/40 shadow-xl overflow-hidden">
                    {/* Multi-color glow background matching main theme */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/12 to-primary-500/20 rounded-2xl" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 rounded-full bg-primary-400 shadow-md shadow-primary-400/70"
                          />
                          <span className="text-cyan-100 font-bold text-xs tracking-wider uppercase">Course Progress</span>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-primary-300 font-black text-xl leading-none">78</span>
                          <span className="text-primary-300 font-bold text-sm leading-none">%</span>
                        </div>
                      </div>
                      <div className="relative h-2.5 bg-primary-800/70 rounded-full overflow-hidden border border-primary-700/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ delay: 1.3, duration: 1.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 rounded-full relative overflow-hidden"
                          style={{
                            boxShadow: "0 0 12px rgba(11, 149, 134, 0.7), inset 0 1px 0 rgba(77, 202, 191, 0.5)",
                          }}
                        >
                          {/* Subtle shimmer */}
                          <motion.div
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100/50 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Student enrollment - Clean card design with color variety */}
                  <div className="relative bg-gradient-to-br from-dark-800/90 via-dark-700/85 to-dark-800/90 backdrop-blur-md rounded-2xl p-5 border border-dashed border-primary-400/40 shadow-xl overflow-hidden">
                    {/* Consistent glow background matching main theme */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/12 to-primary-500/20 rounded-2xl" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4, 5].map((i) => {
                            // Primary color variants for variety
                            const colorVariants = [
                              "from-primary-400 via-primary-500 to-primary-600",
                              "from-primary-300 via-primary-400 to-primary-500",
                              "from-primary-500 via-primary-600 to-primary-700",
                              "from-primary-200 via-primary-300 to-primary-400",
                              "from-primary-400 via-primary-500 to-primary-600",
                            ];
                            const borderColors = [
                              "border-primary-300",
                              "border-primary-200",
                              "border-primary-400",
                              "border-primary-100",
                              "border-primary-300",
                            ];
                            const statusColors = [
                              "bg-primary-300",
                              "bg-primary-200",
                              "bg-primary-400",
                              "bg-primary-100",
                              "bg-primary-300",
                            ];
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 1.4 + i * 0.1, duration: 0.4, type: "spring" }}
                                className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${colorVariants[i - 1]} border-2 ${borderColors[i - 1]} shadow-lg flex items-center justify-center text-cyan-50 text-[10px] font-black backdrop-blur-sm hover:scale-110 hover:z-10 transition-all duration-300 cursor-pointer group`}
                                style={{
                                  boxShadow: "0 2px 8px rgba(11, 149, 134, 0.4), inset 0 1px 0 rgba(38, 190, 175, 0.35)",
                                }}
                              >
                                <span className="relative z-10">{String.fromCharCode(65 + i - 1)}</span>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${statusColors[i - 1]} rounded-full border border-primary-200 shadow-md`} />
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-cyan-200 text-[10px] font-semibold uppercase tracking-wide">Students</span>
                        <span className="text-primary-300 font-bold text-sm">+2.5K enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Cards - Optimized positioning for clean UI/UX */}
            
            {/* Floating Book Card - Outside Top Left (Clean Position) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20, y: -20, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.7, type: "spring", stiffness: 120 }}
              className="absolute -top-3 -left-3 z-50"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -3, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="floating-element relative w-14 h-14 bg-gradient-to-br from-primary-500/95 via-primary-600/95 to-primary-700/95 rounded-xl flex items-center justify-center shadow-xl border border-primary-400/50 backdrop-blur-xl group cursor-pointer hover:scale-110 transition-all duration-300"
                style={{
                  boxShadow: "0 8px 24px rgba(11, 149, 134, 0.3), 0 0 0 1px rgba(38, 190, 175, 0.2), inset 0 1px 0 rgba(38, 190, 175, 0.3), 0 0 16px rgba(11, 149, 134, 0.15)",
                }}
              >
                {/* Subtle neon glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400/30 via-cyan-400/20 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 via-primary-400/12 to-transparent rounded-xl" />
                <BookOpen className="h-7 w-7 text-cyan-50 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                {/* Subtle pulse indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400/50 ring-0.5 ring-primary-300/40" />
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>

            {/* Floating Trophy Card - Outside Bottom Right (Clean Position) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: 20, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.7, type: "spring", stiffness: 120 }}
              className="absolute -bottom-3 -right-3 z-50"
            >
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, 3, 0],
                  scale: [1, 0.98, 1],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="floating-element relative w-14 h-14 bg-gradient-to-br from-primary-500/95 via-primary-600/95 to-primary-700/95 rounded-xl flex items-center justify-center shadow-xl border border-primary-400/50 backdrop-blur-xl group cursor-pointer hover:scale-110 transition-all duration-300"
                style={{
                  boxShadow: "0 8px 24px rgba(11, 149, 134, 0.3), 0 0 0 1px rgba(38, 190, 175, 0.2), inset 0 1px 0 rgba(38, 190, 175, 0.3), 0 0 16px rgba(11, 149, 134, 0.15)",
                }}
              >
                {/* Subtle neon glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400/30 via-cyan-400/20 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 via-primary-400/12 to-transparent rounded-xl" />
                <Trophy className="h-7 w-7 text-cyan-50 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                {/* Subtle pulse indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400/50 ring-0.5 ring-primary-300/40" />
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>

            {/* Floating Code Card - Outside Top Right (Clean Position) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -20, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ delay: 1.1, duration: 0.7, type: "spring", stiffness: 120 }}
              className="absolute -top-3 -right-3 z-50"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -2, 0],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="floating-element relative w-12 h-12 bg-gradient-to-br from-primary-500/95 via-primary-600/95 to-primary-700/95 rounded-xl flex items-center justify-center shadow-xl border border-primary-400/50 backdrop-blur-xl group cursor-pointer hover:scale-110 transition-all duration-300"
                style={{
                  boxShadow: "0 8px 24px rgba(11, 149, 134, 0.3), 0 0 0 1px rgba(38, 190, 175, 0.2), inset 0 1px 0 rgba(38, 190, 175, 0.3), 0 0 16px rgba(11, 149, 134, 0.15)",
                }}
              >
                {/* Subtle neon glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400/30 via-cyan-400/20 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 via-primary-400/12 to-transparent rounded-xl" />
                <Code2 className="h-6 w-6 text-cyan-50 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                {/* Subtle pulse indicator */}
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400/50 ring-0.5 ring-primary-300/40" />
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F8F9FA"
          />
        </svg>
      </div>
    </section>
  );
}

