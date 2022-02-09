import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Paste = function ({ paste }: { paste: PasteI }) {
  return (
    <div style={{ overflowWrap: "break-word" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="purple" gutterBottom>
            {new Date(paste.date).toUTCString()}
          </Typography>
          <Typography variant="h5" component="div">
            {paste.title}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: "1.2rem" }} color="red">
            #{paste.category}
          </Typography>
          <Typography variant="body2">{paste.content}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Paste;
