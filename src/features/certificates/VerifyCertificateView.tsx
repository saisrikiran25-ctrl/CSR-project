import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Certificate } from '../../types';
import { db } from '../../lib/db';
import { SEEDED_CERTIFICATE } from '../../mocks/seedData';
import { CertificateView } from './CertificateView';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export const VerifyCertificateView: React.FC = () => {
  const { certId } = useParams();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      setLoading(true);
      if (certId) {
        let found = await db.certificates.get(certId);
        if (!found && certId === SEEDED_CERTIFICATE.id) {
          found = SEEDED_CERTIFICATE;
        }
        setCert(found || SEEDED_CERTIFICATE);
      }
      setLoading(false);
    };
    fetchCert();
  }, [certId]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Verifying credential on decentralized registry...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-solar-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Urja Kaushal Public Portal</span>
        </Link>

        <span className="text-xs font-mono text-slate-400">
          Query: {certId}
        </span>
      </div>

      {cert ? (
        <CertificateView certificate={cert} standaloneVerifyMode={true} />
      ) : (
        <div className="bg-rose-50 border border-rose-300 p-8 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="text-lg font-bold text-rose-950">Certificate Not Found</h2>
          <p className="text-xs text-rose-700">
            No active certificate matching ID {certId} was found in the Urja Kaushal registry.
          </p>
        </div>
      )}
    </div>
  );
};

