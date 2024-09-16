import { Box, Grid2, Stack, Typography, useTheme } from "@mui/material";
import Chart from "chart.js/auto";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { CategoryScale } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useFetch } from "../../../Context/FetchContext";
import { useEffect, useState } from "react";
import { DASHBOARD_URL } from "../../../Api/END_POINTS";
Chart.register(CategoryScale);
export default function Home() {
  interface DataType {
    rooms: number;
    facilities: number;
    bookings: {
      completed: number;
      pending: number;
    };
    users: {
      user: number;
      admin: number;
    };
    ads: number;
  }
  const { fetchData, response } = useFetch();
  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    fetchData({
      method: "GET",
      url: DASHBOARD_URL,
    });
  }, []);
  useEffect(() => {
    if (response && response[0]?.data?.data) {
      setData(response[0].data.data);
    }
  }, [response]);
  console.log(data);
  return (
    <Box>
      <Box>
        <Grid2 container spacing={12}>
          <Contentsection title={"Rooms"} number={data?.rooms} />
          <Contentsection title={"Facilities"} number={data?.facilities} />
          <Contentsection title={"Ads"} number={data?.ads} />
        </Grid2>
      </Box>

      <Box sx={{ marginTop: "100px" }}>
        <Grid2 justifyContent={"space-between"} alignItems={"center"} container>
          <Grid2 width={"auto"}>
            <DoughnutChart bookings={data?.bookings} />
          </Grid2>
          <Grid2 width={"auto"}>
            <PieChart users={data?.users} />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

const Contentsection = ({
  title,
  number,
}: {
  title: string;
  number: number | undefined;
}) => {
  const {
    palette: {
      dashboardColors: {
        boxBackground,
        boxIconColor,
        boxIconbackground,
        boxTextColor,
      },
    },
  } = useTheme();
  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <Box
        aria-label={`${title} information`}
        sx={{
          background: boxBackground,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "row",
          padding: "28px 44.5px",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Stack sx={{ color: boxTextColor, fontWeight: "500" }}>
          <Typography
            sx={{ fontSize: "34px" }}
            variant="body1"
            component="span">
            {number ?? "N/A"}
          </Typography>
          <Typography
            sx={{ fontSize: "20px" }}
            variant="body1"
            component="span">
            {title}
          </Typography>
        </Stack>
        <Stack
          sx={{
            background: boxIconbackground,
            height: "max-content",
            width: "max-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
          }}>
          {" "}
          <WorkOutlineIcon
            sx={{
              color: boxIconColor,
              fontSize: "36px",
              margin: "14px",
            }}
          />
        </Stack>
      </Box>
    </Grid2>
  );
};

const DoughnutChart = ({
  bookings,
}: {
  bookings: { completed: number; pending: number } | undefined;
}) => {
  const data = [
    {
      label: "Completed",
      value: bookings?.completed,
      color: "rgba(0, 43, 73, 1)",
      cutout: "50%",
    },

    {
      label: "Pending",
      value: bookings?.pending,
      color: "#0D80D8",
      cutout: "50%",
    },
  ];

  const options: any = {
    plugins: {
      responsive: true,
      legend: {
        position: "right",

        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 21,
        },
      },
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <Box sx={{ width: "435px" }}>
      {" "}
      <Doughnut data={finalData} options={options} />
    </Box>
  );
};

const PieChart = ({
  users,
}: {
  users: { admin: number; user: number } | undefined;
}) => {
  const data = {
    labels: ["Admin", "User"],
    datasets: [
      {
        data: [users?.admin, users?.user],
        backgroundColor: ["rgba(0, 43, 73, 1)", "#0D80D8"],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    plugins: {
      responsive: true,
      legend: {
        position: "right",

        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 21,
        },
      },
    },
  };

  return (
    <Box sx={{ width: "435px" }}>
      <Pie data={data} options={options} />
    </Box>
  );
};
