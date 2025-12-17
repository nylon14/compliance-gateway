import React, { useState } from 'react';

const REGIONS = [
  { id: 'eu', name: 'European Union', code: 'EU' },
  { id: 'us', name: 'United States', code: 'US' },
  { id: 'apac', name: 'Asia-Pacific', code: 'APAC' },
];

const RISK_TIERS = ['Low', 'Medium', 'High'];

function App() {
  const [config, setConfig] = useState({
    projectName: '',
    deploymentType: 'production',
    regionId: 'eu',
    riskTier: 'Medium',
    approverName: '',
  });

  const [scanStatus, setScanStatus] = useState('idle'); // idle | running | complete
  const [approvalRecorded, setApprovalRecorded] = useState(false);

  const selectedRegion =
    REGIONS.find((r) => r.id === config.regionId) ?? REGIONS[0];

  const totalChecks = 24;
  const passedCount = scanStatus === 'complete' ? 22 : 0;
  const failedCount = scanStatus === 'complete' ? totalChecks - passedCount : 0;

  const handleChange = (field) => (e) => {
    setConfig((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setApprovalRecorded(false);
  };

  const handleRunChecks = () => {
    setScanStatus('running');
    setApprovalRecorded(false);

    setTimeout(() => {
      setScanStatus('complete');
    }, 800);
  };

  const handleRecordApproval = () => {
    setApprovalRecorded(true);
  };

  const approvalId = approvalRecorded
    ? `APP-${Date.now().toString().slice(-6)}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-emerald-700">
            Deployment Compliance Gateway
          </h1>
          <p className="mt-2 text-slate-600">
            Configure your deployment, run automated checks, and capture human
            approval before promoting changes.
          </p>
        </header>

        {/* Deployment configuration */}
        <section className="bg-white shadow-sm rounded-2xl p-6 mb-8 border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Deployment configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project name
              </label>
              <input
                type="text"
                value={config.projectName}
                onChange={handleChange('projectName')}
                placeholder="e.g., cash-transactions-api"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Deployment type
                </label>
                <select
                  value={config.deploymentType}
                  onChange={handleChange('deploymentType')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="test">Test</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Region
                </label>
                <select
                  value={config.regionId}
                  onChange={handleChange('regionId')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Risk tier
                </label>
                <select
                  value={config.riskTier}
                  onChange={handleChange('riskTier')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {RISK_TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunChecks}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
            >
              {scanStatus === 'idle'
                ? 'Run compliance checks'
                : 'Re-run compliance checks'}
            </button>
          </div>
        </section>

        {/* Scan status */}
        <section className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold mb-1">
              Scanning: {config.projectName || 'Unnamed project'}
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {selectedRegion.name} • {config.riskTier} risk tier
            </p>

            {scanStatus === 'idle' && (
              <p className="text-sm text-slate-500">
                Start a scan to view technical and regional compliance results.
              </p>
            )}

            {scanStatus === 'running' && (
              <p className="text-sm text-slate-600">Running automated checks…</p>
            )}

            {scanStatus === 'complete' && (
              <p className="text-sm text-emerald-700 font-medium">
                {passedCount}/{totalChecks} checks passed.{' '}
                {failedCount > 0
                  ? `${failedCount} checks require human review.`
                  : 'All checks passed.'}
              </p>
            )}
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
            <h3 className="text-base font-semibold mb-3">Check breakdown</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Technical checks: dependencies, secrets, CI/CD controls.</li>
              <li>• Regional checks: {selectedRegion.name} rules and guidance.</li>
              <li>• Operational checks: logging, alerting, runbooks.</li>
            </ul>
          </div>
        </section>

        {/* Review & approval */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Review results</h2>

          <div className="grid gap-4 md:grid-cols-[2fr,3fr] items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-emerald-700 uppercase tracking-wide">
                    Passed
                  </p>
                  <p className="text-xl font-semibold text-emerald-800">
                    {scanStatus === 'complete' ? passedCount : '--'}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-700 uppercase tracking-wide">
                    Failed
                  </p>
                  <p className="text-xl font-semibold text-amber-800">
                    {scanStatus === 'complete' ? failedCount : '--'}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-600 uppercase tracking-wide">
                    Total
                  </p>
                  <p className="text-xl font-semibold text-slate-800">
                    {totalChecks}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Approver name
                </label>
                <input
                  type="text"
                  value={config.approverName}
                  onChange={handleChange('approverName')}
                  placeholder="e.g., Jane Doe, Head of Compliance"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="button"
                onClick={handleRecordApproval}
                disabled={
                  scanStatus !== 'complete' || !config.approverName.trim()
                }
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                  scanStatus !== 'complete' || !config.approverName.trim()
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Record human approval
              </button>
            </div>

            <div className="text-sm text-slate-700 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
              <p className="font-medium mb-2">Approval statement</p>
              <p className="mb-2">
                By approving,{' '}
                <span className="font-semibold">
                  {config.approverName || 'the approver'}
                </span>{' '}
                confirms they have reviewed the compliance results and authorise
                this deployment to{' '}
                <span className="font-semibold">
                  {config.deploymentType}
                </span>{' '}
                in{' '}
                <span className="font-semibold">
                  {selectedRegion.name}
                </span>
                .
              </p>
              {approvalRecorded && (
                <>
                  <p className="mt-2 text-emerald-700 font-medium">
                    Deployment approved. Approval ID:{' '}
                    <span className="font-mono">{approvalId}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Audit trail created on {new Date().toLocaleDateString()}.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
