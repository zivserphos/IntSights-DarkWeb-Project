// import React from "react";

// const Paste = function ({ paste }: { paste: PasteI }) {
//   console.log(paste);
//   return (
//     <div className="paste">
//       <div className="title">{paste.title}</div>
//       <div className="author">{paste.author}</div>
//       <div className="paste-date">{paste.date}</div>
//       <div className="content">{paste.content}</div>
//     </div>
//   );
// };

// export default Paste;

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

const Paste = function ({ paste }: { paste: PasteI }) {
  return (
    <div>
      <Card sx={{ minWidth: 275, height: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="purple" gutterBottom>
            {paste.date}
          </Typography>
          <Typography variant="h5" component="div">
            {paste.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">{paste.content}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Paste;
