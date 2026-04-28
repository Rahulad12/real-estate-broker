import { Request, Response } from 'express';
import * as schedulingService from './scheduling.service';
import { AuthRequest } from '@/middleware/auth.middleware';

export const createSchedulingController = async (req: AuthRequest, res: Response) => {
  try {
    const data = {
      ...req.body,
      user: req.user!.id,
      userId: req.user!.id,
    };
    const scheduling = await schedulingService.createScheduling(data);
    res.status(201).json({
      success: true,
      message: 'Viewing request created successfully',
      data: scheduling,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }
};

export const getAllSchedulingsController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await schedulingService.getAllSchedulings(page, limit);
    res.status(200).json({
      success: true,
      message: 'Scheduled requests fetched successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSchedulingStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, agent, adminNotes } = req.body;
    const scheduling = await schedulingService.updateSchedulingStatus(
      id as string,
      status as string,
      agent as string | undefined,
      adminNotes as string | undefined
    );
    res.status(200).json({
      success: true,
      message: 'Scheduling status updated successfully',
      data: scheduling,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }
};

export const getSchedulingStatsController = async (_req: Request, res: Response) => {
  try {
    const stats = await schedulingService.getSchedulingStats();
    res.status(200).json({
      success: true,
      message: 'Scheduling statistics fetched successfully',
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
