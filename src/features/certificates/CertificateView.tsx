import React, { useEffect, useRef, useState } from 'react';
import { Certificate } from '../../types';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import {
  Download,
  Share2,
  CheckCircle,
  ShieldCheck,
  Printer,
  ExternalLink,
  Award,
} from 'lucide-react';

interface CertificateViewProps {
  certificate: Certificate;
  standaloneVerifyMode?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  standaloneVerifyMode = false,
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl = `${window.location.origin}/verify/${certificate.id}`;

  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        verificationUrl,
        {
          width: 110,
          margin: 1,
          color: {
            dark: '#1e3a8a',
            light: '#ffffff',
          },
        },
        error => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [certificate.id, verificationUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my verified Solar PV Technician Certificate from Urja Kaushal Jamnagar!\nCertificate ID: ${certificate.id}\nVerify online: ${verificationUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Toolbar (hidden during print) */}
      {!standaloneVerifyMode && (
        <div className="print:hidden bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Official Verifiable Certificate (UK-LMS)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t('certificate.share_whatsapp')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Standalone Verification Banner */}
      {standaloneVerifyMode && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-950 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">AUTHENTIC VERIFIED CREDENTIAL</div>
              <div className="text-xs text-emerald-800">
                Issued by Urja Kaushal Jamnagar • Registered ID: {certificate.id}
              </div>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full uppercase">
            Status: {certificate.status}
          </span>
        </div>
      )}

      {/* A4 LANDSCAPE CERTIFICATE CANVAS CONTAINER */}
      <div className="relative bg-gradient-to-br from-cream-50 via-white to-amber-50/40 p-8 sm:p-12 rounded-3xl shadow-2xl border-8 border-solar-700/80 text-slate-900 overflow-hidden font-serif">
        {/* Visible Guardrail Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] rotate-[-25deg]">
          <span className="text-5xl sm:text-7xl font-extrabold text-slate-900 uppercase tracking-widest text-center">
            {t('certificate.sample_watermark')}
          </span>
        </div>

        {/* Certificate Border Corner Ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-sun-500 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-sun-500 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-sun-500 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-sun-500 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b-2 border-amber-500/30 pb-6">
          <div className="flex items-center justify-center gap-2">
            <img src="/sun-icon.svg" alt="Urja Kaushal Logo" className="w-12 h-12" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-solar-800 font-sans">
              URJA KAUSHAL • ઊર્જા કૌશલ્ય
            </h1>
          </div>
          <p className="text-xs font-sans text-slate-600 uppercase tracking-widest font-semibold">
            Solar Livelihoods Skill Development Platform • Jamnagar, Gujarat
          </p>
          <p className="text-[11px] font-sans text-amber-700 font-medium">
            Supported by Reliance Foundation (CSR Proposal Prototype)
          </p>
        </div>

        {/* Certificate Body */}
        <div className="my-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-sans font-bold">
            This is to certify that
          </p>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-solar-900 font-sans tracking-wide">
            {certificate.learnerName}
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans">
            has successfully completed the <strong>{certificate.completedHours}-Hour Vocational Curriculum</strong> in{' '}
            <span className="text-solar-700 font-bold">{certificate.courseName.en}</span> (
            <span className="text-amber-800">{certificate.courseName.gu}</span>) at{' '}
            <strong>{certificate.hubName}</strong> with a grade of{' '}
            <span className="px-2 py-0.5 rounded bg-sun-100 text-amber-900 font-bold font-sans">
              {certificate.grade}
            </span>.
          </p>

          {/* Scores Matrix */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 font-sans text-xs">
            <div className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <span className="text-slate-500">Theory Score: </span>
              <strong className="text-solar-700">{certificate.theoryScore}%</strong>
            </div>
            <div className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <span className="text-slate-500">Practical Lab: </span>
              <strong className="text-emerald-700">{certificate.practicalScore}% (Competent)</strong>
            </div>
            <div className="bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <span className="text-slate-500">Hub Attendance: </span>
              <strong className="text-slate-800">{certificate.attendancePercentage}%</strong>
            </div>
          </div>
        </div>

        {/* Certificate Footer with QR Code and Signatures */}
        <div className="mt-10 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          {/* Signatory 1 */}
          <div className="text-center sm:text-left">
            <div className="h-8 border-b border-slate-400 w-44 mx-auto sm:mx-0 flex items-center justify-center italic text-xs text-slate-500">
              Dr. R. K. Joshi (Sign)
            </div>
            <div className="text-xs font-bold text-slate-900 mt-1">{certificate.signatories[0].name}</div>
            <div className="text-[10px] text-slate-500">{certificate.signatories[0].title}</div>
          </div>

          {/* Center QR Code */}
          <div className="flex flex-col items-center text-center">
            <div className="p-1 bg-white rounded-xl shadow border border-slate-200">
              <canvas ref={qrCanvasRef} className="w-20 h-20" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1">ID: {certificate.id}</span>
          </div>

          {/* Signatory 2 */}
          <div className="text-center sm:text-right">
            <div className="h-8 border-b border-slate-400 w-44 mx-auto sm:ml-auto flex items-center justify-center italic text-xs text-slate-500">
              Sneha Sharma (Sign)
            </div>
            <div className="text-xs font-bold text-slate-900 mt-1">{certificate.signatories[1].name}</div>
            <div className="text-[10px] text-slate-500">{certificate.signatories[1].title}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Date: {certificate.issueDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

