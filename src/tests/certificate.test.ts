import { describe, it, expect } from 'vitest';

describe('Certificate Eligibility Rules', () => {
  const checkEligibility = (candidate: {
    completedHours: number;
    theoryScore: number;
    practicalScore: number;
    attendancePct: number;
  }) => {
    return (
      candidate.completedHours >= 600 &&
      candidate.theoryScore >= 60 &&
      candidate.practicalScore >= 70 &&
      candidate.attendancePct >= 75
    );
  };

  it('approves certificate for eligible candidate', () => {
    const candidate = {
      completedHours: 600,
      theoryScore: 92,
      practicalScore: 95,
      attendancePct: 88,
    };
    expect(checkEligibility(candidate)).toBe(true);
  });

  it('rejects certificate if theory score is below 60%', () => {
    const candidate = {
      completedHours: 600,
      theoryScore: 54,
      practicalScore: 95,
      attendancePct: 88,
    };
    expect(checkEligibility(candidate)).toBe(false);
  });

  it('rejects certificate if attendance is below 75%', () => {
    const candidate = {
      completedHours: 600,
      theoryScore: 80,
      practicalScore: 85,
      attendancePct: 70,
    };
    expect(checkEligibility(candidate)).toBe(false);
  });
});

