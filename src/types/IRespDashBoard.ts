export interface IRespDashBoard {
  description:String,
  percent: number,
  type: "normal" | "exception" | "active" | "success";
  formattedValue : number
}