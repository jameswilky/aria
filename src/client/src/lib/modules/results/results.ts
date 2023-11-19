export type Result<TSuccess, TError = unknown> =
	| { success: true; value: TSuccess }
	| { success: false; error: TError };

export const error = <T = unknown>(error: T): { success: false; error: T } => {
	return { success: false, error };
};

export const success = <TSuccess, TError = unknown>(value: TSuccess): Result<TSuccess, TError> => {
	return { success: true, value };
};
