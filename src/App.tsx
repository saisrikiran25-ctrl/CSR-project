import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingView } from './features/catalog/LandingView';
import { PitchTourView } from './features/pitch/PitchTourView';
import { LoginView } from './features/auth/LoginView';
import { RegisterView } from './features/auth/RegisterView';
import { ReadinessQuizView } from './features/catalog/ReadinessQuizView';
import { CatalogueView } from './features/catalog/CatalogueView';
import { CourseDetailView } from './features/catalog/CourseDetailView';
import { LessonPlayerView } from './features/catalog/LessonPlayerView';
import { AssessmentHubView } from './features/assessments/AssessmentHubView';
import { VerifyCertificateView } from './features/certificates/VerifyCertificateView';
import { JobsView } from './features/jobs/JobsView';
import { EnterpriseView } from './features/enterprise/EnterpriseView';
import { LearnerProfileView } from './features/profile/LearnerProfileView';
import { CommunityView } from './features/community/CommunityView';
import { TrainerConsole } from './features/dashboards/TrainerConsole';
import { CoordinatorConsole } from './features/dashboards/CoordinatorConsole';
import { AssessorConsole } from './features/dashboards/AssessorConsole';
import { EmployerConsole } from './features/dashboards/EmployerConsole';
import { PMDashboard } from './features/dashboards/PMDashboard';
import { FunderDashboard } from './features/dashboards/FunderDashboard';
import { AdminConsole } from './features/dashboards/AdminConsole';
import { AuthProvider } from './features/auth/AuthContext';
import './i18n';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingView />} />
            <Route path="pitch" element={<PitchTourView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
            <Route path="readiness" element={<ReadinessQuizView />} />
            <Route path="learn" element={<CatalogueView />} />
            <Route path="learn/:courseId" element={<CourseDetailView />} />
            <Route path="learn/:courseId/:lessonId" element={<LessonPlayerView />} />
            <Route path="tests" element={<AssessmentHubView />} />
            <Route path="verify/:certId" element={<VerifyCertificateView />} />
            <Route path="jobs" element={<JobsView />} />
            <Route path="enterprise" element={<EnterpriseView />} />
            <Route path="profile" element={<LearnerProfileView />} />
            <Route path="community" element={<CommunityView />} />

            {/* Stakeholder Consoles */}
            <Route path="trainer" element={<TrainerConsole />} />
            <Route path="coordinator" element={<CoordinatorConsole />} />
            <Route path="assessor" element={<AssessorConsole />} />
            <Route path="employer" element={<EmployerConsole />} />
            <Route path="pm" element={<PMDashboard />} />
            <Route path="funder" element={<FunderDashboard />} />
            <Route path="admin" element={<AdminConsole />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

