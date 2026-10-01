const fs = require('fs');

let s = fs.readFileSync('src/context/LanguageContext.jsx', 'utf8');

// The corrupted section in hi:
const badStart = s.indexOf('g3EnergyAward: \'+150 ⚡ लैब ऊर्जा\',');
const badEnd = s.indexOf('g3Claim3Expl: \'⚠️ धोखा / उच्च जोखिम।', badStart);

if (badStart !== -1 && badEnd !== -1) {
  const goodHiClaims = `g3EnergyAward: '+150 ⚡ लैब ऊर्जा',
    g3Claim1Text: '"स्टेम सेल थेरेपी हर बीमारी के लिए उपयुक्त है और बिना किसी जोखिम के 100% इलाज की गारंटी देती है।"',
    g3Claim1Expl: '⚠️ धोखा / भ्रामक। हर स्टेम सेल उपचार हर बीमारी के लिए उपयुक्त या सिद्ध नहीं है। स्वीकृत उपचार केवल विशिष्ट रक्त और मज्जा विकारों तक सीमित हैं।',
    g3Claim2Text: '"एक लाइसेंस प्राप्त हेमेटोलॉजिस्ट एचएलए परीक्षण करता है, नैदानिक जोखिमों की व्याख्या करता है, और एक मान्यता प्राप्त अस्पताल में काम करता है।"',
    g3Claim2Expl: '🛡️ सुरक्षित / नैतिक देखभाल। एक योग्य विशेषज्ञ आनुवंशिक मिलान करता है, जोखिमों को स्पष्ट बताता है, और अस्पताल समीक्षा बोर्ड के तहत काम करता है।',
    g3Claim3Text: '"एक निजी वेलनेस क्लिनिक बिना किसी परीक्षण स्वीकृति और केवल नकद भुगतान पर गुप्त गर्भनाल रक्त इंजेक्शन प्रदान करता है।"',
    `;

  s = s.substring(0, badStart) + goodHiClaims + s.substring(badEnd);
  fs.writeFileSync('src/context/LanguageContext.jsx', s, 'utf8');
  console.log('Restored Hindi claims cleanly!');
} else {
  console.log('Could not find markers', badStart, badEnd);
}
