import { Box, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';

const SkeletonGrids = () => {
    const theme = useTheme();
    const greaterThanLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));
    const greaterThanSmall = useMediaQuery(theme.breakpoints.up('sm'));
    const skeletonLength = useMemo(() => {
        if (greaterThanLarge) {
            return 4;
        } else if (greaterThanMid) {
            return 3;
        } else if (greaterThanSmall) {
            return 2;
        }
        return 1;
    }, [greaterThanLarge, greaterThanMid, greaterThanSmall]);

    return (
        <>
            {[...Array(skeletonLength).keys()].map(item => (
                <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                            height: '200px',
                        }}
                    >
                        <Skeleton
                            variant="rounded"
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Box>
                </Grid>
            ))}
        </>
    );
};

export default SkeletonGrids;
