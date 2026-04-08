'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'
import { TEAM_MEMBERS, type TeamMember } from './data'

function MemberCard({ member, index, dark }: { member: TeamMember; index: number; dark: boolean }) {
  return (
    <motion.div
      className={`
        rounded-2xl border p-6 flex flex-col items-center text-center
        ${dark
          ? 'bg-navy-light border-white/10'
          : 'bg-white border-gray-200 shadow-sm'
        }
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Photo */}
      <div className="mb-4">
        <img
          src={member.photoPath}
          alt={member.name}
          className={`
            w-20 h-20 rounded-full object-cover ring-2
            ${dark ? 'ring-white/10' : 'ring-gray-100'}
          `}
        />
      </div>

      {/* Name & Role */}
      <h3 className={`font-bold text-base leading-tight mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>
        {member.name}
      </h3>
      <p className={`text-sm font-semibold mb-3 ${dark ? 'text-sym-blue-light' : 'text-sym-blue'}`}>
        {member.role}
      </p>

      {/* Company logos */}
      {member.logos.length > 0 && (
        <div className="flex items-center justify-center gap-3 mb-4">
          {member.logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-5 w-auto object-contain"
            />
          ))}
        </div>
      )}

      {/* Bullet points */}
      <ul className={`text-left w-full space-y-1.5 text-xs leading-relaxed list-disc pl-4 ${dark ? 'text-white/60' : 'text-gray-500'}`}>
        {member.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ExecLeadershipSlide({ dark }: SlideComponentProps) {
  const topRow = TEAM_MEMBERS.slice(0, 3)
  const bottomRow = TEAM_MEMBERS.slice(3)

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight max-w-3xl transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Symphony is led by an experienced cross industry leadership team
          </motion.h2>
          <motion.img
            src="/Symphony_Logo_White.png"
            alt="Symphony"
            className={`h-8 md:h-10 shrink-0 ml-6 ${dark ? '' : 'invert'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {topRow.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} dark={dark} />
          ))}
        </div>

        {/* Bottom row — 2 cards, centered */}
        <div className="flex flex-col md:flex-row gap-5 justify-center">
          {bottomRow.map((member, i) => (
            <div key={member.name} className="md:w-[calc((100%-2.5rem)/3)]">
              <MemberCard member={member} index={i + 3} dark={dark} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
