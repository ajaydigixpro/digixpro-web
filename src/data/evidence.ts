export interface EvidenceItem {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
}

export const evidenceItems: EvidenceItem[] = [
  { id: "buy-secondhand-book", title: "Buy Second Hand Books Marketplace", category: "Marketplace", lastUpdated: "2024-01-15" },
  { id: "scan-centre-near-me", title: "Scan Centre Near Me", category: "Healthcare", lastUpdated: "2023-11-20" },
  { id: "sattvaos", title: "SattvaOS AI Architecture", category: "Artificial Intelligence", lastUpdated: "2024-03-10" },
  { id: "muktibodh", title: "Muktibodh Publishing System", category: "Publishing", lastUpdated: "2023-09-05" },
  { id: "nirvandham", title: "Nirvandham Operations", category: "Business Systems", lastUpdated: "2024-02-28" },
  { id: "enterprise-crm-automation", title: "Enterprise CRM Automation", category: "Automation", lastUpdated: "2023-12-12" },
  { id: "b2b-vendor-portal", title: "B2B Vendor Portal", category: "Marketplace", lastUpdated: "2024-04-01" },
  { id: "edtech-knowledge-system", title: "EdTech Knowledge System", category: "Platform", lastUpdated: "2024-05-15" }
];