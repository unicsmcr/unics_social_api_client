export default function unwrapErrorBody(promise: Promise<any>) {
	return promise.catch((out: any) => Promise.reject(out.response.data));
}
