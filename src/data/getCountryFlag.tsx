import * as flags from 'country-flag-icons/react/3x2'


  const countryToCode: Record<string, string> = {
    'united states': 'US',
    'united kingdom': 'GB',
    'canada': 'CA',
    'france': 'FR',
    'germany': 'DE',
    'nigeria': 'NG',
    'japan': 'JP',
    'china': 'CN',
    'india': 'IN',
    'brazil': 'BR',
    'australia': 'AU',
    'mexico': 'MX',
    'south africa': 'ZA',
    'italy': 'IT',
    'spain': 'ES',
   
  };




export function CountryFlag({ country }: { country: string }) {
  const code = countryToCode[country.toLowerCase()];
  if (!code) return <span>🌍</span>;
  
  const FlagComponent = flags[code as keyof typeof flags];
  if (!FlagComponent) return <span>🌍</span>;
  
  return <FlagComponent className="w-6 h-4" />;
}

// Usage
<CountryFlag country="Nigeria" />







// Usage:
// 🇳🇬<span>{getCountryFlag('United States')}</span> // 🇺🇸
// <span>{getCountryFlag('Nigeria')}</span> 