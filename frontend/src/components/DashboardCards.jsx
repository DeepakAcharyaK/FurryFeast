import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const DashboardCards = () => {
const cards = [
    { title: 'Rescues', value: 35 },
    { title: 'Volunteers', value: 12 },
    { title: 'Donations', value: '$4,500' },
];

return (
    <Grid container spacing={3}>
    {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
            <CardContent>
            <Typography variant="h5">{card.title}</Typography>
            <Typography variant="h6">{card.value}</Typography>
            </CardContent>
        </Card>
        </Grid>
    ))}
    </Grid>
);
};

export default DashboardCards;
