import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Award,
  Dna,
  Layers,
  Activity,
  Heart,
  Snowflake,
  FileCheck,
  Sparkles,
  Info,
  User,
  FileText,
  Search,
  Stethoscope,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

// Comprehensive localized episode storyboards with synchronized multi-phase scene scripts
export const EPISODE_STORYBOARDS = {
  v1: {
    slug: 'ep1',
    durationSeconds: 48,
    scenes: [
      {
        startPct: 0,
        endPct: 28,
        badge: {
          en: 'Cellular Self-Renewal',
          hi: 'कोशिकीय आत्म-नवीनीकरण',
          mr: 'पेशीय आत्म-नूतनीकरण'
        },
        title: {
          en: 'The Master Stem Cell: Pristine & Undifferentiated',
          hi: 'मास्टर स्टेम कोशिका: शुद्ध एवं अविभेदित',
          mr: 'मास्टर स्टेम पेशी: शुद्ध आणि अविभाजित'
        },
        caption: {
          en: 'Stem cells are special unspecialized cells in the human body that can continuously renew themselves through symmetrical division.',
          hi: 'स्टेम कोशिकाएं मानव शरीर की विशेष कोशिकाएं हैं जो सममित विभाजन के माध्यम से स्वयं को लगातार नवीनीकृत कर सकती हैं।',
          mr: 'स्टेम पेशी या मानवी शरीरातील अशा विशेष पेशी असतात ज्या स्वतःचे विभाजन करून स्वतःचे निरंतर नूतनीकरण करू शकतात.'
        },
        visualType: 'stem_cell_pulse'
      },
      {
        startPct: 28,
        endPct: 56,
        badge: {
          en: 'Differentiation Cascade',
          hi: 'विशेषज्ञता विभाजन',
          mr: 'विशेषीकरण प्रक्रिया'
        },
        title: {
          en: 'Branching into Specialized Biological Lineages',
          hi: 'विशिष्ट जैविक कोशिकाओं में रूपांतरण',
          mr: 'विशिष्ट जैविक पेशींमध्ये रूपांतर'
        },
        caption: {
          en: 'Upon receiving chemical signals, a stem cell differentiates and transforms into mature cells tailored to perform vital bodily tasks.',
          hi: 'रासायनिक संकेत मिलने पर, स्टेम कोशिकाएं शरीर के महत्वपूर्ण कार्य करने के लिए परिपक्व कोशिकाओं में बदल जाती हैं।',
          mr: 'रासायनिक संकेत मिळाल्यावर, स्टेम पेशी शरीराची महत्त्वाची कामे करण्यासाठी आवश्यक असणाऱ्या परिपक्व पेशींमध्ये रूपांतरित होतात.'
        },
        visualType: 'differentiation_branch'
      },
      {
        startPct: 56,
        endPct: 80,
        badge: {
          en: 'Tri-Lineage Specialization',
          hi: 'त्रि-कोशिकीय विशेषज्ञता',
          mr: 'त्रि-पेशीय विशेषीकरण'
        },
        title: {
          en: 'Forming Blood, Bone Matrix, and Neural Networks',
          hi: 'रक्त, अस्थि ढांचा और तंत्रिका नेटवर्क का निर्माण',
          mr: 'रक्त, हाडे आणि मज्जातंतू जाळ्यांची निर्मिती'
        },
        caption: {
          en: 'They develop into red blood cells (erythrocytes), structural bone cells (osteocytes), and signal-conducting neurons in the nervous system.',
          hi: 'ये लाल रक्त कोशिकाओं (एरिथ्रोसाइट्स), अस्थि कोशिकाओं (ओस्टियोसाइट्स) और तंत्रिका तंत्र के न्यूरॉन्स में विकसित होती हैं।',
          mr: 'या लाल रक्तपेशी (एरिथ्रोसाइट्स), हाडांच्या पेशी (ऑस्टिओसाइट्स) आणि मज्जासंस्थेतील न्यूरॉन्समध्ये विकसित होतात.'
        },
        visualType: 'blood_bone_nerve'
      },
      {
        startPct: 80,
        endPct: 100,
        badge: {
          en: 'Body Repair System',
          hi: 'प्राकृतिक शारीरिक मरम्मत',
          mr: 'नैसर्गिक शरीर दुरुस्ती'
        },
        title: {
          en: 'Restoring Damaged Tissues & Replenishing Immunity',
          hi: 'क्षतिग्रस्त ऊतकों की मरम्मत और रोगप्रतिकार की पुनर्स्थापना',
          mr: 'खराब झालेल्या ऊतींची दुरुस्ती आणि प्रतिकारशक्तीची पुनर्स्थापना'
        },
        caption: {
          en: 'They act as our internal regenerative medicine, replacing billions of exhausted cells daily and healing injured tissue.',
          hi: 'ये हमारे आंतरिक पुनर्योजी तंत्र के रूप में कार्य करती हैं, जो प्रतिदिन अरबों पुरानी कोशिकाओं को बदलकर ऊतकों को ठीक करती हैं।',
          mr: 'त्या आपल्या शरीराची अंतर्गत पुनरुत्पादन प्रणाली म्हणून कार्य करतात, दररोज कोट्यवधी जुन्या पेशी बदलून आजार बरे करतात.'
        },
        visualType: 'tissue_healing'
      }
    ]
  },
  v2: {
    slug: 'ep2',
    durationSeconds: 52,
    scenes: [
      {
        startPct: 0,
        endPct: 26,
        badge: {
          en: 'Bone Marrow Niche',
          hi: 'अस्थि मज्जा सूक्ष्म-पर्यावरण',
          mr: 'अस्थिमज्जा सूक्ष्म-पर्यावरण'
        },
        title: {
          en: 'Hematopoietic Stem Cells (HSCs) in the Marrow',
          hi: 'अस्थि मज्जा में हेमटोपोइएटिक स्टेम कोशिकाएं (HSCs)',
          mr: 'अस्थिमज्जेतील हेमॅटोपोएटिक स्टेम पेशी (HSCs)'
        },
        caption: {
          en: 'Hematopoietic stem cells reside inside the spongy interior of large bones, serving as the master factory for the entire human blood system.',
          hi: 'हेमटोपोइएटिक स्टेम कोशिकाएं हड्डियों के आंतरिक स्पंजी भाग में रहती हैं, जो संपूर्ण मानव रक्त प्रणाली की मुख्य फैक्ट्री हैं।',
          mr: 'हेमॅटोपोएटिक स्टेम पेशी मोठ्या हाडांच्या आतील स्पंजी भागात राहतात, ज्या मानवी रक्त प्रणालीचा मुख्य स्रोत आहेत.'
        },
        visualType: 'bone_marrow_hsc'
      },
      {
        startPct: 26,
        endPct: 52,
        badge: {
          en: 'Blood Lineage Production',
          hi: 'रक्त कोशिका निर्माण',
          mr: 'रक्तपेशी निर्मिती प्रक्रिया'
        },
        title: {
          en: 'Hematopoiesis: Generating Oxygen Carriers & Immune Defenders',
          hi: 'हेमाटोपोइसिस: लाल रक्त कोशिकाएं और रोगप्रतिकारक तंत्र',
          mr: 'हेमॅटोपोईसिस: लाल रक्तपेशी आणि रोगप्रतिकार पेशींची निर्मिती'
        },
        caption: {
          en: 'Through hematopoiesis, HSCs produce billions of oxygen-carrying red blood cells, infection-fighting white blood cells, and clotting platelets every single day.',
          hi: 'हेमाटोपोइसिस प्रक्रिया द्वारा HSCs प्रतिदिन अरबों लाल रक्त कोशिकाएं, संक्रमण से लड़ने वाली श्वेत कोशिकाएं और प्लेटलेट्स बनाती हैं।',
          mr: 'हेमॅटोपोईसिसद्वारे, HSCs दररोज कोट्यवधी ऑक्सिजन वाहून नेणाऱ्या लाल पेशी, संसर्गाशी लढणाऱ्या पांढऱ्या पेशी आणि प्लेटलेट्स तयार करतात.'
        },
        visualType: 'hematopoiesis_stream'
      },
      {
        startPct: 52,
        endPct: 76,
        badge: {
          en: 'Mesenchymal Stem Cells',
          hi: 'मेसेनकाइमल स्टेम कोशिकाएं (MSCs)',
          mr: 'मेसेन्कायमल स्टेम पेशी (MSCs)'
        },
        title: {
          en: 'Mesenchymal Cells (MSCs): Bone, Cartilage & Tissue Regeneration',
          hi: 'मेसेनकाइमल कोशिकाएं: हड्डी, उपास्थि और ऊतक पुनर्जनन',
          mr: 'मेसेन्कायमल पेशी: हाडे, कूर्चा आणि ऊतींची पुनर्निर्मिती'
        },
        caption: {
          en: 'Unlike HSCs which form blood, MSCs are structural repair masters that regenerate bone matrix, joint cartilage, tendon fibers, and connective tissues.',
          hi: 'रक्त बनाने वाली HSCs के विपरीत, MSCs शारीरिक ढांचे की मरम्मत करती हैं और हड्डी, उपास्थि तथा संयोजी ऊतकों का पुनर्निर्माण करती हैं।',
          mr: 'रक्त तयार करणाऱ्या HSCs पेक्षा वेगळ्या, MSCs या हाडे, कूर्चा आणि इतर संयोजी ऊतींची पुनर्निर्मिती करणाऱ्या मुख्य पेशी आहेत.'
        },
        visualType: 'msc_scaffold'
      },
      {
        startPct: 76,
        endPct: 100,
        badge: {
          en: 'Cord Blood Stem Cells',
          hi: 'गर्भनाल रक्त स्टेम कोशिकाएं',
          mr: 'कॉर्ड ब्लड स्टेम पेशी'
        },
        title: {
          en: 'Umbilical Cord Blood: Young & Immunologically Adaptable Cells',
          hi: 'गर्भनाल रक्त: युवा और रोगप्रतिकारक रूप से अनुकूल कोशिकाएं',
          mr: 'कॉर्ड ब्लड: तरुण आणि रोगप्रतिकारदृष्ट्या अत्यंत अनुकूल पेशी'
        },
        caption: {
          en: 'Umbilical cord blood is harvested safely at birth with zero discomfort, yielding young cells with high regenerative potency.',
          hi: 'नवजात शिशु के जन्म के समय गर्भनाल रक्त बिना किसी दर्द के एकत्र किया जाता है, जिसमें उच्च क्षमता वाली युवा कोशिकाएं होती हैं।',
          mr: 'बाळाच्या जन्मानंतर नाळेतील रक्त कोणत्याही त्रासाशिवाय सुरक्षितपणे गोळा केले जाते, ज्यात अत्यंत उच्च क्षमतेच्या पेशी असतात.'
        },
        visualType: 'cord_blood_harvest'
      }
    ]
  },
  v3: {
    slug: 'ep3',
    durationSeconds: 55,
    scenes: [
      {
        startPct: 0,
        endPct: 26,
        badge: {
          en: 'Step 1: Conditioning',
          hi: 'चरण 1: कंडीशनिंग थेरेपी',
          mr: 'टप्पा १: कंडिशनिंग थेरपी'
        },
        title: {
          en: 'Conditioning Therapy: Clearing Malfunctioning Cells',
          hi: 'कंडीशनिंग थेरेपी: रोगग्रस्त कोशिकाओं को साफ करना',
          mr: 'कंडिशनिंग थेरपी: आजारी पेशी नष्ट करणे'
        },
        caption: {
          en: 'Transplantation begins with targeted conditioning chemotherapy to eliminate cancerous and defective marrow cells, preparing space.',
          hi: 'प्रत्यारोपण की शुरुआत लक्षित कंडीशनिंग कीमोथेरेपी से होती है, जो रोगग्रस्त कोशिकाओं को समाप्त कर नई कोशिकाओं के लिए जगह बनाती है।',
          mr: 'प्रत्यारोपणाची सुरुवात विशिष्ट केमोथेरपीने होते, ज्यामुळे जुन्या आजारी पेशी नष्ट होऊन नव्या पेशींसाठी जागा तयार होते.'
        },
        visualType: 'conditioning_clearance'
      },
      {
        startPct: 26,
        endPct: 52,
        badge: {
          en: 'Step 2: Venous Infusion',
          hi: 'चरण 2: शिरापरक इन्फ्यूजन',
          mr: 'टप्पा २: शिरासंबंधी इन्फ्युजन'
        },
        title: {
          en: 'Gentle Intravenous Stem Cell Infusion (Transplant Day 0)',
          hi: 'साधारण IV ड्रिप के माध्यम से स्टेम सेल इन्फ्यूजन (डे 0)',
          mr: 'साध्या IV द्वारे निरोगी स्टेम पेशी शरीरात देणे (दिवस ०)'
        },
        caption: {
          en: 'Healthy donor stem cells are infused painlessly into the bloodstream via a central IV catheter, exactly like a blood transfusion.',
          hi: 'स्वस्थ डोनर स्टेम कोशिकाओं को एक सेंट्रल IV कैथेटर के जरिए रक्तप्रवाह में डाला जाता है, बिल्कुल ब्लड ट्रांसफ्यूजन की तरह।',
          mr: 'निरोगी दात्याच्या स्टेम पेशी सेंट्रल IV द्वारे थेट रक्तप्रवाहात सोडल्या जातात, अगदी नेहमीच्या रक्त संक्रमणाप्रमाणे.'
        },
        visualType: 'iv_infusion'
      },
      {
        startPct: 52,
        endPct: 76,
        badge: {
          en: 'Step 3: Chemotactic Homing',
          hi: 'चरण 3: मज्जा में होमिंग',
          mr: 'टप्पा ३: बोन मॅरोमध्ये स्थिरावणे'
        },
        title: {
          en: 'Active Homing: Circulating Directly to Bone Marrow Niches',
          hi: 'होमिंग प्रक्रिया: सीधे अस्थि मज्जा के स्थानों में प्रवास',
          mr: 'होमिंग प्रक्रिया: थेट बोन मॅरोच्या रिकाम्या जागांमध्ये पोहोचणे'
        },
        caption: {
          en: 'Infused cells follow chemical chemoattractant signals (SDF-1) in the blood, homing directly into the bone marrow spongy cavities.',
          hi: 'डाली गई कोशिकाएं रासायनिक संकेतों का पालन करते हुए सीधे अस्थि मज्जा के स्थानों की ओर आकर्षित होकर स्थापित होती हैं।',
          mr: 'रक्तात सोडलेल्या पेशी रासायनिक संकेतांचे अनुसरण करून थेट बोन मॅरोच्या पोकळ्यांमध्ये जाऊन स्थिरावतात.'
        },
        visualType: 'chemotactic_homing'
      },
      {
        startPct: 76,
        endPct: 100,
        badge: {
          en: 'Step 4: Engraftment & Cure',
          hi: 'चरण 4: मज्जा प्रत्यारोपण व आरोग्य',
          mr: 'टप्पा ४: पेशींची वाढ आणि पूर्ण बरे होणे'
        },
        title: {
          en: '21-Day Engraftment: Rebuilding Normal Blood and Immunity',
          hi: '21 दिनों में समावेशन: स्वस्थ रक्त और पूर्ण प्रतिरक्षा का पुनर्जन्म',
          mr: '२१ दिवसांत पेशींची वाढ: निरोगी रक्त आणि प्रतिकारशक्तीची पुनर्रचना'
        },
        caption: {
          en: 'Within two to three weeks, donor stem cells engraft, divide exponentially, and restore normal white cells, platelets, and hemoglobin.',
          hi: 'दो से तीन हफ्तों के भीतर, कोशिकाएं मज्जा में स्थापित होकर तेजी से विभाजित होती हैं और सामान्य स्वस्थ रक्त बनाना शुरू करती हैं।',
          mr: 'दोन ते तीन आठवड्यांत, या पेशी मज्जेमध्ये घट्ट स्थिरावतात आणि नवीन निरोगी रक्त आणि प्रतिकारशक्ती तयार करतात.'
        },
        visualType: 'engraftment_complete'
      }
    ]
  },
  v4: {
    slug: 'ep4',
    durationSeconds: 50,
    scenes: [
      {
        startPct: 0,
        endPct: 26,
        badge: {
          en: 'Safe Delivery Collection',
          hi: 'प्रसव उपरांत सुरक्षित संग्रह',
          mr: 'बाळंतपणानंतर सुरक्षित संकलन'
        },
        title: {
          en: 'Painless Postpartum Umbilical Cord Collection',
          hi: 'प्रसव के तुरंत बाद दर्द रहित गर्भनाल संग्रह',
          mr: 'बाळाच्या जन्मानंतर वेदनारहित नाळेतील रक्त संकलन'
        },
        caption: {
          en: 'After childbirth, leftover umbilical blood is collected painlessly in a sterile closed-bag system with zero risk to mother or newborn.',
          hi: 'प्रसव के तुरंत बाद, नाल में बचे रक्त को मां और बच्चे को बिना किसी परेशानी के जीवाणुरहित बैग में एकत्र किया जाता है।',
          mr: 'बाळाच्या जन्मानंतर, नाळेत उरलेले रक्त आई आणि बाळाला कोणताही त्रास न होता एका निर्जंतुक बॅगमध्ये गोळा केले जाते.'
        },
        visualType: 'sterile_collection'
      },
      {
        startPct: 26,
        endPct: 52,
        badge: {
          en: 'Cleanroom Processing',
          hi: 'क्लीनरूम प्रयोगशाला परीक्षण',
          mr: 'क्लिनरूम लॅब तपासणी'
        },
        title: {
          en: 'Centrifugation, Microbial Screening, and CD34+ Viability',
          hi: 'सेंट्रीफ्यूज, माइक्रोबियल स्क्रीनिंग और CD34+ व्यवहार्यता परीक्षण',
          mr: 'सेंट्रीफ्युगेशन, संसर्ग तपासणी आणि CD34+ पेशींची क्षमता'
        },
        caption: {
          en: 'In an ISO certified cleanroom, blood is processed, infectious pathogens screened, and cell viability verified above 90 percent.',
          hi: 'आईएसओ प्रमाणित प्रयोगशाला में, रक्त को संसाधित किया जाता है, संक्रमण की जांच की जाती है और 90% से अधिक व्यवहार्यता की पुष्टि होती है।',
          mr: 'ISO प्रमाणित लॅबमध्ये रक्तावर प्रक्रिया केली जाते, संसर्गाची तपासणी होते आणि ९० टक्क्यांहून अधिक जिवंत पेशींची खात्री केली जाते.'
        },
        visualType: 'cleanroom_assay'
      },
      {
        startPct: 52,
        endPct: 76,
        badge: {
          en: 'Controlled-Rate Freezing',
          hi: 'नियंत्रित-दर शीतलन',
          mr: 'नियंत्रित गतीने गोठवणे'
        },
        title: {
          en: 'Programmable Freezing (-1°C/min) with DMSO Cryoprotectant',
          hi: 'क्रायोप्रोटेक्टेंट के साथ -1°C प्रति मिनट की दर से नियंत्रित शीतलन',
          mr: 'क्रायोप्रोटेक्टंटसह प्रति मिनिट -१°C गतीने सुरक्षित शीतकरण'
        },
        caption: {
          en: 'To prevent intracellular ice puncture, stem cells are mixed with pharmaceutical DMSO and frozen gradually at -1 degree Celsius per minute.',
          hi: 'बर्फ के नुकीले कणों से कोशिकाओं को बचाने के लिए, DMSO मिलाकर प्रति मिनट -1°C की धीमी गति से फ्रीज किया जाता है।',
          mr: 'पेशींना इजा होऊ नये म्हणून सुरक्षित द्रावण मिसळून प्रति मिनिट -१°C या सावकाश गतीने तापमान कमी केले जाते.'
        },
        visualType: 'freezing_ramp'
      },
      {
        startPct: 76,
        endPct: 100,
        badge: {
          en: 'Liquid Nitrogen Vault',
          hi: 'तरल नाइट्रोजन क्रायो-वॉल्ट',
          mr: 'द्रवरूप नायट्रोजन क्रायो-व्हॉल्ट'
        },
        title: {
          en: 'Cryopreservation at -196°C in Vapor-Phase Vaults',
          hi: '-196°C पर तरल नाइट्रोजन वाष्प क्रायो-वॉल्ट में अनिश्चितकालीन संरक्षण',
          mr: 'उणे १९६ अंश सेल्सिअसवर द्रवरूप नायट्रोजनमध्ये सुरक्षित साठवण'
        },
        caption: {
          en: 'Units are suspended in liquid nitrogen vapor at minus 196 degrees Celsius, stopping cellular biological time for 25+ years.',
          hi: 'इकाइयों को -196°C पर तरल नाइट्रोजन वाष्प में रखा जाता है, जिससे कोशिकाएं 25 से अधिक वर्षों तक जीवित और सुरक्षित रहती हैं।',
          mr: 'पेशी उणे १९६ अंश सेल्सिअस तापमानात द्रवरूप नायट्रोजन वाफेमध्ये ठेवल्या जातात, जिथे त्या २५ हून अधिक वर्षे सुरक्षित राहतात.'
        },
        visualType: 'cryo_vault_196'
      }
    ]
  },
  v5: {
    slug: 'ep5',
    durationSeconds: 54,
    scenes: [
      {
        startPct: 0,
        endPct: 26,
        badge: {
          en: 'Unproven Clinic Warning',
          hi: 'अप्रमाणित क्लीनिक चेतावनी',
          mr: 'अनधिकृत क्लिनिकची चेतावणी'
        },
        title: {
          en: 'Beware Commercial Spas Guaranteeing "100% Miracle Cures"',
          hi: '100% चमत्कारी इलाज का दावा करने वाले व्यावसायिक विज्ञापनों से बचें',
          mr: '१००% चमत्काराचे खोटे दावे करणाऱ्या अनधिकृत केंद्रांपासून सावध रहा'
        },
        caption: {
          en: 'Beware of unregistered spas claiming stem cells cure autism, diabetes, or anti-aging. These unapproved claims violate medical law.',
          hi: 'ऑटिज्म, डायबिटीज या एंटी-एजिंग के 100% इलाज का दावा करने वाले गैर-पंजीकृत केंद्रों से बचें; ये दावे अवैध और भ्रामक हैं।',
          mr: 'ऑटिझम, मधुमेह किंवा वृद्धत्वविरोधी उपचारांवर १००% हमी देणाऱ्या केंद्रांपासून सावध राहा; हे दावे वैद्यकीयदृष्ट्या खोटे आहेत.'
        },
        visualType: 'scam_warning_shield'
      },
      {
        startPct: 26,
        endPct: 52,
        badge: {
          en: 'Severe Clinical Risks',
          hi: 'गंभीर नैदानिक जोखिम',
          mr: 'गंभीर वैद्यकीय धोके'
        },
        title: {
          en: 'Graft-versus-Host Disease (GvHD) & Bacterial Shock Hazards',
          hi: 'ग्राफ्ट-बनाम-होस्ट रोग (GvHD) और सेप्सिस संक्रमण के खतरे',
          mr: 'ग्राफ्ट-विरुद्ध-होस्ट रोग (GvHD) आणि गंभीर संसर्गाचा धोका'
        },
        caption: {
          en: 'Unmatched or unsterilized products risk severe immune attack called Graft-versus-Host Disease (GvHD) and systemic bacterial sepsis.',
          hi: 'बिना जांचे या अप्रमाणित उत्पादों से ग्राफ्ट-बनाम-होस्ट रोग (GvHD) और जानलेवा संक्रमण का गंभीर खतरा हो सकता है।',
          mr: 'न तपासलेल्या उत्पादनांमुळे ग्राफ्ट-विरुद्ध-होस्ट रोग (GvHD) आणि शरीरात गंभीर जंतुसंसर्ग होण्याचा मोठा धोका असतो.'
        },
        visualType: 'gvhd_immune_risk'
      },
      {
        startPct: 52,
        endPct: 76,
        badge: {
          en: 'Accredited Safety Standards',
          hi: 'प्रमाणित सुरक्षा मानक',
          mr: 'मान्यताप्राप्त सुरक्षा मानके'
        },
        title: {
          en: 'Positive-Pressure HEPA Isolation Suites & 10/10 HLA Matching',
          hi: 'पॉजिटिव-प्रेशर HEPA आइसोलेशन वार्ड और 10/10 HLA टिश्यू मैचिंग',
          mr: 'पॉझिटिव्ह-प्रेशर HEPA आयसोलेशन कक्ष आणि १०/१० HLA जुळणी'
        },
        caption: {
          en: 'Legitimate therapy requires positive-pressure HEPA air filtration suites, high-resolution HLA tissue typing, and specialist oncology teams.',
          hi: 'वैध उपचार केवल पॉजिटिव-प्रेशर HEPA वार्ड, उच्च-रिज़ॉल्यूशन HLA मिलान और अनुभवी कैंसर विशेषज्ञों की देखरेख में ही होते हैं।',
          mr: 'कायदेशीर उपचार केवळ HEPA हवा गाळणी असलेल्या आयसोलेशन कक्षात, अचूक HLA मॅचिंग आणि तज्ज्ञ डॉक्टरांच्या देखरेखीखालीच होतात.'
        },
        visualType: 'hepa_cleanroom'
      },
      {
        startPct: 76,
        endPct: 100,
        badge: {
          en: 'Regulatory Verification',
          hi: 'सरकारी नियम व दिशानिर्देश',
          mr: 'सरकारी नियम आणि मार्गदर्शक तत्त्वे'
        },
        title: {
          en: 'ICMR & CDSCO National Guidelines & Ethics Committee Clearance',
          hi: 'ICMR और CDSCO राष्ट्रीय दिशानिर्देश एवं आचार समिति की मंजूरी',
          mr: 'ICMR आणि CDSCO राष्ट्रीय मार्गदर्शक तत्त्वे व समितीची मान्यता'
        },
        caption: {
          en: 'Always verify that stem cell therapy is conducted under ICMR/CDSCO regulatory approval and accredited institutional ethics oversight.',
          hi: 'हमेशा जांचें कि स्टेम सेल थेरेपी ICMR और CDSCO के आधिकारिक नियमों और संस्थागत नैतिकता समिति की मंजूरी के तहत ही हो रही हो।',
          mr: 'नेहमी खात्री करा की स्टेम सेल उपचार ICMR आणि CDSCO च्या अधिकृत नियमांनुसार आणि हॉस्पिटल समितीच्या मान्यतेनेच होत आहेत.'
        },
        visualType: 'regulatory_compliance'
      }
    ]
  }
};

