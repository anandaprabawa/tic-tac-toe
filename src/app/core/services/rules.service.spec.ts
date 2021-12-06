import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Database, useValue: {} }],
    });
    service = TestBed.inject(RulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Validate Board Size', () => {
    it('should return true if board size is the minimum size', () => {
      expect(service.validateBoardSize(service.minBoardSize)).toBeTrue();
    });

    it('should throw an error if board size is lower than minimum size', () => {
      expect(() =>
        service.validateBoardSize(service.minBoardSize - 1)
      ).toThrowError();
    });

    it('should return true if board size is the maximum size', () => {
      expect(service.validateBoardSize(service.maxBoardSize)).toBeTrue();
    });

    it('should throw an error if board is greater than maximum size', () => {
      expect(() =>
        service.validateBoardSize(service.maxBoardSize + 1)
      ).toThrowError();
    });
  });

  describe('Get Marks Count', () => {
    it('should return 3 if board size is less than or equal to 4', () => {
      expect(service.getMarksCount(3)).toBe(3);
      expect(service.getMarksCount(4)).toBe(3);
    });

    it('should return 5 if board size is greater than or equal to 5', () => {
      expect(service.getMarksCount(5)).toBe(5);
      expect(service.getMarksCount(7)).toBe(5);
      expect(service.getMarksCount(9)).toBe(5);
      expect(service.getMarksCount(10)).toBe(5);
    });

    it('should throw an error if board size is less than the minimum', () => {
      expect(() => service.getMarksCount(2)).toThrowError();
    });

    it('should throw an error if board size is greater than the maximum', () => {
      expect(() => service.getMarksCount(11)).toThrowError();
    });
  });
});
