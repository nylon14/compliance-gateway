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
    setScanFinished(false);
    setApprovalGiven(false);

    setTimeout(() => {
      setScanFinished(true);
    }, 800);
  };

  const handleApprove = () => {
    setApprovalGiven(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-emerald-700">
            Deployment Compliance Gateway
          </h1>
          <p className="mt-2 text-slate-600">
            Configure your deployment, run automated checks, and capture human approval
            before promoting changes to production.
          </p>
        </header>

        {/* Configuration */}
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
