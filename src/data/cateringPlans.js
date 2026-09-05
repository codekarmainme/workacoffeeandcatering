import { Coffee, Crown, Sparkles } from 'lucide-react'

export const CATERING_PLANS = [
  {
    id: 'basic',
    name: 'Essential',
    price: 3500,
    period: '/event',
    description: 'Perfect for small gatherings and intimate events',
    icon: Coffee,
    featured: false,
    features: [
      'Serves up to 25 guests',
      '3 coffee selections',
      'Pastry platter (12 pcs)',
      'Paper cups & napkins',
      '2-hour setup & service',
      'Standard table setup'
    ],
    cta: 'Choose Essential'
  },
  {
    id: 'pro',
    name: 'Premium',
    price: 7500,
    period: '/event',
    description: 'Our most popular package for memorable occasions',
    icon: Crown,
    featured: true,
    features: [
      'Serves up to 60 guests',
      '5 coffee selections',
      'Gourmet pastry & dessert platter',
      'Ceramic cups & elegant service',
      '4-hour full service',
      'Premium table setup & decor',
      'Dedicated barista',
      'Custom coffee menu'
    ],
    cta: 'Choose Premium'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 12500,
    period: '/event',
    description: 'The ultimate catering experience for large events',
    icon: Sparkles,
    featured: false,
    features: [
      'Serves up to 120 guests',
      '7 coffee selections',
      'Full catering menu',
      'Premium tableware & decor',
      '6-hour full service',
      '2 dedicated baristas',
      'Custom coffee & menu design',
      'Mobile espresso bar',
      'Event coordinator'
    ],
    cta: 'Choose Enterprise'
  }
]

export const formatPlanPrice = (price) => '₿r ' + price.toLocaleString('en-US')