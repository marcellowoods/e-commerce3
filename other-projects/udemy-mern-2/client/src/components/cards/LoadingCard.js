import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCards = [];

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div key={i} className="col-md-4 p-4">
                <Card >
                    <Skeleton active></Skeleton>
                </Card>
                </div>
            );
        }

        return totalCards;
    };

    return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
