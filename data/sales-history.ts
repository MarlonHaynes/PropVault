// Real-looking historical sales data for the dashboard

export interface SaleRecord {
  id: string;
  listingTitle: string;
  address: string;
  city: string;
  neighborhood: string;
  propertyType: string;
  salePrice: number;
  listPrice: number;
  soldDate: string;
  daysOnMarket: number;
  agentId: string;
  buyerName: string;
  sellerName: string;
  commission: number;
  image: string;
}

export const saleHistory: SaleRecord[] = [
  {
    id: 'sale-001',
    listingTitle: 'Modern Penthouse — King West',
    address: '90 Blue Jays Way, PH-28',
    city: 'Toronto', neighborhood: 'King West', propertyType: 'Penthouse',
    salePrice: 3850000, listPrice: 3999000, soldDate: '2024-04-12',
    daysOnMarket: 18, agentId: 'agent-001', commission: 96250,
    buyerName: 'T. Morrison', sellerName: 'Ellsworth Group',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-002',
    listingTitle: 'Waterfront Estate — Port Credit',
    address: '210 Lakeshore Rd W',
    city: 'Mississauga', neighborhood: 'Port Credit', propertyType: 'House',
    salePrice: 2700000, listPrice: 2750000, soldDate: '2024-03-28',
    daysOnMarket: 9, agentId: 'agent-003', commission: 67500,
    buyerName: 'D. & S. Okafor', sellerName: 'P. Hartmann',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-003',
    listingTitle: 'Georgian Estate — Old Oakville',
    address: '288 Reynolds Street',
    city: 'Oakville', neighborhood: 'Old Oakville', propertyType: 'House',
    salePrice: 5050000, listPrice: 5200000, soldDate: '2024-03-15',
    daysOnMarket: 24, agentId: 'agent-001', commission: 126250,
    buyerName: 'A. Sinclair',  sellerName: 'Hartley Estate',
    image: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-004',
    listingTitle: 'Heritage Loft — Distillery District',
    address: '55 Mill Street, Unit 312',
    city: 'Toronto', neighborhood: 'Distillery', propertyType: 'Loft',
    salePrice: 1095000, listPrice: 1099000, soldDate: '2024-02-22',
    daysOnMarket: 6, agentId: 'agent-002', commission: 27375,
    buyerName: 'K. Nakamura', sellerName: 'C. Dumont',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-005',
    listingTitle: 'Executive Townhouse — Liberty Village',
    address: '14 Fraser Ave, TH-3',
    city: 'Toronto', neighborhood: 'Liberty Village', propertyType: 'Townhouse',
    salePrice: 1325000, listPrice: 1349000, soldDate: '2024-02-08',
    daysOnMarket: 11, agentId: 'agent-004', commission: 33125,
    buyerName: 'R. & L. Espinoza', sellerName: 'D. Winters',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-006',
    listingTitle: 'Tudor Revival — Forest Hill',
    address: '360 Dunvegan Road',
    city: 'Toronto', neighborhood: 'Forest Hill', propertyType: 'House',
    salePrice: 4620000, listPrice: 4750000, soldDate: '2024-01-30',
    daysOnMarket: 32, agentId: 'agent-001', commission: 115500,
    buyerName: 'M. & J. Chen', sellerName: 'Bellwood Holdings',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-007',
    listingTitle: 'Stone Manor — Kleinburg',
    address: '10650 Islington Ave',
    city: 'Vaughan', neighborhood: 'Kleinburg', propertyType: 'House',
    salePrice: 3750000, listPrice: 3975000, soldDate: '2023-12-19',
    daysOnMarket: 41, agentId: 'agent-002', commission: 93750,
    buyerName: 'B. & F. Tremblay', sellerName: 'Kleinburg Dev Inc.',
<<<<<<< HEAD
<<<<<<< HEAD
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
=======
    image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=400&h=300&fit=crop',
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=400&h=300&fit=crop',
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  },
  {
    id: 'sale-008',
    listingTitle: 'Yorkville Luxury Suite',
    address: '55 Scollard St, Suite 1502',
    city: 'Toronto', neighborhood: 'Yorkville', propertyType: 'Condo',
    salePrice: 3100000, listPrice: 3199000, soldDate: '2023-11-28',
    daysOnMarket: 14, agentId: 'agent-003', commission: 77500,
    buyerName: 'G. Papadopoulos', sellerName: 'L. & A. Reeves',
<<<<<<< HEAD
<<<<<<< HEAD
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
=======
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop',
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop',
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  },
  {
    id: 'sale-009',
    listingTitle: 'Lakeside Condo — Harbourfront',
    address: '3 Navy Wharf Ct, Unit 2201',
    city: 'Toronto', neighborhood: 'Harbourfront', propertyType: 'Condo',
    salePrice: 1560000, listPrice: 1580000, soldDate: '2023-11-10',
    daysOnMarket: 8, agentId: 'agent-005', commission: 39000,
    buyerName: 'W. Jacobsen', sellerName: 'Harbourfront Capital',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-010',
    listingTitle: 'Executive Home — Unionville',
    address: '18 Main Street',
    city: 'Markham', neighborhood: 'Unionville', propertyType: 'House',
    salePrice: 3080000, listPrice: 3250000, soldDate: '2023-10-22',
    daysOnMarket: 29, agentId: 'agent-008', commission: 77000,
    buyerName: 'Y. & H. Liu', sellerName: 'S. Barrington',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-011',
    listingTitle: 'Bronte Harbour Townhome',
    address: '2400 Marine Drive, TH-8',
    city: 'Oakville', neighborhood: 'Bronte', propertyType: 'Townhouse',
    salePrice: 1890000, listPrice: 1950000, soldDate: '2023-10-05',
    daysOnMarket: 17, agentId: 'agent-006', commission: 47250,
    buyerName: 'A. & M. Kowalski', sellerName: 'Marine Estates Inc.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
  },
  {
    id: 'sale-012',
    listingTitle: 'Renovated Victorian — Annex',
    address: '80 Tranby Avenue',
    city: 'Toronto', neighborhood: 'The Annex', propertyType: 'House',
    salePrice: 2640000, listPrice: 2699000, soldDate: '2023-09-14',
    daysOnMarket: 12, agentId: 'agent-002', commission: 66000,
    buyerName: 'D. & N. O\'Brien', sellerName: 'C. Whitfield',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&h=300&fit=crop',
  },
];

