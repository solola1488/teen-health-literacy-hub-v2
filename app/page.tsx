'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  FileText,
  BarChart2,
  CheckCircle2,
  XCircle,
  Info,
  ShieldCheck,
  Pill,
  Search,
  ChevronRight,
  RotateCcw,
  Award,
  MessageSquare,
  Check
} from 'lucide-react';

// Extended survey metrics matching all survey question domains
const STATS_DATA = [
  {
    question: 'Clinical Terms Confusion',
    stat: '84%',
    detail: 'Teens cannot comfortably define clinical jargon like "NPO" or "Systemic vs. Localized".',
    color: 'from-rose-500 to-amber-500'
  },
  {
    question: 'Communication Barriers',
    stat: '71%',
    detail: 'Avoid asking doctors to explain terms due to intimidation or feeling rushed.',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    question: 'Insurance & Billing Basics',
    stat: '78%',
    detail: 'Do not fully understand Co-pays, Deductibles, or In-Network provider coverage.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    question: 'Appointment Aftermath',
    stat: '63%',
    detail: 'Report leaving clinics or pharmacies confused by instructions or dosage rules.',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    question: 'Appointment Self-Reliance',
    stat: '29%',
    detail: 'Feel confident speaking for themselves without relying entirely on a parent.',
    color: 'from-purple-500 to-pink-500'
  }
];

