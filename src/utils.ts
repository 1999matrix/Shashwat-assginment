interface WineDataPoint {
  "Alcohol": number;
  "Malic Acid": number;
  "Ash": number;
  "Alcalinity of ash": number;
  "Magnesium": number;
  "Total phenols": number;
  "Flavanoids": number;
  "Nonflavanoid phenols": number;
  "Proanthocyanins": string;
  "Color intensity": number;
  "Hue": number;
  "OD280/OD315 of diluted wines": number;
  "Unknown": number;
}
  
  interface Stats {
    mean: number;
    median: number;
    mode: number;
  }
  
  export function calculateFlavanoidsStats(data: WineDataPoint[]): Stats {
    const flavanoids = data.map(point => point.Flavanoids);
    const mean = flavanoids.reduce((acc, val) => acc + val, 0) / flavanoids.length;
  
    const sortedFlavanoids = [...flavanoids].sort((a, b) => a - b);
    const mid = Math.floor(sortedFlavanoids.length / 2);
    const median = sortedFlavanoids.length % 2 === 0 ? (sortedFlavanoids[mid - 1] + sortedFlavanoids[mid]) / 2 : sortedFlavanoids[mid];
  
    const counts = new Map<number, number>();
    sortedFlavanoids.forEach(val => counts.set(val, (counts.get(val) || 0) + 1));
    // const maxCount = Math.max(...counts.values());
    const maxCount = Math.max(...Array.from(counts.values()));
    const mode = [...counts.entries()].find(([_, count]) => count === maxCount)![0];
  
    return { mean, median, mode };
  }
  
  export function calculateGammaStats(data: WineDataPoint[]): Stats {
    const gammaValues = data.map(point => ({
      Alcohol: point.Alcohol,
      "Malic Acid": point["Malic Acid"],
      Ash: point.Ash,
      "Alcalinity of ash": point["Alcalinity of ash"],
      Magnesium: point.Magnesium,
      "Total phenols": 0, // Add the missing property
      Flavanoids: (point.Ash * point.Hue) / point.Magnesium,
      "Nonflavanoid phenols": 0, // Add the missing property
      "Proanthocyanins": "0",
      "Color intensity": point["Color intensity"],
      Hue: point.Hue,
      "OD280/OD315 of diluted wines": point["OD280/OD315 of diluted wines"],
      Unknown: point.Unknown
    }));
  
    return calculateFlavanoidsStats(gammaValues);
  }