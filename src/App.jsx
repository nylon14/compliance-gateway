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
