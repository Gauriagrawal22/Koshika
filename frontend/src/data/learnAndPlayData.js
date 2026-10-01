// KOSHIKA Learn & Play Data: Trilingual Activities Data Bank (English, Hindi, Marathi)

export const getLocalizedText = (item, lang = 'en') => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item[lang] || item.en || Object.values(item)[0] || '';
};

// =========================================================================
// ACTIVITY 1 — 🧠 DISCOVERY FLASHCARDS: BEGINNER BASICS (14 Cards Bank)
// =========================================================================
export const FLASHCARDS_BANK = [
  {
    id: 'fc_1',
    icon: '🧬',
    image: '/images/learn/topic1_branches.jpg',
    category: { en: 'Basics', hi: 'मूल बातें', mr: 'मूलभूत माहिती' },
    question: {
      en: 'What is a stem cell?',
      hi: 'स्टेम सेल (मूल कोशिका) क्या है?',
      mr: 'स्टेम पेशी (मूळ पेशी) म्हणजे काय?'
    },
    answer: {
      en: 'A special "master cell" in our body that can renew itself and turn into different specialized cells.',
      hi: 'हमारे शरीर की एक विशेष "मास्टर कोशिका" जो खुद को नया बना सकती है और अन्य कोशिकाओं में बदल सकती है।',
      mr: 'आपल्या शरीरातील एक विशेष "मास्टर पेशी" जी स्वतःचे नूतनीकरण करू शकते आणि इतर पेशींमध्ये बदलू शकते.'
    }
  },
  {
    id: 'fc_2',
    icon: '🩸',
    image: '/images/learn/topic1_branches.jpg',
    category: { en: 'Cell Types', hi: 'कोशिकाओं के प्रकार', mr: 'पेशींचे प्रकार' },
    question: {
      en: 'What can stem cells form?',
      hi: 'स्टेम कोशिकाएं क्या बना सकती हैं?',
      mr: 'स्टेम पेशी काय बनवू शकतात?'
    },
    answer: {
      en: 'They can develop into oxygen-carrying red blood cells, infection-fighting white cells, brain neurons, or muscle fibers!',
      hi: 'ये ऑक्सीजन वाहक लाल रक्त कोशिकाएं, रोग प्रतिरोधक श्वेत कोशिकाएं, मस्तिष्क न्यूरॉन्स और मांसपेशियां बना सकती हैं!',
      mr: 'या ऑक्सिजन वाहक लाल पेशी, रोगप्रतिकारक पांढऱ्या पेशी, मेंदूचे न्यूरॉन्स किंवा स्नायू पेशी बनवू शकतात!'
    }
  },
  {
    id: 'fc_3',
    icon: '👶',
    image: '/images/learn/topic3_types.jpg',
    category: { en: 'Cord Blood', hi: 'गर्भनाल रक्त', mr: 'नाळेचे रक्त' },
    question: {
      en: 'What is cord blood?',
      hi: 'कॉर्ड ब्लड (गर्भनाल रक्त) क्या है?',
      mr: 'कॉर्ड ब्लड (नाळेचे रक्त) म्हणजे काय?'
    },
    answer: {
      en: 'The rich blood left in the umbilical cord after birth, loaded with young, highly potent blood-forming stem cells.',
      hi: 'शिशु के जन्म के बाद गर्भनाल में बचा रक्त, जो युवा और शक्तिशाली रक्त-निर्माण करने वाली स्टेम कोशिकाओं से भरपूर होता है।',
      mr: 'बाळाच्या जन्मानंतर नाळेत शिल्लक राहिलेले रक्त, ज्यामध्ये तरुण आणि सक्षम रक्त निर्माण करणाऱ्या स्टेम पेशी असतात.'
    }
  },
  {
    id: 'fc_4',
    icon: '🔬',
    image: '/images/learn/topic5_safety.jpg',
    category: { en: 'Donor Matching', hi: 'डोनर मिलान', mr: 'दाता जुळणी' },
    question: {
      en: 'What is HLA matching?',
      hi: 'HLA मैचिंग क्या है?',
      mr: 'HLA मॅचिंग म्हणजे काय?'
    },
    answer: {
      en: 'A genetic test checking if donor and patient immune proteins match safely to prevent rejection during a transplant.',
      hi: 'एक आनुवंशिक परीक्षण जो देखता है कि क्या डोनर और मरीज के प्रोटीन सुरक्षित रूप से मेल खाते हैं ताकि शरीर इसे स्वीकार कर सके।',
      mr: 'एक जनुकीय चाचणी जी तपासते की दाता आणि रुग्णाचे प्रोटीन्स जुळतात का, जेणेकरून प्रत्यारोपण सुरक्षित आणि यशस्वी व्हावे.'
    }
  },
  {
    id: 'fc_5',
    icon: '🏦',
    image: '/images/home/hero_stem_cell_orb.jpg',
    category: { en: 'Biobanking', hi: 'बायोबैंकिंग', mr: 'बायोबँकिंग' },
    question: {
      en: 'What does a stem-cell bank do?',
      hi: 'स्टेम सेल बैंक क्या करता है?',
      mr: 'स्टेम सेल बँक काय करते?'
    },
    answer: {
      en: 'It safely cryo-preserves tested stem cells at ultra-cold -196°C in liquid nitrogen for future medical therapies.',
      hi: 'यह भविष्य के चिकित्सीय उपयोग के लिए -196°C लिक्विड नाइट्रोजन में स्टेम कोशिकाओं को सुरक्षित रखता है।',
      mr: 'हे भविष्यातील वैद्यकीय उपयोगासाठी स्टेम पेशींना -१९६°C लिक्विड नायट्रोजनमध्ये सुरक्षित साठवून ठेवते.'
    }
  },
  {
    id: 'fc_6',
    icon: '🦴',
    image: '/images/learn/topic3_types.jpg',
    category: { en: 'Anatomy', hi: 'मानव शरीर', mr: 'मानवी शरीर' },
    question: {
      en: 'Where do blood stem cells live in adults?',
      hi: 'वयस्कों में रक्त स्टेम कोशिकाएं कहाँ पाई जाती हैं?',
      mr: 'प्रौढांमध्ये रक्त स्टेम पेशी कुठे असतात?'
    },
    answer: {
      en: 'Mainly inside bone marrow—the soft, spongy tissue filling the hollow centers of bones like the hip and ribs.',
      hi: 'मुख्य रूप से अस्थि मज्जा (बोन मैरो) में—जो कूल्हे और पसलियों जैसी हड्डियों के अंदर का नरम, स्पंजी ऊतक है।',
      mr: 'मुख्यतः हाडांच्या आतील मऊ, स्पंजी उतीमध्ये म्हणजेच अस्थिमज्जा (बोन मॅरो) मध्ये.'
    }
  },
  {
    id: 'fc_7',
    icon: '✨',
    image: '/images/learn/topic3_types.jpg',
    category: { en: 'Painless Collection', hi: 'दर्द रहित संग्रह', mr: 'वेदनारहित संकलन' },
    question: {
      en: 'Does cord blood collection hurt the newborn baby?',
      hi: 'क्या कॉर्ड ब्लड लेने से नवजात शिशु को दर्द होता है?',
      mr: 'कॉर्ड ब्लड गोळा करताना बाळाला काही त्रास होतो का?'
    },
    answer: {
      en: 'No! It is 100% painless and harmless. It is collected strictly after the umbilical cord is already clamped and cut.',
      hi: 'बिल्कुल नहीं! यह 100% दर्दरहित और सुरक्षित है। यह केवल नाल काटने के बाद ही एकत्र किया जाता है।',
      mr: 'अजिबात नाही! हे १००% वेदनारहित आणि सुरक्षित आहे. नाळ कापल्यानंतरच हे गोळा केले जाते.'
    }
  },
  {
    id: 'fc_8',
    icon: '🛡️',
    image: '/images/learn/topic5_safety.jpg',
    category: { en: 'Medical Reality', hi: 'चिकित्सीय सच्चाई', mr: 'वैद्यकीय वास्तव' },
    question: {
      en: 'Can stem cells cure every illness in the world?',
      hi: 'क्या स्टेम कोशिकाएं दुनिया की हर बीमारी ठीक कर सकती हैं?',
      mr: 'स्टेम पेशी जगातील सर्व आजार बरे करू शकतात का?'
    },
    answer: {
      en: 'No. They are approved for specific blood disorders, leukemias, and lymphomas, not as a universal "miracle cure".',
      hi: 'नहीं। वे केवल विशिष्ट रक्त विकारों और ल्यूकेमिया के लिए अनुमोदित हैं, किसी जादुई रामबाण इलाज के रूप में नहीं।',
      mr: 'नाही. त्या केवळ रक्ताचा कर्करोग आणि विशिष्ट रक्त विकारांसाठीच मान्यताप्राप्त आहेत, सर्व आजारांवर रामबाण उपाय नव्हे.'
    }
  },
  {
    id: 'fc_9',
    icon: '👑',
    image: '/images/learn/topic1_branches.jpg',
    category: { en: 'Superpowers', hi: 'विशेष क्षमता', mr: 'विशेष क्षमता' },
    question: {
      en: 'Why are they called "master cells"?',
      hi: 'इन्हें शरीर की "मास्टर कोशिकाएं" क्यों कहते हैं?',
      mr: 'यांना शरीराच्या "मास्टर पेशी" का म्हणतात?'
    },
    answer: {
      en: 'Unlike specialized cells (like skin or muscle), stem cells are blank slates that can multiply and create fresh specialized cells.',
      hi: 'अन्य साधारण कोशिकाओं के विपरीत, स्टेम कोशिकाएं शरीर के वे बुनियादी निर्माण खंड हैं जो नई कोशिकाएं बना सकते हैं।',
      mr: 'इतर पेशींच्या तुलनेत, स्टेम पेशी शरीराच्या मूळ पेशी असतात ज्या विभाजित होऊन नवीन विशेष पेशी तयार करू शकतात.'
    }
  },
  {
    id: 'fc_10',
    icon: '🏥',
    image: '/images/learn/topic4_transplant.jpg',
    category: { en: 'Transplant', hi: 'प्रत्यारोपण', mr: 'प्रत्यारोपण' },
    question: {
      en: 'What is a stem cell transplant?',
      hi: 'स्टेम सेल ट्रांसप्लांट क्या होता है?',
      mr: 'स्टेम सेल ट्रान्सप्लांट म्हणजे काय?'
    },
    answer: {
      en: 'Replacing damaged or diseased blood cells with healthy new stem cells through a simple intravenous (IV) infusion.',
      hi: 'एक सरल IV ड्रिप के माध्यम से अस्वस्थ कोशिकाओं की जगह स्वस्थ स्टेम कोशिकाओं को शरीर में पहुंचाना।',
      mr: 'साध्या सलाईन (IV) द्वारे खराब झालेल्या पेशींच्या जागी नवीन निरोगी स्टेम पेशी शरीरात देणे.'
    }
  },
  {
    id: 'fc_11',
    icon: '🤝',
    image: '/images/learn/topic5_safety.jpg',
    category: { en: 'Safety First', hi: 'सुरक्षा नियम', mr: 'सुरक्षा नियम' },
    question: {
      en: 'Can anyone donate stem cells to any patient?',
      hi: 'क्या कोई भी व्यक्ति किसी भी मरीज को स्टेम सेल दे सकता है?',
      mr: 'कोणीही व्यक्ती कोणत्याही रुग्णाला स्टेम सेल देऊ शकते का?'
    },
    answer: {
      en: 'No. The donor and recipient must have compatible HLA genetic markers; otherwise the recipient\'s body will reject them.',
      hi: 'नहीं। अस्वीकृति से बचने के लिए डोनर और मरीज का HLA आनुवंशिक मिलान होना बेहद आवश्यक होता है।',
      mr: 'नाही. शरीराने पेशी नाकारू नयेत म्हणून दाता आणि रुग्ण यांची HLA जनुकीय जुळणी असणे अत्यंत आवश्यक असते.'
    }
  },
  {
    id: 'fc_12',
    icon: '❄️',
    image: '/images/home/hero_stem_cell_orb.jpg',
    category: { en: 'Cryo Science', hi: 'क्रायो विज्ञान', mr: 'क्रायो विज्ञान' },
    question: {
      en: 'How cold is stem-cell storage?',
      hi: 'स्टेम सेल भंडारण कितना ठंडा होता है?',
      mr: 'स्टेम सेल साठवणूक किती थंड असते?'
    },
    answer: {
      en: 'Extremely cold: -196°C in liquid nitrogen vapor! At this freezing temperature, all biological aging completely pauses.',
      hi: '-196°C लिक्विड नाइट्रोजन में! इस अत्यंत ठंडे तापमान पर सभी जैविक प्रक्रियाएं और कोशिकाओं की उम्र पूरी तरह थम जाती हैं।',
      mr: '-१९६°C लिक्विड नायट्रोजनमध्ये! या अत्यंत थंड तापमानात सर्व जैविक क्रिया आणि पेशींचे वय पूर्णपणे थांबते.'
    }
  },
  {
    id: 'fc_13',
    icon: '🌱',
    image: '/images/learn/topic6_myths.jpg',
    category: { en: 'Donor Health', hi: 'दाता का स्वास्थ्य', mr: 'दात्याचे आरोग्य' },
    question: {
      en: 'Does donating stem cells leave the donor empty?',
      hi: 'क्या स्टेम सेल दान करने से दाता के शरीर में कमजोरी आती है?',
      mr: 'स्टेम सेल दान केल्याने दात्याच्या शरीरात कमतरता होते का?'
    },
    answer: {
      en: 'No! The healthy donor\'s bone marrow naturally regenerates and replaces all donated stem cells within 4 to 6 weeks.',
      hi: 'नहीं! एक स्वस्थ व्यक्ति का शरीर 4 से 6 हफ्तों के भीतर सभी दान की गई स्टेम कोशिकाओं को स्वाभाविक रूप से दोबारा बना लेता है।',
      mr: 'नाही! निरोगी व्यक्तीचे शरीर ४ ते ६ आठवड्यांत सर्व दान केलेल्या स्टेम पेशी नैसर्गिकरीत्या पुन्हा तयार करते.'
    }
  },
  {
    id: 'fc_14',
    icon: '🔍',
    image: '/images/learn/topic5_safety.jpg',
    category: { en: 'Care Guide', hi: 'मार्गदर्शक नियम', mr: 'मार्गदर्शक नियम' },
    question: {
      en: 'What should you check before any treatment?',
      hi: 'किसी भी उपचार से पहले क्या जांचना चाहिए?',
      mr: 'कोणत्याही उपचारापूर्वी काय तपासले पाहिजे?'
    },
    answer: {
      en: 'Always verify hospital accreditation, doctor credentials, and national regulatory approvals (ICMR/CDSCO).',
      hi: 'हमेशा अस्पताल की मान्यता, डॉक्टर के लाइसेंस और राष्ट्रीय विनियामक (ICMR/CDSCO) की मंजूरी की पुष्टि करें।',
      mr: 'नेहमी रुग्णालयाची मान्यता, डॉक्टरांचे प्रमाणपत्र आणि अधिकृत (ICMR/CDSCO) मान्यता तपासा.'
    }
  }
];