// Monthly revenue data for the chart (last 12 months)
export const monthlyRevenue = [
  { month: 'May 23',  sales: 2, volume: 4850000,  commission: 121250 },
  { month: 'Jun 23',  sales: 3, volume: 7200000,  commission: 180000 },
  { month: 'Jul 23',  sales: 1, volume: 2100000,  commission: 52500  },
  { month: 'Aug 23',  sales: 2, volume: 5400000,  commission: 135000 },
  { month: 'Sep 23',  sales: 4, volume: 9750000,  commission: 243750 },
  { month: 'Oct 23',  sales: 3, volume: 8120000,  commission: 203000 },
  { month: 'Nov 23',  sales: 4, volume: 10660000, commission: 266500 },
  { month: 'Dec 23',  sales: 2, volume: 5450000,  commission: 136250 },
  { month: 'Jan 24',  sales: 3, volume: 8890000,  commission: 222250 },
  { month: 'Feb 24',  sales: 3, volume: 7495000,  commission: 187375 },
  { month: 'Mar 24',  sales: 3, volume: 8845000,  commission: 221125 },
  { month: 'Apr 24',  sales: 2, volume: 6550000,  commission: 163750 },
];

// Agent performance data
export const agentPerformance = [
  { id: 'agent-001', name: 'Alexandra Whitmore', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', sales: 4, volume: 17220000, commission: 430500, avgDOM: 28, rating: 4.9 },
  { id: 'agent-002', name: 'Marcus Chen',        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop', sales: 4, volume: 11490000, commission: 287250, avgDOM: 23, rating: 4.8 },
  { id: 'agent-003', name: 'Sophia Delacroix',   photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop', sales: 3, volume: 10850000, commission: 271250, avgDOM: 17, rating: 4.9 },
  { id: 'agent-004', name: 'David Okafor',       photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', sales: 2, volume:  4665000, commission: 116625, avgDOM: 11, rating: 4.8 },
  { id: 'agent-005', name: 'Priya Sharma',       photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', sales: 1, volume:  1560000, commission:  39000, avgDOM:  8, rating: 4.7 },
  { id: 'agent-006', name: 'James Hartley',      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', sales: 2, volume:  5640000, commission: 141000, avgDOM: 17, rating: 4.7 },
  { id: 'agent-008', name: 'Roberto Esposito',   photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', sales: 1, volume:  3080000, commission:  77000, avgDOM: 29, rating: 4.8 },
];
