from fastapi import Request, HTTPException
from collections import defaultdict
import time

# Simple in-memory rate limiter
request_counts = defaultdict(list)

RATE_LIMIT = 20       # requests
TIME_WINDOW = 60      # seconds


async def rate_limit_middleware(request: Request, call_next):
    # Only rate limit AI endpoints
    if "/ai/" in request.url.path or "/resume/" in request.url.path:
        client_ip = request.client.host
        now = time.time()

        # Remove old requests outside the window
        request_counts[client_ip] = [
            t for t in request_counts[client_ip] if now - t < TIME_WINDOW
        ]

        if len(request_counts[client_ip]) >= RATE_LIMIT:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded. Max {RATE_LIMIT} AI requests per minute."
            )

        request_counts[client_ip].append(now)

    response = await call_next(request)
    return response
