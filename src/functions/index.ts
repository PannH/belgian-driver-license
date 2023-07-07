export function shuffleArray<T>(array: T[]): T[] {

  return array.sort(() => Math.random() - 0.5);
  
}

export function calculatePercentage(a: number, b: number): number {

   return Number((a / b * 100).toFixed(1));

}