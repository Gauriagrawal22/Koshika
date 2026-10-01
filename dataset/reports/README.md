# STEMBRIDGE AI & KOSHIKA - Comprehensive Clinical & Non-Clinical Benchmark Dataset

This dataset provides **104 high-resolution PDF documents** (52 authentic medical diagnostic reports and 52 realistic non-medical documents) paired with structured JSON and CSV ground-truth data.

## Directory Layout

```text
dataset/reports/
|-- medical/                             52 Medical Report PDFs
|-- non_medical/                         52 Non-Medical Document PDFs
|-- medical_reports_dataset.json         Structured JSON containing all 52 medical reports
|-- non_medical_reports_dataset.json     Structured JSON containing all 52 non-medical records
|-- reports_classification_benchmark.csv Ground-truth evaluation table (104 rows)
`-- README.md                            This documentation
```

## Dataset Summary Statistics

| Class | Count | Format | Primary Use Case | Expected Gatekeeper Action |
|---|---|---|---|---|
| **Medical Reports** | **52** | PDF + JSON | BMT, Stem Cell, Flow Cytometry, HLA, Cytogenetics | **ACCEPTED** (Parsed & Verified) |
| **Non-Medical Documents** | **52** | PDF + JSON | Invoices, Boarding Passes, Resumes, Utility Bills | **REJECTED** (EHR Integrity Guard) |
| **Total Benchmark** | **104** | PDF + JSON + CSV | OCR, LLM Information Extraction, Document Classification | 100% Precision Filter |

Generated on: 2026-09-14 23:07:04
