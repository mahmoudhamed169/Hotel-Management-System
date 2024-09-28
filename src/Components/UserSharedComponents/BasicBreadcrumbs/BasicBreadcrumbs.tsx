import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  current: string;
}

export default function BasicBreadcrumbs({ current }: BreadcrumbProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ fontWeight: "300", fontSize: "18px" }}
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        sx={{ marginRight: "0.5rem" }}
      >
        Home
      </Link>
      <Typography
        sx={{ marginLeft: "0.5rem", color: "#152C5B", fontWeight: "bold" }}
      >
        {current}
      </Typography>
    </Breadcrumbs>
  );
}
