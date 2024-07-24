export function calculateAge(birthDate: Date): number {
    const currentDate = new Date();
  
    const birthYear = birthDate.getUTCFullYear();
    const birthMonth = birthDate.getUTCMonth();
    const birthDay = birthDate.getUTCDate();
  
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();
  
  
    let age = currentYear - birthYear;
    const monthDifference = currentMonth - birthMonth;
    
    if (monthDifference < 0 || (monthDifference === 0 && currentDay < birthDay)) {
      age--;
    }
  
    return age;
  }
  