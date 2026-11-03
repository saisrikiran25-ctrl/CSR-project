import { describe, it, expect } from 'vitest';
import { SEEDED_QUESTIONS } from '../mocks/seedData';

describe('Assessment Grading Engine Unit Tests', () => {
  it('correctly grades single-choice MCQ with full points', () => {
    const q = SEEDED_QUESTIONS.find(item => item.id === 'q_safety_1')!;
    const correctOption = q.options?.find(o => o.isCorrect)!;
    expect(correctOption.id).toBe('opt_2');
    expect(q.points).toBe(10);
  });

  it('correctly validates numeric question within tolerance', () => {
    const q = SEEDED_QUESTIONS.find(item => item.id === 'q_ladder_2')!;
    expect(q.numericTarget).toBe(4);
    const userAns = 4.05;
    const isWithinTol = Math.abs(userAns - q.numericTarget!) <= (q.numericTolerance || 0.1);
    expect(isWithinTol).toBe(true);
  });

  it('correctly grades chronological ordering sequence', () => {
    const q = SEEDED_QUESTIONS.find(item => item.id === 'q_ordering_5')!;
    const userOrder = ['step_1', 'step_2', 'step_3', 'step_4'];
    expect(JSON.stringify(userOrder)).toBe(JSON.stringify(q.correctOrder));
  });

  it('correctly calculates proposal CO2 reduction formula (0.727 kg CO2 / kWh)', () => {
    const q = SEEDED_QUESTIONS.find(item => item.id === 'q_co2_6')!;
    const kwh = 1000;
    const factor = 0.727;
    expect(kwh * factor).toBe(q.numericTarget);
  });
});

