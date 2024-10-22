export const calculateTimeRemaining = (lastDate: Date) => {
    const now = new Date();
    const timeDiffMs = now.getTime() - lastDate.getTime();

    // Comprobamos que el tiempo no es negativo
    if (timeDiffMs < 0) {
      return "In a few seconds...";
    }

    const timeDiffHrs = 24 - timeDiffMs / (1000 * 60 * 60); // Diferencia en horas

    // Si el tiempo restante es negativo o cero, ya pasaron 24h
    if (timeDiffHrs <= 0) {
      return "In a few seconds...";
    }

    if (timeDiffHrs >= 1) {
      return `${Math.floor(timeDiffHrs)}h`;
    } else {
      const timeDiffMins = Math.floor(timeDiffHrs * 60);
      return `${timeDiffMins}m`;
    }
};