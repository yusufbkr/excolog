import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET || "your-secret-key-change-in-production",
);

export async function createParticipantToken(
	participantId: string,
	organizationSlug: string,
): Promise<string> {
	const token = await new SignJWT({
		participantId,
		organizationSlug,
		type: "participant",
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(JWT_SECRET);

	return token;
}

export async function verifyParticipantToken(
	token: string,
): Promise<{ participantId: string; organizationSlug: string } | null> {
	try {
		const { jwtVerify } = await import("jose");
		const { payload } = await jwtVerify(token, JWT_SECRET);
		if (
			payload.type === "participant" &&
			typeof payload.participantId === "string" &&
			typeof payload.organizationSlug === "string"
		) {
			return {
				participantId: payload.participantId,
				organizationSlug: payload.organizationSlug,
			};
		}
		return null;
	} catch {
		return null;
	}
}

export type PanelTokenPayload =
	| { type: "panel_participant"; id: string }
	| { type: "panel_buyer"; id: string };

export async function createPanelParticipantToken(
	participantId: string,
): Promise<string> {
	const token = await new SignJWT({
		type: "panel_participant",
		id: participantId,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(JWT_SECRET);
	return token;
}

export async function createPanelBuyerToken(buyerId: string): Promise<string> {
	const token = await new SignJWT({
		type: "panel_buyer",
		id: buyerId,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(JWT_SECRET);
	return token;
}

export async function verifyPanelToken(
	token: string,
): Promise<PanelTokenPayload | null> {
	try {
		const { jwtVerify } = await import("jose");
		const { payload } = await jwtVerify(token, JWT_SECRET);
		if (
			(payload.type === "panel_participant" ||
				payload.type === "panel_buyer") &&
			typeof payload.id === "string"
		) {
			return {
				type: payload.type,
				id: payload.id,
			};
		}
		return null;
	} catch {
		return null;
	}
}
