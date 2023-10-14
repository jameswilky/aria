// tests/server.test.ts
import { test, assert } from 'vitest'
import dynamockClient from '../src/client/dynamockClient'

test('should return the specified response', async () => {
  const client = dynamockClient({host:"http://localhost:4000"})  

  client.intercept()
})

