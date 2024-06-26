import { describe, expect, it } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import worker from '../src'

describe('Worker', () => {
	it('should return 200 response', async () => {
		const request = new Request("http://test.com");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		expect(response.status).toBe(200);
	});

	it('should return pathname', async() =>{
		const request = new Request("http://test.com/hello");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		expect( await response.text()).toBe('hello');
		const response_not = await worker.fetch(new Request("http://test.com/world"), env, ctx);
		const out = await response_not.text()
		expect(out).not.toBe("hello")
		expect(out).toBe("world")
	})

	// run this test,please put a file in .wrangler/state/v3/r2/
	it('should return imagefile', async() =>{
		const request = new Request("http://test.com/image.jpg");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		expect(response.headers.get('Content-Type')).toBe('image/jpeg');
	})

	// it('should return the image file', async () => {
	// 	//const request = new Request("https://example.com/image.jpeg");
	// 	const resp = await worker.fetch();
	// 	const text = await resp.text();
	// 	expect(text).toBe('Hello World!');
	// });
});
