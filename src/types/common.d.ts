export type AssignmentStatus = 'pending' | 'in-progress' | 'completed';
export type PriorityLevel = 'high' | 'medium' | 'low';

export const statusColors: Record<AssignmentStatus, string> = {
    pending: 'text-yellow-500',
    'in-progress': 'text-blue-500',
    completed: 'text-green-500',
};

export const priorityColors: Record<PriorityLevel, string> = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
}; 