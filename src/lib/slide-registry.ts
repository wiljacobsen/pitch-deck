import type { SlideRegistryEntry } from '@/types'

import HeroSlide from '@/components/slides/HeroSlide/HeroSlide'
import ValueChainSlide from '@/components/slides/ValueChainSlide/ValueChainSlide'
import ProductsGridSlide from '@/components/slides/ProductsGridSlide'
import PartnershipOverviewSlide from '@/components/slides/PartnershipOverviewSlide/PartnershipOverviewSlide'
import PartnershipConfiguratorSlide from '@/components/slides/PartnershipConfiguratorSlide/PartnershipConfiguratorSlide'
import WhyWeExistSlide from '@/components/slides/WhyWeExistSlide'
import TextBlockSlide from '@/components/slides/TextBlockSlide'
import StatsBlockSlide from '@/components/slides/StatsBlockSlide'
import LeadershipTeamSlide from '@/components/slides/LeadershipTeamSlide'
import ImageBlockSlide from '@/components/slides/ImageBlockSlide'

export const slideRegistry: Record<string, SlideRegistryEntry> = {
  'hero': {
    component: HeroSlide,
    label: 'Hero / Title Slide',
    category: 'Introduction',
    contentSchema: {
      heading: { type: 'text', label: 'Heading', default: 'Your Integrated HV Infrastructure Partner' },
      subheading: { type: 'text', label: 'Subheading', default: '' },
      clientName: { type: 'text', label: 'Client Name', default: '' },
      logoUrl: { type: 'image-url', label: 'Logo URL', default: '/Symphony_Logo_White.png' },
    },
  },
  'value-chain': {
    component: ValueChainSlide,
    label: 'Value Chain Infographic',
    category: 'Value Chain',
    isCodeConfigured: true,
    contentSchema: {},
  },
  'products-grid': {
    component: ProductsGridSlide,
    label: 'Products Grid',
    category: 'Products',
    contentSchema: {
      title: { type: 'text', label: 'Section Title', default: 'Our Products' },
      subtitle: { type: 'text', label: 'Section Subtitle', default: 'End-to-end connection solutions for every asset class' },
    },
  },
  'partnership-overview': {
    component: PartnershipOverviewSlide,
    label: 'Partnership Overview',
    category: 'Partnerships',
    isCodeConfigured: true,
    contentSchema: {},
  },
  'partnership-configurator': {
    component: PartnershipConfiguratorSlide,
    label: 'Partnership Configurator',
    category: 'Partnerships',
    isCodeConfigured: true,
    contentSchema: {
      title: { type: 'text', label: 'Section Title', default: 'Our partnership product' },
      subtitle: { type: 'text', label: 'Section Subtitle', default: 'Configure your connection infrastructure engagement' },
    },
  },
  'why-we-exist': {
    component: WhyWeExistSlide,
    label: 'Why We Exist',
    category: 'Company',
    contentSchema: {
      title: { type: 'text', label: 'Title', default: 'Why Do We Exist?' },
      subtitle: { type: 'textarea', label: 'Subtitle', default: 'Future project connections hinge on execution capability and capacity. Symphony provides certainty of delivery for our partners.' },
      footerNote: { type: 'text', label: 'Footer Note', default: 'Note: This excludes capacity needed to service regulated transmission substations and switchyards.' },
    },
  },
  'text-block': {
    component: TextBlockSlide,
    label: 'Text Block',
    category: 'Custom',
    contentSchema: {
      heading: { type: 'text', label: 'Heading' },
      body: { type: 'textarea', label: 'Body Text' },
      alignment: { type: 'select', label: 'Alignment', options: ['left', 'center'], default: 'left' },
    },
  },
  'stats-block': {
    component: StatsBlockSlide,
    label: 'Stats Block',
    category: 'Custom',
    contentSchema: {
      heading: { type: 'text', label: 'Heading' },
      stats: {
        type: 'repeater',
        label: 'Statistics',
        fields: {
          icon: { type: 'text', label: 'Icon/Emoji' },
          value: { type: 'text', label: 'Value' },
          label: { type: 'text', label: 'Label' },
        },
      },
    },
  },
  'leadership-team': {
    component: LeadershipTeamSlide,
    label: 'Leadership Team',
    category: 'Team',
    contentSchema: {
      heading: { type: 'text', label: 'Heading', default: 'Leadership Team' },
      members: {
        type: 'repeater',
        label: 'Team Members',
        fields: {
          name: { type: 'text', label: 'Name' },
          title: { type: 'text', label: 'Title' },
          bio: { type: 'textarea', label: 'Bio' },
          photoUrl: { type: 'image-url', label: 'Photo URL' },
        },
      },
    },
  },
  'image-block': {
    component: ImageBlockSlide,
    label: 'Image Block',
    category: 'Custom',
    contentSchema: {
      heading: { type: 'text', label: 'Heading' },
      imageUrl: { type: 'image-url', label: 'Image URL' },
      caption: { type: 'text', label: 'Caption' },
      layout: { type: 'select', label: 'Layout', options: ['full', 'split'], default: 'full' },
    },
  },
}

export function getSlideComponent(componentType: string) {
  return slideRegistry[componentType]?.component
}

export function getSlideRegistryEntries() {
  return Object.entries(slideRegistry).map(([key, entry]) => ({
    componentType: key,
    ...entry,
  }))
}
