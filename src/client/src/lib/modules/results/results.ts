export type Result<T> = { success: true; value: T } | { success: false; error: unknown };

export const error = (error: unknown): { success: false; error: unknown } => {
	return { success: false, error };
};

export const success = <T>(value: T): Result<T> => {
	return { success: true, value };
};
