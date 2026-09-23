/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/admin/RequireAuth';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { CaseStudy } from './pages/CaseStudy';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { NotFound } from './pages/NotFound';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminCampaigns } from './pages/admin/AdminCampaigns';
import { AdminTeam } from './pages/admin/AdminTeam';
import { AdminNewsletter } from './pages/admin/AdminNewsletter';
import { AdminProfile } from './pages/admin/AdminProfile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public admin login — no auth required */}
          <Route path="admin/login" element={<AdminLogin />} />

          {/* Protected admin area */}
          <Route path="admin" element={<RequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Public website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:projectId" element={<CaseStudy />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
