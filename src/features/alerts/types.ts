export interface Alert {
    type: 'temperature' | 'humidity';
    value: number;
    threshold: number;
    status: 'OK' | 'WARNING' | 'CRITICAL';
    time: string;
  }
  