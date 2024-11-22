import * as React from 'react';
import { loginContent } from '../../data/data';
import { Typography, Box, Stack } from '@mui/material';
import { SitemarkIcon } from '../../components/Login/CustomIcon';

export default function Content() {
    return (
        <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SitemarkIcon />
            </Box>
            {
                loginContent.map((item, index) => (
                    <Stack key={index} direction="row" sx={{ gap: 2 }}>
                        {item.icon}
                        <div>
                            <Typography gutterBottom sx={{ fontWeight: 'medium', fontFamily: 'Mulish' }}>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Mulish' }}>
                                {item.description}
                            </Typography>
                        </div>
                    </Stack>
                ))
            }
        </Stack>
    );
}
