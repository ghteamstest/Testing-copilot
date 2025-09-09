# LangChain AI Response Streaming

This guide covers how to stream AI responses from LangChain to clients in real-time, providing immediate feedback and better user experience.

## Overview

Streaming allows you to send partial responses as they're generated, rather than waiting for the complete response. This is particularly useful for:

- Long-form text generation
- Chat applications
- Real-time AI assistance
- Progressive content loading

## Server-Side Implementation

### Node.js with Express and Server-Sent Events

```javascript
const express = require('express');
const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage } = require('@langchain/core/messages');

const app = express();
app.use(express.json());

// Initialize LangChain model
const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  streaming: true,
  temperature: 0.7,
});

// SSE endpoint for streaming responses
app.get('/api/stream', async (req, res) => {
  const { message } = req.query;
  
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const stream = await model.stream([new HumanMessage(message)]);
    
    for await (const chunk of stream) {
      // Send each chunk as it's received
      res.write(`data: ${JSON.stringify({ content: chunk.content })}\n\n`);
    }
    
    // Signal end of stream
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.listen(3001, () => {
  console.log('LangChain streaming server running on port 3001');
});
```

### Python with FastAPI and StreamingResponse

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import json
import asyncio

app = FastAPI()

# Initialize LangChain model
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
    streaming=True,
    temperature=0.7
)

async def generate_stream(message: str):
    """Generate streaming response from LangChain"""
    try:
        async for chunk in llm.astream([HumanMessage(content=message)]):
            yield f"data: {json.dumps({'content': chunk.content})}\n\n"
        
        # Signal completion
        yield f"data: {json.dumps({'done': True})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

@app.get("/api/stream")
async def stream_response(message: str):
    return StreamingResponse(
        generate_stream(message),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Advanced Node.js with WebSocket

```javascript
const WebSocket = require('ws');
const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage } = require('@langchain/core/messages');

const wss = new WebSocket.Server({ port: 8080 });

const model = new ChatOpenAI({
  modelName: 'gpt-4',
  streaming: true,
  temperature: 0.7,
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', async (data) => {
    try {
      const { message, sessionId } = JSON.parse(data);
      
      // Send acknowledgment
      ws.send(JSON.stringify({ 
        type: 'start', 
        sessionId,
        message: 'Starting AI response...' 
      }));
      
      const stream = await model.stream([new HumanMessage(message)]);
      
      for await (const chunk of stream) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'chunk',
            sessionId,
            content: chunk.content,
            timestamp: Date.now()
          }));
        }
      }
      
      // Send completion signal
      ws.send(JSON.stringify({ 
        type: 'complete', 
        sessionId,
        timestamp: Date.now()
      }));
      
    } catch (error) {
      ws.send(JSON.stringify({ 
        type: 'error', 
        error: error.message 
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8080');
```

## Client-Side Implementation

### React with Server-Sent Events

```javascript
import React, { useState, useEffect, useRef } from 'react';

const StreamingChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState('');
  const eventSourceRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    setCurrentMessage('');

    // Create EventSource for streaming
    const eventSource = new EventSource(
      `http://localhost:3001/api/stream?message=${encodeURIComponent(input)}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.error) {
        console.error('Streaming error:', data.error);
        setIsStreaming(false);
        eventSource.close();
        return;
      }
      
      if (data.done) {
        // Finalize the assistant message
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: currentMessage 
        }]);
        setCurrentMessage('');
        setIsStreaming(false);
        eventSource.close();
      } else {
        // Append chunk to current message
        setCurrentMessage(prev => prev + data.content);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      setIsStreaming(false);
      eventSource.close();
    };
  };

  const stopStreaming = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <div className="streaming-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        
        {/* Show streaming message */}
        {isStreaming && currentMessage && (
          <div className="message assistant streaming">
            <strong>assistant:</strong> {currentMessage}
            <span className="cursor">▊</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isStreaming}
        />
        <button type="submit" disabled={isStreaming || !input.trim()}>
          {isStreaming ? 'Streaming...' : 'Send'}
        </button>
        {isStreaming && (
          <button type="button" onClick={stopStreaming}>
            Stop
          </button>
        )}
      </form>
    </div>
  );
};

