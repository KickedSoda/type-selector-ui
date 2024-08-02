export type NERISChild = {
  value: string  | null,
  description: string | null,
  definition: string | null,
  sub_values: {
    [key:string]: NERISChild
  } | null
}

export type NERISParent = NERISChild & {
  NWGC: string | null,
  "NFIRS Crosswalk": string | null,
  "NEMSIS Link d.Agency.09": string | null,
  "NEMSIS Link d.Agency.11": string | null,
  xor: string | null,
  active: string | null,
  source: string | null,
  "Operational Description": string | null,
  "Common Nomenclature/Radio Designator": string | null
}

export type NERISType = {
  [key: string]: NERISParent
}

export type  NERISTypes = {
  [key:string]: NERISType
}
