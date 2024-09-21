import React, { useState } from "react";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";
import AdsModal from "./../AdModal/AdsModal";

export default function AdsData({ onAdd }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableDetailsHeader
        buttonTitle="Add New Ads"
        title="Ads"
        onclick={handleOpen}
      />
      <AdsModal open={open} onClose={handleClose} onAdd={onAdd} />
    </div>
  );
}
