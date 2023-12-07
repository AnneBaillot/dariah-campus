import { log } from "@acdh-oeaw/lib";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	shared: {
		NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
	},
	server: {
		BOTS: z.enum(["disabled", "enabled"]).optional(),
		BUILD_MODE: z.enum(["export", "standalone"]).optional(),
		BUNDLE_ANALYZER: z.enum(["disabled", "enabled"]).optional(),
		ENV_VALIDATION: z.enum(["disabled", "enabled"]).optional(),
		// KEYSTATIC_GITHUB_CLIENT_ID: z.string().min(1).optional(),
		// KEYSTATIC_GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
		// KEYSTATIC_SECRET: z.string().min(1).optional(),
	},
	client: {
		NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
		NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: z.string().min(1).optional(),
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: z.string().min(1).optional(),
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: z.string().min(1).optional(),
		// NEXT_PUBLIC_KEYSTATIC_MODE: z.enum(["github", "local"]).default("local"),
	},
	runtimeEnv: {
		BOTS: process.env.BOTS,
		BUILD_MODE: process.env.BUILD_MODE,
		BUNDLE_ANALYZER: process.env.BUNDLE_ANALYZER,
		ENV_VALIDATION: process.env.ENV_VALIDATION,
		// KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
		// KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
		// KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
		// NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
		// NEXT_PUBLIC_KEYSTATIC_MODE: process.env.NEXT_PUBLIC_KEYSTATIC_MODE,
	},
	skipValidation: process.env.ENV_VALIDATION === "disabled",
	onValidationError(validationError) {
		const message = "Invalid environment variables";
		log.error(`${message}:`, validationError.flatten().fieldErrors);
		const error = new Error(message);
		delete error.stack;
		throw error;
	},
});
