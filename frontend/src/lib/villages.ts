export interface VillageInfo {
  name: string;
  nameMr: string;
  taluka: string;
  talukaMr: string;
  district: string;
  distanceToLaturKm: number;
}

export const LATUR_DISTRICT_VILLAGES: VillageInfo[] = [
  // Ausa Taluka (औसा तालुका)
  { name: 'Lamjana', nameMr: 'लामजणा', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 41 },
  { name: 'Hasegaon', nameMr: 'हासेगाव', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 32 },
  { name: 'Matola', nameMr: 'मातोळा', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 28 },
  { name: 'Killari', nameMr: 'किल्लारी', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 48 },
  { name: 'Almala', nameMr: 'अलमला', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 35 },
  { name: 'Uti', nameMr: 'उटी', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 38 },
  { name: 'Lodga', nameMr: 'लोदगा', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 24 },
  { name: 'Belkund', nameMr: 'बेलकुंड', taluka: 'Ausa', talukaMr: 'औसा', district: 'Latur', distanceToLaturKm: 36 },

  // Latur Taluka (लातूर ग्रामीण तालुका)
  { name: 'Harangul', nameMr: 'हरंगूळ (बु.)', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 12 },
  { name: 'Murud', nameMr: 'मुरुड', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 29 },
  { name: 'Babhalgaon', nameMr: 'बाभळगाव', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 9 },
  { name: 'Gategaon', nameMr: 'गातेगाव', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 18 },
  { name: 'Chincholi', nameMr: 'चिंचोली राव', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 16 },
  { name: 'Tandulja', nameMr: 'तांदुळजा', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 22 },
  { name: 'Kasar Kheda', nameMr: 'कासारखेडा', taluka: 'Latur', talukaMr: 'लातूर', district: 'Latur', distanceToLaturKm: 14 },

  // Nilanga Taluka (निलंगा तालुका)
  { name: 'Shirur Anantpal', nameMr: 'शिरूर अनंतपाळ', taluka: 'Nilanga', talukaMr: 'निलंगा', district: 'Latur', distanceToLaturKm: 52 },
  { name: 'Aurad Shahajani', nameMr: 'औराद शहाजानी', taluka: 'Nilanga', talukaMr: 'निलंगा', district: 'Latur', distanceToLaturKm: 68 },
  { name: 'Kasar Balkunda', nameMr: 'कासार बालकुंदा', taluka: 'Nilanga', talukaMr: 'निलंगा', district: 'Latur', distanceToLaturKm: 61 },
  { name: 'Halgara', nameMr: 'हालगर', taluka: 'Nilanga', talukaMr: 'निलंगा', district: 'Latur', distanceToLaturKm: 56 },
  { name: 'Madansuri', nameMr: 'मदनसुरी', taluka: 'Nilanga', talukaMr: 'निलंगा', district: 'Latur', distanceToLaturKm: 64 },

  // Udgir Taluka (उदगीर तालुका)
  { name: 'Nalegaon', nameMr: 'नालेगाव', taluka: 'Udgir', talukaMr: 'उदगीर', district: 'Latur', distanceToLaturKm: 34 },
  { name: 'Wadwana', nameMr: 'वडवणा', taluka: 'Udgir', talukaMr: 'उदगीर', district: 'Latur', distanceToLaturKm: 58 },
  { name: 'Her', nameMr: 'हेर', taluka: 'Udgir', talukaMr: 'उदगीर', district: 'Latur', distanceToLaturKm: 62 },
  { name: 'Deoni', nameMr: 'देवणी', taluka: 'Deoni', talukaMr: 'देवणी', district: 'Latur', distanceToLaturKm: 66 },

  // Chakur Taluka (चाकूर तालुका)
  { name: 'Wadval Nagnath', nameMr: 'वडवळ नागनाथ', taluka: 'Chakur', talukaMr: 'चाकूर', district: 'Latur', distanceToLaturKm: 39 },
  { name: 'Shirur Tajband', nameMr: 'शिरूर ताजबंद', taluka: 'Chakur', talukaMr: 'चाकूर', district: 'Latur', distanceToLaturKm: 44 },
  { name: 'Holi', nameMr: 'होळी', taluka: 'Chakur', talukaMr: 'चाकूर', district: 'Latur', distanceToLaturKm: 42 },

  // Renapur & Ahmedpur (रेणापूर व अहमदपूर)
  { name: 'Pangaon', nameMr: 'पानगाव', taluka: 'Renapur', talukaMr: 'रेणापूर', district: 'Latur', distanceToLaturKm: 38 },
  { name: 'Pohregaon', nameMr: 'पोहरेगाव', taluka: 'Renapur', talukaMr: 'रेणापूर', district: 'Latur', distanceToLaturKm: 27 },
  { name: 'Shirur Tajband', nameMr: 'शिरूर ताजबंद', taluka: 'Ahmedpur', talukaMr: 'अहमदपूर', district: 'Latur', distanceToLaturKm: 54 },
];

export const TALUKAS_IN_LATUR = [
  { id: 'ALL', label: 'सर्व तालुके (All Talukas)' },
  { id: 'Ausa', label: 'औसा (Ausa)' },
  { id: 'Latur', label: 'लातूर (Latur Rural)' },
  { id: 'Nilanga', label: 'निलंगा (Nilanga)' },
  { id: 'Udgir', label: 'उदगीर (Udgir)' },
  { id: 'Chakur', label: 'चाकूर (Chakur)' },
  { id: 'Renapur', label: 'रेणापूर (Renapur)' },
  { id: 'Deoni', label: 'देवणी (Deoni)' },
];
