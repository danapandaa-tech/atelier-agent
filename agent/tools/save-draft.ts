import { defineTool } from "eve/tools";

export default defineTool({
  description: "Save an email draft for review. Returns the draft content with metadata.",
  inputSchema: {
    type: "object",
    properties: {
      business_name: { type: "string", description: "Name of the business" },
      email_body: { type: "string", description: "The email content" },
      source: { type: "string", description: "Lead source (e.g. 'blitz', 'prospeo', 'exa')" },
    },
    required: ["business_name", "email_body", "source"],
  },
  async execute(input: Record<string, unknown>) {
    const business_name = input.business_name as string;
    const email_body = input.email_body as string;
    const source = input.source as string;
    const ts = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
    const filename = `${ts}_${business_name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30)}.md`;
    const content = `# ${business_name}\nSource: ${source}\n\n${email_body}`;
    return { saved: true, filename, content };
  },
});
