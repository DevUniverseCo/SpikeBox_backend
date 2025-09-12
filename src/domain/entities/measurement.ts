import { UnitEnum } from "../common/enums/unitEnum";

export class Measurement {
  constructor(public value: number, public unit: UnitEnum) {}

  // Convert to kg
  toKg(): number {
    if (this.unit === "kg") return this.value;
    if (this.unit === "lbs") return this.value * 0.453592;
    throw new Error("Cannot convert non-weight unit to kg");
  }

  // Convert to lbs
  toLbs(): number {
    if (this.unit === "lbs") return this.value;
    if (this.unit === "kg") return this.value / 0.453592;
    throw new Error("Cannot convert non-weight unit to lbs");
  }

  // Convert to cm
  toCm(): number {
    if (this.unit === "cm") return this.value;
    if (this.unit === "inch") return this.value * 2.54;
    throw new Error("Cannot convert non-length unit to cm");
  }

  // Convert to inch
  toInch(): number {
    if (this.unit === "inch") return this.value;
    if (this.unit === "cm") return this.value / 2.54;
    throw new Error("Cannot convert non-length unit to inch");
  }
}
