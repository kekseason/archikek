// Centralized regional discounts configuration
// Must match Lemon Squeezy discount codes!

export const REGIONAL_DISCOUNTS: Record<string, { percent: number; name: string; code: string }> = {
  // ========== 60% - Turkey & Balkans ==========
  'TR': { percent: 60, name: 'Turkey', code: 'TR60' },
  'NG': { percent: 60, name: 'Nigeria', code: 'NG60' },
  'AL': { percent: 60, name: 'Albania', code: 'BAL60' },
  'BA': { percent: 60, name: 'Bosnia', code: 'BAL60' },
  'BG': { percent: 60, name: 'Bulgaria', code: 'BAL60' },
  'HR': { percent: 60, name: 'Croatia', code: 'BAL60' },
  'XK': { percent: 60, name: 'Kosovo', code: 'BAL60' },
  'MK': { percent: 60, name: 'North Macedonia', code: 'BAL60' },
  'ME': { percent: 60, name: 'Montenegro', code: 'BAL60' },
  'RS': { percent: 60, name: 'Serbia', code: 'BAL60' },
  'RO': { percent: 60, name: 'Romania', code: 'BAL60' },
  
  // ========== 50% - South Asia ==========
  'IN': { percent: 50, name: 'India', code: 'IN50' },
  'PK': { percent: 50, name: 'Pakistan', code: 'PK50' },
  'BD': { percent: 50, name: 'Bangladesh', code: 'BD50' },
  'AZ': { percent: 50, name: 'Azerbaijan', code: 'AZ50' },
  
  // ========== 50% - Southeast Asia (ID50) ==========
  'ID': { percent: 50, name: 'Indonesia', code: 'SEA50' },
  'PH': { percent: 50, name: 'Philippines', code: 'SEA50' },
  'VN': { percent: 50, name: 'Vietnam', code: 'SEA50' },
  'TH': { percent: 50, name: 'Thailand', code: 'SEA50' },
  'MY': { percent: 50, name: 'Malaysia', code: 'SEA50' },
  'MM': { percent: 50, name: 'Myanmar', code: 'SEA50' },
  'KH': { percent: 50, name: 'Cambodia', code: 'SEA50' },
  'LA': { percent: 50, name: 'Laos', code: 'SEA50' },
  'TL': { percent: 50, name: 'Timor-Leste', code: 'SEA50' },
  
  // ========== 50% - South America (BR50) ==========
  'BR': { percent: 50, name: 'Brazil', code: 'SA50' },
  'AR': { percent: 50, name: 'Argentina', code: 'SA50' },
  'CL': { percent: 50, name: 'Chile', code: 'SA50' },
  'CO': { percent: 50, name: 'Colombia', code: 'SA50' },
  'PE': { percent: 50, name: 'Peru', code: 'SA50' },
  'VE': { percent: 50, name: 'Venezuela', code: 'SA50' },
  'EC': { percent: 50, name: 'Ecuador', code: 'SA50' },
  'BO': { percent: 50, name: 'Bolivia', code: 'SA50' },
  'PY': { percent: 50, name: 'Paraguay', code: 'SA50' },
  'UY': { percent: 50, name: 'Uruguay', code: 'SA50' },
  'GY': { percent: 50, name: 'Guyana', code: 'SA50' },
  'SR': { percent: 50, name: 'Suriname', code: 'SA50' },
  
  // ========== 50% - Africa (ZA50) ==========
  'ZA': { percent: 50, name: 'South Africa', code: 'AF50' },
  'EG': { percent: 50, name: 'Egypt', code: 'AF50' },
  'DZ': { percent: 50, name: 'Algeria', code: 'AF50' },
  'MA': { percent: 50, name: 'Morocco', code: 'AF50' },
  'TN': { percent: 50, name: 'Tunisia', code: 'AF50' },
  'LY': { percent: 50, name: 'Libya', code: 'AF50' },
  'KE': { percent: 50, name: 'Kenya', code: 'AF50' },
  'ET': { percent: 50, name: 'Ethiopia', code: 'AF50' },
  'GH': { percent: 50, name: 'Ghana', code: 'AF50' },
  'TZ': { percent: 50, name: 'Tanzania', code: 'AF50' },
  'UG': { percent: 50, name: 'Uganda', code: 'AF50' },
  'SD': { percent: 50, name: 'Sudan', code: 'AF50' },
  'AO': { percent: 50, name: 'Angola', code: 'AF50' },
  'MZ': { percent: 50, name: 'Mozambique', code: 'AF50' },
  'MG': { percent: 50, name: 'Madagascar', code: 'AF50' },
  'CM': { percent: 50, name: 'Cameroon', code: 'AF50' },
  'CI': { percent: 50, name: 'Ivory Coast', code: 'AF50' },
  'NE': { percent: 50, name: 'Niger', code: 'AF50' },
  'BF': { percent: 50, name: 'Burkina Faso', code: 'AF50' },
  'ML': { percent: 50, name: 'Mali', code: 'AF50' },
  'MW': { percent: 50, name: 'Malawi', code: 'AF50' },
  'ZM': { percent: 50, name: 'Zambia', code: 'AF50' },
  'ZW': { percent: 50, name: 'Zimbabwe', code: 'AF50' },
  'SN': { percent: 50, name: 'Senegal', code: 'AF50' },
  'TD': { percent: 50, name: 'Chad', code: 'AF50' },
  'SO': { percent: 50, name: 'Somalia', code: 'AF50' },
  'CD': { percent: 50, name: 'DR Congo', code: 'AF50' },
  'CG': { percent: 50, name: 'Congo', code: 'AF50' },
  'RW': { percent: 50, name: 'Rwanda', code: 'AF50' },
  'BJ': { percent: 50, name: 'Benin', code: 'AF50' },
  'BI': { percent: 50, name: 'Burundi', code: 'AF50' },
  'TG': { percent: 50, name: 'Togo', code: 'AF50' },
  'SL': { percent: 50, name: 'Sierra Leone', code: 'AF50' },
  'LR': { percent: 50, name: 'Liberia', code: 'AF50' },
  'MR': { percent: 50, name: 'Mauritania', code: 'AF50' },
  'ER': { percent: 50, name: 'Eritrea', code: 'AF50' },
  'NA': { percent: 50, name: 'Namibia', code: 'AF50' },
  'BW': { percent: 50, name: 'Botswana', code: 'AF50' },
  'GA': { percent: 50, name: 'Gabon', code: 'AF50' },
  'GM': { percent: 50, name: 'Gambia', code: 'AF50' },
  'GW': { percent: 50, name: 'Guinea-Bissau', code: 'AF50' },
  'GN': { percent: 50, name: 'Guinea', code: 'AF50' },
  'LS': { percent: 50, name: 'Lesotho', code: 'AF50' },
  'SZ': { percent: 50, name: 'Eswatini', code: 'AF50' },
  'DJ': { percent: 50, name: 'Djibouti', code: 'AF50' },
  'SS': { percent: 50, name: 'South Sudan', code: 'AF50' },
  'CF': { percent: 50, name: 'Central African Republic', code: 'AF50' },
  'MU': { percent: 50, name: 'Mauritius', code: 'AF50' },
  
  // ========== 30% - Middle income ==========
  'MX': { percent: 30, name: 'Mexico', code: 'MX30' },
  'PL': { percent: 30, name: 'Poland', code: 'PL30' },
}

export type RegionalDiscount = { percent: number; name: string; code: string } | null

export function getDiscountForCountry(countryCode: string | null): RegionalDiscount {
  if (!countryCode) return null
  return REGIONAL_DISCOUNTS[countryCode] || null
}
