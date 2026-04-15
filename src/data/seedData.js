export const defaultMembers = [
  { id: '1', name: 'Pastor David Inyang', role: 'Lead Pastor', department: 'Leadership', status: 'Active', joinDate: '2021-01-10', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBObOxCCJseftCNfEiT0KTBWpP0Rt7oHxV_ZTFzMTE8xkH7Qbyrrlq8Fl_6AeYLcsUptLYwPKLpLqnmiVd3NHWdzL70SShk3PvAwe0EkZvTEgctwMhxUsmCjGB4Kx7tWWPLpingvliynWB44M8MJqrfcENqS9xTWp7uPx2yNAijAOcRJ16aUDVjyY1-1dhyuhHsYR0HSqS2S6cKwCgwaB3RZVI-9ay0xnMryX8-fKiE9mBUYUu4P9QC7h9a2ufjztN2hhi5R2MwomI', phone: '+2348000000001' },
  { id: '2', name: 'Chidinma Okafor', role: 'Member', department: 'Choir', status: 'Active', joinDate: '2022-03-15', image: '', phone: '+2348123456789' },
  { id: '3', name: 'Emmanuel Udoh', role: 'Head of Media', department: 'Media', status: 'Active', joinDate: '2021-06-20', image: '', phone: '+2347012345678' },
  { id: '4', name: 'Aisha Lawal', role: 'New Convert', department: 'None', status: 'New Convert', joinDate: '2026-09-10', image: '', phone: '+2349012345678' },
  { id: '5', name: 'Nonso Eze', role: 'Usher', department: 'Ushering', status: 'Active', joinDate: '2023-01-12', image: '', phone: '+2348098765432' },
  { id: '6', name: 'Dr. Sarah Jumbo', role: 'Leader', department: 'Medical', status: 'Active', joinDate: '2021-11-05', image: '', phone: '+2348022222222' },
  { id: '7', name: 'Ezekiel Temitope', role: 'Visitor', department: 'None', status: 'Visitor', joinDate: '2026-10-01', image: '', phone: '+2348033333333' }
];

export const defaultFinances = [
  { id: '1', title: 'Sunday Main Service Tithes', category: 'Tithes', type: 'Income', amount: 850500, date: '2026-10-04T12:00:00Z', note: 'Collected during first and second service' },
  { id: '2', title: 'Diesel for Generator (100 Litres)', category: 'Maintenance', type: 'Expense', amount: 135000, date: '2026-10-05T09:30:00Z', note: 'Supplier: Total Energy PH' },
  { id: '3', title: 'Projector Repair', category: 'Equipment', type: 'Expense', amount: 45000, date: '2026-10-06T14:15:00Z', note: 'Paid to Chima Electronics' },
  { id: '4', title: 'Midweek Service Offering', category: 'Offering', type: 'Income', amount: 210000, date: '2026-10-07T20:00:00Z', note: '' },
  { id: '5', title: 'Youth Ministry (BYC) Outreach Support', category: 'Outreach', type: 'Income', amount: 150000, date: '2026-10-08T10:00:00Z', note: 'Donation from Dr. Jumbo' }
];

export const defaultEvents = [
  { id: '1', title: 'DOXA 2026', month: 'Nov', date: '15', time: '05:00 PM', location: 'BHC Main Auditorium', status: 'Upcoming', description: 'Annual worship experience.' },
  { id: '2', title: 'Workers Retreat', month: 'Oct', date: '25', time: '09:00 AM', location: 'Church Hall', status: 'Upcoming', description: 'Mandatory for all workers and volunteers.' },
  { id: '3', title: 'Sunday Service', month: 'Oct', date: '11', time: '08:00 AM', location: 'Main Auditorium', status: 'Concluded', description: 'First service' },
  { id: '4', title: 'Midweek Word Encounter', month: 'Oct', date: '14', time: '06:00 PM', location: 'Main Auditorium', status: 'Upcoming', description: 'Bible study and communion.' }
];

export const defaultVolunteers = [
  { id: 'v1', memberId: '3', name: 'Emmanuel Udoh', role: 'Livestream Operator', availability: 'Sundays & Wednesdays' },
  { id: 'v2', memberId: '5', name: 'Nonso Eze', role: 'Head Usher (Gallery)', availability: 'Sundays Only' },
  { id: 'v3', memberId: '2', name: 'Chidinma Okafor', role: 'Lead Vocalist', availability: 'All Services & Rehearsals' }
];

export const defaultDepartments = [
  { id: 'd1', name: 'Media & Tech', lead: 'Emmanuel Udoh', description: 'Handles audio, visuals, streaming and social media.', icon: 'videocam' },
  { id: 'd2', name: 'Choir (Voices of Zion)', lead: 'Pastor David Inyang', description: 'Leading the congregation in worship.', icon: 'music_note' },
  { id: 'd3', name: 'Ushering & Protocol', lead: 'Nonso Eze', description: 'Ensuring order and hospitality during services.', icon: 'pan_tool_alt' },
  { id: 'd4', name: 'Children\'s Ministry', lead: 'Sarah Jumbo', description: 'Raising the next generation in the word.', icon: 'child_care' }
];

export const defaultInventory = [
  { id: 'i1', name: 'Behringer X32 Sound Console', category: 'Audio', quantity: 1, condition: 'Good', location: 'Media Stand' },
  { id: 'i2', name: 'Shure SM58 Microphones', category: 'Audio', quantity: 6, condition: 'Good', location: 'Altar Store' },
  { id: 'i3', name: 'Plastic Chairs', category: 'Furniture', quantity: 500, condition: 'Fair', location: 'Main Hall' },
  { id: 'i4', name: 'Canon XA40 Camcorder', category: 'Video', quantity: 2, condition: 'Needs Repair', location: 'Media Room' }
];
