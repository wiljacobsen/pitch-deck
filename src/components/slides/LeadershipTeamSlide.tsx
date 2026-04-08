'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'

interface TeamMember {
  name: string
  title: string
  bio: string
  photoUrl: string
}

export default function LeadershipTeamSlide({ contentData, dark }: SlideComponentProps) {
  const heading = (contentData.heading as string) || 'Leadership Team'
  const members = (contentData.members as TeamMember[]) || []

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-5xl w-full mx-auto">
        <motion.h2
          className={`text-2xl md:text-4xl font-bold mb-12 text-center tracking-tight transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {heading}
        </motion.h2>
        <div className={`grid gap-6 ${members.length <= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {members.map((member, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border p-6 text-center ${dark ? 'bg-navy-light border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {member.photoUrl && (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              {!member.photoUrl && (
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${dark ? 'bg-accent/20 text-accent-light' : 'bg-accent/10 text-accent'}`}>
                  {member.name.charAt(0)}
                </div>
              )}
              <h3 className={`font-semibold text-lg mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                {member.name}
              </h3>
              <p className={`text-sm mb-3 ${dark ? 'text-accent-light' : 'text-accent'}`}>
                {member.title}
              </p>
              {member.bio && (
                <p className={`text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
