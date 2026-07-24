export const fitnessResourceCards = {
  running: [
    {
      title: 'HIIT Running',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
      description: 'Short intervals of fast running followed by recovery jogs.',
      technique: [
        'Start with a 3-minute warm-up jog.',
        'Alternate 30–60 seconds fast with 60–90 seconds easy.',
        'Keep your posture tall and your arms relaxed.',
        'Finish with 3–5 minutes of easy jogging and stretching.',
      ],
      examples: ['1 minute hard / 2 minutes easy × 6 rounds', '8 rounds of 20 seconds fast / 40 seconds easy'],
      classes: ['Track interval classes', 'Endurance bootcamps'],
    },
    {
      title: 'Tempo Running',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
      description: 'Controlled running at a steady “comfortably hard” pace.',
      technique: [
        'Use a pace where you can speak in short sentences.',
        'Aim for 20–30 minutes of sustained effort.',
        'Stay smooth and relaxed instead of speeding up early.',
      ],
      examples: ['20-minute tempo run at a moderate-hard pace', '3 x 10 minutes at tempo pace with 2-minute recovery'],
      classes: ['Marathon prep clinics', 'Group tempo runs'],
    },
  ],
  strength: [
    {
      title: 'Strength Classes',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
      description: 'Popular class formats that provide structure and accountability.',
      technique: [
        'Start with a coach-led class if you are new to lifting.',
        'Focus on big movement patterns: squat, hinge, push, pull, carry.',
        'Use a rep range that preserves good form and leaves 1–2 reps in reserve.',
      ],
      examples: ['Barbell strength classes', 'BodyPump style classes', 'Small-group circuit training'],
      classes: ['CrossFit box', 'BodyPump class', 'Studio strength circuit'],
    },
    {
      title: 'Bodyweight Strength',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
      description: 'Accessible strength work using your body weight for resistance.',
      technique: [
        'Use push-ups, squats, lunges, rows, and planks.',
        'Build toward 3–4 rounds of 8–12 reps or a timed hold.',
        'Slow down the lowering phase to improve control.',
      ],
      examples: ['Push-ups', 'Split squats', 'Glute bridges', 'Bear crawl holds'],
      classes: ['Pilates classes', 'Mobility and strength meetups'],
    },
  ],
};

export const supplementLocationGuides = {
  'New York, NY': [
    {
      name: 'GNC Chelsea',
      type: 'Protein powders, vitamins, and performance support',
      address: 'Chelsea, New York, NY',
      hours: 'Mon–Sun · 9:00 AM – 8:00 PM',
      website: 'https://www.gnc.com/',
    },
    {
      name: 'Vitamin Shoppe Upper West Side',
      type: 'Supplements, wellness staples, and specialty formulas',
      address: 'Upper West Side, New York, NY',
      hours: 'Mon–Sat · 9:00 AM – 7:00 PM',
      website: 'https://www.vitaminshoppe.com/',
    },
    {
      name: 'Whole Foods Market Chelsea',
      type: 'Whole-food staples, protein options, and wellness pantry items',
      address: 'Chelsea, New York, NY',
      hours: 'Mon–Sun · 8:00 AM – 9:00 PM',
      website: 'https://www.wholefoodsmarket.com/',
    },
  ],
  'Brooklyn, NY': [
    {
      name: 'GNC Park Slope',
      type: 'Protein, vitamins, and recovery products',
      address: 'Park Slope, Brooklyn, NY',
      hours: 'Mon–Sun · 10:00 AM – 7:00 PM',
      website: 'https://www.gnc.com/',
    },
    {
      name: 'Vitamin Shoppe Williamsburg',
      type: 'Plant-based protein, vitamins, and wellness support',
      address: 'Williamsburg, Brooklyn, NY',
      hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
      website: 'https://www.vitaminshoppe.com/',
    },
    {
      name: 'Whole Foods Market Brooklyn Heights',
      type: 'Supplements, clean ingredients, and wellness groceries',
      address: 'Brooklyn Heights, Brooklyn, NY',
      hours: 'Mon–Sun · 8:00 AM – 9:00 PM',
      website: 'https://www.wholefoodsmarket.com/',
    },
  ],
  default: [
    {
      name: 'Local GNC',
      type: 'Performance supplements and vitamin basics',
      address: 'City center',
      hours: 'Mon–Sat · 9:00 AM – 6:00 PM',
      website: 'https://www.gnc.com/',
    },
    {
      name: 'Vitamin Shoppe',
      type: 'Recovery and wellness-focused supplement options',
      address: 'Near your home',
      hours: 'Tue–Sun · 10:00 AM – 6:00 PM',
      website: 'https://www.vitaminshoppe.com/',
    },
  ],
};

