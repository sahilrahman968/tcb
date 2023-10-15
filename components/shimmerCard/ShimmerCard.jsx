import React from 'react';
import { Card, Skeleton } from 'antd';

const ShimmerCard = () => {
    return (
        <Card
            style={{
                minWidth: "296px",
                minHeight: "334px",
                maxWidth: "296px",
                maxHeight: "334px"
            }}
            cover={
                <div style={{ height: 150, position: 'relative' }}>
                </div>
            }
        >
            <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
    );
};

export default ShimmerCard;