


export const formatNotificationCount = (count: number) => {
    return (
        count >= 100
            ? `99+`
            : String(count)
    );
};