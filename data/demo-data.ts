// Seeded demo data for the dashboard — makes the app feel like a real running business

export interface DemoInquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingAddress: string;
  listingCity: string;
  listingPrice: number;
  listingType: string;
  agentName: string;
  agentPhoto: string;
  agentPhone: string;
  agentEmail: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'contacted' | 'viewing-scheduled' | 'closed';
  statusLabel: string;
  createdAt: string;
  lastUpdate: string;
  response?: string;
}

export interface DemoViewing {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingAddress: string;
  listingCity: string;
  listingPrice: number;
  agentName: string;
  agentPhoto: string;
  agentPhone: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  feedback?: string;
}

export const demoInquiries: DemoInquiry[] = [
  {
    id: 'inq-demo-001',
    listingId: 'lst-001',
    listingTitle: 'Pinnacle Penthouse — King West',
    listingImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    listingAddress: '88 Blue Jays Way, PH-32',
    listingCity: 'Toronto',
    listingPrice: 4200000,
    listingType: 'sale',
    agentName: 'Alexandra Whitmore',
    agentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0101',
    agentEmail: 'alexandra@propvault.ca',
    inquiryType: 'viewing',
    message: "I'm very interested in this penthouse. The views and the layout look incredible. I'd love to schedule a private viewing at your earliest convenience. We're pre-approved up to $4.5M.",
    status: 'viewing-scheduled',
    statusLabel: 'Viewing Scheduled',
    createdAt: '2024-04-18T10:30:00Z',
    lastUpdate: '2024-04-19T09:15:00Z',
    response: "Hi! Great to hear from you. I'd love to show you this stunning penthouse. I've scheduled you for Saturday April 27 at 2:00 PM. Please bring your pre-approval letter. Looking forward to meeting you! — Alexandra",
  },
  {
    id: 'inq-demo-002',
    listingId: 'lst-012',
    listingTitle: 'Georgian Estate — Old Oakville',
    listingImage: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=400&h=300&fit=crop',
    listingAddress: '312 Reynolds Street',
    listingCity: 'Oakville',
    listingPrice: 5200000,
    listingType: 'sale',
    agentName: 'Sophia Delacroix',
    agentPhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    agentPhone: '(905) 555-0103',
    agentEmail: 'sophia@propvault.ca',
    inquiryType: 'info',
    message: "I saw this property and it's exactly what we've been looking for. Could you tell me more about the school district, property taxes, and whether there's been any recent renovations to the kitchen or primary suite?",
    status: 'contacted',
    statusLabel: 'Agent Contacted',
    createdAt: '2024-04-15T14:20:00Z',
    lastUpdate: '2024-04-16T11:00:00Z',
    response: "Thank you for your interest! The property sits in the top-rated Oakville school district. Annual property taxes are approximately $28,400. The chef's kitchen was fully renovated in 2022 with La Cornue range, and the primary ensuite was updated in 2023. Happy to share the renovation records. — Sophia",
  },
  {
    id: 'inq-demo-003',
    listingId: 'lst-009',
    listingTitle: 'Executive Apartment — Midtown',
    listingImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    listingAddress: '1 Bloor Street East, Unit 3605',
    listingCity: 'Toronto',
    listingPrice: 4800,
    listingType: 'rent',
    agentName: 'Priya Sharma',
    agentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0105',
    agentEmail: 'priya@propvault.ca',
    inquiryType: 'viewing',
    message: "We are relocating from Vancouver for work and need a unit by May 15. We have AAA credit and can provide references from our current landlord. Is this unit still available and would a May 1 move-in be possible?",
    status: 'closed',
    statusLabel: 'Application Submitted',
    createdAt: '2024-04-10T09:45:00Z',
    lastUpdate: '2024-04-12T16:30:00Z',
    response: "Wonderful! The unit is still available and May 1 move-in is absolutely possible. Your application has been submitted to the landlord and we're expecting a decision within 48 hours. I'll keep you posted! — Priya",
  },
  {
    id: 'inq-demo-004',
    listingId: 'lst-002',
    listingTitle: 'Heritage Brick Loft — Distillery District',
    listingImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    listingAddress: '55 Mill St, Unit 412',
    listingCity: 'Toronto',
    listingPrice: 1180000,
    listingType: 'sale',
    agentName: 'Marcus Chen',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0102',
    agentEmail: 'marcus@propvault.ca',
    inquiryType: 'question',
    message: "Love this loft! Quick question — is the brick structural or just a veneer? Also, does the building allow short-term rentals (Airbnb)? We travel frequently and this would help offset carrying costs.",
    status: 'contacted',
    statusLabel: 'Agent Replied',
    createdAt: '2024-04-08T16:15:00Z',
    lastUpdate: '2024-04-09T10:20:00Z',
    response: "Great questions! The exposed brick is 100% original structural Victorian brick — truly irreplaceable. Regarding short-term rentals, the condo corporation currently does not allow Airbnb or short-term lets (under 6 months). Happy to send you the condo rules. Would you like to come see the space? — Marcus",
  },
  {
    id: 'inq-demo-005',
    listingId: 'lst-030',
    listingTitle: 'Marina Townhome — Bronte Harbour, Oakville',
    listingImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    listingAddress: '2420 Marine Drive, TH-12',
    listingCity: 'Oakville',
    listingPrice: 1975000,
    listingType: 'sale',
    agentName: 'James Hartley',
    agentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    agentPhone: '(905) 555-0106',
    agentEmail: 'james@propvault.ca',
    inquiryType: 'viewing',
    message: "This is exactly what we've been looking for — waterfront, townhouse format, and Oakville. We have an open house visit on the weekend but would also love a private showing before we make any decisions.",
    status: 'new',
    statusLabel: 'Inquiry Sent',
    createdAt: '2024-04-20T08:00:00Z',
    lastUpdate: '2024-04-20T08:00:00Z',
  },
];

