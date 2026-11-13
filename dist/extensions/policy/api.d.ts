import "../../types-C1mCepiY.js";
import { t as HealthCheck } from "../../health-CgGo48pH.js";
import "../../resolve-route-DR7kTcz4.js";
import { z } from "zod";
//#region extensions/policy/src/doctor/register.d.ts
type PolicyDoctorRegistrationHost = {
  readonly registerHealthCheck: (check: HealthCheck) => void;
};
export declare function registerPolicyDoctorChecks(host?: PolicyDoctorRegistrationHost): void;
//#endregion