import {services} from "./content.ts";
export const inquiryTopics = ["project", "careers", "investors", "suppliers"] as const;
export const budgets = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$3,000",
  "$3,000–$5,000",
  "$5,000+",
  "Not sure yet",
] as const;
export function validateInquiry(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const d = input as Record<string, unknown>;
  const get = (k: string) =>
    typeof d[k] === "string" ? (d[k] as string).trim() : "";
  const name = get("name"),
    email = get("email"),
    company = get("company"),
    description = get("description"),
    budget = get("budget"),
    website = get("website"),
    token = get("token"),
    service = get("service") || "not-sure",
    tools = get("tools"),
    phone = get("phone"),
    topic = get("topic") || "project";
  if (
    !inquiryTopics.includes(topic as (typeof inquiryTopics)[number]) ||
    name.length < 2 ||
    name.length > 100 ||
    email.length > 254 ||
    !/^\S+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email) ||
    company.length > 150 ||
    tools.length > 200 ||
    phone.length > 40 ||
    /[\r\n]/.test(phone) ||
    (service !== "not-sure" && !services.some(s=>s.slug===service)) ||
    description.length < 20 ||
    description.length > 5000 ||
    !budgets.includes(budget as (typeof budgets)[number]) ||
    website ||
    token.length > 4096
  )
    return null;
  return { name, email, company, description, budget, token, service, tools, topic, phone };
}
