export function getLanguage(code) {
  code = code.toLowerCase();

  if (code === 'en') {
    return 'English';
  } else if (code === 'de') {
    return 'German';
  } else if (code === 'fr') {
    return 'French';
  } else if (code === 'es') {
    return 'Spanish';
  } else if (code === 'it') {
    return 'Italian';
  } else if (code === 'nl') {
    return 'Dutch';
  } else if (code === 'pl') {
    return 'Polish';
  }
};