import React, { useState } from 'react';

function App() {
  const [config, setConfig] = useState({
    projectName: '',
    deploymentType: 'production',
    region: 'EU',
    riskTier: 'Medium',
    approverName: '',
  });

  const [scanStarted, setScanStarted] = useState(false);
  const [scanFinished, setScanFinished] = useState(false);
  const [approvalGiven, setApprovalGiven] = useState(false);

  const totalChecks = 24;
  const passedCount = scanFinished ? 22 : 0;
  const failedCount = scanFinished ? totalChecks - passedCount : 0;

  const handleStartScan = () => {
    setScanStarted(true);
    setTimeout(() => {
      setScanFinished(true);
    }, 800);
  };

  const handleApprove = () => {
    setApprovalGiven(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-emerald-700">
            Deployment Compliance Gateway
          </h1>
          <p className="mt-2 text-slate-600">
            Configure your deployment, run automated checks, and capture human approval
            before going live.
          </p>
        </header>

        {/* Configuration card */}
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
                onChange={(e) =>
                  setConfig({ ...config, projectName: e.target.value })
                }
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
                  onChange={(e) =>
                    setConfig({ ...config, deploymentType: e.target.value })
                  }
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
                  value={config.region}
                  onChange={(e) =>
                    setConfig({ ...config, region: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="EU">EU</option>
                  <option value="US">US</option>
                  <option value="APAC">APAC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Risk tier
                </label>
                <select
                  value={config.riskTier}
                  onChange={(e) =>
                    setConfig({ ...config, riskTier: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleStartScan}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
            >
              {scanStarted ? 'Re-run checks' : 'Run compliance checks'}
            </button>
          </div>
        </section>

        {/* Scan status */}
        <section className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold mb-2">
              Scanning: {config.projectName || 'Unnamed project'}
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {config.region} • {config.riskTier} risk tier
            </p>

            {scanStarted ? (
              scanFinished ? (
                <p className="text-sm text-emerald-700 font-medium">
                  {passedCount}/{totalChecks} checks passed.{' '}
                  {failedCount > 0
                    ? `${failedCount} checks require review.`
                    : 'All checks passed.'}
                </p>
              ) : (
                <p className="text-sm text-slate-600">Running automated checks…</p>
              )
            ) : (
              <p className="text-sm text-slate-500">
                Start a scan to view technical and regional compliance results.
              </p>
            )}
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
            <h3 className="text-base font-semibold mb-3">Check breakdown</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Technical controls (static analysis, dependencies, secrets)</li>
              <li>• Regulatory controls (region-specific rules)</li>
              <li>• Operational checks (logging, alerts, runbooks)</li>
            </ul>
          </div>
        </section>

        {/* Approval section */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Human approval</h2>

          <div className="grid gap-4 md:grid-cols-[2fr,3fr] items-start">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Approver name
                </label>
                <input
                  type="text"
