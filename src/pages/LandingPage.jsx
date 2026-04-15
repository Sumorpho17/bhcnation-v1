import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-emerald-400 text-white shadow-lg">
                <span className="material-symbols-outlined">church</span>
              </div>
              <span className="text-2xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                BHCNation
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600 dark:text-slate-300">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <Link
                to="/dashboard"
                className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Subtle Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-overlay"></div>
          <div className="absolute top-32 right-1/4 w-[30rem] h-[30rem] bg-teal-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6 border border-primary/20">
            Welcome to v2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Empowering Modern <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">
              Church Administration
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400 mx-auto mb-10 leading-relaxed">
            A comprehensive, all-in-one platform built for BHCNATION to seamlessly manage members, finances, events, and volunteers in one intuitive dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
            >
              Enter Dashboard
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need Unlocked</h2>
            <p className="text-slate-600 dark:text-slate-400">Streamline your operations and focus on community building with our beautifully integrated modules.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              { icon: 'group', title: 'Member Directory', desc: 'Manage member details, tracking attendance, family connections, and comprehensive demographics.' },
              { icon: 'account_balance_wallet', title: 'Finance & Giving', desc: 'Record pledges, tithes, and offerings with transparent dashboards and dynamic reporting tools.' },
              { icon: 'event', title: 'Programs & Events', desc: 'Schedule and manage services, special events, and view detailed calendars at a glance.' },
              { icon: 'volunteer_activism', title: 'Volunteers', desc: 'Organize rosters, schedule duties, and track your active volunteer forces efficiently.' },
              { icon: 'domain', title: 'Departments', desc: 'Centralize ministries and departments management, ensuring optimal structural communication.' },
              { icon: 'inventory_2', title: 'Asset Inventory', desc: 'Log fixed assets securely, track conditions, categories, and maintenance statuses effortlessly.' }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{feat.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">church</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">BHCNation</span>
        </div>
        <p>&copy; {new Date().getFullYear()} BHCNation Platform v2.0. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