export const demoViewings: DemoViewing[] = [
  {
    id: 'view-001',
    listingId: 'lst-001',
    listingTitle: 'Pinnacle Penthouse — King West',
    listingImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    listingAddress: '88 Blue Jays Way, PH-32, Toronto',
    listingCity: 'Toronto',
    listingPrice: 4200000,
    agentName: 'Alexandra Whitmore',
    agentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0101',
    date: '2024-04-27',
    time: '2:00 PM',
    status: 'upcoming',
    notes: 'Private viewing. Bring pre-approval letter. Parking validated in building P2.',
  },
  {
    id: 'view-002',
    listingId: 'lst-009',
    listingTitle: 'Executive Apartment — Midtown',
    listingImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    listingAddress: '1 Bloor Street East, Unit 3605, Toronto',
    listingCity: 'Toronto',
    listingPrice: 4800,
    agentName: 'Priya Sharma',
    agentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0105',
    date: '2024-04-13',
    time: '11:00 AM',
    status: 'completed',
    notes: 'Virtual tour + in-person visit',
    feedback: 'Loved the views and layout. Corner unit with subway access was a major plus. Proceeding with rental application.',
  },
  {
    id: 'view-003',
    listingId: 'lst-002',
    listingTitle: 'Heritage Brick Loft — Distillery',
    listingImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    listingAddress: '55 Mill St, Unit 412, Toronto',
    listingCity: 'Toronto',
    listingPrice: 1180000,
    agentName: 'Marcus Chen',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0102',
    date: '2024-04-05',
    time: '3:30 PM',
    status: 'completed',
    feedback: 'Stunning space but short-term rental restriction was a dealbreaker for our use case. Will keep looking.',
  },
  {
    id: 'view-004',
    listingId: 'lst-005',
    listingTitle: 'Contemporary Townhouse — Liberty Village',
    listingImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
    listingAddress: '12 Fraser Avenue, TH-7, Toronto',
    listingCity: 'Toronto',
    listingPrice: 1395000,
    agentName: 'David Okafor',
    agentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    agentPhone: '(416) 555-0104',
    date: '2024-03-28',
    time: '10:00 AM',
    status: 'cancelled',
    notes: 'Cancelled — property went pending before viewing.',
  },
];
