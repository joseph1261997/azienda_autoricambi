import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Loading: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <CircularProgress />
            <Typography variant="h5" gutterBottom>
                Loading...
            </Typography>
        </div>
    );
};

export default Loading;