const DICTIONARY_TERMS = [
  {
    term: 'NPO (Nothing By Mouth)',
    category: 'Clinical Terms',
    definition: 'Medical instruction meaning you cannot eat or drink anything (including water) for a specified period.',
    tip: 'Often required before surgery or specific blood tests to prevent medical complications.'
  },
  {
    term: 'Benign vs. Malignant',
    category: 'Clinical Terms',
    definition: 'Benign means non-cancerous and harmless. Malignant means cancerous and capable of spreading.',
    tip: 'A benign growth may still be monitored or removed if it presses on surrounding tissue.'
  },
  {
    term: 'Acute vs. Chronic',
    category: 'Clinical Terms',
    definition: 'Acute conditions start suddenly and last a short time (e.g., flu). Chronic conditions develop slowly and last months or years (e.g., asthma).',
    tip: 'Chronic conditions require ongoing routine care rather than a single medicine cycle.'
  },
  {
    term: 'Inpatient vs. Outpatient Care',
    category: 'Care Access',
    definition: 'Inpatient requires staying overnight in a hospital. Outpatient means you go home the same day as your treatment.',
    tip: 'Outpatient visits are significantly cheaper than inpatient hospital stays.'
  },
  {
    term: 'Systemic vs. Localized',
    category: 'Clinical Terms',
    definition: 'Localized affects one specific body area (e.g., skin rash). Systemic affects your entire body system (e.g., viral fever).',
    tip: 'Oral pill antibiotics are usually systemic, while ointment medications are localized.'
  },
  {
    term: 'Co-pay (Copayment)',
    category: 'Insurance',
    definition: 'A fixed flat fee you pay out-of-pocket at the time of a medical visit or prescription pickup.',
    tip: 'Usually printed right on the front of your health insurance card!'
  },
  {
    term: 'Deductible',
    category: 'Insurance',
    definition: 'The total amount you must pay out-of-pocket each year for covered health services before your insurance starts paying.',
    tip: 'Higher monthly insurance plans (premiums) usually have lower deductibles.'
  },
  {
    term: 'In-Network vs. Out-of-Network',
    category: 'Insurance',
    definition: 'In-network doctors have a contract with your insurance for lower rates. Out-of-network doctors cost significantly more.',
    tip: 'Check your insurance app before booking a doctor to confirm they are in-network.'
  },
  {
    term: 'HIPAA',
    category: 'Rights',
    definition: 'Health Insurance Portability and Accountability Act. A federal law protecting your private medical records.',
    tip: 'In many states, teens have confidential care rights for certain sensitive health services.'
  },
  {
    term: 'Medical Consent Forms',
    category: 'Rights',
    definition: 'Legal agreements signed before treatment acknowledging you understand the risks, benefits, and procedures.',
    tip: 'Always read consent forms carefully before signing, and ask questions if anything is unclear.'
  },
  {
    term: 'OTC (Over-The-Counter)',
    category: 'Medication',
    definition: 'Medicine you can buy off the shelf without a doctor prescription (e.g., Advil, Tylenol, allergy pills).',
    tip: 'Check the "Drug Facts" label for proper dosage based on age and weight.'
  },
  {
    term: 'Generic vs. Brand Name',
    category: 'Medication',
    definition: 'Generic drugs have the exact same active ingredients as brand-name drugs but cost significantly less.',
    tip: 'Ask your pharmacist if a generic version is available to save money.'
  },
  {
    term: 'Active Ingredient',
    category: 'Medication',
    definition: 'The chemical component in a drug that actively treats your symptoms.',
    tip: 'Check active ingredients so you don\'t accidentally take two meds with the same chemical!'
  },
  {
    term: 'Refill vs. Renewal',
    category: 'Pharmacy',
    definition: 'A refill uses pre-authorized remaining doses. A renewal requires your doctor to write a brand new prescription.',
    tip: 'Call in refills at least 48 hours before running out.'
  },
  {
    term: 'Urgent Care vs. Emergency Room (ER)',
    category: 'Care Access',
    definition: 'Urgent Care handles non-life-threatening issues (sprains, flu). ER is reserved for life-threatening emergencies.',
    tip: 'Urgent Care is much faster and cheaper than an ER visit for minor injuries.'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'What does "NPO" mean if written on a patient pre-surgery chart?',
    options: [
      'No Pill Options available',
      'Nothing By Mouth (No food or liquids)',
      'Non-Prescription Order',
      'Normal Patient Observation'
    ],
    correct: 1,
    explanation: 'NPO stands for "Nil Per Os" (Latin for Nothing By Mouth). Patients must fast before surgery for medical safety.'
  },
  {
    question: 'What is the main difference between "Acute" and "Chronic" health conditions?',
    options: [
      'Acute conditions last for years; Chronic starts suddenly and ends fast',
      'Acute conditions start suddenly and end quickly; Chronic conditions last months or years',
      'Acute conditions only happen to teens',
      'There is no difference between them'
    ],
    correct: 1,
    explanation: 'Acute conditions (like flu or sore throat) appear rapidly. Chronic conditions (like asthma) require long-term management.'
  },
  {
    question: 'If a biopsy result returns as "Benign", what does that mean?',
    options: [
      'The growth is cancerous and urgent care is needed',
      'The growth is non-cancerous and harmless',
      'The test results were lost by the lab',
      'The patient requires immediate surgery'
    ],
    correct: 1,
    explanation: 'Benign means non-cancerous. Malignant refers to cancerous cells.'
  },
  {
    question: 'What stops many teens from asking doctors to clarify confusing medical jargon?',
    options: [
      'It is illegal to ask doctors questions',
      'Feeling embarrassed, intimidated, or assuming parents will handle it',
      'Doctors do not speak English',
      'Pharmacies do not allow questions'
    ],
    correct: 1,
    explanation: 'Over 70% of teens surveyed report feeling intimidated or assuming others will handle medical explanations.'
  },
  {
    question: 'What does "Inpatient Care" mean?',
    options: [
      'Care received at home via phone call',
      'Treatment that requires staying overnight in a hospital bed',
      'A routine visit where you leave after 20 minutes',
      'Buying medicine at a grocery store'
    ],
    correct: 1,
    explanation: 'Inpatient care requires hospital admission overnight. Outpatient care lets you go home the same day.'
  },
  {
    question: 'What is a "Medical Consent Form"?',
    options: [
      'A bill sent to your home address',
      'A legal document acknowledging you understand a treatment\'s risks and benefits',
      'A prescription for antibiotics',
      'An insurance identification card'
    ],
    correct: 1,
    explanation: 'Consent forms ensure you are fully informed before receiving any medical treatment or procedure.'
  },
  {
    question: 'What is the key difference between Systemic and Localized medical treatments?',
    options: [
      'Systemic affects your entire body system; Localized targets a specific body area',
      'Systemic is only for fever; Localized is for severe surgery',
      'Systemic treatments require a needle; Localized treatments are oral pills',
      'There is no difference between them'
    ],
    correct: 0,
    explanation: 'Systemic treatments travel through your bloodstream to affect the whole body, while localized treatments target one specific spot.'
  },
  {
    question: 'What is a health insurance "Co-pay"?',
    options: [
      'Paying half the medical bill with a friend',
      'A fixed flat fee you pay out-of-pocket at a doctor visit or pharmacy',
      'A monthly fee for owning health insurance',
      'The total bill sent home after 30 days'
    ],
    correct: 1,
    explanation: 'A co-pay is a set fee (such as $15 or $25) required at the time you receive medical care or collect prescriptions.'
  },
  {
    question: 'What is a health insurance "Deductible"?',
    options: [
      'The discount you get for paying in cash',
      'The amount you must pay out-of-pocket each year before insurance starts covering expenses',
      'The total number of doctors you can visit',
      'A tax refund for medical costs'
    ],
    correct: 1,
    explanation: 'Your deductible is the annual amount you pay for covered services before your insurance policy kicks in.'
  },
  {
    question: 'Why should you check the "Active Ingredients" on Over-The-Counter (OTC) medications?',
    options: [
      'To make sure the bottle is full',
      'To avoid taking double doses of the same chemical from two different products',
      'To check the expiration year',
      'To verify the flavor'
    ],
    correct: 1,
    explanation: 'Many different brand-name medicines share the exact same active ingredients (e.g., Acetaminophen in Tylenol and cold meds).'
  }
];

