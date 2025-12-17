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
  const [activeTab, setActiveTab] = useState("deployment");
  
  const [approvalHistory, setApprovalHistory] = useState([
    {
      id: "APR-12543",
      project: "payment-gateway-api",
      date: "2024-12-15",
      approver: "Sarah Chen",
      status: "Approved",
    },
    {
      id: "APR-12542",
      project: "risk-analytics-service",
      date: "2024-12-14",
      approver: "James Roberts",
      status: "Approved",
    },
  ]);

  const [feedbackLog, setFeedbackLog] = useState([
    {
      id: 1,
      date: "2024-12-10",
      issue: "DORA Article 6 check not reflecting latest ECB guidance",
      reporter: "Emma Davis",
      status: "Open",
    },
    {
      id: 2,
      date: "2024-12-08",
      issue: "MAS TRM Guidelines version 2021 needs update for 2024 refresh",
      reporter: "Rajesh Kumar",
      status: "Open",
    },
    {
      id: 3,
      date: "2024-12-05",
      issue: "FINMA Circular 2023/1 data localisation check working correctly",
      reporter: "Lucas Mueller",
      status: "Resolved",
    },
  ]);

  const [newFeedback, setNewFeedback] = useState("");

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

  const passedCount = 18;
  const failedCount = 2;
  const totalChecks = passedCount + failedCount;

  function handleApprove() {
    const newId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setApprovalId(newId);
    setHasApproved(true);
    
    // Add to approval history
    const newRecord = {
      id: newId,
      project: config.projectName || "Unnamed project",
      date: new Date().toISOString().split("T")[0],
      approver: config.approverName,
      status: "Approved",
    };
    setApprovalHistory([newRecord, ...approvalHistory]);
  }

  function handleAddFeedback() {
    if (newFeedback.trim()) {
      const feedback = {
        id: Math.max(...feedbackLog.map(f => f.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        issue: newFeedback,
        reporter: config.approverName || "Anonymous",
        status: "Open",
      };
      setFeedbackLog([feedback, ...feedbackLog]);
      setNewFeedback("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-800 px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Compliance Gateway
            </h1>
            <p className="text-sm text-slate-400">
              Deployment configuration, automated checks, and governance oversight.
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

        {/* Tab Navigation */}
        <div className="border-b border-slate-800 px-8 flex gap-1">
          <button
            onClick={() => setActiveTab("deployment")}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "deployment"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Deployment Workflow
          </button>
          <button
            onClick={() => setActiveTab("governance")}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "governance"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Governance Panel
          </button>
        </div>

        {/* DEPLOYMENT WORKFLOW TAB */}
        {activeTab === "deployment" && (
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* LEFT COLUMN */}
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
                        setConfig({
                          ...config,
                          projectName: e.target.value,
                        })
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

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Technical Checks */}
              <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  Technical Checks
                </h2>
                <p className="text-sm text-slate-400">
                  Automated rulebooks validating your deployment configuration.
                </p>

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

              {/* Review Results */}
              <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  Review Results
                </h2>
                <p className="text-sm text-slate-400">
                  Human approval required before deployment.
                </p>

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

                {/* Approver input */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-slate-200">
                    Approver name
                  </label>
                  <input
                    type="text"
                    value={config.approverName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        approverName: e.target.value,
                      })
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
                    By approving,{" "}
                    <strong>{config.approverName || "________"}</strong> confirms
                    they have reviewed the compliance results and authorise this
                    deployment to {config.deploymentType}.
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
        )}

        {/* GOVERNANCE PANEL TAB */}
        {activeTab === "governance" && (
          <div className="p-8 space-y-6">
            {/* Regulatory Review Schedule */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Regulatory Review Schedule
              </h2>
              <p className="text-sm text-slate-400">
                Track regulatory mapping currency and review deadlines.
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">
                      Last Review Date
                    </p>
                    <p className="text-sm font-semibold text-slate-100">
                      2024-12-10
                    </p>
                    <p className="text-xs text-slate-500 mt-1">EU DORA mappings</p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">
                      Next Review Due
                    </p>
                    <p className="text-sm font-semibold text-amber-300">
                      2025-01-10
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      In 25 days (flagged)
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    APAC (MAS/HKMA) Mappings
                  </p>
                  <p className="text-sm font-semibold text-slate-100">
                    Last Reviewed: 2024-11-15
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Next Review Due: 2025-02-15
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    US (Fed/SEC/OCC) Mappings
                  </p>
                  <p className="text-sm font-semibold text-slate-100">
                    Last Reviewed: 2024-12-01
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Next Review Due: 2025-03-01
                  </p>
                </div>
              </div>
            </section>

            {/* Guardrail Feedback Log */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Guardrail Feedback Log
              </h2>
              <p className="text-sm text-slate-400">
                Report regulatory mapping issues and edge cases.
              </p>

              {/* Add feedback form */}
              <div className="space-y-2">
                <textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="e.g., DORA Article 6 check not reflecting latest ECB guidance..."
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="2"
                />
                <button
                  onClick={handleAddFeedback}
                  className="text-sm px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  Report Issue
                </button>
              </div>

              {/* Feedback items */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {feedbackLog.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/60 border border-slate-800 rounded-xl p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-slate-100 font-medium">
                          {item.issue}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Reported by {item.reporter} on {item.date}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "Open"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Approval Audit History */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Approval Audit History
              </h2>
              <p className="text-sm text-slate-400">
                Searchable record of all deployment approvals.
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {approvalHistory.map((record) => (
                  <div
                    key={record.id}
                    className="bg-slate-950/60 border border-slate-800 rounded-xl p-3"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Approval ID</p>
                        <p className="text-slate-100 font-mono font-semibold">
                          {record.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Project</p>
                        <p className="text-slate-100">{record.project}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="text-slate-100">{record.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Approver</p>
                        <p className="text-slate-100">{record.approver}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Status</p>
                        <p className="text-emerald-300 font-semibold">
                          {record.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {approvalHistory.length === 0 && (
                  <p className="text-center text-slate-500 py-8">
                    No approvals recorded yet.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
