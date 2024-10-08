import * as React from "react";
import { Container, Grid, Box, ScopedCssBaseline } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Typography, List, ListItem } from "@mui/material";
import Link from "@mui/material/Link";
import MainTitle from "../../../Components/SharedComponents/MainTitle/MainTitle";

function Footer() {
  const footerSections = [
    {
      title: "Staycation.",
      links: [
        { text: "We kaboom your beauty holiday instantly and memorable." },
        { text: "" },
        { text: "" },
      ],
    },
    {
      title: "For Beginners",
      links: [
        { text: "New Account" },
        { text: "Start Booking a Room" },
        { text: "Use Payments" },
      ],
    },
    {
      title: "Connect Us",
      contactInfo: [
        { text: "support@staycation.id" },
        { text: "021 - 2208 - 1996" },
        { text: "Staycation, Jakarta" },
      ],
    },
    {
      title: "Explore Us",
      links: [
        { text: "Our Careers" },
        { text: "Privacy" },
        { text: "Terms & Conditions" },
      ],
    },
  ];

  return (
    <ScopedCssBaseline
      sx={{ py: 4, backgroundColor: "#f5f5f5", marginTop: "auto" }}
    >
      <Box component="footer">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pl: { xs: "2rem", md: "8rem" },
          }}
        >
          {footerSections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Typography
                fontSize={"15px"}
                variant="h5"
                component="p"
                gutterBottom
              >
                {index === 0 ? (
                  <>
                    {/* <span style={{ color: "#007BFF" }}>Stay</span>
                    <span style={{ color: "black" }}>cation.</span> */}
                    <MainTitle />
                  </>
                ) : (
                  <Typography
                    style={{ color: "rgba(21, 44, 91, 1)" }}
                    fontSize={"18px"}
                    fontWeight={"600"}
                    textAlign={"left"}
                  >
                    {section.title}
                  </Typography>
                )}
              </Typography>
              {section.links && (
                <List>
                  {section.links.map((link, linkIndex) => (
                    <ListItem
                      key={linkIndex}
                      sx={{
                        color: "rgba(176, 176, 176, 1)",
                      }}
                    >
                      {link.text}
                    </ListItem>
                  ))}
                </List>
              )}
              {section.contactInfo && (
                <List>
                  {section.contactInfo.map((info, infoIndex) => (
                    <ListItem
                      key={infoIndex}
                      sx={{
                        // fontWeight: "bold",
                        color: "rgba(176, 176, 176, 1)",
                      }}
                    >
                      {info.text}
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          ))}
        </Grid>
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: "10px",
            color: "rgba(176, 176, 176, 1)",
            marginTop: "2.5rem",
          }}
          variant="h6"
          textAlign={"center"}
        >
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Box>
    </ScopedCssBaseline>
  );
}

export default Footer;
