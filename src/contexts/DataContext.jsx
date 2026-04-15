import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const MOCK_MEMBERS = [
    {
        id: 1,
        name: 'Chinedu Okafor',
        status: 'Active',
        statusColor: 'green',
        role: 'Member',
        department: 'Ushering',
        joinDate: '2021-03-15',
        image: 'https://i.pravatar.cc/150?u=chinedu',
    },
    {
        id: 2,
        name: 'Ngozi Eze',
        status: 'Active',
        statusColor: 'green',
        role: 'Choir Lead',
        department: 'Music',
        joinDate: '2020-01-10',
        image: 'https://i.pravatar.cc/150?u=ngozi',
    },
    {
        id: 3,
        name: 'Emmanuel Johnson',
        status: 'New Convert',
        statusColor: 'blue',
        role: 'Member',
        department: 'None',
        joinDate: '2023-11-05',
        image: 'https://i.pravatar.cc/150?u=emmanuel',
    },
    {
        id: 4,
        name: 'Aisha Bello',
        status: 'Visitor',
        statusColor: 'amber',
        role: 'Guest',
        department: 'None',
        joinDate: '2023-11-12',
        image: 'https://i.pravatar.cc/150?u=aisha',
    },
    {
        id: 5,
        name: 'Tunde Bakare',
        status: 'Active',
        statusColor: 'green',
        role: 'Youth Pastor',
        department: 'Youth Ministry',
        joinDate: '2019-06-20',
        image: 'https://i.pravatar.cc/150?u=tunde',
    }
];

const MOCK_FINANCE = [
    { id: 1, type: 'income', category: 'Tithes', amount: 450000, date: '2023-11-05', description: 'Sunday Service Tithes' },
    { id: 2, type: 'income', category: 'Offering', amount: 125000, date: '2023-11-05', description: 'Sunday Service Offering' },
    { id: 3, type: 'expense', category: 'Maintenance', amount: 45000, date: '2023-11-08', description: 'Generator Fuel & Servicing' },
    { id: 4, type: 'expense', category: 'Ministry', amount: 150000, date: '2023-11-10', description: 'Youth Retreat Logistics' },
];

const MOCK_PROGRAMS = [
    { id: 1, title: 'Annual Youth Retreat', type: 'Special', date: '2023-12-20', location: 'Lakeside Camp, PH', attendees: 42, status: 'Upcoming' },
    { id: 2, title: 'Sunday Worship Service', type: 'Service', date: '2023-11-19', location: 'Main Auditorium', attendees: 350, status: 'Upcoming' },
    { id: 3, title: 'Midweek Bible Study', type: 'Service', date: '2023-11-15', location: 'Fellowship Hall', attendees: 80, status: 'Completed' },
];

const MOCK_VOLUNTEERS = [
    { id: 1, memberId: 1, name: 'Chinedu Okafor', role: 'Head Usher', department: 'Ushering', availability: ['Sundays', 'Wednesdays'] },
    { id: 2, memberId: 2, name: 'Ngozi Eze', role: 'Vocalist', department: 'Music', availability: ['Sundays'] },
];

const MOCK_DEPARTMENTS = [
    { id: 1, name: 'Music & Creative Arts', lead: 'Ngozi Eze', memberCount: 24, description: 'Choir, band, and media teams.' },
    { id: 2, name: 'Ushering & Protocol', lead: 'Chinedu Okafor', memberCount: 15, description: 'Welcoming and organizing the congregation.' },
    { id: 3, name: 'Youth Ministry', lead: 'Tunde Bakare', memberCount: 85, description: 'Empowering the next generation.' },
];

const MOCK_INVENTORY = [
    { id: 1, name: 'Yamaha Motif Keyboard', category: 'Instruments', condition: 'Good', quantity: 1, assignedTo: 'Music', dateAcquired: '2021-05-10' },
    { id: 2, name: 'Soundcraft Mixer', category: 'Audio', condition: 'Fair', quantity: 1, assignedTo: 'Media', dateAcquired: '2020-02-15' },
    { id: 3, name: 'Plastic Chairs', category: 'Furniture', condition: 'Good', quantity: 500, assignedTo: 'Ushering', dateAcquired: '2022-08-30' },
];

export const DataProvider = ({ children }) => {
    // Helper to init from localStorage or default
    const initData = (key, defaultData) => {
        const stored = localStorage.getItem(`bhcnation_${key}`);
        if (stored) return JSON.parse(stored);
        
        // Save initial default
        localStorage.setItem(`bhcnation_${key}`, JSON.stringify(defaultData));
        return defaultData;
    };

    const [members, setMembers] = useState(() => initData('members', MOCK_MEMBERS));
    const [finances, setFinances] = useState(() => initData('finances', MOCK_FINANCE));
    const [programs, setPrograms] = useState(() => initData('programs', MOCK_PROGRAMS));
    const [volunteers, setVolunteers] = useState(() => initData('volunteers', MOCK_VOLUNTEERS));
    const [departments, setDepartments] = useState(() => initData('departments', MOCK_DEPARTMENTS));
    const [inventory, setInventory] = useState(() => initData('inventory', MOCK_INVENTORY));

    // Effect hooks to persist data changes
    useEffect(() => { localStorage.setItem('bhcnation_members', JSON.stringify(members)); }, [members]);
    useEffect(() => { localStorage.setItem('bhcnation_finances', JSON.stringify(finances)); }, [finances]);
    useEffect(() => { localStorage.setItem('bhcnation_programs', JSON.stringify(programs)); }, [programs]);
    useEffect(() => { localStorage.setItem('bhcnation_volunteers', JSON.stringify(volunteers)); }, [volunteers]);
    useEffect(() => { localStorage.setItem('bhcnation_departments', JSON.stringify(departments)); }, [departments]);
    useEffect(() => { localStorage.setItem('bhcnation_inventory', JSON.stringify(inventory)); }, [inventory]);

    // Helpers
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    return (
        <DataContext.Provider value={{
            members, setMembers,
            finances, setFinances,
            programs, setPrograms,
            volunteers, setVolunteers,
            departments, setDepartments,
            inventory, setInventory,
            formatCurrency
        }}>
            {children}
        </DataContext.Provider>
    );
};
