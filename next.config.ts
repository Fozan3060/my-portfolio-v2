import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io']
  },
  // The chat route reads the dataset at runtime; make sure it ships with the deployment.
  outputFileTracingIncludes: {
    '/api/chat': ['./fine-tuning/dataset.jsonl']
  }
}

export default nextConfig