const WatchAndListenPlayer = ({
  selectedVideo,
  playlist,
  onSelectVideo,
  lang = 'en',
  onChangeLang,
  t = {}
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useHardwareVideo, setUseHardwareVideo] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);

  const containerRef = useRef(null);
  const videoElementRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Storyboard config for selected video
  const storyboard = EPISODE_STORYBOARDS[selectedVideo?.id] || EPISODE_STORYBOARDS.v1;
  const totalDuration = storyboard.durationSeconds || 50;

  // Exact localized media file path requested by specifications:
  // e.g., /videos/ep1/episode-en.mp4, /videos/ep1/episode-hi.mp4, /videos/ep1/episode-mr.mp4
  const localizedMediaUrl = `/videos/${storyboard.slug}/episode-${lang}.mp4`;

  // Compute active storyboard scene based on current playback progress
  const currentPct = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const activeScene = storyboard.scenes.find(
    (s) => currentPct >= s.startPct && currentPct < s.endPct
  ) || storyboard.scenes[storyboard.scenes.length - 1];

  // Visible Audio language label: English | Hindi | Marathi
  const audioDisplayNames = {
    en: 'Audio: English',
    hi: 'Audio: Hindi',
    mr: 'Audio: Marathi'
  };
  const activeAudioLabel = audioDisplayNames[lang] || 'Audio: English';

  // Handle switching language: smoothly restart from beginning or keep timestamp
  const handleLanguageChange = (newLang) => {
    if (newLang === lang) return;
    onChangeLang(newLang);
    // Restart safely from beginning or valid point as requested
    setCurrentTime(0);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
    }
  };

  // Switch video episode
  const handleEpisodeSelect = (ep) => {
    onSelectVideo(ep);
    setCurrentTime(0);
    setIsPlaying(true);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
    }
  };

  // Toggle playback
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Replay
  const handleReplay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
      videoElementRef.current.play().catch(() => {});
    }
  };

  // Scrub / Seek Progress bar
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPct * totalDuration;
    setCurrentTime(newTime);
    if (videoElementRef.current && useHardwareVideo) {
      videoElementRef.current.currentTime = newTime;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Animation frame loop for continuous high-framerate explainer engine
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const step = (timestamp) => {
      if (lastTimestampRef.current !== null) {
        const deltaSec = (timestamp - lastTimestampRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + deltaSec;
          if (next >= totalDuration) {
            return 0; // Loop or restart
          }
          return next;
        });
      }
      lastTimestampRef.current = timestamp;
      setPulseTick((t) => (t + 1) % 360);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, totalDuration]);

  // Synchronize video element if hardware file is detected
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Fall back gracefully to internal animated canvas
        setUseHardwareVideo(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, localizedMediaUrl]);

  // Format time MM:SS
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Safe localized text extraction
  const getLocalized = (obj) => {
    if (!obj) return '';
    return obj[lang] || obj.en || '';
  };

  return (
    <div className="koshika-video-master-wrapper mb-5">
      {/* 1. Main Cinema Viewport Container */}
      <div
        ref={containerRef}
        className={`card border-0 shadow-lg rounded-4 overflow-hidden position-relative bg-dark text-white ${
          isFullscreen ? 'koshika-fullscreen-active' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #0c1a2e 50%, #061e1b 100%)',
          minHeight: '440px',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)'
        }}
      >
        {/* Hidden/Native Localized Video Media Element */}
        <video
          ref={videoElementRef}
          src={localizedMediaUrl}
          muted={isMuted}
          playsInline
          style={{ display: useHardwareVideo ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
          onCanPlay={() => setUseHardwareVideo(true)}
          onError={() => setUseHardwareVideo(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* 2. Interactive Medical Explainer Animation Stage (Rendered when video is in Explainer mode) */}
        {!useHardwareVideo && (
          <div
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-between position-relative p-4 select-none"
            style={{ minHeight: '440px', zIndex: 1 }}
          >
            {/* Top Stage Bar: Badges & Localization Notice */}
            <div className="w-100 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-1.5 fw-bold text-white shadow-xs"
                  style={{ background: 'linear-gradient(90deg, #0d9488 0%, #059669 100%)', fontSize: '0.78rem' }}
                >
                  <Sparkles size={13} className="me-1" />
                  {getLocalized(activeScene.badge)}
                </span>
                <span className="badge rounded-pill bg-white bg-opacity-15 text-white border border-white border-opacity-20 px-2.5 py-1 text-uppercase small">
                  {storyboard.slug.toUpperCase()} • 1080p Explainer
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-black bg-opacity-40 text-info border border-info border-opacity-30 px-3 py-1 fw-semibold small">
                  {activeAudioLabel}
                </span>
                <span className="badge rounded-pill bg-dark bg-opacity-60 text-secondary border border-secondary px-2.5 py-1 small d-none d-md-inline-block">
                  Media: episode-{lang}.mp4
                </span>
              </div>
            </div>

            {/* Central Animated Scene Arena (Visually matches active narration storyboard) */}
            <div className="my-auto text-center w-100 py-3 position-relative" style={{ maxWidth: '680px' }}>
              
              {/* Visual Scene 1: Master Stem Cell Self-Renewal */}
              {activeScene.visualType === 'stem_cell_pulse' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="position-relative d-flex align-items-center justify-content-center mb-3">
                    <div
                      className="rounded-circle position-absolute"
                      style={{
                        width: '160px',
                        height: '160px',
                        background: 'radial-gradient(circle, rgba(13,148,136,0.35) 0%, rgba(13,148,136,0) 70%)',
                        animation: 'pulse 2s infinite ease-in-out',
                        transform: `scale(${1 + Math.sin(pulseTick * 0.05) * 0.12})`
                      }}
                    />
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center shadow-lg border border-2 border-info border-opacity-75"
                      style={{
                        width: '110px',
                        height: '110px',
                        background: 'radial-gradient(circle at 35% 35%, #2dd4bf 0%, #0d9488 40%, #115e59 100%)',
                        boxShadow: '0 0 35px rgba(45,212,191,0.55)'
                      }}
                    >
                      <div
                        className="rounded-circle bg-white bg-opacity-75"
                        style={{
                          width: '40px',
                          height: '40px',
                          boxShadow: '0 0 15px rgba(255,255,255,0.85)',
                          transform: `scale(${0.95 + Math.sin(pulseTick * 0.08) * 0.1})`
                        }}
                      />
                    </div>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                  <small className="text-info fw-semibold">Pluripotent Hematopoietic &amp; Mesenchymal Progenitor</small>
                </div>
              )}

              {/* Visual Scene 2: Differentiation Cascade */}
              {activeScene.visualType === 'differentiation_branch' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center gap-4 mb-3 flex-wrap">
                    <div className="p-3 rounded-circle bg-teal-subtle text-teal border border-teal shadow-xs">
                      <Dna size={36} className="text-info" />
                    </div>
                    <div className="text-secondary fw-bold fs-4">➔</div>
                    <div className="d-flex gap-3">
                      <div className="p-2.5 rounded-4 bg-danger bg-opacity-25 border border-danger text-center" style={{ width: '85px' }}>
                        <div className="small fw-bold text-danger">Blood</div>
                        <div className="text-white small" style={{ fontSize: '0.7rem' }}>RBC / WBC</div>
                      </div>
                      <div className="p-2.5 rounded-4 bg-warning bg-opacity-25 border border-warning text-center" style={{ width: '85px' }}>
                        <div className="small fw-bold text-warning">Bone</div>
                        <div className="text-white small" style={{ fontSize: '0.7rem' }}>Osteoid</div>
                      </div>
                      <div className="p-2.5 rounded-4 bg-primary bg-opacity-25 border border-primary text-center" style={{ width: '85px' }}>
                        <div className="small fw-bold text-primary">Nerve</div>
                        <div className="text-white small" style={{ fontSize: '0.7rem' }}>Neuron</div>
                      </div>
                    </div>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                  <small className="text-warning fw-semibold">Lineage-Specific Transcriptional Activation</small>
                </div>
              )}

              {/* Visual Scene 3: Blood / Bone / Nerve Tri-Lineage */}
              {activeScene.visualType === 'blood_bone_nerve' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="row g-3 w-100 justify-content-center mb-3">
                    <div className="col-4">
                      <div className="p-3 rounded-4 bg-black bg-opacity-40 border border-danger-subtle text-center h-100">
                        <div className="rounded-circle mx-auto p-2 mb-2 bg-danger bg-opacity-20 text-danger" style={{ width: '48px', height: '48px' }}>
                          <Heart size={24} />
                        </div>
                        <strong className="text-white small d-block">Erythrocytes</strong>
                        <small className="text-danger-emphasis" style={{ fontSize: '0.7rem' }}>Oxygen Delivery</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 rounded-4 bg-black bg-opacity-40 border border-warning-subtle text-center h-100">
                        <div className="rounded-circle mx-auto p-2 mb-2 bg-warning bg-opacity-20 text-warning" style={{ width: '48px', height: '48px' }}>
                          <Layers size={24} />
                        </div>
                        <strong className="text-white small d-block">Osteocytes</strong>
                        <small className="text-warning-emphasis" style={{ fontSize: '0.7rem' }}>Mineral Skeleton</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 rounded-4 bg-black bg-opacity-40 border border-info-subtle text-center h-100">
                        <div className="rounded-circle mx-auto p-2 mb-2 bg-info bg-opacity-20 text-info" style={{ width: '48px', height: '48px' }}>
                          <Activity size={24} />
                        </div>
                        <strong className="text-white small d-block">Neurons</strong>
                        <small className="text-info-emphasis" style={{ fontSize: '0.7rem' }}>Synaptic Signaling</small>
                      </div>
                    </div>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {/* Visual Scene 4: Body Healing & Regeneration */}
              {activeScene.visualType === 'tissue_healing' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="position-relative d-flex align-items-center justify-content-center mb-3 p-3">
                    <div
                      className="rounded-4 p-4 border border-success border-opacity-50 text-center"
                      style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.05) 100%)' }}
                    >
                      <CheckCircle2 size={46} className="text-success mx-auto mb-2" />
                      <div className="fw-bold text-success">Tissue Regeneration Active</div>
                      <small className="text-white-50">Continuous daily cell replacement &amp; physiological repair</small>
                    </div>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {/* Episode 2 Visuals */}
              {activeScene.visualType === 'bone_marrow_hsc' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-primary border-opacity-30 mb-3 text-center">
                    <Layers size={44} className="text-primary mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Spongy Trabecular Marrow Niches</h6>
                    <small className="text-info">Stem Cell Microenvironment &amp; Quiescence Control</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'hematopoiesis_stream' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex gap-3 mb-3 justify-content-center flex-wrap">
                    <span className="badge bg-danger p-2.5 rounded-pill px-3">Red Blood Cells (Oxygen)</span>
                    <span className="badge bg-warning text-dark p-2.5 rounded-pill px-3">Platelets (Hemostasis)</span>
                    <span className="badge bg-primary p-2.5 rounded-pill px-3">Neutrophils &amp; Lymphocytes (Immunity)</span>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'msc_scaffold' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-warning border-opacity-30 mb-3 text-center">
                    <Activity size={44} className="text-warning mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Mesenchymal Stromal Cellular Scaffold</h6>
                    <small className="text-warning">Extracellular Matrix, Collagen Synthesis, and Cartilage Joint Repair</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'cord_blood_harvest' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-info border-opacity-30 mb-3 text-center">
                    <Heart size={44} className="text-info mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Umbilical Cord Blood Bio-Repository</h6>
                    <small className="text-info">Rich in Naive CD34+ Progenitors • Zero Donor Discomfort</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {/* Episode 3 Visuals */}
              {activeScene.visualType === 'conditioning_clearance' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-warning border-opacity-30 mb-3 text-center">
                    <ShieldCheck size={44} className="text-warning mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Phase 1: Pre-Transplant Conditioning</h6>
                    <small className="text-warning">Myeloablative or RIC protocol clearing diseased cells</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'iv_infusion' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-success border-opacity-30 mb-3 text-center">
                    <Activity size={44} className="text-success mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Day 0: Venous Catheter Infusion</h6>
                    <small className="text-success">Living cellular graft infused via routine central venous line</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'chemotactic_homing' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-info border-opacity-30 mb-3 text-center">
                    <Dna size={44} className="text-info mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">CXCR4 / SDF-1 Chemotactic Homing Gradient</h6>
                    <small className="text-info">Stem cells migrate across vascular endothelium into marrow niches</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'engraftment_complete' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-success border-opacity-50 mb-3 text-center">
                    <Award size={44} className="text-success mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Engraftment Verified (Day +21)</h6>
                    <small className="text-success">Absolute Neutrophil Count (ANC) &gt; 500/µL • Normal blood production restored</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {/* Episode 4 Visuals */}
              {activeScene.visualType === 'sterile_collection' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-info border-opacity-30 mb-3 text-center">
                    <Heart size={44} className="text-info mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Sterile Closed-Bag Gravity Collection</h6>
                    <small className="text-info">CPDA-1 anticoagulant collection kit; 100% painless for mother &amp; newborn</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'cleanroom_assay' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-primary border-opacity-30 mb-3 text-center">
                    <CheckCircle2 size={44} className="text-primary mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">ISO Class 7 Cleanroom Cytometry Assay</h6>
                    <small className="text-info">CD34+ Enumeration &bull; 7-AAD Viability &gt; 90% &bull; Sterility confirmed</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'freezing_ramp' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-warning border-opacity-30 mb-3 text-center">
                    <Snowflake size={44} className="text-warning mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Computerized Controlled-Rate Freezing</h6>
                    <small className="text-warning">-1°C per minute programmable drop with pharmaceutical DMSO</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'cryo_vault_196' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-info border-opacity-50 mb-3 text-center">
                    <Snowflake size={44} className="text-info mb-2 mx-auto" />
                    <div className="display-6 fw-bold text-info">-196°C</div>
                    <small className="text-white">Liquid Nitrogen Vapor Phase Storage • Biological Clock Stopped for 25+ Years</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {/* Episode 5 Visuals */}
              {activeScene.visualType === 'scam_warning_shield' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-danger bg-opacity-20 border border-danger mb-3 text-center">
                    <AlertTriangle size={46} className="text-danger mb-2 mx-auto" />
                    <h6 className="fw-bold text-danger mb-0">WARNING: Unapproved Commercial Stem Cell Spas</h6>
                    <small className="text-white-50">False claims guaranteeing "100% cure" for autism, anti-aging or chronic diseases are illegal</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'gvhd_immune_risk' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-warning bg-opacity-20 border border-warning mb-3 text-center">
                    <AlertTriangle size={46} className="text-warning mb-2 mx-auto" />
                    <h6 className="fw-bold text-warning mb-0">Clinical Risk: Graft-versus-Host Disease (GvHD)</h6>
                    <small className="text-white-50">Mismatched donor T-cells attack host tissues if 10/10 HLA match is not verified</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'hepa_cleanroom' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-success border-opacity-30 mb-3 text-center">
                    <ShieldCheck size={44} className="text-success mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">Accredited Positive-Pressure HEPA Suite</h6>
                    <small className="text-success">Hospital isolation rooms with 0.3 micron cleanroom air filtration</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

              {activeScene.visualType === 'regulatory_compliance' && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="p-4 rounded-4 bg-black bg-opacity-40 border border-success border-opacity-50 mb-3 text-center">
                    <Award size={44} className="text-success mb-2 mx-auto" />
                    <h6 className="fw-bold text-white mb-0">ICMR &amp; CDSCO National Guidelines Clearance</h6>
                    <small className="text-success">Institutional Ethics Committee (IEC) &amp; ICSSR Approved Indication</small>
                  </div>
                  <h5 className="fw-bold text-white mb-1">{getLocalized(activeScene.title)}</h5>
                </div>
              )}

            </div>

            {/* Subtitles Overlay Bar (When enabled) */}
            {captionsOn && (
              <div
                className="w-100 px-4 py-2.5 rounded-3 bg-black bg-opacity-80 text-white small text-center shadow-lg border border-secondary border-opacity-30 mb-2"
                style={{ maxWidth: '92%', lineHeight: '1.5', zIndex: 10, backdropFilter: 'blur(6px)' }}
              >
                <div className="small fw-bold text-warning mb-0.5 text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  CC SUBTITLES [{lang.toUpperCase()}]:
                </div>
                "{getLocalized(activeScene.caption)}"
              </div>
            )}
          </div>
        )}

        {/* 3. Professional Cinema Player Control Bar */}
        <div
          className="p-3 bg-black bg-opacity-70 border-top border-white border-opacity-10 d-flex flex-column gap-2"
          style={{ backdropFilter: 'blur(10px)', zIndex: 20 }}
        >
          {/* Interactive Scrubable Progress Bar */}
          <div
            className="w-100 position-relative py-1 cursor-pointer"
            onClick={handleSeek}
            style={{ cursor: 'pointer' }}
            title="Click to seek"
          >
            <div className="w-100 rounded-pill overflow-hidden bg-secondary bg-opacity-40" style={{ height: '6px' }}>
              <div
                className="h-100 rounded-pill transition-all"
                style={{
                  width: `${currentPct}%`,
                  background: 'linear-gradient(90deg, #0d9488 0%, #10b981 100%)'
                }}
              />
            </div>
          </div>

          {/* Controls Row: Play/Pause, Replay, Timecode, Volume, CC, Language & Fullscreen */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-1">
            <div className="d-flex align-items-center gap-2">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                className="btn btn-sm btn-teal text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-xs"
                style={{ width: '38px', height: '38px', backgroundColor: '#0d9488' }}
                onClick={togglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" className="ms-0.5" />}
              </button>

              {/* Replay Button */}
              <button
                type="button"
                className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                onClick={handleReplay}
                title="Replay from start"
              >
                <RotateCcw size={15} />
              </button>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={15} className="text-warning" /> : <Volume2 size={15} />}
              </button>

              {/* Timecode display */}
              <span className="small text-white-50 font-monospace ps-1" style={{ fontSize: '0.8rem' }}>
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            {/* Right-side Controls: Language Switcher, CC & Fullscreen */}
            <div className="d-flex align-items-center gap-2">
              {/* Language Pills (English | हिंदी | मराठी) */}
              <div className="koshika-segmented-tabs" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  className={`koshika-segmented-tab text-white py-1 px-2.5 small ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`koshika-segmented-tab text-white py-1 px-2.5 small ${lang === 'hi' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('hi')}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  className={`koshika-segmented-tab text-white py-1 px-2.5 small ${lang === 'mr' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('mr')}
                >
                  मराठी
                </button>
              </div>

              {/* CC Subtitles Toggle */}
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-2.5 py-1 fw-bold ${
                  captionsOn ? 'btn-teal text-white' : 'btn-outline-light'
                }`}
                style={{ backgroundColor: captionsOn ? '#0d9488' : 'transparent', fontSize: '0.75rem' }}
                onClick={() => setCaptionsOn(!captionsOn)}
                title="Toggle Captions"
              >
                CC
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Episode Info & Language Sync Status Strip */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <span className="badge rounded-pill bg-success-subtle text-success fw-bold px-3 py-1 small">
                {activeAudioLabel}
              </span>
              <span className="badge rounded-pill bg-light text-dark border px-2.5 py-1 small">
                Subtitles: {lang.toUpperCase()}
              </span>
              <span className="badge rounded-pill bg-light text-secondary border px-2.5 py-1 small">
                Target Media: /videos/{storyboard.slug}/episode-{lang}.mp4
              </span>
            </div>
            <h4 className="fw-bold text-dark mb-1">{t[selectedVideo.titleKey] || selectedVideo.fallbackTitle}</h4>
            <p className="text-secondary small mb-0">{t[selectedVideo.descKey] || selectedVideo.fallbackDesc}</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 small fw-semibold"
              onClick={handleReplay}
            >
              <RotateCcw size={14} className="me-1" />
              <span>{t.btnStartOver || 'Replay'}</span>
            </button>
          </div>
        </div>

        {/* 5. Episode Explainer Playlist matching Screen 5 (5 Full Episodes) */}
        <h6 className="fw-bold text-dark mt-4 mb-3 d-flex align-items-center gap-2">
          <span>{t.playlistHeading || 'Episodes & Explainer Playlist:'}</span>
          <span className="badge bg-light text-secondary border rounded-pill small">5 Educational Modules</span>
        </h6>
        <div className="d-flex flex-column gap-2">
          {playlist.map((vid, idx) => {
            const isSelected = selectedVideo.id === vid.id;
            const epTitle = t[vid.titleKey] || vid.fallbackTitle;
            const epDesc = t[vid.descKey] || vid.fallbackDesc;

            return (
              <div
                key={vid.id}
                className={`p-3 rounded-4 border d-flex align-items-center justify-content-between cursor-pointer transition-all ${
                  isSelected ? 'border-teal bg-teal-subtle shadow-xs' : 'bg-light hover-bg-white'
                }`}
                style={{
                  borderColor: isSelected ? '#0d9488' : '#e2e8f0',
                  backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                  cursor: 'pointer'
                }}
                onClick={() => handleEpisodeSelect(vid)}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs flex-shrink-0"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: isSelected ? '#0d9488' : '#94a3b8',
                      fontSize: '0.9rem'
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.96rem' }}>
                      {epTitle}
                    </div>
                    <div className="small text-muted" style={{ fontSize: '0.8rem' }}>
                      {vid.duration} &bull; {epDesc}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {isSelected && isPlaying ? (
                    <span className="badge rounded-pill bg-success px-3 py-1.5 small fw-semibold">
                      {t.playingStatus || 'Playing'}
                    </span>
                  ) : (
                    <Play size={18} className={isSelected ? 'text-teal' : 'text-muted'} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchAndListenPlayer;