const LABEL_POINTS = [
  {
    id: 'rx-num',
    title: 'Rx Number (#)',
    desc: 'Your unique prescription ID number. Call this number into the pharmacy automated phone system or app when requesting a refill.'
  },
  {
    id: 'patient-info',
    title: 'Patient & Prescriber Details',
    desc: 'Confirms your legal name, the doctor who prescribed the medication, and the date the prescription was filled.'
  },
  {
    id: 'dosage',
    title: 'Directions & Dosage',
    desc: 'Tells you exactly how much to take, how often, and special instructions like taking with meals or water.'
  },
  {
    id: 'refills',
    title: 'Refills Remaining',
    desc: 'Shows how many times your doctor has pre-approved the pharmacy to refill this medication before a new script is needed.'
  },
  {
    id: 'warnings',
    title: 'Warning Labels',
    desc: 'Critical safety notes (e.g., "May cause drowsiness", "Do not drive while taking", "Finish all medicine").'
  }
];

const DOCTOR_QUESTIONS = [
  { id: 1, q: 'What is my main health problem or diagnosis?', tip: 'Helps you understand exactly why you are receiving care.' },
  { id: 2, q: 'What do I need to do next, and how do I do it?', tip: 'Clarifies action steps like taking medicine or getting tests.' },
  { id: 3, q: 'Why is it important for me to do this?', tip: 'Helps you understand the risks of ignoring treatment.' },
  { id: 4, q: 'Are there any side effects I should watch out for?', tip: 'Prepares you for normal vs. dangerous body reactions.' }
];

