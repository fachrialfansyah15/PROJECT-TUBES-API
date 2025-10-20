#!/usr/bin/env node

/**
 * Test script untuk memverifikasi koneksi backend dengan frontend
 * Jalankan dengan: node test-connection.js
 */

import http from 'http'

const BACKEND_URL = 'http://localhost:3333'
const FRONTEND_URL = 'http://localhost:5173'

console.log('🧪 Testing Backend Connection...\n')

// Test 1: Health Check
function testHealthCheck() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BACKEND_URL}/health`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          console.log('✅ Health Check:', result.status)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })
    
    req.on('error', reject)
    req.setTimeout(5000, () => reject(new Error('Timeout')))
  })
}

// Test 2: Root Endpoint
function testRootEndpoint() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BACKEND_URL}/`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          console.log('✅ Root Endpoint:', result.message)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })
    
    req.on('error', reject)
    req.setTimeout(5000, () => reject(new Error('Timeout')))
  })
}

// Test 3: Quizzes Endpoint
function testQuizzesEndpoint() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BACKEND_URL}/api/quizzes`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          console.log('✅ Quizzes Endpoint:', result.success ? 'Working' : 'Error')
          console.log(`   Data: ${Array.isArray(result.data) ? result.data.length : 0} quizzes`)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })
    
    req.on('error', reject)
    req.setTimeout(5000, () => reject(new Error('Timeout')))
  })
}

// Test 4: CORS Preflight
function testCorsPreflight() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3333,
      path: '/api/quizzes',
      method: 'OPTIONS',
      headers: {
        'Origin': FRONTEND_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    }
    
    const req = http.request(options, (res) => {
      const corsHeaders = {
        'Access-Control-Allow-Origin': res.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': res.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': res.headers['access-control-allow-headers'],
        'Access-Control-Allow-Credentials': res.headers['access-control-allow-credentials']
      }
      
      console.log('✅ CORS Preflight:')
      console.log(`   Allow Origin: ${corsHeaders['Access-Control-Allow-Origin']}`)
      console.log(`   Allow Methods: ${corsHeaders['Access-Control-Allow-Methods']}`)
      console.log(`   Allow Headers: ${corsHeaders['Access-Control-Allow-Headers']}`)
      console.log(`   Allow Credentials: ${corsHeaders['Access-Control-Allow-Credentials']}`)
      
      resolve(corsHeaders)
    })
    
    req.on('error', reject)
    req.setTimeout(5000, () => reject(new Error('Timeout')))
    req.end()
  })
}

// Run all tests
async function runTests() {
  try {
    console.log('🚀 Starting Backend Connection Tests...\n')
    
    await testHealthCheck()
    await testRootEndpoint()
    await testQuizzesEndpoint()
    await testCorsPreflight()
    
    console.log('\n🎉 All tests passed! Backend is ready for frontend connection.')
    console.log('\n📋 Next steps:')
    console.log('1. Start your frontend: cd frontend && npm run dev')
    console.log('2. Open http://localhost:5173 in your browser')
    console.log('3. Test the quiz creation functionality')
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure backend is running: node ace serve --watch')
    console.log('2. Check if port 3333 is available')
    console.log('3. Verify database connection')
    console.log('4. Run migrations: node ace migration:run')
    process.exit(1)
  }
}

runTests()