export const getRandomFlashcards = (count = 6) => {
  const shuffled = [...FLASHCARDS_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};


// =========================================================================
// ACTIVITY 2 — 🏥 KOSHIKA CARE QUEST (7 Comprehensive Scenarios)
// =========================================================================
export const CARE_QUEST_SCENARIOS = [
  {
    id: 's1_learning',
    title: {
      en: 'Person Learning About Stem Cells',
      hi: 'स्टेम कोशिकाओं के बारे में जानकारी प्राप्त करना',
      mr: 'स्टेम पेशींबद्दल माहिती मिळवणे'
    },
    avatar: '👩',
    steps: [
      {
        character: { en: '👩 Curious Learner', hi: '👩 जिज्ञासु शिक्षार्थी', mr: '👩 जिज्ञासू अभ्यासक' },
        prompt: {
          en: 'I want to understand what stem cells are and how they work.',
          hi: 'मैं समझना चाहता हूँ कि स्टेम कोशिकाएं क्या हैं और वे कैसे काम करती हैं।',
          mr: 'मला स्टेम पेशी म्हणजे काय आणि त्या कशा कार्य करतात हे समजून घ्यायचे आहे.'
        },
        roadmapNode: { icon: '📚', label: { en: 'Learn', hi: 'सीखें', mr: 'शिका' } },
        choices: [
          {
            icon: '📚',
            text: { en: 'Learn from verified science guides and accredited sources', hi: 'सत्यापित विज्ञान गाइड और मान्यता प्राप्त स्रोतों से सीखें', mr: 'प्रमाणित वैज्ञानिक मार्गदर्शक आणि अधिकृत स्रोतांवरून शिका' },
            isSafe: true,
            feedback: { en: 'Safe choice! Always start with evidence-based medical education.', hi: 'सुरक्षित विकल्प! हमेशा साक्ष्य-आधारित शिक्षा से शुरुआत करें।', mr: 'सुरक्षित पर्याय! नेहमी पुराव्यांवर आधारित शिक्षणाने सुरुवात करा.' }
          },
          {
            icon: '📱',
            text: { en: 'Trust a random viral social-media video claim', hi: 'सोशल मीडिया के किसी वायरल वीडियो के दावे पर भरोसा करें', mr: 'सोशल मीडियावरील व्हायरल व्हिडिओच्या दाव्यावर विश्वास ठेवा' },
            isSafe: false,
            feedback: { en: 'Social media videos often promote unverified claims. Science comes first!', hi: 'सोशल मीडिया वीडियो में भ्रामक दावे हो सकते हैं। विज्ञान को प्राथमिकता दें!', mr: 'सोशल मीडियावरील व्हिडिओंमध्ये दिशाभूल असू शकते. विज्ञानाला प्राधान्य द्या!' }
          },
          {
            icon: '💰',
            text: { en: 'Book an immediate paid treatment package with no questions', hi: 'बिना कोई सवाल पूछे तुरंत एक सशुल्क पैकेज बुक करें', mr: 'कोणताही प्रश्न न विचारता ताबडतोब पैसे देऊन पॅकेज बुक करा' },
            isSafe: false,
            feedback: { en: 'Beware of immediate cash demands without diagnostic workup.', hi: 'बिना जांच के तुरंत नकद भुगतान वाले प्रस्तावों से सावधान रहें।', mr: 'तपासणीशिवाय तातडीने रोख रक्कम मागणाऱ्यांपासून सावध राहा.' }
          }
        ]
      },
      {
        character: { en: '📄 Medical Verification', hi: '📄 मेडिकल सत्यापन', mr: '📄 वैद्यकीय पडताळणी' },
        prompt: {
          en: 'Where should I verify legitimate stem-cell therapies?',
          hi: 'मुझे वैध स्टेम-सेल उपचारों की पुष्टि कहाँ करनी चाहिए?',
          mr: 'मान्यताप्राप्त स्टेम-सेल उपचारांची खात्री कुठे करावी?'
        },
        roadmapNode: { icon: '📄', label: { en: 'Verify', hi: 'सत्यापित करें', mr: 'पडताळणी' } },
        choices: [
          {
            icon: '🏛️',
            text: { en: 'Review ICMR & CDSCO official clinical guidelines', hi: 'ICMR और CDSCO के आधिकारिक दिशा-निर्देश देखें', mr: 'ICMR आणि CDSCO ची अधिकृत मार्गदर्शक तत्त्वे तपासा' },
            isSafe: true,
            feedback: { en: 'Excellent! National regulatory bodies define approved medical protocols.', hi: 'बहुत अच्छा! राष्ट्रीय विनियामक संस्थाएं अनुमोदित प्रोटोकॉल तय करती हैं।', mr: 'उत्कृष्ट! राष्ट्रीय नियामक संस्था मान्यताप्राप्त प्रोटोकॉल ठरवतात.' }
          },
          {
            icon: '💬',
            text: { en: 'Ask anonymous claims in online chat rooms', hi: 'गुमनाम ऑनलाइन चैट ग्रुप्स से पूछें', mr: 'अनामिक ऑनलाइन ग्रुप्सवर सल्ला घ्या' },
            isSafe: false,
            feedback: { en: 'Chat rooms cannot evaluate clinical safety. Rely on accredited standards.', hi: 'ऑनलाइन चैट क्लिनिकल सुरक्षा की जांच नहीं कर सकते। आधिकारिक गाइड देखें।', mr: 'चॅट ग्रुप्स वैद्यकीय सुरक्षेची खात्री देऊ शकत नाहीत. अधिकृत मार्गदर्शक तपासा.' }
          },
          {
            icon: '📺',
            text: { en: 'Believe late-night television infomercials', hi: 'देर रात के टीवी विज्ञापनों पर विश्वास करें', mr: 'टीव्हीवरील व्यावसायिक जाहिरातींवर विश्वास ठेवा' },
            isSafe: false,
            feedback: { en: 'Commercial advertisements often exaggerate unapproved therapies.', hi: 'व्यावसायिक विज्ञापन असत्यापित उपचारों का झूठा प्रचार करते हैं।', mr: 'व्यावसायिक जाहिराती अप्रमाणित उपचारांचा चुकीचा प्रसार करतात.' }
          }
        ]
      },
      {
        character: { en: '👨‍⚕️ Clinical Consultation', hi: '👨‍⚕️ डॉक्टर परामर्श', mr: '👨‍⚕️ डॉक्टर सल्लामसलत' },
        prompt: {
          en: 'What is the safe next step if considering medical care?',
          hi: 'यदि चिकित्सा पर विचार कर रहे हैं तो अगला सुरक्षित कदम क्या है?',
          mr: 'वैद्यकीय उपचारांचा विचार करताना पुढील सुरक्षित पाऊल कोणते?'
        },
        roadmapNode: { icon: '👨‍⚕️', label: { en: 'Consult', hi: 'परामर्श', mr: 'सल्ला' } },
        choices: [
          {
            icon: '👨‍⚕️',
            text: { en: 'Consult a qualified hospital hematologist or oncologist', hi: 'अस्पताल के योग्य हेमेटोलॉजिस्ट या ऑन्कोलॉजिस्ट से परामर्श लें', mr: 'रुग्णालयातील तज्ज्ञ हेमेटोलॉजिस्ट किंवा ऑन्कोलॉजिस्टचा सल्ला घ्या' },
            isSafe: true,
            feedback: { en: 'Crucial step! Licensed specialists evaluate diagnosis, HLA typing, and safety.', hi: 'महत्वपूर्ण कदम! लाइसेंस प्राप्त विशेषज्ञ निदान और सुरक्षा की जांच करते हैं।', mr: 'महत्त्वाचे पाऊल! परवानाधारक तज्ज्ञ निदान आणि सुरक्षिततेची तपासणी करतात.' }
          },
          {
            icon: '🧪',
            text: { en: 'Order mystery injections over the counter', hi: 'दुकान से अज्ञात इंजेक्शन मंगवाएं', mr: 'औषध दुकानातून अज्ञात इंजेक्शन्स मागवा' },
            isSafe: false,
            feedback: { en: 'Unregulated injections pose grave infection risks and immune shock.', hi: 'अनियंत्रित इंजेक्शन गंभीर संक्रमण और खतरा पैदा कर सकते हैं।', mr: 'अनियंत्रित इंजेक्शन्स गंभीर संसर्ग आणि धोका निर्माण करू शकतात.' }
          },
          {
            icon: '🚫',
            text: { en: 'Stop current prescription drugs abruptly', hi: 'वर्तमान दवाएं अचानक बंद कर दें', mr: 'सध्याची औषधे अचानक बंद करा' },
            isSafe: false,
            feedback: { en: 'Never stop established medical care without doctor supervision.', hi: 'डॉक्टर की सलाह के बिना नियमित दवाएं कभी बंद न करें।', mr: 'डॉक्टरांच्या सल्ल्याशिवाय नियमित औषधे कधीही बंद करू नका.' }
          }
        ]
      }
    ]
  },
  {
    id: 's2_report',
    title: {
      en: 'Patient Receiving a Confusing Medical Report',
      hi: 'मेडिकल रिपोर्ट को लेकर भ्रमित मरीज',
      mr: 'वैद्यकीय अहवालाबाबत गोंधळलेला रुग्ण'
    },
    avatar: '📄',
    steps: [
      {
        character: { en: '📄 Patient with Report', hi: '📄 रिपोर्ट के साथ मरीज', mr: '📄 अहवालासह रुग्ण' },
        prompt: {
          en: 'I received a complex lab report with unfamiliar medical terms (HLA, CD34, CBC).',
          hi: 'मुझे एक जटिल लैब रिपोर्ट मिली है जिसमें अपरिचित मेडिकल शब्द (HLA, CD34, CBC) हैं।',
          mr: 'मला एक गुंतागुंतीचा लॅब अहवाल मिळाला आहे ज्यामध्ये अनोळखी संज्ञा (HLA, CD34, CBC) आहेत.'
        },
        roadmapNode: { icon: '📄', label: { en: 'Report', hi: 'रिपोर्ट', mr: 'अहवाल' } },
        choices: [
          {
            icon: '🔎',
            text: { en: 'Understand the terms using simple educational guides and prepare questions', hi: 'शैक्षिक गाइड से शब्दों को समझें और डॉक्टर के लिए प्रश्न तैयार करें', mr: 'शैक्षणिक मार्गदर्शकावरून संज्ञा समजून घ्या आणि डॉक्टरांसाठी प्रश्न तयार करा' },
            isSafe: true,
            feedback: { en: 'Smart! Understanding terms helps you communicate clearly with your doctor.', hi: 'समझदारी! शब्दों को समझने से डॉक्टर से खुलकर बात करने में मदद मिलती है।', mr: 'योग्य! संज्ञा समजून घेतल्याने डॉक्टरांशी चर्चा करणे सोपे होते.' }
          },
          {
            icon: '🗑️',
            text: { en: 'Throw the report away because the numbers look stressful', hi: 'रिपोर्ट फेंक दें क्योंकि संख्याएं तनावपूर्ण लग रही हैं', mr: 'अहवाल फेकून द्या कारण आकडे पाहून भीती वाटते' },
            isSafe: false,
            feedback: { en: 'Never ignore medical reports; prompt review ensures timely care.', hi: 'मेडिकल रिपोर्ट की अनदेखी न करें; समय पर समीक्षा आवश्यक है।', mr: 'वैद्यकीय अहवाल दुर्लक्षित करू नका; वेळेवर माहिती घेणे आवश्यक आहे.' }
          },
          {
            icon: '🚨',
            text: { en: 'Panic and accept an alarming internet forum diagnosis', hi: 'घबराएं और इंटरनेट फोरम के डरावने निदान पर विश्वास करें', mr: 'घाबरून जाऊन इंटरनेट फोरमवरील भीतीदायक निदानावर विश्वास ठेवा' },
            isSafe: false,
            feedback: { en: 'Online forums create undue panic. Always review reports with certified clinicians.', hi: 'इंटरनेट फोरम अनावश्यक घबराहट पैदा करते हैं। डॉक्टर से समीक्षा करवाएं।', mr: 'इंटरनेट फोरम अनावश्यक भीती निर्माण करतात. डॉक्टरांकडून तपासणी करून घ्या.' }
          }
        ]
      },
      {
        character: { en: '🔎 Doctor Consultation', hi: '🔎 डॉक्टर परामर्श', mr: '🔎 डॉक्टर सल्ला' },
        prompt: {
          en: 'The report indicates bone marrow suppression. What should I do?',
          hi: 'रिपोर्ट अस्थि मज्जा में कमी दिखाती है। मुझे क्या करना चाहिए?',
          mr: 'अहवालात बोन मॅरोमध्ये दोष दिसतो. मी काय केले पाहिजे?'
        },
        roadmapNode: { icon: '🩺', label: { en: 'Consult', hi: 'परामर्श', mr: 'सल्ला' } },
        choices: [
          {
            icon: '🩺',
            text: { en: 'Schedule prompt consultation with a certified hematologist', hi: 'प्रमाणित हेमेटोलॉजिस्ट से तत्काल परामर्श लें', mr: 'प्रमाणित हेमेटोलॉजिस्टशी तातडीने सल्लामसलत करा' },
            isSafe: true,
            feedback: { en: 'Correct! Hematologists are the specialized experts in bone marrow and blood health.', hi: 'सही! हेमेटोलॉजिस्ट मज्जा और रक्त विकारों के विशेषज्ञ होते हैं।', mr: 'बरोबर! हेमेटोलॉजिस्ट रक्त आणि मज्जा विकारांचे विशेष तज्ज्ञ असतात.' }
          },
          {
            icon: '🌿',
            text: { en: 'Drink unverified herbal tonics claiming 100% cure in 3 days', hi: '3 दिन में 100% इलाज का दावा करने वाला काढ़ा पिएं', mr: '३ दिवसांत १००% बरे करण्याचा दावा करणारा काढा प्या' },
            isSafe: false,
            feedback: { en: 'Unverified tonics cannot repair severe bone marrow dysfunction.', hi: 'घरेलू नुस्खे गंभीर मज्जा विफलता को ठीक नहीं कर सकते।', mr: 'अपुऱ्या चाचण्यांचे उपाय गंभीर बोन मॅरो विकारांवर उपचार करू शकत नाहीत.' }
          },
          {
            icon: '🏃',
            text: { en: 'Postpone doctor visits for months to see if it heals on its own', hi: 'डॉक्टर से मिलना महीनों टालें यह देखने के लिए कि क्या यह खुद ठीक होता है', mr: 'आपोआप बरे होते का ते पाहण्यासाठी महिनाभर डॉक्टरांकडे जाणे टाळा' },
            isSafe: false,
            feedback: { en: 'Delaying medical evaluation allows disorders to worsen.', hi: 'मूल्यांकन में देरी बीमारी को गंभीर बना सकती है।', mr: 'उशीर केल्याने आजार गंभीर होऊ शकतो. वेळेवर डॉक्टरांचा सल्ला घ्या.' }
          }
        ]
      },
      {
        character: { en: '🤝 Decision Making', hi: '🤝 निर्णय लेना', mr: '🤝 निर्णय घेणे' },
        prompt: {
          en: 'The doctor discusses potential transplant therapy options.',
          hi: 'डॉक्टर संभावित प्रत्यारोपण विकल्पों पर चर्चा करते हैं।',
          mr: 'डॉक्टर संभाव्य ट्रान्सप्लांट पर्यायांवर चर्चा करतात.'
        },
        roadmapNode: { icon: '🤝', label: { en: 'Decision', hi: 'निर्णय', mr: 'निर्णय' } },
        choices: [
          {
            icon: '📋',
            text: { en: 'Discuss HLA match, hospital stay, success rates, and risks openly', hi: 'HLA मिलान, अस्पताल में रहने, सफलता दर और जोखिमों पर खुलकर चर्चा करें', mr: 'HLA मॅच, रुग्णालयातील मुक्काम, यशाचे प्रमाण आणि धोक्यांवर सविस्तर चर्चा करा' },
            isSafe: true,
            feedback: { en: 'Bravo! Informed consent and transparent communication protect your health.', hi: 'बहुत अच्छा! पारदर्शी चर्चा और जानकारी सुरक्षा सुनिश्चित करती है।', mr: 'छान! पारदर्शक चर्चा आणि माहिती सुरक्षितता सुनिश्चित करते.' }
          },
          {
            icon: '🦄',
            text: { en: 'Demand a 100% guarantee with zero side effects before listening', hi: 'सुनने से पहले बिना किसी दुष्प्रभाव के 100% गारंटी की मांग करें', mr: 'काहीही ऐकण्यापूर्वी १००% हमीची मागणी करा' },
            isSafe: false,
            feedback: { en: 'Authentic medicine never promises 100% guarantees or zero risks.', hi: 'कोई भी वास्तविक डॉक्टर शून्य जोखिम के साथ 100% इलाज की गारंटी नहीं देता।', mr: 'कोणतेही खरे डॉक्टर शून्य धोक्यासह १००% बरे करण्याची हमी देत नाहीत.' }
          },
          {
            icon: '🚪',
            text: { en: 'Leave the hospital to seek quick injections from an unlicensed spa', hi: 'अस्पताल छोड़कर बिना लाइसेंस वाले स्पा से जल्दी इंजेक्शन लें', mr: 'रुग्णालय सोडून परवाना नसलेल्या स्पाकडून इंजेक्शन घ्या' },
            isSafe: false,
            feedback: { en: 'Unlicensed spas lack sterility and emergency resuscitation facilities.', hi: 'अवैध स्पा में स्वच्छता और आपातकालीन सुविधाओं का भारी अभाव होता है।', mr: 'अनधिकृत स्पा मध्ये स्वच्छता आणि आपत्कालीन सुविधा नसतात.' }
          }
        ]
      }
    ]
  },
  {
    id: 's3_cordblood',
    title: {
      en: 'Parents Learning About Cord Blood',
      hi: 'गर्भनाल रक्त (कॉर्ड ब्लड) के बारे में अभिभावक',
      mr: 'कॉर्ड ब्लडबद्दल माहिती घेणारे पालक'
    },
    avatar: '👶',
    steps: [
      {
        character: { en: '👶 Expectant Parents', hi: '👶 होने वाले माता-पिता', mr: '👶 भावी माता-पिता' },
        prompt: {
          en: 'We are expecting a baby and want to understand cord blood banking.',
          hi: 'हमारा बच्चा होने वाला है और हम कॉर्ड ब्लड बैंकिंग समझना चाहते हैं।',
          mr: 'आमच्या घरी बाळ येणार आहे आणि आम्हाला कॉर्ड ब्लड बँकिंग समजून घ्यायचे आहे.'
        },
        roadmapNode: { icon: '👶', label: { en: 'Inquire', hi: 'पूछताछ', mr: 'माहिती' } },
        choices: [
          {
            icon: '🩺',
            text: { en: 'Consult obstetrician and research public vs private bank models', hi: 'प्रसूति विशेषज्ञ से सलाह लें और सार्वजनिक बनाम निजी बैंक समझें', mr: 'प्रसूती तज्ज्ञांचा सल्ला घ्या आणि सार्वजनिक व खाजगी बँक फरक समजून घ्या' },
            isSafe: true,
            feedback: { en: 'Well done! Understanding public donation vs private preservation helps you choose wisely.', hi: 'बहुत अच्छा! सार्वजनिक दान बनाम निजी संरक्षण को समझना सही निर्णय में मदद करता है।', mr: 'उत्कृष्ट! सार्वजनिक दान आणि खाजगी जतन यातील फरक समजणे फायद्याचे ठरते.' }
          },
          {
            icon: '🏷️',
            text: { en: 'Sign up with an unlicensed agent offering extreme discounts', hi: 'भारी छूट देने वाले बिना लाइसेंस एजेंट से अनुबंध करें', mr: 'मोठी सूट देणाऱ्या परवाना नसलेल्या एजंटशी करार करा' },
            isSafe: false,
            feedback: { en: 'Unlicensed agents risk sample contamination, thawing, and permanent cell death.', hi: 'बिना लाइसेंस एजेंटों के पास सैंपल सुरक्षित रखने की तकनीक नहीं होती।', mr: 'परवाना नसलेल्या एजंटकडे पेशी सुरक्षित ठेवण्याचे तंत्रज्ञान नसते.' }
          },
          {
            icon: '🧊',
            text: { en: 'Plan to store cord blood in your kitchen deep freezer at home', hi: 'घर के किचन डीप फ्रीजर में कॉर्ड ब्लड रखने की योजना बनाएं', mr: 'घरातील किचन डीप फ्रीजरमध्ये कॉर्ड ब्लड साठवण्याचा विचार करा' },
            isSafe: false,
            feedback: { en: 'Stem cells require specialized -196°C cryogenic liquid nitrogen tanks.', hi: 'स्टेम कोशिकाओं को -196°C लिक्विड नाइट्रोजन की आवश्यकता होती है।', mr: 'स्टेम पेशींना -१९६°C लिक्विड नायट्रोजनची आवश्यकता असते.' }
          }
        ]
      },
      {
        character: { en: '🏥 Delivery Coordination', hi: '🏥 प्रसव समन्वय', mr: '🏥 प्रसूती समन्वय' },
        prompt: {
          en: 'How should the cord blood collection be planned at delivery?',
          hi: 'प्रसव के समय संग्रह की योजना कैसे बनाई जानी चाहिए?',
          mr: 'बाळंतपणाच्या वेळी संकलन कसे नियोजित करावे?'
        },
        roadmapNode: { icon: '🩺', label: { en: 'Collection', hi: 'संग्रह', mr: 'संकलन' } },
        choices: [
          {
            icon: '🏥',
            text: { en: 'Coordinate a sterile, approved collection kit with the hospital doctor', hi: 'अस्पताल के डॉक्टर के साथ एक बाँझ, अनुमोदित संग्रह किट का समन्वय करें', mr: 'रुग्णालयातील डॉक्टरांशी निर्जंतुक, मान्यताप्राप्त किटचे समन्वय साधा' },
            isSafe: true,
            feedback: { en: 'Safe delivery! Collection is non-invasive, painless, and sterile for mother and baby.', hi: 'सुरक्षित प्रसव! संग्रह पूरी तरह दर्दरहित और सुरक्षित होता है।', mr: 'सुरक्षित प्रसूती! संकलन आई आणि बाळासाठी पूर्णपणे वेदनारहित आणि सुरक्षित असते.' }
          },
          {
            icon: '⏰',
            text: { en: 'Wait days after delivery before requesting collection', hi: 'प्रसव के कई दिनों बाद संग्रह का अनुरोध करें', mr: 'बाळंतपणानंतर काही दिवसांनी संकलनाची विनंती करा' },
            isSafe: false,
            feedback: { en: 'Cord blood can only be collected within minutes of umbilical delivery.', hi: 'कॉर्ड ब्लड केवल नाल कटने के तुरंत बाद ही एकत्र किया जा सकता है।', mr: 'कॉर्ड ब्लड केवळ नाळ कापल्यानंतर लगेचच गोळा केले जाऊ शकते.' }
          },
          {
            icon: '🧪',
            text: { en: 'Skip all maternal blood infection screenings to save fees', hi: 'फीस बचाने के लिए मां के रक्त की संक्रमण जांच छोड़ दें', mr: 'पैसे वाचवण्यासाठी मातेच्या रक्ताची संसर्ग चाचणी वगळा' },
            isSafe: false,
            feedback: { en: 'Mandatory pathogen testing ensures the stored unit is clinically safe.', hi: 'संक्रमण परीक्षण सुरक्षा के लिए अत्यंत अनिवार्य है।', mr: 'संसर्ग तपासणी सुरक्षिततेसाठी अत्यंत आवश्यक आहे.' }
          }
        ]
      }
    ]
  },
  {
    id: 's4_biobanking',
    title: {
      en: 'Person Exploring Stem-Cell Banking Standards',
      hi: 'स्टेम सेल बैंकिंग मानकों की पड़ताल',
      mr: 'स्टेम सेल बँकिंग मानकांची पडताळणी'
    },
    avatar: '🏦',
    steps: [
      {
        character: { en: '🔬 Biobank Explorer', hi: '🔬 बायोबैंक अन्वेषक', mr: '🔬 बायोबँक अभ्यासक' },
        prompt: {
          en: 'How do I identify a certified, safe stem-cell biobank?',
          hi: 'मैं प्रमाणित और सुरक्षित स्टेम सेल बायोबैंक की पहचान कैसे करूं?',
          mr: 'प्रमाणित आणि सुरक्षित स्टेम सेल बायोबँक कशी ओळखावी?'
        },
        roadmapNode: { icon: '🔍', label: { en: 'Audit', hi: 'समीक्षा', mr: 'तपासणी' } },
        choices: [
          {
            icon: '📋',
            text: { en: 'Verify CDSCO license, ISO accreditation, and cleanroom grade certifications', hi: 'CDSCO लाइसेंस, ISO प्रमाणन और क्लीनरूम ग्रेड सत्यापित करें', mr: 'CDSCO परवाना, ISO प्रमाणपत्र आणि क्लीनरूम ग्रेड तपासा' },
            isSafe: true,
            feedback: { en: 'Gold standard! Valid licenses guarantee regular government inspections.', hi: 'उत्तम मानक! वैध लाइसेंस नियमित सरकारी निरीक्षण सुनिश्चित करते हैं।', mr: 'उत्तम दर्जा! वैध परवाने नियमित शासकीय तपासणीची हमी देतात.' }
          },
          {
            icon: '🏷️',
            text: { en: 'Choose strictly based on whoever offers the lowest flash-sale price', hi: 'केवल सबसे कम कीमत और सेल के आधार पर चुनें', mr: 'केवळ सर्वात कमी किंमतीच्या आधारे निवडा' },
            isSafe: false,
            feedback: { en: 'Never compromise on cryo-preservation quality to save on price.', hi: 'गुणवत्ता से समझौता करने पर कोशिकाएं समय के साथ नष्ट हो सकती हैं।', mr: 'दर्जा दुर्लक्षित केल्यास पेशी कालांतराने नष्ट होऊ शकतात.' }
          },
          {
            icon: '🤝',
            text: { en: 'Trust verbal promises without inspecting regulatory papers', hi: 'सरकारी कागजात देखे बिना मौखिक वादों पर भरोसा करें', mr: 'कागदपत्रे न पाहता केवळ तोंडी आश्वासनांवर विश्वास ठेवा' },
            isSafe: false,
            feedback: { en: 'Always inspect written compliance certificates and facility credentials.', hi: 'हमेशा लिखित प्रमाण पत्र और ऑडिट रिपोर्ट की जांच करें।', mr: 'नेहमी लेखी प्रमाणपत्रे आणि ऑडिट अहवाल तपासा.' }
          }
        ]
      },
      {
        character: { en: '❄️ Cryo Storage', hi: '❄️ क्रायो भंडारण', mr: '❄️ क्रायो साठवण' },
        prompt: {
          en: 'What technology preserves cells safely for decades?',
          hi: 'कौन सी तकनीक कोशिकाओं को दशकों तक जीवित रखती है?',
          mr: 'कोणते तंत्रज्ञान पेशींना अनेक दशके सुरक्षित ठेवते?'
        },
        roadmapNode: { icon: '❄️', label: { en: 'Storage', hi: 'भंडारण', mr: 'साठवण' } },
        choices: [
          {
            icon: '❄️',
            text: { en: 'Liquid nitrogen vapor tanks maintained at -196°C with backup power', hi: '-196°C पर लिक्विड नाइट्रोजन वेपर टैंक और बैकअप पावर', mr: '-१९६°C तापमानावर लिक्विड नायट्रोजन वेपर टँक आणि बॅकअप पॉवर' },
            isSafe: true,
            feedback: { en: 'Scientifically accurate! At -196°C, all metabolic activity halts safely.', hi: 'वैज्ञानिक रूप से सटीक! -196°C पर सभी जैविक क्रियाएं सुरक्षित रहती हैं।', mr: 'वैज्ञानिकदृष्ट्या अचूक! -१९६°C वर सर्व जैविक क्रिया सुरक्षित राहतात.' }
          },
          {
            icon: '🌡️',
            text: { en: 'Standard household ice freezer at -18°C', hi: '-18°C पर साधारण घरेलू फ्रीजर', mr: '-१८°C वरील साधा घरगुती फ्रीजर' },
            isSafe: false,
            feedback: { en: 'Standard freezers cause fatal ice crystallization and destroy cell viability.', hi: 'साधारण फ्रीजर में बर्फ के क्रिस्टल कोशिकाओं को नष्ट कर देते हैं।', mr: 'साध्या फ्रीजरमध्ये बर्फाचे खडे होऊन पेशी नष्ट होतात.' }
          },
          {
            icon: '☀️',
            text: { en: 'Airtight plastic containers stored at room temperature', hi: 'कमरे के तापमान पर एयरटाइट डिब्बे', mr: 'खोलीच्या तापमानावर हवाबंद डबे' },
            isSafe: false,
            feedback: { en: 'Cells undergo irreversible death within 48 hours at room temperature.', hi: 'कमरे के तापमान पर कोशिकाएं 48 घंटों में समाप्त हो जाती हैं।', mr: 'खोलीच्या तापमानावर पेशी ४८ तासांत नष्ट होतात.' }
          }
        ]
      }
    ]
  },
  {
    id: 's5_misleading_ad',
    title: {
      en: 'Person Seeing a Suspicious Treatment Claim',
      hi: 'संदेहास्पद उपचार का दावा देखने वाला व्यक्ति',
      mr: 'संशयास्पद उपचारांचा दावा पाहणारा रुग्ण'
    },
    avatar: '🚨',
    steps: [
      {
        character: { en: '📱 Social Media User', hi: '📱 सोशल मीडिया यूजर', mr: '📱 सोशल मीडिया वापरकर्ता' },
        prompt: {
          en: 'An online ad claims: "100% Miracle Stem Cell Cure for Every Disease!"',
          hi: 'ऑनलाइन विज्ञापन: "सभी बीमारियों का 100% चमत्कारी स्टेम सेल इलाज!"',
          mr: 'ऑनलाइन जाहिरात: "सर्व आजारांवर १००% चमत्कारी स्टेम सेल उपचार!"'
        },
        roadmapNode: { icon: '🚨', label: { en: 'Spot Scam', hi: 'धोखा पहचानें', mr: 'फसवणूक ओळखा' } },
        choices: [
          {
            icon: '🛡️',
            text: { en: 'Recognize scam red-flags: 100% miracle cure guarantees are medically false', hi: 'धोखा पहचानें: 100% इलाज की गारंटी चिकित्सकीय रूप से झूठी होती है', mr: 'फसवणूक ओळखा: १००% बरे करण्याची हमी वैद्यकीयदृष्ट्या खोटी असते' },
            isSafe: true,
            feedback: { en: 'Alert mind! Authentic medical science never promises 100% miracle cures.', hi: 'सावधान सोच! प्रामाणिक चिकित्सा कभी 100% चमत्कार का दावा नहीं करती।', mr: 'सतर्क राहा! खरी वैद्यकीय प्रणाली कधीही १००% चमत्काराचा दावा करत नाही.' }
          },
          {
            icon: '💳',
            text: { en: 'Send an immediate non-refundable cash deposit to book a slot', hi: 'स्लॉट बुक करने के लिए तुरंत गैर-वापसी योग्य एडवांस भेजें', mr: 'स्लॉट बुक करण्यासाठी ताबडतोब परत न मिळणारे पैसे पाठवा' },
            isSafe: false,
            feedback: { en: 'Scammers pressure immediate payments before you can verify facts.', hi: 'धोखेबाज तथ्य जांचने से पहले पैसे ऐंठने का दबाव बनाते हैं।', mr: 'फसवणूक करणारे माहिती तपासण्यापूर्वी पैसे उकळण्याचा दबाव आणतात.' }
          },
          {
            icon: '📢',
            text: { en: 'Share the miracle cure link with all sick family members', hi: 'सभी बीमार रिश्तेदारों के साथ यह लिंक साझा करें', mr: 'सर्व आजारी नातेवाईकांना ही लिंक फॉरवर्ड करा' },
            isSafe: false,
            feedback: { en: 'Sharing unverified claims spreads misinformation and harms vulnerable patients.', hi: 'असत्यापित दावे साझा करने से मरीजों को नुकसान पहुँचता है।', mr: 'असत्यापित दावे फॉरवर्ड केल्याने रुग्णांचे मोठे नुकसान होऊ शकते.' }
          }
        ]
      },
      {
        character: { en: '🔎 Fact Verification', hi: '🔎 तथ्य सत्यापन', mr: '🔎 तथ्य पडताळणी' },
        prompt: {
          en: 'The clinic operator refuses to provide research papers or trial registry numbers.',
          hi: 'क्लिनिक संचालक शोध पत्र या ट्रायल नंबर देने से मना करता है।',
          mr: 'क्लिनिक चालक संशोधन किंवा चाचणी क्रमांक देण्यास नकार देतो.'
        },
        roadmapNode: { icon: '🔍', label: { en: 'Verify', hi: 'सत्यापन', mr: 'पडताळणी' } },
        choices: [
          {
            icon: '🛑',
            text: { en: 'Walk away and report the misleading advertisement to authorities', hi: 'पीछे हटें और अधिकारियों को भ्रामक विज्ञापन की सूचना दें', mr: 'माघार घ्या आणि अधिकाऱ्यांना दिशाभूल करणाऱ्या जाहिरातीची तक्रार करा' },
            isSafe: true,
            feedback: { en: 'Protected! Legitimate clinical trials have public CTRI / ICMR registration numbers.', hi: 'सुरक्षित! वैध परीक्षणों के पास सार्वजनिक CTRI रजिस्ट्री नंबर होते हैं।', mr: 'सुरक्षित! कायदेशीर चाचण्यांकडे अधिकृत CTRI नोंदणी क्रमांक असतो.' }
          },
          {
            icon: '🤫',
            text: { en: 'Agree to take secret injections in a hotel room', hi: 'होटल के कमरे में गुप्त इंजेक्शन लेने के लिए सहमत हों', mr: 'हॉटेलच्या खोलीत गुप्त इंजेक्शन घेण्यास होकार द्या' },
            isSafe: false,
            feedback: { en: 'Hotel room injections carry catastrophic risks of fatal bacterial sepsis.', hi: 'होटल के कमरों में इंजेक्शन जानलेवा संक्रमण का कारण बन सकते हैं।', mr: 'हॉटेलच्या खोल्यांमध्ये इंजेक्शन्स घेतल्यास जीवघेणा संसर्ग होऊ शकतो.' }
          },
          {
            icon: '💸',
            text: { en: 'Borrow high-interest loans to pay for the secret treatment', hi: 'गुप्त उपचार के लिए भारी ब्याज पर कर्ज लें', mr: 'गुप्त उपचारासाठी जास्त व्याजाने कर्ज घ्या' },
            isSafe: false,
            feedback: { en: 'Predatory clinics financially devastate families chasing false hope.', hi: 'धोखेबाज क्लिनिक झूठी उम्मीद के नाम पर परिवारों को बर्बाद करते हैं।', mr: 'खोट्या आशेपोटी फसवणूक करणारे दवाखाने कुटुंबांना आर्थिक अडचणीत आणतात.' }
          }
        ]
      }
    ]
  },
  {
    id: 's6_doctor_questions',
    title: {
      en: 'Preparing Questions Before Talking to a Doctor',
      hi: 'डॉक्टर से बात करने से पहले प्रश्न तैयार करना',
      mr: 'डॉक्टरांशी बोलण्यापूर्वी प्रश्नांची तयारी करणे'
    },
    avatar: '📝',
    steps: [
      {
        character: { en: '📝 Prepared Patient', hi: '📝 तैयार मरीज', mr: '📝 जागरूक रुग्ण' },
        prompt: {
          en: 'I have an upcoming consultation with a transplant hematologist.',
          hi: 'मेरी ट्रांसप्लांट हेमेटोलॉजिस्ट के साथ परामर्श है।',
          mr: 'माझी ट्रान्सप्लांट हेमेटोलॉजिस्टसोबत चर्चा आहे.'
        },
        roadmapNode: { icon: '📝', label: { en: 'Prepare', hi: 'तैयारी', mr: 'तयारी' } },
        choices: [
          {
            icon: '📝',
            text: { en: 'Prepare a list of questions on HLA match, conditioning, and risks', hi: 'HLA मैच, कंडीशनिंग और जोखिमों पर प्रश्नों की सूची तैयार करें', mr: 'HLA मॅच, कंडिशनिंग आणि धोक्यांवर प्रश्नांची यादी तयार करा' },
            isSafe: true,
            feedback: { en: 'Empowered! Prepared patients have far more productive consultations.', hi: 'सशक्त मरीज! तैयारी के साथ परामर्श अधिक प्रभावी होता है।', mr: 'जागरूक रुग्ण! तयारीसह चर्चा केल्यास सल्ला अधिक उपयुक्त ठरतो.' }
          },
          {
            icon: '🙈',
            text: { en: 'Bring no records and assume the doctor knows everything telepathically', hi: 'कोई रिपोर्ट न ले जाएं और सोचें कि डॉक्टर सब जानते हैं', mr: 'कोणतेही अहवाल न नेता डॉक्टर सर्व ओळखतील असे मानणे' },
            isSafe: false,
            feedback: { en: 'Clinicians need complete diagnostic reports and biopsy records.', hi: 'डॉक्टरों को सही निर्णय लेने के लिए संपूर्ण रिपोर्ट की आवश्यकता होती है।', mr: 'डॉक्टरांना योग्य निर्णयासाठी सर्व जुन्या अहवालांची गरज असते.' }
          },
          {
            icon: '🗣️',
            text: { en: 'Refuse all blood tests because you dislike needles', hi: 'सुई नापसंद होने के कारण सभी रक्त परीक्षणों से इनकार करें', mr: 'सुई टोचणे आवडत नसल्याने सर्व चाचण्यांना नकार द्या' },
            isSafe: false,
            feedback: { en: 'Pre-transplant blood testing is life-saving and mandatory.', hi: 'प्रत्यारोपण से पूर्व परीक्षण जीवन रक्षक और अनिवार्य हैं।', mr: 'ट्रान्सप्लांटपूर्वीच्या रक्त चाचण्या जीवनरक्षक आणि आवश्यक असतात.' }
          }
        ]
      },
      {
        character: { en: '🧬 Donor Matching', hi: '🧬 डोनर मिलान', mr: '🧬 दाता जुळणी' },
        prompt: {
          en: 'The doctor explains finding a safe 10/10 HLA matched donor.',
          hi: 'डॉक्टर सुरक्षित 10/10 HLA मिलान वाला डोनर खोजने के बारे में बताते हैं।',
          mr: 'डॉक्टर सुरक्षित १०/१० HLA जुळणारा दाता शोधण्याबद्दल सांगतात.'
        },
        roadmapNode: { icon: '🧬', label: { en: 'HLA Match', hi: 'HLA मिलान', mr: 'HLA मॅच' } },
        choices: [
          {
            icon: '🧬',
            text: { en: 'Understand sibling testing and accredited national registry searches', hi: 'भाई-बहन परीक्षण और राष्ट्रीय रजिस्ट्री खोज को समझें', mr: 'भावंडांची चाचणी आणि राष्ट्रीय रजिस्ट्री शोध समजून घ्या' },
            isSafe: true,
            feedback: { en: 'Accurate! Close HLA matching prevents Graft-versus-Host Disease (GvHD).', hi: 'सटीक! सटीक HLA मिलान गंभीर प्रतिक्रियाओं से बचाता है।', mr: 'अचूक! योग्य HLA जुळणी गंभीर प्रतिक्रियांपासून संरक्षण करते.' }
          },
          {
            icon: '🎲',
            text: { en: 'Insist on taking cells from an untested friend because they feel strong', hi: 'बिना जांच के किसी भी दोस्त से रक्त स्टेम सेल लेने की मांग करें', mr: 'कोणत्याही चाचणीशिवाय मित्राकडून पेशी घेण्याचा हट्ट करा' },
            isSafe: false,
            feedback: { en: 'Unmatched donor cells cause fatal immunological rejection.', hi: 'बिना मिलान वाली कोशिकाएं जानलेवा अस्वीकृति पैदा करती हैं।', mr: 'जुळणी नसलेल्या पेशींमुळे जीवघेणा धोका निर्माण होऊ शकतो.' }
          },
          {
            icon: '⚡',
            text: { en: 'Rush the transplant immediately without infectious disease screening', hi: 'संक्रमण जांच पूरी किए बिना तुरंत प्रत्यारोपण कराने की जल्दी करें', mr: 'संसर्ग तपासणी पूर्ण न करता लगेच ट्रान्सप्लांट करण्याची घाई करा' },
            isSafe: false,
            feedback: { en: 'Infectious screens must be 100% verified prior to conditioning.', hi: 'कंडीशनिंग से पहले संक्रमण स्क्रीनिंग की पुष्टि आवश्यक है।', mr: 'कंडिशनिंगपूर्वी संसर्ग तपासणी पूर्ण होणे अत्यावश्यक आहे.' }
          }
        ]
      }
    ]
  },
  {
    id: 's7_research_vs_approved',
    title: {
      en: 'Person Understanding Research vs Approved Therapy',
      hi: 'अनुसंधान और अनुमोदित थेरेपी में अंतर समझना',
      mr: 'संशोधन आणि मान्यताप्राप्त उपचारांमधील फरक समजणे'
    },
    avatar: '🔬',
    steps: [
      {
        character: { en: '🔬 Science Reader', hi: '🔬 विज्ञान पाठक', mr: '🔬 विज्ञान वाचक' },
        prompt: {
          en: 'Reading news about early laboratory stem-cell breakthroughs.',
          hi: 'लैब में प्रारंभिक स्टेम सेल शोध की खबर पढ़ना।',
          mr: 'प्रयोगशाळेतील सुरुवातीच्या स्टेम सेल संशोधनाची बातमी वाचणे.'
        },
        roadmapNode: { icon: '🔬', label: { en: 'Research', hi: 'अनुसंधान', mr: 'संशोधन' } },
        choices: [
          {
            icon: '🔬',
            text: { en: 'Understand that early lab research takes years of clinical trials before human safety is proven', hi: 'समझें कि लैब शोध को मानव सुरक्षा सिद्ध करने में कई साल लगते हैं', mr: 'लॅब संशोधनाला मानवी सुरक्षेसाठी अनेक वर्षे लागतात हे समजून घ्या' },
            isSafe: true,
            feedback: { en: 'Scientifically mature! Lab studies are foundations, not immediately approved therapies.', hi: 'परिपक्व सोच! लैब अध्ययन प्रारंभिक चरण हैं, तैयार चिकित्सा नहीं।', mr: 'योग्य विचार! लॅब अभ्यास प्राथमिक टप्पा असतो, पूर्ण उपचार नव्हे.' }
          },
          {
            icon: '💉',
            text: { en: 'Demand local doctors inject the early lab formula into you today', hi: 'डॉक्टरों से मांग करें कि आज ही लैब वाला फार्मूला आपको दें', mr: 'डॉक्टरांकडे लॅबमधील फॉर्म्युला आजच टोचण्याचा हट्ट करा' },
            isSafe: false,
            feedback: { en: 'Uncontrolled lab formulations cause lethal toxicities in humans.', hi: 'अप्रमाणित लैब फार्मूले इंसानों के लिए अत्यंत घातक हो सकते हैं।', mr: 'अपुऱ्या चाचण्यांचे फॉर्म्युले माणसांसाठी अत्यंत घातक ठरू शकतात.' }
          },
          {
            icon: '🧪',
            text: { en: 'Try to recreate biological experiments at home using DIY internet tips', hi: 'इंटरनेट देखकर घर पर जैविक प्रयोग करने का प्रयास करें', mr: 'इंटरनेट पाहून घरीच प्रयोग करण्याचा प्रयत्न करा' },
            isSafe: false,
            feedback: { en: 'Do-it-yourself biologics are hazardous and illegal.', hi: 'घर पर जैविक पदार्थ बनाना खतरनाक और गैरकानूनी है।', mr: 'घरी असे प्रयोग करणे अत्यंत धोकादायक आणि बेकायदेशीर आहे.' }
          }
        ]
      },
      {
        character: { en: '📋 Clinical Trial Check', hi: '📋 क्लिनिकल ट्रायल जांच', mr: '📋 क्लिनिकल चाचणी तपासणी' },
        prompt: {
          en: 'A private centre claims to run an "experimental trial".',
          hi: 'एक निजी केंद्र "प्रायोगिक परीक्षण" चलाने का दावा करता है।',
          mr: 'एक खाजगी केंद्र "प्रायोगिक चाचणी" चालवण्याचा दावा करते.'
        },
        roadmapNode: { icon: '📋', label: { en: 'Trial Check', hi: 'ट्रायल जांच', mr: 'चाचणी तपासणी' } },
        choices: [
          {
            icon: '📋',
            text: { en: 'Verify official registration on CTRI (Clinical Trials Registry - India)', hi: 'CTRI (क्लिनिकल ट्रायल्स रजिस्ट्री - भारत) पर पंजीकरण जांचें', mr: 'CTRI (क्लिनिकल ट्रायल्स रजिस्ट्री - भारत) वर अधिकृत नोंदणी तपासा' },
            isSafe: true,
            feedback: { en: 'Exact check! Ethical human clinical trials must be formally registered and approved.', hi: 'सही कदम! सभी नैतिक मानव परीक्षण सरकारी रजिस्ट्री में दर्ज होते हैं।', mr: 'योग्य पाऊल! सर्व कायदेशीर मानवी चाचण्या सरकारी नोंदणीत नोंदवलेल्या असतात.' }
          },
          {
            icon: '💰',
            text: { en: 'Pay $10,000 upfront participation fee to the trial doctor', hi: 'परीक्षण डॉक्टर को $10,000 की भागीदारी फीस का अग्रिम भुगतान करें', mr: 'चाचणी डॉक्टरांना सहभागी होण्यासाठी मोठी फी आधीच द्या' },
            isSafe: false,
            feedback: { en: 'Ethical clinical trials NEVER charge patients fees for experimental therapies.', hi: 'नैतिक परीक्षण मरीजों से परीक्षण के लिए पैसे कभी नहीं लेते।', mr: 'नैतिक क्लिनिकल चाचण्या रुग्णांकडून कधीही पैसे आकारत नाहीत.' }
          },
          {
            icon: '✍️',
            text: { en: 'Sign away all your legal rights and agree to no medical oversight', hi: 'अपने सभी कानूनी अधिकार छोड़ने वाले पत्र पर हस्ताक्षर करें', mr: 'सर्व कायदेशीर हक्क सोडण्याच्या पत्रावर स्वाक्षरी करा' },
            isSafe: false,
            feedback: { en: 'Informed consent protects patient autonomy; never sign rights away.', hi: 'सहमति पत्र मरीज के अधिकारों की रक्षा करता है; अधिकारों का त्याग न करें।', mr: 'संमती पत्र रुग्णाच्या हक्कांचे रक्षण करते; हक्क सोडू नका.' }
          }
        ]
      }
    ]
  }
];

export const getRandomCareQuestScenario = () => {
  const index = Math.floor(Math.random() * CARE_QUEST_SCENARIOS.length);
  return CARE_QUEST_SCENARIOS[index];
};

// Aliases for compatibility
export const G2_SCENARIOS_BANK = CARE_QUEST_SCENARIOS;
export const getRandomG2Scenario = getRandomCareQuestScenario;


// =========================================================================
// ACTIVITY 3 — 🛡️ SAFE OR UNSAFE (20 Varied Beginner Situations)
// =========================================================================
export const SAFE_OR_UNSAFE_BANK = [
  {
    id: 'sou_1',
    claim: {
      en: '“100% CURE FOR EVERY DISEASE WITH ZERO RISKS!”',
      hi: '“बिना किसी जोखिम के दुनिया की हर बीमारी का 100% पक्का इलाज!”',
      mr: '“कोणत्याही धोक्याशिवाय जगातील सर्व आजारांवर १००% खात्रीशीर उपचार!”'
    },
    icon: '🚨',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Authentic medicine never promises 100% guarantees or zero risks. This is a common scam red-flag.',
      hi: 'असुरक्षित: वास्तविक चिकित्सा कभी 100% गारंटी या शून्य जोखिम का दावा नहीं करती। यह धोखे का बड़ा संकेत है।',
      mr: 'असुरक्षित: खरी वैद्यकीय प्रणाली कधीही १००% हमी किंवा शून्य धोक्याचा दावा करत नाही. ही फसवणूक असू शकते.'
    }
  },
  {
    id: 'sou_2',
    claim: {
      en: '“Talk to a qualified hospital hematologist about treatment options.”',
      hi: '“उपचार विकल्पों के बारे में अस्पताल के योग्य हेमेटोलॉजिस्ट से परामर्श लें।”',
      mr: '“उपचारांच्या पर्यायांसाठी रुग्णालयातील तज्ज्ञ हेमेटोलॉजिस्टशी चर्चा करा.”'
    },
    icon: '👨‍⚕️',
    isSafe: true,
    explanation: {
      en: 'SAFE: Certified specialists carefully evaluate blood tests, HLA genetic matching, and clinical safety.',
      hi: 'सुरक्षित: प्रमाणित विशेषज्ञ रक्त जांच, HLA मैचिंग और सुरक्षा का गहन मूल्यांकन करते हैं।',
      mr: 'सुरक्षित: प्रमाणित तज्ज्ञ रक्त तपासणी, HLA जुळणी आणि सुरक्षिततेचे योग्य मूल्यांकन करतात.'
    }
  },
  {
    id: 'sou_3',
    claim: {
      en: '“Pay cash today! This secret formula works for everyone!”',
      hi: '“आज ही नकद भुगतान करें! यह गुप्त फार्मूला सभी पर काम करता है!”',
      mr: '“आजच रोख पैसे द्या! हा गुप्त फॉर्म्युला प्रत्येकावर गुणकारी ठरतो!”'
    },
    icon: '💰',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: High-pressure cash demands without diagnostic workups are predatory and dangerous.',
      hi: 'असुरक्षित: बिना जांच के तुरंत नकद भुगतान का दबाव बनाना धोखेबाजों का काम है।',
      mr: 'असुरक्षित: वैद्यकीय तपासणीशिवाय तातडीने रोख रक्कम मागणे धोकादायक आणि संशयास्पद आहे.'
    }
  },
  {
    id: 'sou_4',
    claim: {
      en: '“Verify hospital accreditation and national ICMR / CDSCO licensing.”',
      hi: '“अस्पताल की मान्यता और राष्ट्रीय ICMR / CDSCO लाइसेंस की पुष्टि करें।”',
      mr: '“रुग्णालयाची मान्यता आणि राष्ट्रीय ICMR / CDSCO परवान्याची खात्री करा.”'
    },
    icon: '🏛️',
    isSafe: true,
    explanation: {
      en: 'SAFE: Government licenses ensure facilities undergo strict sterility and safety inspections.',
      hi: 'सुरक्षित: सरकारी लाइसेंस यह सुनिश्चित करते हैं कि अस्पताल कड़े सुरक्षा नियमों का पालन करते हैं।',
      mr: 'सुरक्षित: शासकीय परवाने हे सुनिश्चित करतात की रुग्णालय कडक सुरक्षा नियमांचे पालन करते.'
    }
  },
  {
    id: 'sou_5',
    claim: {
      en: '“Receive secret stem-cell injections in a private hotel room.”',
      hi: '“होटल के एक कमरे में गुप्त स्टेम सेल इंजेक्शन लगवाएं।”',
      mr: '“हॉटेलच्या एका खोलीत गुप्त स्टेम सेलचे इंजेक्शन घ्या.”'
    },
    icon: '🏨',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Unregulated hotel room procedures lack cleanrooms and carry life-threatening infection risks.',
      hi: 'असुरक्षित: होटल के कमरों में जीवाणुरहित वातावरण नहीं होता और जानलेवा संक्रमण का भारी खतरा होता है।',
      mr: 'असुरक्षित: हॉटेलच्या खोल्यांमध्ये निर्जंतुक वातावरण नसते आणि जीवघेणा संसर्ग होण्याचा मोठा धोका असतो.'
    }
  },
  {
    id: 'sou_6',
    claim: {
      en: '“Collect newborn cord blood painlessly at birth using a sterile kit.”',
      hi: '“जन्म के समय बाँझ किट से नवजात का कॉर्ड ब्लड बिना किसी दर्द के एकत्र करें।”',
      mr: '“बाळाच्या जन्मावेळी निर्जंतुक किट वापरून नाळेचे रक्त वेदनारहित गोळा करा.”'
    },
    icon: '👶',
    isSafe: true,
    explanation: {
      en: 'SAFE: Cord blood collection is safe, non-invasive, and painless for both mother and infant.',
      hi: 'सुरक्षित: कॉर्ड ब्लड संग्रह पूरी तरह सुरक्षित, दर्दरहित और हानिरहित होता है।',
      mr: 'सुरक्षित: कॉर्ड ब्लड संकलन आई आणि बाळासाठी पूर्णपणे सुरक्षित आणि वेदनारहित असते.'
    }
  },
  {
    id: 'sou_7',
    claim: {
      en: '“Cosmetic face cream with live stem cells reverses aging permanently!”',
      hi: '“जीवित स्टेम सेल वाली फेस क्रीम उम्र बढ़ने को हमेशा के लिए उलट देती है!”',
      mr: '“जिवंत स्टेम पेशी असलेली फेस क्रीम म्हातारपण कायमचे थांबवते!”'
    },
    icon: '🧴',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Human stem cells cannot survive in cosmetic jars or room-temperature creams. This is pure marketing fiction.',
      hi: 'असुरक्षित: मानव स्टेम कोशिकाएं क्रीम की डिब्बी में जीवित नहीं रह सकतीं। यह केवल भ्रामक विज्ञापन है।',
      mr: 'असुरक्षित: मानवी स्टेम पेशी क्रीमच्या डब्यात जिवंत राहू शकत नाहीत. ही केवळ दिशाभूल करणारी जाहिरात आहे.'
    }
  },
  {
    id: 'sou_8',
    claim: {
      en: '“Conduct HLA genetic testing before a bone marrow stem cell transplant.”',
      hi: '“अस्थि मज्जा स्टेम सेल प्रत्यारोपण से पहले HLA आनुवंशिक परीक्षण करवाएं।”',
      mr: '“बोन मॅरो स्टेम सेल ट्रान्सप्लांटपूर्वी HLA जनुकीय चाचणी करून घ्या.”'
    },
    icon: '🧬',
    isSafe: true,
    explanation: {
      en: 'SAFE: Exact HLA matching is required to prevent fatal immune rejection (GvHD).',
      hi: 'सुरक्षित: शरीर द्वारा नई कोशिकाओं को अस्वीकार करने से बचाने के लिए सटीक HLA मिलान अनिवार्य है।',
      mr: 'सुरक्षित: शरीराने नवीन पेशी नाकारू नयेत म्हणून अचूक HLA जुळणी अत्यंत आवश्यक आहे.'
    }
  },
  {
    id: 'sou_9',
    claim: {
      en: '“Stop all your prescribed cancer medicines to drink a stem-cell herbal juice.”',
      hi: '“स्टेम सेल हर्बल जूस पीने के लिए अपनी सभी कैंसर की दवाएं तुरंत बंद कर दें।”',
      mr: '“स्टेम सेल ज्यूस पिण्यासाठी तुमची कर्करोगाची सर्व औषधे ताबडतोब बंद करा.”'
    },
    icon: '🚫',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Abruptly stopping evidence-based treatments can allow life-threatening illnesses to surge.',
      hi: 'असुरक्षित: सिद्ध दवाएं अचानक बंद करना जानलेवा हो सकता है। कोई भी बदलाव डॉक्टर की देखरेख में ही करें।',
      mr: 'असुरक्षित: सिद्ध झालेली औषधे अचानक बंद करणे जीवघेणे ठरू शकते. डॉक्टरांच्या सल्ल्याशिवाय औषधे थांबवू नका.'
    }
  },
  {
    id: 'sou_10',
    claim: {
      en: '“Stem-cell biobank stores samples in liquid nitrogen vapor at -196°C.”',
      hi: '“स्टेम सेल बायोबैंक नमूनों को -196°C लिक्विड नाइट्रोजन वेपर में रखता है।”',
      mr: '“स्टेम सेल बायोबँक सॅम्पल्स -१९६°C लिक्विड नायट्रोजन वेपरमध्ये ठेवते.”'
    },
    icon: '❄️',
    isSafe: true,
    explanation: {
      en: 'SAFE: At -196°C, all cellular biological processes stop completely, preserving cells intact for decades.',
      hi: 'सुरक्षित: -196°C पर सभी जैविक क्रियाएं सुरक्षित रूप से थम जाती हैं और कोशिकाएं दशकों तक सुरक्षित रहती हैं।',
      mr: 'सुरक्षित: -१९६°C तापमानावर सर्व जैविक क्रिया थांबतात आणि पेशी अनेक दशकांसाठी सुरक्षित राहतात.'
    }
  },
  {
    id: 'sou_11',
    claim: {
      en: '“Store your baby\'s cord blood in your home kitchen freezer to save money.”',
      hi: '“पैसे बचाने के लिए अपने बच्चे का कॉर्ड ब्लड घर के किचन फ्रीजर में रखें।”',
      mr: '“पैसे वाचवण्यासाठी बाळाचे कॉर्ड ब्लड घरातील किचन फ्रीजरमध्ये ठेवा.”'
    },
    icon: '🧊',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Household freezers form large ice crystals that puncture and destroy cell walls completely.',
      hi: 'असुरक्षित: घरेलू फ्रीजर में बर्फ के नुकीले टुकड़े कोशिकाओं को फाड़कर पूरी तरह नष्ट कर देते हैं।',
      mr: 'असुरक्षित: घरगुती फ्रीजरमध्ये बर्फाचे धारदार खडे तयार होऊन पेशी पूर्णपणे नष्ट होतात.'
    }
  },
  {
    id: 'sou_12',
    claim: {
      en: '“Doctor clearly discusses potential risks, hospital stay duration, and recovery steps.”',
      hi: '“डॉक्टर संभावित जोखिमों, अस्पताल में रहने की अवधि और रिकवरी के चरणों पर खुलकर चर्चा करते हैं।”',
      mr: '“डॉक्टर संभाव्य धोके, रुग्णालयातील मुक्काम आणि बरे होण्याच्या टप्प्यांवर सविस्तर चर्चा करतात.”'
    },
    icon: '🩺',
    isSafe: true,
    explanation: {
      en: 'SAFE: Transparent counseling and informed consent are the hallmark of ethical medical care.',
      hi: 'सुरक्षित: पारदर्शी परामर्श और पूरी जानकारी नैतिक चिकित्सा देखभाल की पहचान है।',
      mr: 'सुरक्षित: पारदर्शक चर्चा आणि माहिती ही नैतिक वैद्यकीय सेवेची खरी ओळख आहे.'
    }
  },
  {
    id: 'sou_13',
    claim: {
      en: '“Injecting stem cells into veins cures autism and mental disorders in 48 hours!”',
      hi: '“नस में स्टेम सेल लगाने से 48 घंटे में ऑटिज्म और मानसिक बीमारियां ठीक हो जाती हैं!”',
      mr: '“नसामध्ये स्टेम सेल दिल्यास ४८ तासांत ऑटिझम आणि मानसिक आजार बरे होतात!”'
    },
    icon: '🧠',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: There is zero scientific or regulatory approval for stem-cell autism cures. These claims exploit desperate families.',
      hi: 'असुरक्षित: ऑटिज्म के लिए स्टेम सेल का कोई स्वीकृत उपचार नहीं है। ऐसे दावे परिवारों का शोषण करते हैं।',
      mr: 'असुरक्षित: ऑटिझमसाठी स्टेम सेल उपचारांना कोणतीही वैज्ञानिक मान्यता नाही. हे दावे दिशाभूल करणारे आहेत.'
    }
  },
  {
    id: 'sou_14',
    claim: {
      en: '“Checking if a clinical trial has an official public CTRI registration number.”',
      hi: '“यह जांचना कि क्या क्लिनिकल ट्रायल के पास आधिकारिक CTRI रजिस्ट्रेशन नंबर है।”',
      mr: '“क्लिनिकल चाचणीकडे अधिकृत CTRI नोंदणी क्रमांक आहे का ते तपासणे.”'
    },
    icon: '📋',
    isSafe: true,
    explanation: {
      en: 'SAFE: All legitimate human clinical trials in India must be registered on the Clinical Trials Registry - India.',
      hi: 'सुरक्षित: भारत में सभी वैध मानव परीक्षणों का CTRI पर पंजीकृत होना अनिवार्य है।',
      mr: 'सुरक्षित: भारतातील सर्व कायदेशीर मानवी चाचण्या CTRI वर नोंदवलेल्या असणे बंधनकारक आहे.'
    }
  },
  {
    id: 'sou_15',
    claim: {
      en: '“Take cells from an untested friend because he eats healthy and runs every day.”',
      hi: '“किसी बिना जांच वाले दोस्त से स्टेम सेल लें क्योंकि वह स्वस्थ खाना खाता है और रोज दौड़ता है।”',
      mr: '“कोणत्याही चाचणीशिवाय मित्राकडून स्टेम सेल घ्या कारण तो निरोगी आहे आणि व्यायाम करतो.”'
    },
    icon: '🎲',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Without genetic HLA matching, non-matched donor cells will trigger fatal immunological rejection.',
      hi: 'असुरक्षित: बिना HLA मैचिंग के शरीर इन कोशिकाओं को अस्वीकार कर देगा, जो जानलेवा हो सकता है।',
      mr: 'असुरक्षित: HLA जुळणी नसल्यास शरीर या पेशी नाकारेल, जे अत्यंत घातक ठरू शकते.'
    }
  },
  {
    id: 'sou_16',
    claim: {
      en: '“Using approved hematopoietic stem cell therapy for blood cancers like leukemia.”',
      hi: '“ल्यूकेमिया जैसे रक्त कैंसर के लिए अनुमोदित हेमेटोपोएटिक स्टेम सेल थेरेपी का उपयोग करना।”',
      mr: '“ल्युकेमियासारख्या रक्ताच्या कर्करोगासाठी मान्यताप्राप्त स्टेम सेल थेरपीचा वापर करणे.”'
    },
    icon: '🩸',
    isSafe: true,
    explanation: {
      en: 'SAFE: Hematopoietic stem cell transplantation is globally proven and approved for specific blood disorders.',
      hi: 'सुरक्षित: हेमेटोपोएटिक प्रत्यारोपण विशिष्ट रक्त विकारों के लिए विश्व स्तर पर सिद्ध और अनुमोदित है।',
      mr: 'सुरक्षित: हेमेटोपोएटिक ट्रान्सप्लांट हे विशिष्ट रक्त विकारांसाठी जगभरात सिद्ध आणि मान्यताप्राप्त आहे.'
    }
  },
  {
    id: 'sou_17',
    claim: {
      en: '“Order DIY stem-cell injection syringes from an anonymous foreign website.”',
      hi: '“किसी अज्ञात विदेशी वेबसाइट से घर पर लगाने वाले स्टेम-सेल इंजेक्शन ऑर्डर करें।”',
      mr: '“एखाद्या अज्ञात परदेशी वेबसाइटवरून घरी टोचण्याचे स्टेम-सेल इंजेक्शन मागवा.”'
    },
    icon: '📦',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Unregulated mail-order biologics contain contaminants, toxins, or fake substances that cause septic shock.',
      hi: 'असुरक्षित: डाक से मंगाए गए पदार्थों में खतरनाक जीवाणु हो सकते हैं जो जानलेवा सेप्सिस पैदा कर सकते हैं।',
      mr: 'असुरक्षित: कुरियरने मागवलेल्या औषधांमध्ये घातक जंतू असू शकतात ज्यामुळे जीवघेणा संसर्ग होऊ शकतो.'
    }
  },
  {
    id: 'sou_18',
    claim: {
      en: '“Registering as a voluntary stem-cell donor through an accredited national registry.”',
      hi: '“मान्यता प्राप्त राष्ट्रीय रजिस्ट्री के माध्यम से स्वैच्छिक स्टेम सेल डोनर के रूप में पंजीकरण करना।”',
      mr: '“मान्यताप्राप्त राष्ट्रीय रजिस्ट्रीद्वारे ऐच्छिक स्टेम सेल दाता म्हणून नोंदणी करणे.”'
    },
    icon: '❤️',
    isSafe: true,
    explanation: {
      en: 'SAFE: Accredited registries protect donor health, follow ethical standards, and help save lives.',
      hi: 'सुरक्षित: मान्यता प्राप्त रजिस्ट्रियां दाताओं के स्वास्थ्य की रक्षा करती हैं और जीवन बचाने में मदद करती हैं।',
      mr: 'सुरक्षित: अधिकृत संस्था दात्याच्या आरोग्याची काळजी घेतात आणि रुग्णांचे प्राण वाचवण्यास मदत करतात.'
    }
  },
  {
    id: 'sou_19',
    claim: {
      en: '“Clinic refuses to give a receipt or medical discharge summary for your records.”',
      hi: '“क्लिनिक आपके रिकॉर्ड के लिए रसीद या डिस्चार्ज सारांश देने से इनकार करता है।”',
      mr: '“क्लिनिक तुमच्या नोंदीसाठी पावती किंवा डिस्चार्ज रिपोर्ट देण्यास नकार देते.”'
    },
    icon: '📑',
    isSafe: false,
    explanation: {
      en: 'UNSAFE: Legitimate medical hospitals provide comprehensive written records, itemized bills, and discharge summaries.',
      hi: 'असुरक्षित: वैध अस्पताल हमेशा विस्तृत रिपोर्ट, बिल और डिस्चार्ज सारांश प्रदान करते हैं।',
      mr: 'असुरक्षित: कायदेशीर रुग्णालये नेहमी सविस्तर अहवाल, बिले आणि डिस्चार्ज सारांश देतात.'
    }
  },
  {
    id: 'sou_20',
    claim: {
      en: '“Following strict sterile hygiene, mask wearing, and blood monitoring after transplant.”',
      hi: '“प्रत्यारोपण के बाद सख्त स्वच्छता, मास्क पहनना और नियमित रक्त जांच का पालन करना।”',
      mr: '“ट्रान्सप्लांटनंतर कडक स्वच्छता, मास्क वापरणे आणि नियमित रक्त तपासणीचे पालन करणे.”'
    },
    icon: '🌱',
    isSafe: true,
    explanation: {
      en: 'SAFE: During early engraftment, protecting your recovering immune system from outside infections is crucial.',
      hi: 'सुरक्षित: ठीक होने के शुरुआती दौर में नई प्रतिरक्षा प्रणाली को संक्रमण से बचाना जीवनरक्षक होता है।',
      mr: 'सुरक्षित: सुरुवातीच्या काळात नवीन रोगप्रतिकारक शक्तीचे संसर्गापासून रक्षण करणे जीवनरक्षक असते.'
    }
  }
];

export const getRandomSafeOrUnsafe = (count = 6) => {
  const shuffled = [...SAFE_OR_UNSAFE_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Backward-compatibility exports
export const G1_CHALLENGE_BANK = FLASHCARDS_BANK;
export const getRandomG1Challenges = getRandomFlashcards;
export const getRandomG3DailySession = getRandomSafeOrUnsafe;
