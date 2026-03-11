/**
 * Sanitize string to prevent key injection and DoS attacks
 * Removes special characters, keeps only safe characters
 */
export function sanitizeKey(value: string, maxLength = 200): string {
	return value.replace(/[^a-zA-Z0-9.\-_]/g, "").slice(0, maxLength);
}

/**
 * Sanitize IP address (allows colons for IPv6)
 */
export function sanitizeIp(ip: string, maxLength = 100): string {
	return ip.replace(/[^a-zA-Z0-9.:\-_]/g, "").slice(0, maxLength);
}

/**
 * Sanitize user ID (same as sanitizeKey but more specific naming)
 */
export function sanitizeUserId(userId: string): string {
	return sanitizeKey(userId, 200);
}