export default function TeenHealthHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'dictionary' | 'quiz' | 'label'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Auto-rotating survey carousel state (continuous auto-cycle)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Doctor checklist state
  const [checkedQuestions, setCheckedQuestions] = useState<number[]>([]);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Label Guide State
  const [activeLabelPoint, setActiveLabelPoint] = useState<string>('rx-num');

  // Continuous auto-slide effect
  useEffect(() => {
    if (activeTab !== 'dashboard') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % STATS_DATA.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeTab]);

  const categories = ['All', 'Clinical Terms', 'Insurance', 'Rights', 'Care Access', 'Medication', 'Pharmacy'];

  const filteredTerms = DICTIONARY_TERMS.filter((t) => {
    const matchesSearch =
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCheckQuestion = (id: number) => {
    setCheckedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      {/* --- HEADER --- */}
      <header className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Pill className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Teen Health Literacy Hub</h1>
                <p className="text-[11px] sm:text-xs text-teal-100 font-medium">Empowering youth with medical & prescription knowledge</p>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex bg-black/20 p-1 rounded-xl gap-1 w-full sm:w-auto overflow-x-auto no-scrollbar shrink-0">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
              { id: 'dictionary', label: 'Medical Term Guide', icon: BookOpen },
              { id: 'label', label: 'Rx Guide', icon: FileText },
              { id: 'quiz', label: 'Quiz', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-teal-700 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* --- TAB 1: DASHBOARD --- */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Continuous Auto-Cycling Survey Insights */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Survey Insights</h2>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 w-fit">
                    65 Local Teen Responses
                  </span>
                </div>

                {/* Sliding Stat Card Container */}
                <div className="min-h-[150px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                      className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 p-5 rounded-2xl border border-slate-100"
                    >
                      <div className="md:col-span-1 text-center md:text-left">
                        <span className={`inline-block text-4xl sm:text-5xl font-black bg-gradient-to-r ${STATS_DATA[currentSlide].color} bg-clip-text text-transparent`}>
                          {STATS_DATA[currentSlide].stat}
                        </span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                          {STATS_DATA[currentSlide].question}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                          "{STATS_DATA[currentSlide].detail}"
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {STATS_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === idx ? 'w-6 bg-teal-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('dictionary')}
                  className="bg-teal-50 border border-teal-200 p-5 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
                >
                  <BookOpen className="w-7 h-7 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-teal-900">Medical Term Guide</h3>
                  <p className="text-xs text-teal-700 mt-1">Master NPO, Acute vs. Chronic, HIPAA, and insurance terms.</p>
                </div>

                <div
                  onClick={() => setActiveTab('label')}
                  className="bg-cyan-50 border border-cyan-200 p-5 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
                >
                  <FileText className="w-7 h-7 text-cyan-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-cyan-900">Rx Label Decoder</h3>
                  <p className="text-xs text-cyan-700 mt-1">Learn how to safely read medication bottles and warning signs.</p>
                </div>

                <div
                  onClick={() => setActiveTab('quiz')}
                  className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
                >
                  <HelpCircle className="w-7 h-7 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-indigo-900">Knowledge Quiz</h3>
                  <p className="text-xs text-indigo-700 mt-1">Test your health literacy across 10 real-world scenario questions.</p>
                </div>
              </div>

              {/* Interactive Doctor Visit Checklist */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Interactive Doctor Visit Checklist</h3>
                    <p className="text-xs text-slate-500">Tap questions to check them off before your next appointment!</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DOCTOR_QUESTIONS.map((item) => {
                    const isChecked = checkedQuestions.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheckQuestion(item.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isChecked ? 'text-emerald-900 line-through' : 'text-slate-800'}`}>
                            {item.q}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.tip}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* --- TAB 2: MEDICAL TERM GUIDE --- */}
          {activeTab === 'dictionary' && (
            <motion.div
              key="dictionary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Medical Term Guide</h2>
                  <p className="text-xs text-slate-500">Showing {filteredTerms.length} terms • Tap any card to reveal healthcare tips!</p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search terms or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTerms.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[170px]"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                            {item.category}
                          </span>
                          <Info className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.term}</h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.definition}</p>
                      </div>

                      {flippedCard === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-3 border-t border-teal-100 bg-teal-50/60 p-2.5 rounded-xl"
                        >
                          <p className="text-xs font-medium text-teal-800">
                            💡 <strong>Tip:</strong> {item.tip}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-700">No matching terms found</h3>
                  <p className="text-xs text-slate-400 mt-1">Try resetting your category filter or search keywords.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* --- TAB 3: RX LABEL VISUAL GUIDE --- */}
          {activeTab === 'label' && (
            <motion.div
              key="label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Prescription Label Visual Guide</h2>
                <p className="text-xs text-slate-500">Tap an element on the bottle or list to see how to read your medication.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                {/* Mock Bottle Graphic */}
                <div className="bg-amber-50/80 p-5 sm:p-6 rounded-2xl border-2 border-amber-200 flex flex-col items-center">
                  <div className="w-full max-w-xs bg-amber-600/10 border-2 border-amber-600 rounded-2xl p-3.5 sm:p-4 space-y-3 relative shadow-inner">
                    <div className="bg-white p-3.5 rounded-xl border border-amber-300 shadow-sm space-y-2 text-slate-800 text-xs">
                      <div
                        onClick={() => setActiveLabelPoint('patient-info')}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${
                          activeLabelPoint === 'patient-info'
                            ? 'bg-amber-200/80 ring-2 ring-amber-400 font-bold'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">PATIENT / PRESCRIBER</span>
                        Alex Taylor • Dr. S. Smith
                      </div>

                      <div
                        onClick={() => setActiveLabelPoint('rx-num')}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${
                          activeLabelPoint === 'rx-num'
                            ? 'bg-amber-200/80 ring-2 ring-amber-400 font-bold'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">Rx #</span>
                        1234567-8900
                      </div>

                      <div
                        onClick={() => setActiveLabelPoint('dosage')}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${
                          activeLabelPoint === 'dosage'
                            ? 'bg-amber-200/80 ring-2 ring-amber-400 font-bold'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">INSTRUCTIONS</span>
                        Take 1 tablet daily by mouth with food.
                      </div>

                      <div
                        onClick={() => setActiveLabelPoint('refills')}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${
                          activeLabelPoint === 'refills'
                            ? 'bg-amber-200/80 ring-2 ring-amber-400 font-bold'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 block">REFILLS</span>
                        3 Refills remaining before 12/31
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveLabelPoint('warnings')}
                      className={`bg-rose-500 text-white text-[10px] font-bold text-center py-2 rounded-lg cursor-pointer transition-all ${
                        activeLabelPoint === 'warnings' ? 'ring-2 ring-rose-300 scale-105' : 'hover:bg-rose-600'
                      }`}
                    >
                      ⚠️ WARNING: MAY CAUSE DROWSINESS
                    </div>
                  </div>
                </div>

                {/* Point Explanations */}
                <div className="space-y-3">
                  {LABEL_POINTS.map((pt) => {
                    const isSelected = activeLabelPoint === pt.id;
                    return (
                      <div
                        key={pt.id}
                        onClick={() => setActiveLabelPoint(pt.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500'
                            : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                          <ChevronRight className={`w-4 h-4 text-teal-600 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                          {pt.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 pl-6 leading-relaxed">{pt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* --- TAB 4: QUIZ (10 QUESTIONS) --- */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                {!showResults ? (
                  <div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                      <div
                        className="bg-teal-600 h-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Score: {score}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5">
                      {QUIZ_QUESTIONS[currentQuestion].question}
                    </h3>

                    <div className="space-y-3 mb-6">
                      {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === QUIZ_QUESTIONS[currentQuestion].correct;
                        let btnStyle = 'bg-slate-50 border-slate-200 hover:border-teal-300 text-slate-700';

                        if (selectedOption !== null) {
                          if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          else if (isSelected) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                        }

                        return (
                          <button
                            key={idx}
                            disabled={selectedOption !== null}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                            {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOption !== null && (
                      <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-200">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          💡 {QUIZ_QUESTIONS[currentQuestion].explanation}
                        </p>
                      </div>
                    )}

                    <button
                      disabled={selectedOption === null}
                      onClick={nextQuestion}
                      className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 disabled:opacity-40 transition-colors"
                    >
                      {currentQuestion + 1 === QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                      {score >= 8 ? (
                        <Award className="w-10 h-10" />
                      ) : (
                        <ShieldCheck className="w-10 h-10" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Quiz Complete!</h3>
                    <p className="text-sm text-slate-600">
                      You scored <strong>{score}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong> questions correctly.
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl max-w-sm mx-auto text-xs text-slate-500">
                      {score >= 8
                        ? '🎉 Master level! You are officially a Health Literacy Champion.'
                        : 'Good effort! Review the Medical Term Guide to master remaining terms.'}
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-400">
          Teen Health Literacy Hub • Designed for student empowerment and educational research.
        </div>
      </footer>
    </div>
  );
}