export default StreamingChat;
```

### React with WebSocket

```javascript
import React, { useState, useEffect, useRef } from 'react';

const WebSocketChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState('');
  const wsRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'start':
          setIsStreaming(true);
          setCurrentMessage('');
          break;
          
        case 'chunk':
          setCurrentMessage(prev => prev + data.content);
          break;
          
        case 'complete':
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: currentMessage,
            timestamp: data.timestamp
          }]);
          setCurrentMessage('');
          setIsStreaming(false);
          break;
          
        case 'error':
          console.error('WebSocket error:', data.error);
          setIsStreaming(false);
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setIsStreaming(false);
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [currentMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !isConnected || isStreaming) return;

    const sessionId = Date.now().toString();
    sessionIdRef.current = sessionId;

    // Add user message
    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to server
    wsRef.current.send(JSON.stringify({
      message: input,
      sessionId
    }));

    setInput('');
  };

  const reconnect = () => {
    if (wsRef.current.readyState === WebSocket.CLOSED) {
      // Trigger useEffect to recreate connection
      setIsConnected(false);
      window.location.reload();
    }
  };

  return (
    <div className="websocket-chat">
      <div className="connection-status">
        Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        {!isConnected && (
          <button onClick={reconnect}>Reconnect</button>
        )}
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-header">
              <strong>{msg.role}</strong>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        
        {isStreaming && currentMessage && (
          <div className="message assistant streaming">
            <div className="message-header">
              <strong>assistant</strong>
              <span className="typing-indicator">typing...</span>
            </div>
            <div className="message-content">
              {currentMessage}
              <span className="cursor">▊</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={!isConnected || isStreaming}
        />
        <button 
          type="submit" 
          disabled={!isConnected || isStreaming || !input.trim()}
        >
          {isStreaming ? 'Streaming...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default WebSocketChat;
```

### Vanilla JavaScript with Fetch Streaming

```javascript
class StreamingClient {
  constructor(baseUrl = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async streamResponse(message, onChunk, onComplete, onError) {
    try {
      const response = await fetch(`${this.baseUrl}/api/stream?message=${encodeURIComponent(message)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            
            if (data.error) {
              onError(data.error);
              return;
            }
            
            if (data.done) {
              onComplete();
              return;
            }
            
            onChunk(data.content);
          }
        }
      }
    } catch (error) {
      onError(error.message);
    }
  }
}

// Usage example
const client = new StreamingClient();
const messageContainer = document.getElementById('messages');
let currentResponse = '';

client.streamResponse(
  'Tell me a story about AI',
  // onChunk
  (chunk) => {
    currentResponse += chunk;
    messageContainer.textContent = currentResponse;
  },
  // onComplete
  () => {
    console.log('Streaming complete');
    messageContainer.textContent += '\n[Complete]';
  },
  // onError
  (error) => {
    console.error('Streaming error:', error);
    messageContainer.textContent += `\n[Error: ${error}]`;
  }
);
```

## Error Handling and Best Practices

### Connection Management

```javascript
class RobustStreamingClient {
  constructor(maxRetries = 3, retryDelay = 1000) {
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
    this.currentRetries = 0;
  }

  async streamWithRetry(message, callbacks) {
    try {
      await this.stream(message, callbacks);
      this.currentRetries = 0; // Reset on success
    } catch (error) {
      if (this.currentRetries < this.maxRetries) {
        this.currentRetries++;
        console.log(`Retry ${this.currentRetries}/${this.maxRetries} in ${this.retryDelay}ms`);
        
        setTimeout(() => {
          this.streamWithRetry(message, callbacks);
        }, this.retryDelay * this.currentRetries);
      } else {
        callbacks.onError(`Max retries exceeded: ${error.message}`);
      }
    }
  }

  async stream(message, { onChunk, onComplete, onError }) {
    // Implementation here...
  }
}
```

### React Hook for Streaming

```javascript
import { useState, useCallback, useRef, useEffect } from 'react';

export const useStreamingResponse = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [streamedContent, setStreamedContent] = useState('');
  const abortControllerRef = useRef(null);

  const streamResponse = useCallback(async (message, options = {}) => {
    if (isStreaming) return;

    setIsStreaming(true);
    setError(null);
    setStreamedContent('');

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: abortControllerRef.current.signal,
        ...options
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const data = JSON.parse(chunk);

        if (data.error) {
          throw new Error(data.error);
        }

        setStreamedContent(prev => prev + data.content);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [isStreaming]);

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const resetStream = useCallback(() => {
    setError(null);
    setStreamedContent('');
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    streamResponse,
    cancelStream,
    resetStream,
    isStreaming,
    error,
    streamedContent
  };
};
```

## Performance Optimization

### Chunked Processing

```javascript
// Server-side chunked processing
app.post('/api/stream-optimized', async (req, res) => {
  const { message } = req.body;
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const stream = await model.stream([new HumanMessage(message)]);
    let buffer = '';
    const chunkSize = 50; // Adjust based on needs

    for await (const chunk of stream) {
      buffer += chunk.content;
      
      // Send chunks when buffer reaches target size
      if (buffer.length >= chunkSize) {
        res.write(`data: ${JSON.stringify({ content: buffer })}\n\n`);
        buffer = '';
      }
    }
    
    // Send remaining buffer
    if (buffer) {
      res.write(`data: ${JSON.stringify({ content: buffer })}\n\n`);
    }
    
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});
```

### Client-side Debouncing

```javascript
import { useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounceStream = (streamFunction, delay = 300) => {
  const debouncedStream = useMemo(
    () => debounce(streamFunction, delay),
    [streamFunction, delay]
  );

  const cancelDebounce = useCallback(() => {
    debouncedStream.cancel();
  }, [debouncedStream]);

  return { debouncedStream, cancelDebounce };
};
```

## Security Considerations

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const streamLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 streaming requests per windowMs
  message: 'Too many streaming requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/stream', streamLimiter);
```

### Input Validation

```javascript
const Joi = require('joi');

const streamSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
  sessionId: Joi.string().optional(),
  model: Joi.string().valid('gpt-3.5-turbo', 'gpt-4').optional()
});

app.post('/api/stream', (req, res, next) => {
  const { error } = streamSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
});
```

## Testing Streaming Implementations

### Unit Tests for Streaming

```javascript
const request = require('supertest');
const app = require('../app');

describe('Streaming API', () => {
  test('should stream response in chunks', async () => {
    const response = await request(app)
      .get('/api/stream')
      .query({ message: 'Hello' })
      .expect(200);

    expect(response.headers['content-type']).toBe('text/plain');
    expect(response.text).toContain('data:');
  });

  test('should handle streaming errors gracefully', async () => {
    const response = await request(app)
      .get('/api/stream')
      .query({ message: '' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
```

### Integration Tests

```javascript
describe('WebSocket Streaming', () => {
  let ws;

  beforeEach(() => {
    ws = new WebSocket('ws://localhost:8080');
    return new Promise((resolve) => {
      ws.on('open', resolve);
    });
  });

  afterEach(() => {
    ws.close();
  });

  test('should receive streaming chunks', (done) => {
    const chunks = [];
    
    ws.on('message', (data) => {
      const message = JSON.parse(data);
      chunks.push(message);
      
      if (message.type === 'complete') {
        expect(chunks.length).toBeGreaterThan(1);
        expect(chunks[0].type).toBe('start');
        done();
      }
    });

    ws.send(JSON.stringify({ message: 'Test message' }));
  });
});
```

## Deployment Considerations

### Docker Configuration

```dockerfile
# Dockerfile for streaming server
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001 8080

# Use PM2 for process management
RUN npm install -g pm2

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

### Load Balancing with Nginx

```nginx
# nginx.conf for streaming
upstream streaming_backend {
    server app1:3001;
    server app2:3001;
    server app3:3001;
}

server {
    listen 80;
    
    location /api/stream {
        proxy_pass http://streaming_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }
}
```

This comprehensive guide covers the essential aspects of streaming AI responses from LangChain to clients, including multiple implementation approaches, error handling, performance optimization, and deployment considerations.