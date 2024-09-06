import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadWalletData,
  selectWalletBalance,
  selectWalletTransactions,
  selectWalletRewards,
  selectWalletDiscounts,
  selectWalletLoading,
  selectWalletError,
} from '../redux/slices/walletSlice';
import { AppDispatch } from '../redux/store';
import { Box, Typography, Container, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Wallet: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector(selectWalletBalance);
  const transactions = useSelector(selectWalletTransactions);
  const rewards = useSelector(selectWalletRewards);
  const discounts = useSelector(selectWalletDiscounts);
  const loading = useSelector(selectWalletLoading);
  const error = useSelector(selectWalletError);
  const theme = useTheme();

  useEffect(() => {
    // Replace with actual clientId and locationId
    dispatch(loadWalletData({ clientId: 'your-client-id', locationId: 'your-location-id' }));
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Wallet
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography variant="h4">${balance.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>
              <List>
                {transactions.slice(0, 5).map((transaction) => (
                  <ListItem key={transaction.id}>
                    <ListItemText
                      primary={`$${transaction.amount.toFixed(2)}`}
                      secondary={new Date(transaction.createdAt).toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Rewards
              </Typography>
              <List>
                {rewards.map((reward) => (
                  <ListItem key={reward.id}>
                    <ListItemText primary={reward.name} secondary={`Points: ${reward.points}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Discounts
              </Typography>
              <List>
                {discounts.map((discount) => (
                  <ListItem key={discount.id}>
                    <ListItemText
                      primary={discount.name}
                      secondary={`${discount.percentage}% off`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Wallet;
