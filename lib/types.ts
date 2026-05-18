export type SideStatus = "free" | "busy" | "partial" | "reserved" | "self";

export type Side = {
  id: string;
  construction: string;
  side: string;
  address: string;
  type: string;
  format: string;
  material: string;
  direction: string;
  installCost: number | null;
  priceFinal: number | null;
  grp: number | null;
  lat: number | null;
  lng: number | null;
  illuminated: boolean;
  organization: string;
  photo_filename: string | null;
  status: {
    jan: SideStatus;
    feb: SideStatus;
    mar: SideStatus;
    apr: SideStatus;
    may: SideStatus;
    june: SideStatus;
    july: SideStatus;
    aug: SideStatus;
    sep: SideStatus;
    oct: SideStatus;
    nov: SideStatus;
    dec: SideStatus;
  };
};
