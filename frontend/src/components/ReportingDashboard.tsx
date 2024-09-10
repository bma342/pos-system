import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchReportingData, ReportData } from '../api/reportingApi';
import { useAuth } from '../hooks/useAuth';

const ReportingDashboard: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadReportData = async () => {
      if (!user?.clientId) return;

      setLoading(true);
      try {
        const data = await fetchReportingData(user.clientId);
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Failed to load reporting data');
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!reportData) return <Typography>No reporting data available</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Reporting Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h6">Sales Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      {/* Add more charts and data visualizations as needed */}
    </Grid>
  );
};

export default ReportingDashboard;