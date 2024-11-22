import * as React from 'react';
import Content from './Content';
import RegisterCard from './RegisterCard';
import { CssBaseline, Stack } from '@mui/material';

export default function Register() {
    return (
        <>
            <CssBaseline enableColorScheme />
            <Stack
                direction="column"
                component="main"
                sx={[
                    {
                        justifyContent: 'center',
                        height: 'calc((1 - var(--template-frame-height, 0)) * dvh)',
                        marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
                        minHeight: '100%',
                    },
                    (theme) => ({
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            zIndex: -1,
                            inset: 0,
                            backgroundImage:
                                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 87%), hsl(0, 0%, 100%))',
                            backgroundRepeat: 'no-repeat',
                        },
                    }),
                ]}
            >
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    sx={{
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: 2,
                        mx: 'auto',
                    }}
                >
                    <Stack
                        direction={{ xs: 'column-reverse', md: 'row' }}
                        sx={{
                            justifyContent: 'center',
                            gap: { xs: 6, sm: 12 },
                            p: { xs: 2, sm: 4 },
                            m: 'auto',
                        }}
                    >
                        <Content />
                        <RegisterCard />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
