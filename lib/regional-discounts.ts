// Centralized regional discounts configuration
// Must match Lemon Squeezy discount codes!

export const REGIONAL_DISCOUNTS: Record<string, { percent: number; name: string; code: string }> = {
  // ========== 60% - Turkey & Balkans ==========
  'TR': { percent: 60, name: 'Turkey', code: 'C5NJA5NW' },
  'NG': { percent: 60, name: 'Nigeria', code: 'A4MDKZOQ' },
  'AL': { percent: 60, name: 'Albania', code: 'UWMZM5NG' },
  'BA': { percent: 60, name: 'Bosnia', code: 'UWMZM5NG' },
  'BG': { percent: 60, name: 'Bulgaria', code: 'UWMZM5NG' },
  'HR': { percent: 60, name: 'Croatia', code: 'UWMZM5NG' },
  'XK': { percent: 60, name: 'Kosovo', code: 'UWMZM5NG' },
  'MK': { percent: 60, name: 'North Macedonia', code: 'UWMZM5NG' },
  'ME': { percent: 60, name: 'Montenegro', code: 'UWMZM5NG' },
  'RS': { percent: 60, name: 'Serbia', code: 'UWMZM5NG' },
  'RO': { percent: 60, name: 'Romania', code: 'UWMZM5NG' },
  
  // ========== 50% - South Asia ==========
  'IN': { percent: 50, name: 'India', code: 'G2MZMXNA' },
  'PK': { percent: 50, name: 'Pakistan', code: 'A1MJCXNW' },
  'BD': { percent: 50, name: 'Bangladesh', code: 'A2MZM3OA' },
  'AZ': { percent: 50, name: 'Azerbaijan', code: 'KYMTU0MQ' },
  
  // ========== 50% - Southeast Asia ==========
  'ID': { percent: 50, name: 'Indonesia', code: 'K4MZMYOA' },
  'PH': { percent: 50, name: 'Philippines', code: 'K5ODK2NQ' },
  'VN': { percent: 50, name: 'Vietnam', code: 'UZMTU2NA' },
  'TH': { percent: 50, name: 'Thailand', code: 'UZMTU2NA' },
  'MY': { percent: 50, name: 'Malaysia', code: 'UZMTU2NA' },
  'MM': { percent: 50, name: 'Myanmar', code: 'UZMTU2NA' },
  'KH': { percent: 50, name: 'Cambodia', code: 'UZMTU2NA' },
  'LA': { percent: 50, name: 'Laos', code: 'UZMTU2NA' },
  'TL': { percent: 50, name: 'Timor-Leste', code: 'UZMTU2NA' },
  
  // ========== 50% - South America ==========
  'BR': { percent: 50, name: 'Brazil', code: 'G5NDG4NW' },
  'AR': { percent: 50, name: 'Argentina', code: 'U0MDA0NW' },
  'CL': { percent: 50, name: 'Chile', code: 'U0MDA0NW' },
  'CO': { percent: 50, name: 'Colombia', code: 'U0MDA0NW' },
  'PE': { percent: 50, name: 'Peru', code: 'U0MDA0NW' },
  'VE': { percent: 50, name: 'Venezuela', code: 'U0MDA0NW' },
  'EC': { percent: 50, name: 'Ecuador', code: 'U0MDA0NW' },
  'BO': { percent: 50, name: 'Bolivia', code: 'U0MDA0NW' },
  'PY': { percent: 50, name: 'Paraguay', code: 'U0MDA0NW' },
  'UY': { percent: 50, name: 'Uruguay', code: 'U0MDA0NW' },
  'GY': { percent: 50, name: 'Guyana', code: 'U0MDA0NW' },
  'SR': { percent: 50, name: 'Suriname', code: 'U0MDA0NW' },
  
  // ========== 50% - Africa ==========
  'ZA': { percent: 50, name: 'South Africa', code: 'E1OTM3MW' },
  'EG': { percent: 50, name: 'Egypt', code: 'EWNDMXOA' },
  'DZ': { percent: 50, name: 'Algeria', code: 'U1NJU5MG' },
  'MA': { percent: 50, name: 'Morocco', code: 'U1NJU5MG' },
  'TN': { percent: 50, name: 'Tunisia', code: 'U1NJU5MG' },
  'LY': { percent: 50, name: 'Libya', code: 'U1NJU5MG' },
  'KE': { percent: 50, name: 'Kenya', code: 'U1NJU5MG' },
  'ET': { percent: 50, name: 'Ethiopia', code: 'U1NJU5MG' },
  'GH': { percent: 50, name: 'Ghana', code: 'U1NJU5MG' },
  'TZ': { percent: 50, name: 'Tanzania', code: 'U1NJU5MG' },
  'UG': { percent: 50, name: 'Uganda', code: 'U1NJU5MG' },
  'SD': { percent: 50, name: 'Sudan', code: 'U1NJU5MG' },
  'AO': { percent: 50, name: 'Angola', code: 'U1NJU5MG' },
  'MZ': { percent: 50, name: 'Mozambique', code: 'U1NJU5MG' },
  'MG': { percent: 50, name: 'Madagascar', code: 'U1NJU5MG' },
  'CM': { percent: 50, name: 'Cameroon', code: 'U1NJU5MG' },
  'CI': { percent: 50, name: 'Ivory Coast', code: 'U1NJU5MG' },
  'NE': { percent: 50, name: 'Niger', code: 'U1NJU5MG' },
  'BF': { percent: 50, name: 'Burkina Faso', code: 'U1NJU5MG' },
  'ML': { percent: 50, name: 'Mali', code: 'U1NJU5MG' },
  'MW': { percent: 50, name: 'Malawi', code: 'U1NJU5MG' },
  'ZM': { percent: 50, name: 'Zambia', code: 'U1NJU5MG' },
  'ZW': { percent: 50, name: 'Zimbabwe', code: 'U1NJU5MG' },
  'SN': { percent: 50, name: 'Senegal', code: 'U1NJU5MG' },
  'TD': { percent: 50, name: 'Chad', code: 'U1NJU5MG' },
  'SO': { percent: 50, name: 'Somalia', code: 'U1NJU5MG' },
  'CD': { percent: 50, name: 'DR Congo', code: 'U1NJU5MG' },
  'CG': { percent: 50, name: 'Congo', code: 'U1NJU5MG' },
  'RW': { percent: 50, name: 'Rwanda', code: 'U1NJU5MG' },
  'BJ': { percent: 50, name: 'Benin', code: 'U1NJU5MG' },
  'BI': { percent: 50, name: 'Burundi', code: 'U1NJU5MG' },
  'TG': { percent: 50, name: 'Togo', code: 'U1NJU5MG' },
  'SL': { percent: 50, name: 'Sierra Leone', code: 'U1NJU5MG' },
  'LR': { percent: 50, name: 'Liberia', code: 'U1NJU5MG' },
  'MR': { percent: 50, name: 'Mauritania', code: 'U1NJU5MG' },
  'ER': { percent: 50, name: 'Eritrea', code: 'U1NJU5MG' },
  'NA': { percent: 50, name: 'Namibia', code: 'U1NJU5MG' },
  'BW': { percent: 50, name: 'Botswana', code: 'U1NJU5MG' },
  'GA': { percent: 50, name: 'Gabon', code: 'U1NJU5MG' },
  'GM': { percent: 50, name: 'Gambia', code: 'U1NJU5MG' },
  'GW': { percent: 50, name: 'Guinea-Bissau', code: 'U1NJU5MG' },
  'GN': { percent: 50, name: 'Guinea', code: 'U1NJU5MG' },
  'LS': { percent: 50, name: 'Lesotho', code: 'U1NJU5MG' },
  'SZ': { percent: 50, name: 'Eswatini', code: 'U1NJU5MG' },
  'DJ': { percent: 50, name: 'Djibouti', code: 'U1NJU5MG' },
  'SS': { percent: 50, name: 'South Sudan', code: 'U1NJU5MG' },
  'CF': { percent: 50, name: 'Central African Republic', code: 'U1NJU5MG' },
  'MU': { percent: 50, name: 'Mauritius', code: 'U1NJU5MG' },
  
  // ========== 30% - Middle income ==========
  'MX': { percent: 30, name: 'Mexico', code: 'E3MTQYNW' },
  'PL': { percent: 30, name: 'Poland', code: 'E4OTC2MW' },
}

export type RegionalDiscount = { percent: number; name: string; code: string } | null

export function getDiscountForCountry(countryCode: string | null): RegionalDiscount {
  if (!countryCode) return null
  return REGIONAL_DISCOUNTS[countryCode] || null
}
