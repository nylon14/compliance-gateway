import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, Clock, FileText, Lock, Code,
  GitBranch, Server, Globe, ChevronRight, Activity, Eye, Download, RefreshCw,
  User, Calendar, Layers, Flag, Info, AlertCircle, Settings, Home,
  Edit3, Save, X, Plus, Trash2, Play, Database, Cpu, Building2
} from 'lucide-react';

// Regional compliance configurations
const regions = [
  {
    id: 'ch',
    name: 'Switzerland (FINMA)',
    flag: '🇨🇭',
    checks: [
      { id: 'finma-1', name: 'FINMA Circular 2023/1 - Operational Risks', category: 'Regulatory' },
      { id: 'finma-2', name: 'Swiss Banking Act Compliance', category: 'Regulatory' },
      { id: 'finma-3', name: 'Data Localisation Requirements', category: 'Data' },
      { id: 'finma-4', name: 'Cross-border Data Transfer Assessment', category: 'Data' },
      { id: 'finma-5', name: 'Audit Trail Requirements (7 years)', category: 'Audit' },
    ]
  },
  {
    id: 'eu',
    name: 'European Union (DORA)',
    flag: '🇪🇺',
    checks: [
      { id: 'dora-1', name: 'DORA Article 6 - ICT Risk Management', category: 'Regulatory' },
      { id: 'dora-2', name: 'DORA Article 10 - Detection Requirements', category: 'Regulatory' },
      { id: 'dora-3', name: 'GDPR Data Processing Compliance', category: 'Data' },
      { id: 'dora-4', name: 'Third-party ICT Provider Assessment', category: 'Vendor' },
      { id: 'dora-5', name: 'Incident Reporting Capability', category: 'Operations' },
    ]
  },
  {
    id: 'us',
    name: 'United States (Fed/SEC)',
    flag: '🇺🇸',
    checks: [
      { id: 'us-1', name: 'SOX Section 404 - Internal Controls', category: 'Regulatory' },
      { id: 'us-2', name: 'SEC Reg S-P - Privacy Requirements', category: 'Data' },
      { id: 'us-3', name: 'FFIEC IT Examination Handbook', category: 'Regulatory' },
      { id: 'us-4', name: 'OCC Heightened Standards', category: 'Operations' },
      { id: 'us-5', name: 'BSA/AML Technology Controls', category: 'Compliance' },
    ]
  },
  {
    id: 'apac',
    name: 'APAC (MAS/HKMA)',
    flag: '🇸🇬',
    checks: [
      { id: 'apac-1', name: 'MAS TRM Guidelines 2021', category: 'Regulatory' },
      { id: 'apac-2', name: 'HKMA OR-2 Operational Resilience', category: 'Regulatory' },
      { id: 'apac-3', name: 'PDPA Singapore Compliance', category: 'Data' },
      { id: 'apac-4', name: 'Cross-jurisdiction Data Flow', category: 'Data' },
      { id: 'apac-5', name: 'Cloud Outsourcing Guidelines', category: 'Vendor' },
    ]
  }
];

// Standard technical checks
const technicalChecks = [
  { id: 'tech-1', name: 'SonarQube Code Quality Gate', category: 'Code Quality', source: 'SonarQube' },
  { id: 'tech-2', name: 'Security Vulnerability Scan (SAST)', category: 'Security', source: 'SonarQube' },
  { id: 'tech-3', name: 'Dependency Vulnerability Check', category: 'Security', source: 'Snyk' },
  { id: 'tech-4', name: 'Container Image Scan', category: 'Security', source: 'Trivy' },
  { id: 'tech-5', name: 'Unit Test Coverage (>80%)', category: 'Testing', source: 'Jest' },
  { id: 'tech-6', name: 'Integration Test Suite', category: 'Testing', source: 'Cypress' },
  { id: 'tech-7', name: 'API Contract Validation', category: 'Integration', source: 'Pact' },
  { id: 'tech-8', name: 'Performance Baseline Check', category: 'Performance', source: 'K6' },
];

// Governance data store
const governanceData = {
  lastReview: '2025-11-15',
  nextReview: '2026-05-15',
  feedbackLog: [
    { date: '2025-12-10', issue: 'DORA Article 10 clarification needed', status: 'Resolved', reporter: 'Risk Team' },
    { date: '2025-11-20', issue: 'MAS TRM 2025 guideline update', status: 'Resolved', reporter: 'APAC Compliance' },
    { date: '2025-10-05', issue: 'FINMA Circular mapping error', status: 'Open', reporter: 'Swiss Ops' },
  ],
  auditHistory: [
    { id: 'APR-8XK4M', project: 'cash-transactions-api', date: '2025-12-16', status: 'Approved', approver: 'J. Smith' },
    { id: 'APR-7J2LP', project: 'payments-gateway', date: '2025-12-14', status: 'Approved', approver: 'M. Chen' },
    { id: 'APR-6N9QR', project: 'client-onboarding', date: '2025-12-12', status: 'Approved', approver: 'A. Kumar' },
  ]
};

