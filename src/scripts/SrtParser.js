class SrtParser {
  constructor(russianSrt, englishSrt) {
    this.russianSubs = this.parseSrt(russianSrt);
    this.englishSubs = this.parseSrt(englishSrt);
  }

  parseSrt(srt) {
    const blocks = srt.trim().split(/\r?\n\r?\n/);
    const subtitles = [];

    for (const block of blocks) {
      const lines = block.split(/\r?\n/);
      if (lines.length >= 3) {
        const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (timeMatch) {
          const startTime = this.timeToSeconds(timeMatch.slice(1, 5));
          const endTime = this.timeToSeconds(timeMatch.slice(5, 9));
          const text = lines.slice(2).join(' ');
          subtitles.push({ startTime, endTime, text });
        }
      }
    }

    return subtitles;
  }

  timeToSeconds([hh, mm, ss, ms]) {
    return (
      parseInt(hh, 10) * 3600 +
      parseInt(mm, 10) * 60 +
      parseInt(ss, 10) +
      parseInt(ms, 10) / 1000
    );
  }

  getSubtitleAt(timeInSeconds) {
    const rusText = this.findSubtitle(this.russianSubs, timeInSeconds);
    const engText = this.findSubtitle(this.englishSubs, timeInSeconds);
    return { rus: rusText, eng: engText };
  }

  findSubtitle(subs, time) {
    const sub = subs.find(
      ({ startTime, endTime }) => time >= startTime && time <= endTime
    );
    return sub ? sub.text : '';
  }
}


export default SrtParser