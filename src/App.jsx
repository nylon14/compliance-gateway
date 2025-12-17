// src/App.jsx
import React, { useState, useMemo } from "react";

export default function App() {
  const [config, setConfig] = useState({
    projectName: "",
    approverName: "",
    deploymentType: "Production",
    riskTier: "Medium",
    region: "eu",
  });

  const [approvalId, setApprovalId] = useState(null);
  const [hasApproved, setHasApproved] = useState(false);

  // Example regions and checks – adjust to match your original file
  const regions = [
    { id: "eu", name: "European Union" },
    { id: "uk", name: "United Kingdom" },
    { id: "us", name: "United States" },
    { id: "apac", name: "APAC" },
  ];

  const selectedRegion = useMemo(
    () => regions.find((r) => r.id === config.region) || regions[0],
    [config.region]
  );

  // Dummy check counts – wire this to your real logic if you had it
  const passedCount = 18;
  const failedCount = 2;
  const totalChecks = passedCount + failedCount;

  function handleApprove() {
    const newId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setApprovalId(newId);
    setHasApproved(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-800 px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Compliance Gateway
            </h1>
            <p className="text-sm text-slate-400">
              Deployment configuration, automated checks, and approval workflow.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              v3.0
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Demo Environment
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* LEFT COLUMN – CONFIGURATION & SCANNING */}
          <div className="space-y-6">
            {/* Deployment Configuration */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Deployment Configuration
              </h2>
              <p className="text-sm text-slate-400">
                Configure your deployment for compliance validation.
              </p>

              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Project name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                    api/
                  </span>
                  <input
                    type="text"
                    value={config.projectName}
                    onChange={(e) =>
                      setConfig({ ...config, projectName: e.target.value })
                    }
                    placeholder="e.g., cash-transactions-api"
                    className="w-full pl-12 pr-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Region & Deployment Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Deployment region
                  </label>
                  <select
                    value={config.region}
                    onChange={(e) =>
                      setConfig({ ...config, region: e.target.value })
                    }
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Deployment type
                  </label>
                  <select
                    value={config.deploymentType}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        deploymentType: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option>Production</option>
                    <option>Staging</option>
                    <option>UAT</option>
                    <option>Sandbox</option>
                  </select>
                </div>
              </div>

              {/* Risk tier */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Risk tier
                </label>
                <select
                  value={config.riskTier}
                  onChange={(e) =>
                    setConfig({ ...config, riskTier: e.target.value })
                  }
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </section>

            {/* Scanning Summary */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Scanning: {config.projectName || "Unnamed project"}
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-xs text-slate-200">
                  {selectedRegion?.name}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-xs text-amber-300 border border-amber-500/40">
                  {config.riskTier} risk tier
                </span>
              </p>

              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-3xl font-semibold text-emerald-400">
                    {passedCount}/{totalChecks}
                  </p>
                  <p className="text-sm text-slate-400">checks passed</p>
                </div>
                <div className="flex gap-2 text-xs text-slate-400">
                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {passedCount} passed
                  </span>
                  <span className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                    {failedCount} failed
                  </span>
                </div>
              </div>

              <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden mt-4">
                <div
                  className="absolute left-0 top-0 h-full bg-emerald-400"
                  style={{
                    width:
                      totalChecks === 0
                        ? "0%"
                        : `${(passedCount / totalChecks) * 100}%`,
                  }}
                />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – CHECKS & APPROVAL */}
          <div className="space-y-6">
            {/* Checks */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Technical Checks
              </h2>
              <p className="text-sm text-slate-400">
                Automated rulebooks validating your deployment configuration.
              </p>

              {/* Example placeholder checks – replace with your real JSX if you had it */}
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• API schema and endpoint coverage</li>
                <li>• Transaction monitoring thresholds</li>
                <li>• Sanctions and PEP screening routing</li>
                <li>• Data residency controls</li>
              </ul>

              <div className="mt-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">
                  {selectedRegion.name} Regional Checks
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Jurisdiction-specific compliance and localisation rules.
                </p>
              </div>
            </section>

            {/* Review Results & Approval */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Review Results
              </h2>
              <p className="text-sm text-slate-400">
                Human approval required before deployment.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <p className="text-xs text-slate-400">Passed</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {passedCount}
                  </p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <p className="text-xs text-slate-400">Failed</p>
                  <p className="text-lg font-semibold text-rose-400">
                    {failedCount}
                  </p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="text-lg font-semibold text-slate-100">
                    {totalChecks}
                  </p>
                </div>
              </div>

              {/* Approver details */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-slate-200">
                  Approver name
                </label>
                <input
                  type="text"
                  value={config.approverName}
                  onChange={(e) =>
                    setConfig({ ...config, approverName: e.target.value })
                  }
                  placeholder="e.g., Maria Jensen"
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <p className="font-medium text-slate-200 mb-1">
                  Human Approval Required
                </p>
                <p>
                  By approving, <strong>{config.approverName || "________"}</strong>{" "}
                  confirms they have reviewed the compliance results and
                  authorise this deployment to {config.deploymentType}.
                </p>
              </div>

              <button
                onClick={handleApprove}
                disabled={!config.approverName}
                className="w-full mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-700 disabled:text-slate-400 transition-colors"
              >
                Approve deployment
              </button>
            </section>

            {/* Approval Summary */}
            {hasApproved && (
              <section className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-6 space-y-3">
                <h2 className="text-lg font-semibold text-emerald-300">
                  Deployment Approved
                </h2>
                <p className="text-sm text-emerald-100">
                  {config.projectName || "Your project"} has been approved for{" "}
                  {config.deploymentType} deployment in {selectedRegion?.name}.
                </p>
                <p className="text-xs text-emerald-100">
                  <span className="font-medium">Approval ID:</span>{" "}
                  {approvalId}
                </p>
                <p className="text-xs text-emerald-100">
                  Audit Trail Created. This approval has been logged with full
                  evidence trail. Approved by {config.approverName} on{" "}
                  {new Date().toLocaleDateString()}.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