// Simulate async check with random delay
const simulateCheck = (checkId) => {
  return new Promise((resolve) => {
    const delay = 500 + Math.random() * 1500;
    setTimeout(() => {
      // 95% pass rate for demo
      const passed = Math.random() > 0.05;
      resolve({ checkId, passed, duration: Math.round(delay) });
    }, delay);
  });
};

// Status badge component
const StatusBadge = ({ status }) => {
  const configs = {
    passed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Passed' },
    failed: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Failed' },
    running: { bg: 'bg-blue-100', text: 'text-blue-700', icon: RefreshCw, label: 'Running' },
    pending: { bg: 'bg-slate-100', text: 'text-slate-500', icon: Clock, label: 'Pending' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-700', icon: AlertTriangle, label: 'Warning' },
  };
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon size={14} className={status === 'running' ? 'animate-spin' : ''} />
      {config.label}
    </span>
  );
};

// Check item row component
const CheckItem = ({ check, status, duration }) => {
  const categoryColors = {
    Regulatory: 'bg-purple-100 text-purple-700',
    Data: 'bg-blue-100 text-blue-700',
    Security: 'bg-red-100 text-red-700',
    Audit: 'bg-amber-100 text-amber-700',
    Vendor: 'bg-orange-100 text-orange-700',
    Operations: 'bg-teal-100 text-teal-700',
    Compliance: 'bg-indigo-100 text-indigo-700',
    'Code Quality': 'bg-green-100 text-green-700',
    Testing: 'bg-cyan-100 text-cyan-700',
    Integration: 'bg-pink-100 text-pink-700',
    Performance: 'bg-violet-100 text-violet-700',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === 'passed' ? 'bg-emerald-100' : status === 'failed' ? 'bg-red-100' : 'bg-slate-100'}`}>
          {status === 'passed' ? <CheckCircle className="text-emerald-600" size={20} /> :
           status === 'failed' ? <XCircle className="text-red-600" size={20} /> :
           status === 'running' ? <RefreshCw className="text-blue-600 animate-spin" size={20} /> :
           <Clock className="text-slate-400" size={20} />}
        </div>
        <div>
          <p className="font-medium text-slate-800">{check.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[check.category] || 'bg-slate-100 text-slate-600'}`}>
              {check.category}
            </span>
            {check.source && (
              <span className="text-xs text-slate-500">via {check.source}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {duration && <span className="text-sm text-slate-500">{duration}ms</span>}
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

// Progress stepper component
const ProgressStepper = ({ current }) => {
  const steps = ['Configuration', 'Scanning', 'Review', 'Approved'];
  const currentIndex = steps.indexOf(current);
  
  return (
    <div className="flex items-center justify-center my-8 px-4">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < currentIndex ? 'bg-emerald-600 text-white' :
              i === currentIndex ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' :
              'bg-slate-200 text-slate-500'
            }`}>
              {i < currentIndex ? <CheckCircle size={20} /> : i + 1}
            </div>
            <span className={`mt-2 text-sm font-medium ${
              i <= currentIndex ? 'text-emerald-700' : 'text-slate-400'
            }`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all ${
              i < currentIndex ? 'bg-emerald-600' : 'bg-slate-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Admin Panel component
const AdminPanel = ({ onBackToDashboard }) => {
  const [editingReview, setEditingReview] = useState(false);
  const [tempLastReview, setTempLastReview] = useState(governanceData.lastReview);
  const [tempNextReview, setTempNextReview] = useState(governanceData.nextReview);
  const [newFeedback, setNewFeedback] = useState('');

  const handleSaveReview = () => {
    governanceData.lastReview = tempLastReview;
    governanceData.nextReview = tempNextReview;
    setEditingReview(false);
  };

  const handleAddFeedback = () => {
    if (newFeedback.trim()) {
      governanceData.feedbackLog.unshift({
        date: new Date().toISOString().slice(0, 10),
        issue: newFeedback,
        status: 'Open',
        reporter: 'Current User'
      });
      setNewFeedback('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Governance Panel</h1>
              <p className="text-slate-500">Manage regulatory mappings and review schedules</p>
            </div>
          </div>
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
          >
            <Home size={18} />
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Review Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar size={22} className="text-emerald-600" />
              Regulatory Review Schedule
            </h2>
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl">
                <label className="block text-sm font-medium text-slate-600 mb-2">Last Review</label>
                {editingReview ? (
                  <input
                    type="date"
                    value={tempLastReview}
                    onChange={(e) => setTempLastReview(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <p className="text-xl font-semibold text-slate-800">
                    {new Date(governanceData.lastReview).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <label className="block text-sm font-medium text-amber-700 mb-2">Next Review Due</label>
                {editingReview ? (
                  <input
                    type="date"
                    value={tempNextReview}
                    onChange={(e) => setTempNextReview(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <p className="text-xl font-semibold text-amber-800">
                    {new Date(governanceData.nextReview).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                {editingReview ? (
                  <>
                    <button onClick={handleSaveReview} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all">
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button onClick={() => setEditingReview(false)} className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all">
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditingReview(true)} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all">
                    <Edit3 size={18} />
                    Edit Schedule
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Feedback Log */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Flag size={22} className="text-emerald-600" />
              Guardrail Feedback Log
            </h2>
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Report a regulatory mapping issue..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={handleAddFeedback}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {governanceData.feedbackLog.map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 text-sm">{item.issue}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.date} • {item.reporter}</p>
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={22} className="text-emerald-600" />
              Recent Approval History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Approval ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Project</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Approver</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {governanceData.auditHistory.map((audit) => (
                    <tr key={audit.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4 font-mono text-emerald-700 font-medium">{audit.id}</td>
                      <td className="py-4 px-4 text-slate-800">{audit.project}</td>
                      <td className="py-4 px-4 text-slate-600">{new Date(audit.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-slate-600">{audit.approver}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {audit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Governance Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
          <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Continuous Oversight Required</p>
            <p className="text-sm text-blue-700 mt-1">
              This tool accelerates compliance validation but requires ongoing human review to ensure guardrails remain aligned with evolving regulatory requirements. Schedule regular reviews with Risk and Compliance stakeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function ComplianceDashboard() {
  const [mode, setMode] = useState('dashboard');
  const [stage, setStage] = useState('config');
  const [config, setConfig] = useState({
    projectName: '',
    region: '',
    riskTier: 'standard',
    deploymentType: 'production',
    approverName: '',
    approverEmail: ''
  });
  const [checkResults, setCheckResults] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  const [approvalId, setApprovalId] = useState('');

  const selectedRegion = regions.find(r => r.id === config.region);
  const allChecks = [
    ...technicalChecks,
    ...(selectedRegion?.checks || [])
  ];

  const runChecks = async () => {
    setIsScanning(true);
    setStage('scanning');
    
    // Initialize all as pending
    const initialResults = {};
    allChecks.forEach(check => {
      initialResults[check.id] = { status: 'pending', duration: null };
    });
    setCheckResults(initialResults);

    // Run checks sequentially with visual feedback
    for (const check of allChecks) {
      setCheckResults(prev => ({
        ...prev,
        [check.id]: { status: 'running', duration: null }
      }));
      
      const result = await simulateCheck(check.id);
      
      setCheckResults(prev => ({
        ...prev,
        [check.id]: { 
          status: result.passed ? 'passed' : 'failed', 
          duration: result.duration 
        }
      }));
    }

    setIsScanning(false);
    setStage('review');
  };

  const handleApprove = () => {
    const id = `APR-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setApprovalId(id);
    governanceData.auditHistory.unshift({
      id,
      project: config.projectName,
      date: new Date().toISOString().slice(0, 10),
      status: 'Approved',
      approver: config.approverName
    });
    setStage('approved');
  };

  const resetDashboard = () => {
    setStage('config');
    setConfig({
      projectName: '',
      region: '',
      riskTier: 'standard',
      deploymentType: 'production',
      approverName: '',
      approverEmail: ''
    });
    setCheckResults({});
    setApprovalId('');
  };

  const passedCount = Object.values(checkResults).filter(r => r.status === 'passed').length;
  const failedCount = Object.values(checkResults).filter(r => r.status === 'failed').length;
  const totalChecks = allChecks.length;

  if (mode === 'admin') {
    return <AdminPanel onBackToDashboard={() => setMode('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Deployment Compliance Gateway</h1>
              <p className="text-xs text-slate-500">Automated validation with human oversight</p>
            </div>
          </div>
          <button
            onClick={() => setMode('admin')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Governance</span>
          </button>
        </div>
      </header>

      <ProgressStepper current={stage === 'config' ? 'Configuration' : stage === 'scanning' ? 'Scanning' : stage === 'review' ? 'Review' : 'Approved'} />

      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Configuration Stage */}
        {stage === 'config' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Layers size={24} className="text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Deployment Configuration</h2>
                <p className="text-sm text-slate-500">Configure your deployment for compliance validation</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Project / Application Name</label>
                <div className="relative">
                  <Code size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={config.projectName}
                    onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
                    placeholder="e.g., cash-transactions-api"
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Region Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Deployment Region</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setConfig({ ...config, region: region.id })}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        config.region === region.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{region.flag}</span>
                      <p className="text-sm font-medium text-slate-800 mt-2">{region.name.split(' (')[0]}</p>
                      <p className="text-xs text-slate-500">{region.name.match(/\(([^)]+)\)/)?.[1]}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Tier */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tier</label>
                  <select
                    value={config.riskTier}
                    onChange={(e) => setConfig({ ...config, riskTier: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="low">Low - Internal tools</option>
                    <option value="standard">Standard - Client-facing</option>
                    <option value="high">High - Financial transactions</option>
                    <option value="critical">Critical - Core banking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deployment Type</label>
                  <select
                    value={config.deploymentType}
                    onChange={(e) => setConfig({ ...config, deploymentType: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                    <option value="dr">Disaster Recovery</option>
                  </select>
                </div>
              </div>

              {/* Approver Details */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <User size={18} className="text-amber-600" />
                  <span className="font-medium text-amber-800">Human Approval Gate</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={config.approverName}
                    onChange={(e) => setConfig({ ...config, approverName: e.target.value })}
                    placeholder="Approver Name"
                    className="px-4 py-2.5 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    value={config.approverEmail}
                    onChange={(e) => setConfig({ ...config, approverEmail: e.target.value })}
                    placeholder="Approver Email"
                    className="px-4 py-2.5 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={runChecks}
                disabled={!config.projectName || !config.region || !config.approverName}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200"
              >
                <Play size={20} />
                Begin Compliance Scan
              </button>
            </div>
          </div>
        )}

        {/* Scanning Stage */}
        {stage === 'scanning' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Activity size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Scanning: {config.projectName}</h2>
                    <p className="text-sm text-slate-500">{selectedRegion?.name} • {config.riskTier} risk tier</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{passedCount}/{totalChecks}</p>
                  <p className="text-xs text-slate-500">checks passed</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                  style={{ width: `${((passedCount + failedCount) / totalChecks) * 100}%` }}
                />
              </div>

              {/* Technical Checks */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code size={16} />
                  Technical Checks
                </h3>
                <div className="space-y-2">
                  {technicalChecks.map(check => (
                    <CheckItem 
                      key={check.id} 
                      check={check} 
                      status={checkResults[check.id]?.status || 'pending'}
                      duration={checkResults[check.id]?.duration}
                    />
                  ))}
                </div>
              </div>

              {/* Regional Checks */}
              {selectedRegion && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Globe size={16} />
                    {selectedRegion.name} Regional Checks
                  </h3>
                  <div className="space-y-2">
                    {selectedRegion.checks.map(check => (
                      <CheckItem 
                        key={check.id} 
                        check={check} 
                        status={checkResults[check.id]?.status || 'pending'}
                        duration={checkResults[check.id]?.duration}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Review Stage */}
        {stage === 'review' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Eye size={22} className="text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Review Results</h2>
                    <p className="text-sm text-slate-500">Human approval required before deployment</p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <p className="text-3xl font-bold text-emerald-700">{passedCount}</p>
                  <p className="text-sm text-emerald-600">Passed</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-center">
                  <p className="text-3xl font-bold text-red-700">{failedCount}</p>
                  <p className="text-sm text-red-600">Failed</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-3xl font-bold text-slate-700">{totalChecks}</p>
                  <p className="text-sm text-slate-600">Total</p>
                </div>
              </div>

              {/* Check Results Summary */}
              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {allChecks.map(check => (
                  <CheckItem 
                    key={check.id} 
                    check={check} 
                    status={checkResults[check.id]?.status || 'pending'}
                    duration={checkResults[check.id]?.duration}
                  />
                ))}
              </div>

              {/* Approval Section */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-amber-800">Human Approval Required</p>
                    <p className="text-sm text-amber-700 mt-1">
                      By approving, <strong>{config.approverName}</strong> confirms they have reviewed the compliance results and authorise this deployment to {config.deploymentType}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={resetDashboard}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={failedCount > 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200"
                >
                  <Lock size={18} />
                  Approve Deployment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Approved Stage */}
        {stage === 'approved' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Deployment Approved</h2>
            <p className="text-slate-600 mb-6">
              {config.projectName} has been approved for {config.deploymentType} deployment in {selectedRegion?.name}
            </p>
            
            <div className="inline-block p-4 bg-slate-50 rounded-xl mb-6">
              <p className="text-sm text-slate-500">Approval ID</p>
              <p className="text-2xl font-mono font-bold text-emerald-700">{approvalId}</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 text-left">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Audit Trail Created</p>
                  <p className="text-sm text-blue-700 mt-1">
                    This approval has been logged with full evidence trail. Approved by {config.approverName} on {new Date().toLocaleDateString()}.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={resetDashboard}
              className="px-8 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-all"
            >
              Start New Deployment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
