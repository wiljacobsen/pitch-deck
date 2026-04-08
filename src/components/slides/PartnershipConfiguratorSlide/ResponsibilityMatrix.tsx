'use client'

import { motion } from 'motion/react'
import { TECH_MATRIX, RESPONSIBILITY_ROW_LABELS, RESPONSIBILITY_OWNER_LABELS } from './matrixData'
import { INFRA_ICONS } from './InfrastructureIcons'
import type { Technology, ModelId, ResponsibilityOwner, ResponsibilityRow } from './types'

const ROWS: ResponsibilityRow[] = ['investOwn', 'designBuild', 'operateMaintain']

// ── Cell color system ────────────────────────────────────────────

function getCellStyle(owner: ResponsibilityOwner, dark: boolean) {
  switch (owner) {
    case 'symphony':
      return {
        bg: dark ? '#0C447C' : '#E6F1FB',
        text: dark ? '#E6F1FB' : '#0C447C',
        border: '#185FA5',
      }
    case 'customerOrSymphony':
      return {
        bg: dark ? '#412402' : '#FAEEDA',
        text: dark ? '#FAEEDA' : '#412402',
        border: '#854F0B',
      }
    case 'client':
      return {
        bg: dark ? '#2C2C2A' : '#F1EFE8',
        text: dark ? '#B4B2A9' : '#5F5E5A',
        border: dark ? '#3a3a37' : '#d4d2c9',
      }
    case 'tnsp':
      return {
        bg: dark ? '#1a1a2e' : '#eef0f4',
        text: dark ? '#8890a4' : '#4a5068',
        border: dark ? '#2a2a40' : '#c8ccd6',
      }
    case 'fluence':
      return {
        bg: dark ? '#1a2c1a' : '#eef4ee',
        text: dark ? '#88b488' : '#3a6a3a',
        border: dark ? '#2a3c2a' : '#c0d8c0',
      }
    default: // none
      return {
        bg: dark ? '#1a1a1a' : '#f5f5f5',
        text: dark ? '#555' : '#999',
        border: dark ? '#2a2a2a' : '#e0e0e0',
      }
  }
}

// ── Main Component ───────────────────────────────────────────────

interface ResponsibilityMatrixProps {
  technology: Technology
  modelId: ModelId
  projectSizeMW: number | null
  dark: boolean
}

export function ResponsibilityMatrix({ technology, modelId, projectSizeMW, dark }: ResponsibilityMatrixProps) {
  const matrix = TECH_MATRIX[technology]
  if (!matrix) return null

  return (
    <div>
      {/* Section title */}
      <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-4 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
        Responsibility matrix
      </p>

      {/* Scrollable wrapper for mobile */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full border-collapse min-w-[600px]">
          {/* Column headers with icons */}
          <thead>
            {/* Icon row */}
            <tr>
              <th className="w-[120px]" />
              {matrix.columns.map((col) => {
                const Icon = INFRA_ICONS[col.iconId]
                return (
                  <th key={col.id} className="text-center px-1 pb-2">
                    {Icon && (
                      <div className="flex justify-center mb-1.5">
                        <Icon className={`w-8 h-8 ${dark ? 'text-white/40' : 'text-gray-400'}`} />
                      </div>
                    )}
                    <span className={`text-[9px] md:text-[10px] font-semibold leading-tight block ${dark ? 'text-white/70' : 'text-gray-600'}`}>
                      {col.label}
                      {col.labelSuffix === 'mw' && projectSizeMW && (
                        <span className={`block text-[8px] font-normal mt-0.5 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
                          ({projectSizeMW} MW)
                        </span>
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {ROWS.map((rowId, rowIdx) => (
              <tr key={rowId}>
                {/* Row header */}
                <td className={`py-2 pr-3 text-[10px] md:text-[11px] font-semibold whitespace-nowrap ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                  {RESPONSIBILITY_ROW_LABELS[rowId]}
                </td>

                {/* Data cells */}
                {matrix.columns.map((col, colIdx) => {
                  const owner = matrix.responsibilities[col.id]?.[rowId]?.[modelId] ?? 'none'
                  const style = getCellStyle(owner, dark)
                  const label = RESPONSIBILITY_OWNER_LABELS[owner]

                  return (
                    <td key={col.id} className="p-0.5">
                      <motion.div
                        animate={{
                          backgroundColor: style.bg,
                          borderColor: style.border,
                        }}
                        transition={{ duration: 0.25, delay: (rowIdx * matrix.columns.length + colIdx) * 0.03 }}
                        className="rounded-md border px-2 py-2.5 text-center min-h-[40px] flex items-center justify-center"
                      >
                        <span
                          className="text-[9px] md:text-[10px] font-medium leading-tight"
                          style={{ color: style.text }}
                        >
                          {label}
                        </span>
                      </motion.div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upsell callout */}
      {matrix.upsellItems && matrix.upsellItems.length > 0 && (
        <div className={`mt-4 rounded-lg border px-4 py-3 ${
          dark ? 'bg-accent/5 border-accent/15' : 'bg-accent/5 border-accent/10'
        }`}>
          <p className={`text-[10px] font-semibold mb-1 ${dark ? 'text-accent/70' : 'text-accent/80'}`}>
            We can also provide
          </p>
          <p className={`text-[11px] ${dark ? 'text-white/50' : 'text-gray-500'}`}>
            {matrix.upsellItems.join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}
