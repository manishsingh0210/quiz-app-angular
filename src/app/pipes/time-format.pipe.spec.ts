import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format time correctly', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe.transform(300)).toBe('05:00');
    expect(pipe.transform(60)).toBe('01:00');
    expect(pipe.transform(0)).toBe('00:00');
  });
});
