# UniCS Social: API Client

![Tests](https://github.com/unicsmcr/unics_social_api_client/workflows/Tests/badge.svg)
![Lint](https://github.com/unicsmcr/unics_social_api_client/workflows/Lint/badge.svg)
[![codecov](https://codecov.io/gh/unicsmcr/unics_social_api_client/branch/main/graph/badge.svg)](https://codecov.io/gh/unicsmcr/unics_social_api_client)

A TypeScript API Client for UniCS's networking platform for Computer Sciences students at the University of Manchester.

## Example

```ts
import { APIClient, GatewayPacketType } from '@unicsmcr/unics_social_api_client';

const api = new APIClient();

await api.authenticate({
	email: prompt('Email'),
	password: prompt('Password')
});

api.initGateway();

// It's bad practice to have an event handler that returns a Promise, but this is just for demo purposes
api.gateway.on(GatewayPacketType.Hello, async () => {
	alert('Connected to gateway!');

	// Fetch the list of events
	const events = await api.getEvents();

	// Get the user/profile information for the authenticated user
	const me = await api.getMe();

	// Send a message to the channel of the first-listed event
	await api.createMessage({
		content: `Hi! I'm ${me.forename} :)`,
		channelID: events[0].channelID
	});
});

api.gateway.on('reconnecting', () => {
	alert('Connection dropped, attempting to reconnect.');
});
```

## License

> Copyright 2020 UniCS
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
