import { Request, Response } from 'express';
import { createABTest, getABTests, updateABTest, deleteABTest, checkAndUpdateABTests } from '../services/abTestService';
import { AppError } from '../utils/errorHandler';
import { trackABTestMetric, getABTestMetrics } from '../services/abTestMetricsService';

export const createTest = async (req: Request, res: Response) => {
  try {
    const test = await createABTest(req.body);
    res.status(201).json(test);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error creating A/B test' });
    }
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const tests = await getABTests();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching A/B tests' });
  }
};

export const updateTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const test = await updateABTest(id, req.body);
    res.status(200).json(test);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error updating A/B test' });
    }
  }
};

export const deleteTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteABTest(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting A/B test' });
    }
  }
};

export const checkAndUpdateTests = async (req: Request, res: Response) => {
  try {
    const updatedTests = await checkAndUpdateABTests();
    res.status(200).json(updatedTests);
  } catch (error) {
    res.status(500).json({ message: 'Error checking and updating A/B tests' });
  }
};

export const trackMetric = async (req: Request, res: Response) => {
  try {
    const { testId, variant, metricType, value } = req.body;
    const metric = await trackABTestMetric(testId, variant, metricType, value);
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ message: 'Error tracking A/B test metric' });
  }
};

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const metrics = await getABTestMetrics(testId);
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching A/B test metrics' });
  }
};