export const fitnessLocationGuides = {
  running: {
    'New York, NY': [
      {
        name: 'Chelsea Piers Fitness',
        type: 'HIIT Running and strength classes',
        address: '19th St & 12th Ave, New York, NY',
        hours: 'Mon–Sun · 6:00 AM – 10:00 PM',
        website: 'https://www.chelseapiers.com/',
      },
      {
        name: 'The Bronx Track Club',
        type: 'Tempo and track training',
        address: 'Van Cortlandt Park, Bronx, NY',
        hours: 'Tue & Thu · 6:00 PM – 8:00 PM',
        website: 'https://www.bronxtrackclub.org/',
      },
      {
        name: 'New York Road Runners',
        type: 'Running clubs and coached sessions',
        address: '320 W 57th St, New York, NY',
        hours: 'Mon–Sat · 9:00 AM – 6:00 PM',
        website: 'https://www.nyrr.org/',
      },
    ],
    'Brooklyn, NY': [
      {
        name: 'Prospect Park Running Group',
        type: 'Running and endurance sessions',
        address: 'Prospect Park, Brooklyn, NY',
        hours: 'Sat · 8:00 AM – 10:00 AM',
        website: 'https://www.prospectparkrunning.com/',
      },
      {
        name: 'Brooklyn Track Club',
        type: 'Track training and pacing support',
        address: 'Brooklyn, NY',
        hours: 'Tue & Thu · 6:30 PM – 8:00 PM',
        website: 'https://brooklyntrackclub.com/',
      },
      {
        name: 'Community Running Hub',
        type: 'Group runs and beginner coaching',
        address: 'Brooklyn, NY',
        hours: 'Mon–Fri · 5:30 PM – 7:30 PM',
        website: 'https://www.example.org/',
      },
    ],
    default: [
      {
        name: 'Local community recreation center',
        type: 'Low-cost strength and cardio classes',
        address: 'City center',
        hours: 'Mon–Sat · 8:00 AM – 8:00 PM',
        website: 'https://www.example.org/',
      },
      {
        name: 'Neighborhood running club',
        type: 'Group running and pacing support',
        address: 'Park trail',
        hours: 'Sun · 7:00 AM – 9:00 AM',
        website: 'https://www.example.org/',
      },
    ],
  },
  strength: {
    'New York, NY': [
      {
        name: 'Equinox Chelsea',
        type: 'Strength classes and coaching',
        address: 'West 23rd St, New York, NY',
        hours: 'Mon–Sun · 5:00 AM – 11:00 PM',
        website: 'https://www.equinox.com/',
      },
      {
        name: 'BodyPump Studio',
        type: 'Barbell and resistance classes',
        address: 'Midtown, New York, NY',
        hours: 'Mon–Sat · 6:00 AM – 9:00 PM',
        website: 'https://www.bodypump.com/',
      },
      {
        name: 'CrossFit SoHo',
        type: 'HIIT strength and conditioning',
        address: 'SoHo, New York, NY',
        hours: 'Mon–Fri · 6:00 AM – 8:00 PM',
        website: 'https://www.crossfit.com/',
      },
    ],
    'Brooklyn, NY': [
      {
        name: 'CrossFit Fort Greene',
        type: 'HIIT and strength classes',
        address: 'Fort Greene, Brooklyn, NY',
        hours: 'Mon–Sat · 6:00 AM – 8:00 PM',
        website: 'https://www.crossfit.com/',
      },
      {
        name: 'Brooklyn Community Fitness Studio',
        type: 'Bodyweight and mobility classes',
        address: 'Williamsburg, Brooklyn, NY',
        hours: 'Mon–Sun · 7:00 AM – 7:00 PM',
        website: 'https://www.example.org/',
      },
      {
        name: 'Studio Strength Lab',
        type: 'Small-group strength coaching',
        address: 'Park Slope, Brooklyn, NY',
        hours: 'Tue–Sun · 9:00 AM – 6:00 PM',
        website: 'https://www.example.org/',
      },
    ],
    default: [
      {
        name: 'Local community recreation center',
        type: 'Low-cost strength and cardio classes',
        address: 'City center',
        hours: 'Mon–Sat · 8:00 AM – 8:00 PM',
        website: 'https://www.example.org/',
      },
      {
        name: 'Studio yoga + strength blend',
        type: 'Accessible movement classes',
        address: 'Near your home',
        hours: 'Mon–Fri · 6:00 PM – 8:00 PM',
        website: 'https://www.example.org/',
      },
    ],
  },
};
