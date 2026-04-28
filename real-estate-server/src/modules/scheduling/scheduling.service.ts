import SchedulingModel from './scheduling.schema';

export const createScheduling = async (data: {
  property: string;
  user: string;
  requestedDate: Date;
}) => {
  const scheduling = new SchedulingModel(data);
  return await scheduling.save();
};

export const getAllSchedulings = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [schedulings, total] = await Promise.all([
    SchedulingModel.find()
      .populate('property', 'title price location')
      .populate('user', 'userName email phone')
      .populate('agent', 'userName email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    SchedulingModel.countDocuments(),
  ]);

  return {
    schedulings,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateSchedulingStatus = async (
  id: string,
  status: string,
  agent?: string,
  adminNotes?: string
) => {
  const updateData: Record<string, unknown> = { status };
  if (agent) updateData.agent = agent;
  if (adminNotes) updateData.adminNotes = adminNotes;

  const scheduling = await SchedulingModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .populate('property')
    .populate('user')
    .populate('agent');

  if (!scheduling) {
    const error = new Error('Scheduling request not found');
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return scheduling;
};

export const getSchedulingStats = async () => {
  const stats = await SchedulingModel.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const monthlyStats = await SchedulingModel.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return {
    byStatus: stats,
    monthly: monthlyStats,
  };
};
