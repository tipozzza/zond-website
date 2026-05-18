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
  priceFull: number | null;
  discountPct: number;
  priceFinal: number | null;
  grp: number | null;
  lat: number | null;
  lng: number | null;
  illuminated: boolean;
  organization: string;
  status: {
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
