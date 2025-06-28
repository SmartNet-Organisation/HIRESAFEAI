export const getRiskColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high': return 'text-red-400 bg-red-500/20';
    case 'medium': return 'text-yellow-400 bg-yellow-500/20';
    case 'low': return 'text-green-400 bg-green-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'text-green-400 bg-green-500/20';
    case 'verified': return 'text-green-400 bg-green-500/20';
    case 'pending': return 'text-yellow-400 bg-yellow-500/20';
    case 'inactive': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};