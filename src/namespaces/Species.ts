/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "../Namespace";

/*
 * Module
 */

export class Species extends Namespace {
  constructor(data: any) {
    super(data, "species");
  }

  public sentient(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "sentient"),
    ).name;
  }

  public nonsentient(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "nonsentient"),
    ).name;
  }

  public any(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}